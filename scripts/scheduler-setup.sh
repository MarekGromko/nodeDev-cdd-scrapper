#!/bin/bash

# Setupe a cron job to run fetch-now.sh daily

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
FETCH_SCRIPT="$SCRIPT_DIR/fetch-now.sh"
chmod +x "$FETCH_SCRIPT"

# cron job to run at 2am everyday
CRON_JOB="0 2 * * * $FETCH_SCRIPT"

# check if cron job already exists
if crontab -l 2>/dev/null | grep -q "$FETCH_SCRIPT"; then
    echo "Cron job already exists for fetch-now.sh"
    crontab -l | grep "$FETCH_SCRIPT"
    exit 0
fi

# add cron job
(crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

echo "Scheduler setup successfully!"
echo ""
echo "config:"
echo "  - script: $FETCH_SCRIPT"
echo "  - schedule: everyday at 2AM"
