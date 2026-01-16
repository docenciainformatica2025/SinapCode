# ==========================================
# SinapCode Maintenance Automation Script
# ==========================================
# Executes standard maintenance procedures:
# 1. Code Quality Check (Linting)
# 2. Security Scan (Console.log check)
# 3. Project Backup (Robocopy)

Write-Host "🚀 STARTING MAINTENANCE PROTOCOL..." -ForegroundColor Cyan

# 1. LINTING
Write-Host "`n[1/3] Running Code Quality Checks..." -ForegroundColor Yellow

# Execute npm directly. On Windows we need .cmd
# Using & operator to execute command and wait for it
& npm.cmd run lint

# Check exit code of the last command
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ LINTING FAILED (Exit Code: $LASTEXITCODE). Maintenance aborted." -ForegroundColor Red
    Write-Host "   -> Please fix linting errors before proceeding."
    exit 1
}
Write-Host "✅ Linting Passed." -ForegroundColor Green

# 2. SECURITY SCAN (Console.log)
Write-Host "`n[2/3] Scanning for Debug Logs..." -ForegroundColor Yellow
$srcPath = Convert-Path ".\apps\web\src"
# Use generic error handling for file finding
try {
    $logsFound = Get-ChildItem -Path $srcPath -Recurse -Include *.ts, *.tsx, *.js, *.jsx -ErrorAction SilentlyContinue | Select-String -Pattern "console\.log"
    
    if ($logsFound) {
        Write-Host "⚠️  WARNING: Console.logs found! Please review:" -ForegroundColor Magenta
        foreach ($match in $logsFound) {
            Write-Host "   -> $($match.Path):$($match.LineNumber)" -ForegroundColor Gray
        }
        Write-Host "⚠️  Proceeding with backup, but please verify sensitive data exposure." -ForegroundColor Yellow
    }
    else {
        Write-Host "✅ No console.logs found." -ForegroundColor Green
    }
}
catch {
    Write-Host "⚠️  Warning: Could not complete scan (Path not found?). Skipping scan." -ForegroundColor DarkYellow
}

# 3. BACKUP
$dateStamp = Get-Date -Format "yyyy-MM-dd_HH-mm"
$sourceDir = Get-Location
$backupDir = "C:\WEB-DI\backups\backup_$dateStamp"

Write-Host "`n[3/3] Creating Backup..." -ForegroundColor Yellow
Write-Host "   -> Destination: $backupDir" -ForegroundColor Gray

# Robocopy args
$roboArgs = @(
    "$sourceDir",
    "$backupDir",
    "/E",                # Copy subdirectories
    "/XD", "node_modules", ".next", ".git", ".vs", ".vscode", "backups", # Exclude Dirs
    "/XF", ".env*", "*.log", "npm-debug.log*", # Exclude Files
    "/R:2",              # Retry
    "/W:5",              # Wait
    "/NJH", "/NJS"       # Reduce output noise (No Job Header/Summary) if preferred, but let's keep it minimal
)

# Invoke robocopy
& robocopy.exe @roboArgs | Out-Null # Suppress output if it's too verbose, or remove Out-Null to see it. 
# Robocopy returns exit code in $LASTEXITCODE
$exitCode = $LASTEXITCODE

# Robocopy exit codes: 0-7 are success/partial success. 8+ is failure.
if ($exitCode -ge 8) {
    Write-Host "❌ BACKUP FAILED (Robocopy Exit Code: $exitCode)" -ForegroundColor Red
    exit 1
}

Write-Host "`n✨ MAINTENANCE COMPLETED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "   -> Backup location: $backupDir"
Write-Host "   -> Please ensure CHANGELOG.md is updated." -ForegroundColor Cyan
