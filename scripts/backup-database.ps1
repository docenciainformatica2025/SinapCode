# Local Backup Script for Windows
# PowerShell version of backup-database.sh

param(
    [string]$BackupDir = "C:\WEB-DI\backups",
    [switch]$Encrypt = $true
)

# Configuration
$Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$Date = Get-Date -Format "yyyy-MM-dd"
$BackupFile = "backup_$Timestamp.dump"
$EncryptedFile = "$BackupFile.enc"
$ChecksumFile = "$BackupFile.sha256"

# Colors
function Write-Info { Write-Host "[INFO] $args" -ForegroundColor Green }
function Write-Warn { Write-Host "[WARN] $args" -ForegroundColor Yellow }
function Write-Error { Write-Host "[ERROR] $args" -ForegroundColor Red }

# Check requirements
Write-Info "Checking requirements..."

# Check if DATABASE_URL is set
if (-not $env:DATABASE_URL) {
    Write-Error "DATABASE_URL environment variable is not set"
    Write-Host "Please set it in your .env.local file or as environment variable"
    exit 1
}

# Check if pg_dump is available
if (-not (Get-Command pg_dump -ErrorAction SilentlyContinue)) {
    Write-Error "pg_dump is not installed or not in PATH"
    Write-Host "Please install PostgreSQL client tools"
    exit 1
}

# Create backup directory
Write-Info "Creating backup directory..."
New-Item -ItemType Directory -Force -Path $BackupDir | Out-Null
Write-Info "Backup directory: $BackupDir"

# Create database backup
Write-Info "Creating database backup..."
$BackupPath = Join-Path $BackupDir $BackupFile

try {
    & pg_dump $env:DATABASE_URL `
        --format=custom `
        --compress=9 `
        --file=$BackupPath `
        2>&1 | Out-Null
    
    if (-not (Test-Path $BackupPath)) {
        Write-Error "Backup file was not created"
        exit 1
    }
    
    $BackupSize = (Get-Item $BackupPath).Length / 1MB
    Write-Info "Backup created: $BackupFile ($([math]::Round($BackupSize, 2)) MB)"
} catch {
    Write-Error "Failed to create backup: $_"
    exit 1
}

# Calculate checksum
Write-Info "Calculating checksum..."
$Hash = Get-FileHash -Path $BackupPath -Algorithm SHA256
$Hash.Hash | Out-File -FilePath (Join-Path $BackupDir $ChecksumFile) -Encoding ASCII
Write-Info "SHA-256: $($Hash.Hash.Substring(0, 16))..."

# Encrypt backup (if requested)
if ($Encrypt) {
    if (-not $env:BACKUP_ENCRYPTION_KEY) {
        Write-Warn "BACKUP_ENCRYPTION_KEY not set, skipping encryption"
        Write-Warn "Set this variable to encrypt backups"
    } else {
        Write-Info "Encrypting backup..."
        
        # Check if OpenSSL is available
        if (Get-Command openssl -ErrorAction SilentlyContinue) {
            $EncryptedPath = Join-Path $BackupDir $EncryptedFile
            
            & openssl enc -aes-256-cbc `
                -salt `
                -pbkdf2 `
                -in $BackupPath `
                -out $EncryptedPath `
                -pass "pass:$env:BACKUP_ENCRYPTION_KEY" `
                2>&1 | Out-Null
            
            if (Test-Path $EncryptedPath) {
                $EncryptedSize = (Get-Item $EncryptedPath).Length / 1MB
                Write-Info "Backup encrypted: $EncryptedFile ($([math]::Round($EncryptedSize, 2)) MB)"
                
                # Remove unencrypted backup
                Remove-Item $BackupPath
                Write-Info "Unencrypted backup removed for security"
            } else {
                Write-Warn "Encryption failed, keeping unencrypted backup"
            }
        } else {
            Write-Warn "OpenSSL not found, skipping encryption"
            Write-Warn "Install OpenSSL to enable encryption: https://slproweb.com/products/Win32OpenSSL.html"
        }
    }
}

# Create metadata
Write-Info "Creating backup metadata..."
$Metadata = @{
    timestamp = $Timestamp
    date = $Date
    backup_file = $BackupFile
    encrypted_file = if ($Encrypt -and (Test-Path (Join-Path $BackupDir $EncryptedFile))) { $EncryptedFile } else { $null }
    checksum_file = $ChecksumFile
    checksum = $Hash.Hash
    size_bytes = (Get-Item -Path (Join-Path $BackupDir $(if ($Encrypt -and (Test-Path (Join-Path $BackupDir $EncryptedFile))) { $EncryptedFile } else { $BackupFile }))).Length
    created_by = $env:USERNAME
    hostname = $env:COMPUTERNAME
    pg_dump_version = (& pg_dump --version)
} | ConvertTo-Json

$Metadata | Out-File -FilePath (Join-Path $BackupDir "backup_$Timestamp.json") -Encoding UTF8
Write-Info "Metadata created: backup_$Timestamp.json"

# Cleanup old backups (>7 days)
Write-Info "Cleaning up old backups (>7 days)..."
Get-ChildItem -Path $BackupDir -Filter "backup_*" | 
    Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-7) } |
    Remove-Item -Force
Write-Info "Cleanup completed"

# Summary
Write-Info "=== Backup Completed Successfully ==="
Write-Info "Files created:"
if ($Encrypt -and (Test-Path (Join-Path $BackupDir $EncryptedFile))) {
    Write-Info "  - $EncryptedFile"
} else {
    Write-Info "  - $BackupFile"
}
Write-Info "  - $ChecksumFile"
Write-Info "  - backup_$Timestamp.json"
Write-Info ""
Write-Info "Backup location: $BackupDir"

# List recent backups
Write-Info ""
Write-Info "Recent backups:"
Get-ChildItem -Path $BackupDir -Filter "backup_*.dump*" | 
    Sort-Object LastWriteTime -Descending | 
    Select-Object -First 5 | 
    ForEach-Object {
        $Size = $_.Length / 1MB
        Write-Host "  - $($_.Name) ($([math]::Round($Size, 2)) MB) - $($_.LastWriteTime)"
    }
