# Handling 2FA with Selenium Automation

EA FC Companion App requires two-factor authentication. This guide shows the two recommended approaches for handling 2FA.

## Approach 1: Chrome User Profile (Recommended for Development)

**Best for:** Development, testing, personal use

### How It Works

- Selenium uses a persistent Chrome profile
- Login once manually (including 2FA)
- Session persists across runs
- No need to handle 2FA repeatedly

### Setup

```typescript
import { SeleniumAutomation } from '@eafc26-kit/selenium-automation';
import * as path from 'path';
import * as os from 'os';

const automation = new SeleniumAutomation({
  headless: false,
  userDataDir: path.join(os.tmpdir(), 'selenium-chrome-profile'),
  profileDirectory: 'Default',
});

await automation.initialize();
await automation.auth.navigateToLogin();

// Check if already logged in
const loggedIn = await automation.auth.isAlreadyLoggedIn();

if (!loggedIn) {
  // First time: log in manually (including 2FA)
  console.log('Please log in manually in the browser...');
  // Wait for user to complete login
}

// Future runs: already logged in automatically!
```

### Quick Start Script

```bash
# Run this script - it will prompt you to log in manually the first time
npx tsx tools/scripts/test-auth-with-profile.ts

# Subsequent runs: automatically logged in!
```

### Pros & Cons

✅ **Pros:**

- Simple and reliable
- No code changes needed for 2FA
- Session persists between runs
- Can use any 2FA method (email, authenticator app, etc.)

❌ **Cons:**

- Requires manual login on first run
- Profile data stored on disk
- Not suitable for production/automated environments

---

## Approach 2: Interactive 2FA Prompt

**Best for:** Scripts that need some automation but can prompt user

### How It Works

- Automation handles login form
- Pauses to prompt user for 2FA code
- User enters code via terminal or UI
- Automation completes login

### Setup

```typescript
import { SeleniumAutomation } from '@eafc26-kit/selenium-automation';
import * as readline from 'readline';

// Function to prompt user for 2FA code
async function prompt2FACode(): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question('Enter 2FA code: ', (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// Use in login flow
const automation = new SeleniumAutomation({ headless: false });
await automation.initialize();

const sessionData = await automation.auth.loginWithRetry(
  {
    email: process.env.EA_FC_EMAIL!,
    password: process.env.EA_FC_PASSWORD!,
  },
  prompt2FACode // Called if 2FA is detected
);
```

### Quick Start Script

```bash
npx tsx tools/scripts/test-auth-with-2fa-prompt.ts
# Will prompt: "Enter 2FA code: _"
```

### Pros & Cons

✅ **Pros:**

- More automated than full manual login
- Works in any environment
- User controls 2FA method

❌ **Cons:**

- Requires user interaction every time
- Not fully automated
- Terminal prompt might not be ideal for UI apps

---

## Approach 3: Combine Both (Best of Both Worlds)

Use profile persistence AND interactive 2FA:

```typescript
const automation = new SeleniumAutomation({
  headless: false,
  userDataDir: '/path/to/profile', // Session persistence
});

await automation.initialize();
await automation.auth.navigateToLogin();

const loggedIn = await automation.auth.isAlreadyLoggedIn();

if (!loggedIn) {
  // Login with 2FA prompt
  await automation.auth.loginWithRetry({ email, password }, prompt2FACode);
}

// Session saved! Next time: auto-logged in
```

This approach:

- ✅ Fully automated after first run
- ✅ Only prompts for 2FA on first login
- ✅ Best for development workflows

---

## Production Considerations

For production/CI environments where no user interaction is possible:

### Option A: Store Session Data in Database

```typescript
// After successful login
const sessionData = await automation.auth.extractSessionData();
await db.saveSession(sessionData);

// On subsequent runs
const sessionData = await db.getSession();
if (sessionData) {
  await automation.auth.restoreSessionData(sessionData);
}
```

### Option B: Use API-Based Authentication

If EA provides an API with token-based auth, use that instead of web scraping.

### Option C: Accept Manual Intervention

Keep a long-lived session and notify admins when re-auth is needed.

---

## Testing Your Setup

1. **Test with profile persistence:**

   ```bash
   npx tsx tools/scripts/test-auth-with-profile.ts
   ```

2. **Test with interactive 2FA:**

   ```bash
   npx tsx tools/scripts/test-auth-with-2fa-prompt.ts
   ```

3. **Verify session persistence:**
   - Run the profile script twice
   - First run: log in manually
   - Second run: should auto-login (no 2FA)

---

## Troubleshooting

**"Session doesn't persist between runs"**

- Check that `userDataDir` path is writable
- Ensure you're using the same profile directory
- Try using an absolute path instead of temp directory

**"2FA prompt never appears"**

- Check that `handle2FA()` is being called
- Verify 2FA selectors are correct
- EA might have changed their 2FA flow

**"Browser crashes with profile"**

- Don't use your main Chrome profile directory
- Create a dedicated directory for Selenium
- Close any manually-opened Chrome instances using that profile

---

## Recommended Setup for This Project

For development with this EAFC26 Kit:

```typescript
// apps/api/src/selenium/selenium.service.ts
const profileDir =
  process.env.SELENIUM_CHROME_PROFILE_DIR || path.join(os.tmpdir(), 'eafc26-selenium-profile');

const automation = new SeleniumAutomation({
  headless: process.env.SELENIUM_HEADLESS === 'true',
  userDataDir: profileDir,
  profileDirectory: 'Default',
});
```

Add to `.env`:

```bash
SELENIUM_CHROME_PROFILE_DIR=/Users/yourname/.eafc26-selenium-profile
```

**First run:** Log in manually (including 2FA)
**All subsequent runs:** Automatically logged in ✨
