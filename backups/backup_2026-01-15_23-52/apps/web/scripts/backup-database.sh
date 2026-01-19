#!/bin/bash
# Database Backup Script
# Ejecutar diariamente via GitHub Actions
# Basado en mejores prácticas de GitHub, GitLab, Atlassian

set -e  # Exit on error
set -u  # Exit on undefined variable
set -o pipefail  # Exit on pipe failure

# ============================================================================
# CONFIGURACIÓN
# ============================================================================

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
DATE=$(date +%Y-%m-%d)
BACKUP_DIR="${BACKUP_DIR:-/tmp/backups}"
BACKUP_FILE="backup_${TIMESTAMP}.dump"
ENCRYPTED_FILE="${BACKUP_FILE}.enc"
CHECKSUM_FILE="${BACKUP_FILE}.sha256"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

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

check_requirements() {
    log_info "Checking requirements..."
    
    # Check required commands
    for cmd in pg_dump openssl sha256sum; do
        if ! command -v $cmd &> /dev/null; then
            log_error "$cmd is not installed"
            exit 1
        fi
    done
    
    # Check required environment variables
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

create_backup_dir() {
    log_info "Creating backup directory..."
    mkdir -p "${BACKUP_DIR}"
    log_info "Backup directory: ${BACKUP_DIR}"
}

create_database_backup() {
    log_info "Creating database backup..."
    
    # Use pg_dump with custom format (best for restoration)
    pg_dump "${DATABASE_URL}" \
        --format=custom \
        --compress=9 \
        --verbose \
        --file="${BACKUP_DIR}/${BACKUP_FILE}" \
        2>&1 | grep -v "^pg_dump: " || true
    
    if [ ! -f "${BACKUP_DIR}/${BACKUP_FILE}" ]; then
        log_error "Backup file was not created"
        exit 1
    fi
    
    BACKUP_SIZE=$(du -h "${BACKUP_DIR}/${BACKUP_FILE}" | cut -f1)
    log_info "Backup created: ${BACKUP_FILE} (${BACKUP_SIZE})"
}

calculate_checksum() {
    log_info "Calculating checksum..."
    
    cd "${BACKUP_DIR}"
    sha256sum "${BACKUP_FILE}" > "${CHECKSUM_FILE}"
    
    CHECKSUM=$(cat "${CHECKSUM_FILE}" | cut -d' ' -f1)
    log_info "SHA-256: ${CHECKSUM:0:16}..."
}

encrypt_backup() {
    log_info "Encrypting backup..."
    
    openssl enc -aes-256-cbc \
        -salt \
        -pbkdf2 \
        -in "${BACKUP_DIR}/${BACKUP_FILE}" \
        -out "${BACKUP_DIR}/${ENCRYPTED_FILE}" \
        -pass "pass:${BACKUP_ENCRYPTION_KEY}"
    
    if [ ! -f "${BACKUP_DIR}/${ENCRYPTED_FILE}" ]; then
        log_error "Encrypted file was not created"
        exit 1
    fi
    
    ENCRYPTED_SIZE=$(du -h "${BACKUP_DIR}/${ENCRYPTED_FILE}" | cut -f1)
    log_info "Backup encrypted: ${ENCRYPTED_FILE} (${ENCRYPTED_SIZE})"
}

verify_backup() {
    log_info "Verifying backup integrity..."
    
    # Verify checksum
    cd "${BACKUP_DIR}"
    if sha256sum -c "${CHECKSUM_FILE}" --status; then
        log_info "Checksum verification passed ✓"
    else
        log_error "Checksum verification failed"
        exit 1
    fi
    
    # Test decryption (without extracting)
    if openssl enc -aes-256-cbc -d \
        -pbkdf2 \
        -in "${ENCRYPTED_FILE}" \
        -pass "pass:${BACKUP_ENCRYPTION_KEY}" \
        -out /dev/null 2>/dev/null; then
        log_info "Decryption test passed ✓"
    else
        log_error "Decryption test failed"
        exit 1
    fi
}

create_metadata() {
    log_info "Creating backup metadata..."
    
    cat > "${BACKUP_DIR}/backup_${TIMESTAMP}.json" <<EOF
{
  "timestamp": "${TIMESTAMP}",
  "date": "${DATE}",
  "backup_file": "${BACKUP_FILE}",
  "encrypted_file": "${ENCRYPTED_FILE}",
  "checksum_file": "${CHECKSUM_FILE}",
  "checksum": "$(cat ${BACKUP_DIR}/${CHECKSUM_FILE} | cut -d' ' -f1)",
  "size_bytes": $(stat -f%z "${BACKUP_DIR}/${BACKUP_FILE}" 2>/dev/null || stat -c%s "${BACKUP_DIR}/${BACKUP_FILE}"),
  "encrypted_size_bytes": $(stat -f%z "${BACKUP_DIR}/${ENCRYPTED_FILE}" 2>/dev/null || stat -c%s "${BACKUP_DIR}/${ENCRYPTED_FILE}"),
  "database_url": "***REDACTED***",
  "created_by": "${USER:-github-actions}",
  "hostname": "$(hostname)",
  "pg_dump_version": "$(pg_dump --version | head -1)"
}
EOF
    
    log_info "Metadata created: backup_${TIMESTAMP}.json"
}

cleanup_old_backups() {
    log_info "Cleaning up old backups (>7 days)..."
    
    find "${BACKUP_DIR}" -name "backup_*.dump*" -mtime +7 -delete
    find "${BACKUP_DIR}" -name "backup_*.json" -mtime +7 -delete
    
    log_info "Cleanup completed"
}

send_notification() {
    local status=$1
    local message=$2
    
    if [ -n "${SLACK_WEBHOOK_URL:-}" ]; then
        log_info "Sending Slack notification..."
        
        local emoji="✅"
        local color="good"
        
        if [ "$status" != "success" ]; then
            emoji="❌"
            color="danger"
        fi
        
        curl -X POST "${SLACK_WEBHOOK_URL}" \
            -H 'Content-Type: application/json' \
            -d "{
                \"text\": \"${emoji} Database Backup ${status}\",
                \"attachments\": [{
                    \"color\": \"${color}\",
                    \"fields\": [
                        {\"title\": \"Timestamp\", \"value\": \"${TIMESTAMP}\", \"short\": true},
                        {\"title\": \"File\", \"value\": \"${ENCRYPTED_FILE}\", \"short\": true},
                        {\"title\": \"Message\", \"value\": \"${message}\", \"short\": false}
                    ]
                }]
            }" \
            --silent --output /dev/null || log_warn "Failed to send Slack notification"
    fi
}

