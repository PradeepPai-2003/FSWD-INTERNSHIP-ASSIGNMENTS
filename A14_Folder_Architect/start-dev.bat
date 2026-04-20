@echo off
REM Start development server for A14_Folder_Architect
REM This batch file runs: npm run dev

cd /d "%~dp0"
echo Starting Folder Architect Development Server...
echo.
npm run dev
pause
