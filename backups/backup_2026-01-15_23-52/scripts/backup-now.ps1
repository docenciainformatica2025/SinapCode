# Simple Database Backup Script
# Replace [YOUR-PASSWORD] with your actual Supabase password

param(
    [string]$Password = "[YOUR-PASSWORD]"
)

$DatabaseUrl = "postgresql://postgres:$Password@db.wmwkbmojsycdcnqlmy.supabase.co:5432/postgres"
$BackupDir = "C:\WEB-DI\backups"
$Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$BackupFile = "backup_$Timestamp.dump"
$BackupPath = Join-Path $BackupDir $BackupFile

Write-Host "=== Database Backup ===" -ForegroundColor Cyan

# Create directory
if (-not (Test-Path $BackupDir)) {
    New-Item -ItemType Directory -Path $BackupDir | Out-Null
}

# Check pg_dump
if (-not (Get-Command pg_dump -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: pg_dump not found" -ForegroundColor Red
    Write-Host "Install from: https://www.postgresql.org/download/windows/" -ForegroundColor Yellow
    exit 1
}

Write-Host "Creating backup..." -ForegroundColor Green

& pg_dump $DatabaseUrl --format=custom --compress=9 --file=$BackupPath 2>&1 | Out-Null

if (Test-Path $BackupPath) {
    $Size = [math]::Round((Get-Item $BackupPath).Length / 1MB, 2)
    
    Write-Host "SUCCESS!" -ForegroundColor Green
    Write-Host "File: $BackupFile"
    Write-Host "Size: $Size MB"
    Write-Host "Path: $BackupPath"
    
    # Checksum
    $Hash = (Get-FileHash -Path $BackupPath -Algorithm SHA256).Hash
    $Hash | Out-File -FilePath "$BackupPath.sha256" -Encoding ASCII
    Write-Host "SHA256: $($Hash.Substring(0,32))..."
    
}
else {
    Write-Host "ERROR: Backup failed" -ForegroundColor Red
}
