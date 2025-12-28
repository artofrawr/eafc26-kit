#!/usr/bin/env tsx

/**
 * Test EA FC authentication using a Chrome user profile
 * This allows session persistence across runs (no repeated login)
 */

import { SeleniumAutomation } from '@eafc26-kit/selenium-automation';
import * as path from 'path';
import * as os from 'os';

async function testWithProfile() {
  console.log('🚀 Testing EA FC Auth with Chrome Profile\n');

  // Use a dedicated Chrome profile for Selenium
  // This keeps your session separate from your main Chrome profile
  const userDataDir = path.join(os.tmpdir(), 'selenium-chrome-profile');

  console.log(`📁 Using Chrome profile: ${userDataDir}\n`);

  const automation = new SeleniumAutomation({
    headless: false,
    userDataDir: userDataDir,
    profileDirectory: 'Default', // Use the default profile
    windowSize: { width: 1920, height: 1080 },
  });

  try {
    console.log('1️⃣  Initializing WebDriver with persistent profile...');
    await automation.initialize();
    console.log('✅ WebDriver initialized\n');

    console.log('2️⃣  Navigating to EA FC Companion App...');
    await automation.auth.navigateToLogin();
    console.log('✅ Navigated\n');

    // Check if already logged in
    console.log('3️⃣  Checking login state...');
    const alreadyLoggedIn = await automation.auth.isAlreadyLoggedIn();

    if (alreadyLoggedIn) {
      console.log('✅ Already logged in! (Session persisted from previous run)\n');
    } else {
      console.log('❌ Not logged in yet\n');

      console.log('═══════════════════════════════════════════════════════════');
      console.log('👤 MANUAL LOGIN REQUIRED');
      console.log('═══════════════════════════════════════════════════════════');
      console.log('');
      console.log('Please log in manually in the browser:');
      console.log('1. Enter your email and password');
      console.log('2. Complete 2FA verification if prompted');
      console.log('3. Wait for the main app to load (tab bar appears)');
      console.log('');
      console.log('The session will be saved for future runs!');
      console.log('');
      console.log('⏸️  Waiting up to 3 minutes for manual login...');
      console.log('═══════════════════════════════════════════════════════════\n');

      // Wait for manual login (check every 5 seconds)
      const maxWait = 180000; // 3 minutes
      const checkInterval = 5000;
      const startTime = Date.now();

      while (Date.now() - startTime < maxWait) {
        await new Promise((resolve) => setTimeout(resolve, checkInterval));

        const loggedIn = await automation.auth.isAlreadyLoggedIn();
        if (loggedIn) {
          console.log('\n✅ Login detected! Session saved.\n');
          break;
        }

        const elapsed = Math.round((Date.now() - startTime) / 1000);
        console.log(`⏳ Still waiting... (${elapsed}s elapsed)`);
      }
    }

    // Verify final state
    console.log('4️⃣  Verifying login state...');
    const success = await automation.auth.verifyLoginSuccess();

    if (success) {
      console.log('✅ Login successful!\n');

      // Extract and display session info
      console.log('5️⃣  Extracting session data...');
      const sessionData = await automation.auth.extractSessionData();
      console.log(`✅ Session data:`);
      console.log(`   - Cookies: ${sessionData.cookies.length}`);
      console.log(`   - LocalStorage keys: ${Object.keys(sessionData.localStorage).length}`);
      console.log(`   - SessionStorage keys: ${Object.keys(sessionData.sessionStorage).length}\n`);

      console.log('💾 Session is now saved in Chrome profile!');
      console.log("   Next time you run this script, you'll be logged in automatically.\n");
    } else {
      console.log('⚠️  Login verification failed\n');
    }

    // Pause to let user verify
    console.log('⏸️  Keeping browser open for 20 seconds...');
    await new Promise((resolve) => setTimeout(resolve, 20000));
  } catch (error) {
    console.error('\n❌ Error:', error);
    throw error;
  } finally {
    console.log('\n🧹 Closing browser...');
    await automation.close();
    console.log('✅ Browser closed');
    console.log(`\n💡 Profile saved at: ${userDataDir}`);
  }
}

testWithProfile()
  .then(() => {
    console.log('\n🎉 Test completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Test failed:', error);
    process.exit(1);
  });
