#!/bin/bash

# Stop the persistent Chrome instance

PID_FILE="/tmp/selenium-chrome.pid"

if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")

    if ps -p $PID > /dev/null; then
        echo "🛑 Stopping Chrome (PID: $PID)..."
        kill $PID
        rm "$PID_FILE"
        echo "✅ Chrome stopped"
    else
        echo "⚠️  Chrome process (PID: $PID) not found"
        rm "$PID_FILE"
    fi
else
    # Try to kill by port
    if lsof -i :9222 > /dev/null 2>&1; then
        PID=$(lsof -ti :9222)
        echo "🛑 Stopping Chrome (PID: $PID) on port 9222..."
        kill $PID
        echo "✅ Chrome stopped"
    else
        echo "ℹ️  No Chrome instance found on port 9222"
    fi
fi