# ============================================================================
# MAIN
# ============================================================================

main() {
    log_info "=== Database Backup Started ==="
    log_info "Timestamp: ${TIMESTAMP}"
    
    # Execute backup steps
    check_requirements
    create_backup_dir
    create_database_backup
    calculate_checksum
    encrypt_backup
    verify_backup
    create_metadata
    cleanup_old_backups
    
    # Success
    log_info "=== Backup Completed Successfully ==="
    log_info "Files created:"
    log_info "  - ${ENCRYPTED_FILE}"
    log_info "  - ${CHECKSUM_FILE}"
    log_info "  - backup_${TIMESTAMP}.json"
    
    send_notification "success" "Backup completed successfully"
    
    # Output for GitHub Actions
    if [ -n "${GITHUB_OUTPUT:-}" ]; then
        echo "backup_file=${ENCRYPTED_FILE}" >> $GITHUB_OUTPUT
        echo "checksum_file=${CHECKSUM_FILE}" >> $GITHUB_OUTPUT
        echo "timestamp=${TIMESTAMP}" >> $GITHUB_OUTPUT
    fi
    
    exit 0
}

# Trap errors
trap 'log_error "Backup failed at line $LINENO"; send_notification "failed" "Backup failed at line $LINENO"; exit 1' ERR

# Run main function
main
