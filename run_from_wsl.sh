#!/bin/bash

# Convert WSL path to Windows path
WIN_PATH=$(wslpath -w $(pwd))

echo "Running scraper from: $WIN_PATH"

# Install packages
/mnt/c/Python312/python.exe -m pip install requests beautifulsoup4 lxml

# Run scraper
echo "Starting scraper..."
/mnt/c/Python312/python.exe scraper.py

# Process content
echo "Processing content..."
/mnt/c/Python312/python.exe process_scraped_content.py

echo "Done! Check scraped-content folder"