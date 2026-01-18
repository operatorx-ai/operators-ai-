@echo off
REM Windows cleanup script for Node.js projects
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del /f /q package-lock.json
echo Cleaned node_modules and package-lock.json. Now run:
echo     npm install
