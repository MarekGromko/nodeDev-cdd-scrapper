#!/bin/bash

# Script to fetch exchange rates for today's date immediately
# Usage: ./fetch-now.sh

# Navigate to the parent directory (project root)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"

# Get current date in dd/mm/yyyy format
DATE=$(date +"%d/%m/%Y")

echo "Fetching exchange rates for $DATE..."
python src/main.py fetch "$DATE"

# Log the execution
echo "$(date): Fetched data for $DATE" >> logs/fetch.log
echo "✓ Done!"
