# Start development server for A14_Folder_Architect
# This PowerShell script runs: npm run dev 2>&1

Set-Location $PSScriptRoot
Write-Host "Starting Folder Architect Development Server..." -ForegroundColor Green
Write-Host ""
npm run dev 2>&1
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Yellow
[System.Console]::ReadKey() | Out-Null
