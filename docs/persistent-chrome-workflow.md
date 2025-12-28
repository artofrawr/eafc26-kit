# Persistent Chrome Workflow for Development

Keep Chrome open between test runs to avoid re-authentication!

## How It Works

1. **Start a persistent Chrome instance** with remote debugging enabled
2. **Selenium connects** to the existing Chrome (doesn't launch a new one)
3. **When script ends**, Selenium disconnects but Chrome stays open
4. **Run again** - instantly connects to the same Chrome with your session intact

## Quick Start

### 1. Start Persistent Chrome

```bash
./tools/scripts/start-persistent-chrome.sh
```

This will:

- Launch Chrome with remote debugging on port 9222
- Use a dedicated profile at `/tmp/selenium-chrome-profile`
- Open EA FC Web App automatically
- Stay open waiting for Selenium connections

**Login manually once** in this Chrome window (including 2FA).

### 2. Run Your Tests

```bash
npx tsx --tsconfig tsconfig.base.json tools/scripts/test-with-persistent-chrome.ts
```

The script connects to the running Chrome, runs tests, then disconnects (Chrome stays open).

### 3. Run Again - No Login Needed!

```bash
npx tsx --tsconfig tsconfig.base.json tools/scripts/test-with-persistent-chrome.ts
```

Instantly connects to the same Chrome with your session. No re-authentication!

### 4. Stop Chrome When Done

```bash
./tools/scripts/stop-persistent-chrome.sh
```

Or just close the Chrome window manually.

---

## Using in Your Own Scripts

```typescript
import { SeleniumAutomation } from '@eafc26-kit/selenium-automation';

const automation = new SeleniumAutomation({
  debuggerAddress: 'localhost:9222', // Connect to existing Chrome
});

await automation.initialize(); // Connects to running Chrome
await automation.auth.isAlreadyLoggedIn(); // Check state
await automation.navigation.navigateToSBC(); // Do work

// No need to call automation.close() - Chrome stays open!
```

---

## Workflow Comparison

### Before (Old Way)

```bash
npx tsx test1.ts  # Opens Chrome, login with 2FA, test, closes
npx tsx test2.ts  # Opens Chrome, login with 2FA, test, closes
npx tsx test3.ts  # Opens Chrome, login with 2FA, test, closes
```

❌ Login with 2FA every time
❌ Slow startup

### After (Persistent Chrome)

```bash
./tools/scripts/start-persistent-chrome.sh  # Start once, login once
npx tsx test1.ts  # Connect, test, disconnect (Chrome stays)
npx tsx test2.ts  # Connect, test, disconnect (Chrome stays)
npx tsx test3.ts  # Connect, test, disconnect (Chrome stays)
./tools/scripts/stop-persistent-chrome.sh   # Stop when done
```

✅ Login once
✅ Instant test runs
✅ Perfect for iterative development

---

## Environment Variables

You can set these in your `.env`:

```bash
SELENIUM_DEBUG_PORT=9222
SELENIUM_CHROME_PROFILE_DIR=/tmp/selenium-chrome-profile
```

Then use in scripts:

```typescript
const automation = new SeleniumAutomation({
  debuggerAddress: `localhost:${process.env.SELENIUM_DEBUG_PORT || 9222}`,
});
```

---

## Troubleshooting

**"Chrome is already running on port 9222"**

```bash
# Kill existing instance
./tools/scripts/stop-persistent-chrome.sh

# Or manually
kill $(lsof -ti :9222)

# Then start again
./tools/scripts/start-persistent-chrome.sh
```

**"ECONNREFUSED"**

Chrome isn't running. Start it first:

```bash
./tools/scripts/start-persistent-chrome.sh
```

**Session lost / need to re-login**

Chrome session might have expired. Just log in again manually in the persistent Chrome window.

**Want to use different profile**

Edit `start-persistent-chrome.sh` and change:

```bash
PROFILE_DIR="/path/to/your/profile"
```

---

## Best Practices

1. **Keep Chrome running** during your dev session
2. **Login once** at the start of your day
3. **Develop and test** as many routines as you want
4. **Stop Chrome** when done for the day

5. **Don't use for CI/CD** - this is for local development only
6. **One Chrome instance** - don't run multiple persistent instances

---

## Production Note

This workflow is for **development only**. In production, use:

- Profile persistence with saved session data
- Or automated 2FA handling
- Or database-stored sessions

See [selenium-2fa-guide.md](./selenium-2fa-guide.md) for production approaches.
