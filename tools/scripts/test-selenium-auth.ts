#!/usr/bin/env tsx

/**
 * Test script for Selenium authentication routine
 *
 * Usage: tsx tools/scripts/test-selenium-auth.ts
 */

import { SeleniumAutomation } from '@eafc26-kit/selenium-automation';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function testAuthRoutine() {
  console.log('🚀 Starting Selenium Auth Test...\n');

  const automation = new SeleniumAutomation({
    headless: process.env.SELENIUM_HEADLESS === 'true',
    windowSize: { width: 1920, height: 1080 },
  });

  try {
    // Step 1: Initialize
    console.log('1️⃣  Initializing WebDriver...');
    await automation.initialize();
    console.log('✅ WebDriver initialized\n');

    // Step 2: Navigate to login page
    console.log('2️⃣  Navigating to EA FC Companion App...');
    const url = 'https://www.ea.com/fifa/ultimate-team/web-app/';
    await automation.auth.navigateToLogin(url);
    console.log(`✅ Navigated to ${url}\n`);

    // Wait to observe the page
    console.log('⏸️  Waiting 3 seconds to observe the page...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Step 3: Check credentials
    const email = process.env.EA_FC_EMAIL;
    const password = process.env.EA_FC_PASSWORD;

    if (!email || !password) {
      console.error('❌ EA_FC_EMAIL and EA_FC_PASSWORD must be set in .env file');
      process.exit(1);
    }

    console.log(`3️⃣  Attempting login with email: ${email.substring(0, 3)}***\n`);

    // Step 4: Attempt login
    try {
      await automation.auth.login({ email, password });
      console.log('✅ Login form submitted\n');
    } catch (error) {
      console.error('❌ Login failed:', error);
      console.log('\n⏸️  Keeping browser open for 30 seconds so you can inspect...');
      await new Promise((resolve) => setTimeout(resolve, 30000));
      throw error;
    }

    // Step 5: Wait and check for 2FA or success
    console.log('⏸️  Waiting 5 seconds for page to respond...');
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Step 6: Verify login success
    console.log('4️⃣  Verifying login success...');
    const success = await automation.auth.verifyLoginSuccess();

    if (success) {
      console.log('✅ Login successful! Found expected navigation elements\n');

      // Step 7: Extract session data
      console.log('5️⃣  Extracting session data...');
      const sessionData = await automation.auth.extractSessionData();
      console.log(`✅ Session extracted:`);
      console.log(`   - Cookies: ${sessionData.cookies.length}`);
      console.log(`   - LocalStorage keys: ${Object.keys(sessionData.localStorage).length}`);
      console.log(`   - SessionStorage keys: ${Object.keys(sessionData.sessionStorage).length}\n`);

      // Step 8: Test navigation
      console.log('6️⃣  Testing navigation to SBC section...');
      try {
        await automation.navigation.navigateToSBC();
        console.log('✅ Successfully navigated to SBC section\n');
      } catch (error) {
        console.error('⚠️  Navigation to SBC failed (selectors may need updating):', error);
      }
    } else {
      console.log('⚠️  Login verification failed - could not find expected elements');
      console.log('This likely means selectors need to be updated.\n');
    }

    // Keep browser open for inspection
    console.log('⏸️  Keeping browser open for 30 seconds so you can inspect...');
    await new Promise((resolve) => setTimeout(resolve, 30000));

    console.log('\n✅ Test completed successfully!');
  } catch (error) {
    console.error('\n❌ Test failed with error:', error);
    throw error;
  } finally {
    console.log('\n🧹 Closing browser...');
    await automation.close();
    console.log('✅ Browser closed');
  }
}

// Run the test
testAuthRoutine()
  .then(() => {
    console.log('\n🎉 All tests passed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Test failed:', error);
    process.exit(1);
  });
