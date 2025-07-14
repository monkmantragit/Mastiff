# PowerShell script to run the scraper
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "Current directory: $PWD" -ForegroundColor Green
Write-Host ""

Write-Host "Installing required packages..." -ForegroundColor Yellow
pip install requests beautifulsoup4 lxml

Write-Host ""
Write-Host "Starting website scraper..." -ForegroundColor Yellow
python "$scriptPath\scraper.py"

Write-Host ""
Write-Host "Processing scraped content..." -ForegroundColor Yellow
python "$scriptPath\process_scraped_content.py"

Write-Host ""
Write-Host "Scraping complete! Check the scraped-content folder for results." -ForegroundColor Green
Read-Host "Press Enter to continue"