@echo off
echo ========================================
echo    ResumeAI Pro - Opening All Pages
echo ========================================
echo.
echo Opening all pages in your default browser...
echo.

echo [1/3] Opening Welcome Page...
start "" "index.html"
timeout /t 2 /nobreak >nul

echo [2/3] Opening ATS Analysis Page...
start "" "ats-analysis.html"
timeout /t 2 /nobreak >nul

echo [3/3] Opening Success Page...
start "" "success.html"

echo.
echo ========================================
echo All pages opened successfully!
echo ========================================
echo.
echo Pages opened:
echo  - Welcome Page (with falling stars)
echo  - ATS Analysis (with keyword boxes)
echo  - Success Page (with falling stars)
echo.
pause
