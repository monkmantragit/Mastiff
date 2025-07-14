@echo off
echo Setting up correct directory...
cd /d "%~dp0"

echo Current directory: %CD%
echo.

echo Installing required packages...
pip install requests beautifulsoup4 lxml

echo.
echo Starting website scraper...
python "%~dp0scraper.py"

echo.
echo Processing scraped content...
python "%~dp0process_scraped_content.py"

echo.
echo Scraping complete! Check the scraped-content folder for results.
pause