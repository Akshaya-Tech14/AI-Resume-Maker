@echo off
echo.
echo ========================================
echo   GitHub Push Script - ResumeAI Pro
echo ========================================
echo.

:: Check if git is initialized
if not exist .git (
    echo Initializing Git repository...
    git init
)

:: Prompt for commit message
set /p commit_msg="Enter commit message (or press enter for 'Initial commit'): "
if "%commit_msg%"=="" set commit_msg=Initial commit

:: Git sequence
echo Staging files...
git add .

echo Committing changes...
git commit -m "%commit_msg%"

:: Check if remote exists
git remote -v | findstr "origin" > nul
if %errorlevel% neq 0 (
    echo.
    echo No remote 'origin' found. 
    set /p repo_url="Enter GitHub repository URL (e.g., https://github.com/username/repo.git): "
    if not "%repo_url%"=="" (
        git remote add origin %repo_url%
        echo Remote origin added.
    ) else (
        echo Skipping remote add.
    )
)

:: Branch check
echo.
echo Current branch is:
git branch --show-current

echo pushing to main...
git push -u origin main

echo.
echo ========================================
echo   Done! Your code has been pushed.
echo ========================================
pause
