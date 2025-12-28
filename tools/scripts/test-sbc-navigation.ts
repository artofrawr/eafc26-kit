#!/usr/bin/env tsx

/**
 * Test SBC navigation with persisted session
 */

import { SeleniumAutomation } from '@eafc26-kit/selenium-automation';
import * as path from 'path';
import * as os from 'os';

async function testSbcNavigation() {
  console.log('🚀 Testing SBC Navigation\n');

  const userDataDir = path.join(os.tmpdir(), 'selenium-chrome-profile');
  console.log(`📁 Using Chrome profile: ${userDataDir}\n`);

  const automation = new SeleniumAutomation({
    headless: false,
    userDataDir: userDataDir,
    profileDirectory: 'Default',
    windowSize: { width: 1920, height: 1080 },
  });

  try {
    console.log('1️⃣  Initializing WebDriver...');
    await automation.initialize();
    console.log('✅ WebDriver initialized\n');

    console.log('2️⃣  Navigating to EA FC...');
    await automation.auth.navigateToLogin();
    console.log('✅ Navigated\n');

    console.log('3️⃣  Checking login state...');
    const loggedIn = await automation.auth.isAlreadyLoggedIn();

    if (!loggedIn) {
      console.log('❌ Not logged in. Please run test-auth-with-profile.ts first.');
      return;
    }
    console.log('✅ Already logged in\n');

    console.log('4️⃣  Navigating to SBC section...');
    await automation.navigation.navigateToSBC();
    console.log('✅ Clicked SBC tab\n');

    console.log('5️⃣  Verifying navigation...');
    const driver = await automation.getDriver();
    const currentUrl = await driver.getCurrentUrl();
    console.log(`📍 Current URL: ${currentUrl}\n`);

    // Check if we're on SBC page
    if (currentUrl.includes('sbc') || currentUrl.includes('squad-building')) {
      console.log('✅ Successfully navigated to SBC section!\n');
    } else {
      console.log('⚠️  URL doesn\'t contain "sbc" - verify navigation worked\n');
    }

    console.log('⏸️  Keeping browser open for 30 seconds to inspect...');
    await new Promise((resolve) => setTimeout(resolve, 30000));
  } catch (error) {
    console.error('\n❌ Error:', error);
    throw error;
  } finally {
    console.log('\n🧹 Closing browser...');
    await automation.close();
    console.log('✅ Browser closed');
  }
}

testSbcNavigation()
  .then(() => {
    console.log('\n🎉 Navigation test completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Test failed:', error);
    process.exit(1);
  });
