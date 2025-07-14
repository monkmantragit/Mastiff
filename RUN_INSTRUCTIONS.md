# How to Run the Website Scraper

## Option 1: Using the Batch File (Easiest)
1. Open Windows Explorer
2. Navigate to your project folder (Mastiff)
3. Double-click `run_scraper.bat`

## Option 2: Manual Steps
1. Open Command Prompt or PowerShell in Windows
2. Navigate to your project directory:
   ```
   cd path\to\your\Mastiff\folder
   ```
3. Install dependencies:
   ```
   pip install requests beautifulsoup4 lxml
   ```
4. Run the scraper:
   ```
   python scraper.py
   ```
5. Process the content:
   ```
   python process_scraped_content.py
   ```

## What It Does
1. **scraper.py** - Discovers all pages on whitemassif.com and saves raw data
2. **process_scraped_content.py** - Converts content to markdown and downloads images

## Output Structure
- `scraped-content/content/` - Markdown files for each page
- `scraped-content/images/` - Downloaded images organized by page
- `scraped-content/metadata/` - Raw scraped data in JSON format