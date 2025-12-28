#!/usr/bin/env tsx

/**
 * Test EA FC authentication with interactive 2FA prompt
 * Automates login but asks you to enter 2FA code when needed
 */

import { SeleniumAutomation } from '@eafc26-kit/selenium-automation';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as readline from 'readline';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/**
 * Prompt user for 2FA code via terminal
 */
async function prompt2FACode(): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question('\n🔐 Enter 2FA code: ', (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function testWithInteractive2FA() {
  console.log('🚀 Testing EA FC Auth with Interactive 2FA\n');

  const automation = new SeleniumAutomation({
    headless: false,
    windowSize: { width: 1920, height: 1080 },
  });

  try {
    console.log('1️⃣  Initializing WebDriver...');
    await automation.initialize();
    console.log('✅ WebDriver initialized\n');

    console.log('2️⃣  Navigating to EA FC...');
    await automation.auth.navigateToLogin();
    console.log('✅ Navigated\n');

    // Check credentials
    const email = process.env.EA_FC_EMAIL;
    const password = process.env.EA_FC_PASSWORD;

    if (!email || !password) {
      throw new Error('EA_FC_EMAIL and EA_FC_PASSWORD must be set in .env');
    }

    console.log(`3️⃣  Logging in as: ${email.substring(0, 3)}***\n`);

    // Login with 2FA handler
    const sessionData = await automation.auth.loginWithRetry(
      { email, password },
      prompt2FACode // This function will be called if 2FA is detected
    );

    console.log('\n✅ Login successful!\n');

    console.log('📊 Session Data:');
    console.log(`   - Cookies: ${sessionData.cookies.length}`);
    console.log(`   - LocalStorage keys: ${Object.keys(sessionData.localStorage).length}`);
    console.log(`   - SessionStorage keys: ${Object.keys(sessionData.sessionStorage).length}\n`);

    // Verify
    const verified = await automation.auth.verifyLoginSuccess();
    console.log(verified ? '✅ Login verified' : '⚠️  Login verification failed');

    // Pause
    console.log('\n⏸️  Keeping browser open for 15 seconds...');
    await new Promise((resolve) => setTimeout(resolve, 15000));
  } catch (error) {
    console.error('\n❌ Error:', error);
    throw error;
  } finally {
    console.log('\n🧹 Closing browser...');
    await automation.close();
    console.log('✅ Browser closed');
  }
}

testWithInteractive2FA()
  .then(() => {
    console.log('\n🎉 Test completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Test failed:', error);
    process.exit(1);
  });
