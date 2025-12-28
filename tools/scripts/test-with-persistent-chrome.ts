#!/usr/bin/env tsx

/**
 * Test script that connects to persistent Chrome instance
 *
 * Usage:
 *   1. Start persistent Chrome: ./tools/scripts/start-persistent-chrome.sh
 *   2. Run this script: tsx tools/scripts/test-with-persistent-chrome.ts
 *   3. Chrome stays open! Run again without re-authenticating
 */

import { SeleniumAutomation } from '@eafc26-kit/selenium-automation';

async function testWithPersistentChrome() {
  console.log('🔗 Connecting to persistent Chrome instance...\n');

  const automation = new SeleniumAutomation({
    debuggerAddress: 'localhost:9222', // Connect to existing Chrome
  });

  try {
    console.log('1️⃣  Connecting to Chrome on localhost:9222...');
    await automation.initialize();
    console.log('✅ Connected!\n');

    console.log('2️⃣  Checking login state...');
    const loggedIn = await automation.auth.isAlreadyLoggedIn();
    console.log(loggedIn ? '✅ Already logged in' : '❌ Not logged in\n');

    if (!loggedIn) {
      console.log('💡 Login manually in the Chrome window, then run this script again!');
      return;
    }

    console.log('3️⃣  Navigating to SBC...');
    await automation.navigation.navigateToSBC();
    console.log('✅ On SBC page\n');

    console.log('4️⃣  Getting current URL...');
    const driver = await automation.getDriver();
    const url = await driver.getCurrentUrl();
    console.log(`📍 ${url}\n`);

    console.log('✅ Test complete!\n');
    console.log('💡 Chrome will stay open. Run this script again to test more!');
  } catch (error) {
    console.error('\n❌ Error:', error);

    if (error instanceof Error && error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Make sure to start persistent Chrome first:');
      console.log('   ./tools/scripts/start-persistent-chrome.sh\n');
    }

    throw error;
  } finally {
    // Don't close the driver - we want Chrome to stay open!
    console.log('🔌 Disconnecting from Chrome (browser stays open)...');
    // We can safely exit without calling automation.close()
  }
}

testWithPersistentChrome()
  .then(() => {
    console.log('\n🎉 Done! Chrome is still running.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Failed:', error);
    process.exit(1);
  });
