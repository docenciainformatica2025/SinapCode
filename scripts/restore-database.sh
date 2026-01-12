#!/bin/bash
# Database Restore Script
# Restaura un backup de base de datos con verificación y rollback

set -e
set -u
set -o pipefail

# ============================================================================
# CONFIGURACIÓN
# ============================================================================

BACKUP_FILE="${1:-}"
BACKUP_DIR="${BACKUP_DIR:-/tmp/backups}"
RESTORE_MODE="${RESTORE_MODE:-staging}"  # staging | production

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# ============================================================================
# FUNCIONES
# ============================================================================

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

show_usage() {
    cat <<EOF
Usage: $0 <backup_file> [options]

Arguments:
  backup_file          Encrypted backup file to restore

Environment Variables:
  DATABASE_URL         Target database URL
  BACKUP_ENCRYPTION_KEY Encryption key for backup
  RESTORE_MODE         staging | production (default: staging)

Example:
  RESTORE_MODE=staging ./restore-database.sh backup_20260112_020000.dump.enc

EOF
    exit 1
}

check_requirements() {
    log_step "Checking requirements..."
    
    if [ -z "$BACKUP_FILE" ]; then
        log_error "Backup file not specified"
        show_usage
    fi
    
    if [ ! -f "${BACKUP_DIR}/${BACKUP_FILE}" ]; then
        log_error "Backup file not found: ${BACKUP_DIR}/${BACKUP_FILE}"
        exit 1
    fi
    
    for cmd in pg_restore openssl sha256sum psql createdb dropdb; do
        if ! command -v $cmd &> /dev/null; then
            log_error "$cmd is not installed"
            exit 1
        fi
    done
    
    if [ -z "${DATABASE_URL:-}" ]; then
        log_error "DATABASE_URL is not set"
        exit 1
    fi
    
    if [ -z "${BACKUP_ENCRYPTION_KEY:-}" ]; then
        log_error "BACKUP_ENCRYPTION_KEY is not set"
        exit 1
    fi
    
    log_info "All requirements met ✓"
}

decrypt_backup() {
    log_step "Decrypting backup..."
    
    openssl enc -aes-256-cbc -d \
        -pbkdf2 \
        -in "${BACKUP_DIR}/${BACKUP_FILE}" \
        -out "${BACKUP_DIR}/restore.dump" \
        -pass "pass:${BACKUP_ENCRYPTION_KEY}"
    
    if [ ! -f "${BACKUP_DIR}/restore.dump" ]; then
        log_error "Failed to decrypt backup"
        exit 1
    fi
    
    DECRYPTED_SIZE=$(du -h "${BACKUP_DIR}/restore.dump" | cut -f1)
    log_info "Backup decrypted: restore.dump (${DECRYPTED_SIZE})"
}

verify_checksum() {
    log_step "Verifying backup integrity..."
    
    CHECKSUM_FILE="${BACKUP_FILE%.enc}.sha256"
    
    if [ -f "${BACKUP_DIR}/${CHECKSUM_FILE}" ]; then
        cd "${BACKUP_DIR}"
        # Calculate checksum of decrypted file
        CALCULATED_CHECKSUM=$(sha256sum restore.dump | cut -d' ' -f1)
        EXPECTED_CHECKSUM=$(cat "${CHECKSUM_FILE}" | cut -d' ' -f1)
        
        if [ "$CALCULATED_CHECKSUM" = "$EXPECTED_CHECKSUM" ]; then
            log_info "Checksum verification passed ✓"
        else
            log_error "Checksum mismatch!"
            log_error "Expected: ${EXPECTED_CHECKSUM}"
            log_error "Got: ${CALCULATED_CHECKSUM}"
            exit 1
        fi
    else
        log_warn "Checksum file not found, skipping verification"
    fi
}

create_temp_database() {
    log_step "Creating temporary database for testing..."
    
    TEMP_DB="sinapcode_restore_$(date +%s)"
    
    createdb "${TEMP_DB}" || {
        log_error "Failed to create temporary database"
        exit 1
    }
    
    log_info "Temporary database created: ${TEMP_DB}"
}

restore_to_temp() {
    log_step "Restoring to temporary database..."
    
    # Extract connection details
    DB_HOST=$(echo $DATABASE_URL | sed -n 's/.*@\([^:]*\).*/\1/p')
    DB_USER=$(echo $DATABASE_URL | sed -n 's/.*\/\/\([^:]*\).*/\1/p')
    
    TEMP_URL="postgresql://${DB_USER}@${DB_HOST}/${TEMP_DB}"
    
    pg_restore \
        --dbname="${TEMP_URL}" \
        --verbose \
        --no-owner \
        --no-acl \
        "${BACKUP_DIR}/restore.dump" \
        2>&1 | grep -v "^pg_restore: " || true
    
    log_info "Restore to temporary database completed"
}

