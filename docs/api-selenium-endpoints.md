# API Selenium Endpoints

The API provides HTTP endpoints to control Selenium automation.

## Base URL

```
http://localhost:3001
```

## Endpoints

### GET /selenium/status

Check Selenium status and login state.

**Response:**

```json
{
  "ready": true,
  "loggedIn": true,
  "currentUrl": "https://www.ea.com/fifa/ultimate-team/web-app/",
  "timestamp": "2025-12-27T..."
}
```

**Example:**

```bash
curl http://localhost:3001/selenium/status
```

---

### POST /selenium/login

Login to EA FC Companion App.

**Request Body (optional):**

```json
{
  "email": "your-email@example.com",
  "password": "your-password"
}
```

If not provided, uses `EA_FC_EMAIL` and `EA_FC_PASSWORD` from environment.

**Response:**

```json
{
  "success": true,
  "message": "Login successful"
}
```

**Example:**

```bash
# Using env vars
curl -X POST http://localhost:3001/selenium/login

# With credentials
curl -X POST http://localhost:3001/selenium/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123"}'
```

---

### POST /selenium/navigate/sbc

Navigate to SBC section.

**Response:**

```json
{
  "success": true,
  "message": "Navigated to SBC section"
}
```

**Example:**

```bash
curl -X POST http://localhost:3001/selenium/navigate/sbc
```

---

### GET /selenium/url

Get current browser URL.

**Response:**

```json
{
  "url": "https://www.ea.com/fifa/ultimate-team/web-app/"
}
```

**Example:**

```bash
curl http://localhost:3001/selenium/url
```

---

## Usage Workflows

### Workflow 1: With Persistent Chrome (Recommended)

```bash
# 1. Start persistent Chrome
./tools/scripts/start-persistent-chrome.sh

# 2. Login manually in the browser

# 3. Start API with persistent Chrome connection
SELENIUM_DEBUGGER_ADDRESS=localhost:9222 npm run dev:api

# 4. Test endpoints
curl http://localhost:3001/selenium/status
# {"ready":true,"loggedIn":true,...}

curl -X POST http://localhost:3001/selenium/navigate/sbc
# {"success":true,"message":"Navigated to SBC section"}
```

### Workflow 2: With Profile Persistence

```bash
# 1. Start API
npm run dev:api

# 2. Trigger login via API
curl -X POST http://localhost:3001/selenium/login

# 3. Complete 2FA manually if prompted

# 4. Test endpoints
curl http://localhost:3001/selenium/status
curl -X POST http://localhost:3001/selenium/navigate/sbc
```

---

## Environment Variables

Add to `.env`:

```bash
# Required
EA_FC_EMAIL=your-email@example.com
EA_FC_PASSWORD=your-password

# Optional - Use persistent Chrome (recommended for dev)
SELENIUM_DEBUGGER_ADDRESS=localhost:9222

# Optional - Profile directory
SELENIUM_CHROME_PROFILE_DIR=/tmp/eafc26-selenium-profile

# Optional - Run headless
SELENIUM_HEADLESS=false
```

---

## Testing with HTTPie

```bash
# Install HTTPie (optional)
brew install httpie

# Test endpoints
http :3001/selenium/status
http POST :3001/selenium/login
http POST :3001/selenium/navigate/sbc
http :3001/selenium/url
```

---

## Complete Test Flow

```bash
# Start persistent Chrome
./tools/scripts/start-persistent-chrome.sh

# Login manually in Chrome window

# Start API (in another terminal)
SELENIUM_DEBUGGER_ADDRESS=localhost:9222 npm run dev:api

# Test the workflow
curl http://localhost:3001/selenium/status
# Should show: "loggedIn": true

curl -X POST http://localhost:3001/selenium/navigate/sbc
# Should show: "success": true

curl http://localhost:3001/selenium/url
# Should show SBC URL
```

---

## Error Handling

**Not logged in:**

```json
{
  "ready": true,
  "loggedIn": false,
  "currentUrl": "...",
  "timestamp": "..."
}
```

**Login failed:**

```json
{
  "success": false,
  "message": "Login verification failed"
}
```

**Navigation failed:**

```json
{
  "success": false,
  "message": "Expected to be on SBC page but title is: ..."
}
```
