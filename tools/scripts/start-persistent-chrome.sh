#!/bin/bash

# Start a persistent Chrome instance for Selenium testing
# This keeps Chrome open between test runs to avoid re-authentication

# Get the project root directory (two levels up from this script)
PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
PROFILE_DIR="$PROJECT_ROOT/selenium-profile"
DEBUG_PORT=9222

echo "🚀 Starting persistent Chrome instance for Selenium..."
echo ""
echo "📁 Profile directory: $PROFILE_DIR"
echo "🔌 Debug port: $DEBUG_PORT"
echo ""

# Check if Chrome is already running on the debug port
if lsof -i :$DEBUG_PORT > /dev/null 2>&1; then
    echo "⚠️  Chrome is already running on port $DEBUG_PORT"
    echo ""
    echo "Options:"
    echo "  1. Kill existing instance: kill \$(lsof -ti :$DEBUG_PORT)"
    echo "  2. Use the existing instance (it's already running!)"
    exit 1
fi

# Find Chrome binary
if [ -f "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ]; then
    CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
elif [ -f "/usr/bin/google-chrome" ]; then
    CHROME="/usr/bin/google-chrome"
elif [ -f "/usr/bin/chromium-browser" ]; then
    CHROME="/usr/bin/chromium-browser"
else
    echo "❌ Chrome not found. Please install Google Chrome."
    exit 1
fi

echo "🌐 Starting Chrome..."
"$CHROME" \
    --remote-debugging-port=$DEBUG_PORT \
    --user-data-dir="$PROFILE_DIR" \
    --disable-blink-features=AutomationControlled \
    --no-first-run \
    --no-default-browser-check \
    "https://www.ea.com/fifa/ultimate-team/web-app/" \
    > /dev/null 2>&1 &

CHROME_PID=$!

echo "✅ Chrome started!"
echo ""
echo "📋 Details:"
echo "   PID: $CHROME_PID"
echo "   Debug URL: http://localhost:$DEBUG_PORT"
echo "   Profile: $PROFILE_DIR"
echo ""
echo "🔗 Your test scripts can now connect to this instance."
echo ""
echo "To stop Chrome:"
echo "   kill $CHROME_PID"
echo "   or"
echo "   ./tools/scripts/stop-persistent-chrome.sh"
echo ""

# Save PID for later
echo $CHROME_PID > /tmp/selenium-chrome.pid

echo "💡 Tip: Login manually in this Chrome window to save your session!"