verify_restored_data() {
    log_step "Verifying restored data..."
    
    # Count users
    USER_COUNT=$(psql "${TEMP_URL}" -t -c "SELECT COUNT(*) FROM users;" | xargs)
    log_info "Users in backup: ${USER_COUNT}"
    
    # Count legal consents
    CONSENT_COUNT=$(psql "${TEMP_URL}" -t -c "SELECT COUNT(*) FROM legal_consents;" | xargs)
    log_info "Legal consents in backup: ${CONSENT_COUNT}"
    
    # Verify tables exist
    TABLES=$(psql "${TEMP_URL}" -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='public';" | xargs)
    log_info "Tables in backup: ${TABLES}"
    
    if [ "$USER_COUNT" -eq 0 ]; then
        log_warn "No users found in backup!"
    fi
}

confirm_production_restore() {
    if [ "$RESTORE_MODE" = "production" ]; then
        log_warn "========================================="
        log_warn "WARNING: PRODUCTION RESTORE"
        log_warn "========================================="
        log_warn "This will replace the production database!"
        log_warn "Current data will be backed up first."
        echo ""
        read -p "Type 'RESTORE' to confirm: " CONFIRMATION
        
        if [ "$CONFIRMATION" != "RESTORE" ]; then
            log_info "Restore cancelled by user"
            cleanup_temp_database
            exit 0
        fi
    fi
}

backup_current_database() {
    if [ "$RESTORE_MODE" = "production" ]; then
        log_step "Backing up current production database..."
        
        PRE_RESTORE_BACKUP="${BACKUP_DIR}/pre_restore_$(date +%Y%m%d_%H%M%S).dump"
        
        pg_dump "${DATABASE_URL}" \
            --format=custom \
            --compress=9 \
            --file="${PRE_RESTORE_BACKUP}"
        
        log_info "Current database backed up: ${PRE_RESTORE_BACKUP}"
        log_info "Keep this file in case you need to rollback!"
    fi
}

restore_to_production() {
    log_step "Restoring to production database..."
    
    pg_restore \
        --dbname="${DATABASE_URL}" \
        --clean \
        --if-exists \
        --verbose \
        --no-owner \
        --no-acl \
        "${BACKUP_DIR}/restore.dump" \
        2>&1 | grep -v "^pg_restore: " || true
    
    log_info "Production restore completed"
}

verify_production() {
    log_step "Verifying production database..."
    
    USER_COUNT=$(psql "${DATABASE_URL}" -t -c "SELECT COUNT(*) FROM users;" | xargs)
    log_info "Users in production: ${USER_COUNT}"
    
    # Run a simple query to verify database is accessible
    psql "${DATABASE_URL}" -c "SELECT 1;" > /dev/null
    
    log_info "Production database verified ✓"
}

cleanup_temp_database() {
    if [ -n "${TEMP_DB:-}" ]; then
        log_step "Cleaning up temporary database..."
        dropdb "${TEMP_DB}" || log_warn "Failed to drop temporary database"
    fi
}

cleanup_files() {
    log_step "Cleaning up temporary files..."
    rm -f "${BACKUP_DIR}/restore.dump"
}

# ============================================================================
# MAIN
# ============================================================================

main() {
    log_info "=== Database Restore Started ==="
    log_info "Backup file: ${BACKUP_FILE}"
    log_info "Restore mode: ${RESTORE_MODE}"
    echo ""
    
    # Pre-flight checks
    check_requirements
    
    # Decrypt and verify
    decrypt_backup
    verify_checksum
    
    # Test restore in temporary database
    create_temp_database
    restore_to_temp
    verify_restored_data
    
    # Production restore (if requested)
    if [ "$RESTORE_MODE" = "production" ]; then
        confirm_production_restore
        backup_current_database
        restore_to_production
        verify_production
    fi
    
    # Cleanup
    cleanup_temp_database
    cleanup_files
    
    log_info "=== Restore Completed Successfully ==="
    
    if [ "$RESTORE_MODE" = "staging" ]; then
        log_info "Data verified in temporary database"
        log_info "To restore to production, run:"
        log_info "  RESTORE_MODE=production ./restore-database.sh ${BACKUP_FILE}"
    fi
}

# Trap errors and cleanup
trap 'log_error "Restore failed at line $LINENO"; cleanup_temp_database; cleanup_files; exit 1' ERR
trap 'cleanup_temp_database; cleanup_files' EXIT

# Run main function
main
