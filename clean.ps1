# Windows-friendly project cleanup
# Usage: Run this script in PowerShell to remove node_modules and package-lock.json
if (Test-Path node_modules) { Remove-Item -Recurse -Force node_modules }
if (Test-Path package-lock.json) { Remove-Item -Force package-lock.json }
Write-Host "Cleaned node_modules and package-lock.json. Now run:`n    npm install"
