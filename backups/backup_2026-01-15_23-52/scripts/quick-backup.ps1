# Quick Local Backup Script
# Simple version that prompts for DATABASE_URL

Write-Host "=== SinapCode Database Backup ===" -ForegroundColor Cyan
Write-Host ""

# Configuration
$BackupDir = "C:\WEB-DI\backups"
$Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$BackupFile = "backup_$Timestamp.dump"

# Create backup directory
if (-not (Test-Path $BackupDir)) {
    New-Item -ItemType Directory -Path $BackupDir | Out-Null
    Write-Host "[INFO] Created backup directory: $BackupDir" -ForegroundColor Green
}

# Check if pg_dump is available
if (-not (Get-Command pg_dump -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] pg_dump is not installed" -ForegroundColor Red
    Write-Host "Please install PostgreSQL client tools from: https://www.postgresql.org/download/windows/" -ForegroundColor Yellow
    exit 1
}

# Get DATABASE_URL
Write-Host "Enter your DATABASE_URL (from Supabase):" -ForegroundColor Yellow
Write-Host "(Format: postgresql://user:password@host:port/database)" -ForegroundColor Gray
$DatabaseUrl = Read-Host "DATABASE_URL"

if ([string]::IsNullOrWhiteSpace($DatabaseUrl)) {
    Write-Host "[ERROR] DATABASE_URL is required" -ForegroundColor Red
    exit 1
}

# Create backup
Write-Host ""
Write-Host "[INFO] Creating database backup..." -ForegroundColor Green
$BackupPath = Join-Path $BackupDir $BackupFile

try {
    $env:PGPASSWORD = ""  # pg_dump will use URL with password
    
    & pg_dump $DatabaseUrl `
        --format=custom `
        --compress=9 `
        --file=$BackupPath
    
    if (Test-Path $BackupPath) {
        $Size = (Get-Item $BackupPath).Length / 1MB
        Write-Host "[SUCCESS] Backup created successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Backup Details:" -ForegroundColor Cyan
        Write-Host "  File: $BackupFile" -ForegroundColor White
        Write-Host "  Size: $([math]::Round($Size, 2)) MB" -ForegroundColor White
        Write-Host "  Location: $BackupPath" -ForegroundColor White
        Write-Host ""
        
        # Calculate checksum
        $Hash = Get-FileHash -Path $BackupPath -Algorithm SHA256
        $Hash.Hash | Out-File -FilePath "$BackupPath.sha256" -Encoding ASCII
        Write-Host "  Checksum: $($Hash.Hash.Substring(0, 32))..." -ForegroundColor White
        
        # Create metadata
        $Metadata = @{
            timestamp   = $Timestamp
            date        = (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
            backup_file = $BackupFile
            size_bytes  = (Get-Item $BackupPath).Length
            size_mb     = [math]::Round($Size, 2)
            checksum    = $Hash.Hash
            created_by  = $env:USERNAME
            hostname    = $env:COMPUTERNAME
        } | ConvertTo-Json -Depth 10
        
        $Metadata | Out-File -FilePath "$BackupPath.json" -Encoding UTF8
        
        # List all backups
        Write-Host ""
        Write-Host "All backups in $BackupDir :" -ForegroundColor Cyan
        Get-ChildItem -Path $BackupDir -Filter "*.dump" | 
        Sort-Object LastWriteTime -Descending |
        ForEach-Object {
            $FileSize = $_.Length / 1MB
            Write-Host "  - $($_.Name) ($([math]::Round($FileSize, 2)) MB) - $($_.LastWriteTime)" -ForegroundColor White
        }
        
        Write-Host ""
        Write-Host "Backup completed successfully! ✓" -ForegroundColor Green
        
    }
    else {
        Write-Host "[ERROR] Backup file was not created" -ForegroundColor Red
        exit 1
    }
    
}
catch {
    Write-Host "[ERROR] Backup failed: $_" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}
