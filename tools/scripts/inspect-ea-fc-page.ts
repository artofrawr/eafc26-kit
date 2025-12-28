#!/usr/bin/env tsx

/**
 * Script to open EA FC page and pause for inspection
 *
 * Usage: tsx tools/scripts/inspect-ea-fc-page.ts
 */

import { DriverService } from '@eafc26-kit/selenium-automation';

async function inspectPage() {
  console.log('🚀 Opening EA FC Companion App for inspection...\n');

  const driverService = new DriverService({
    headless: false,
    windowSize: { width: 1920, height: 1080 },
  });

  try {
    // Initialize
    console.log('1️⃣  Initializing WebDriver...');
    const driver = await driverService.initialize();
    console.log('✅ WebDriver initialized\n');

    // Navigate
    const url = 'https://www.ea.com/fifa/ultimate-team/web-app/';
    console.log(`2️⃣  Navigating to ${url}...`);
    await driver.get(url);
    console.log('✅ Page loaded\n');

    // Pause for inspection
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('🔍 INSPECTION MODE');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('');
    console.log('The browser window is now open. Use Chrome DevTools to inspect:');
    console.log('');
    console.log('📋 Steps to find selectors:');
    console.log('1. Right-click on login elements → Inspect');
    console.log('2. Look for:');
    console.log('   - Email input field (look for id, name, class)');
    console.log('   - Password input field');
    console.log('   - Login/Submit button');
    console.log('   - Form wrapper');
    console.log('');
    console.log('3. In DevTools Console, test selectors:');
    console.log('   document.querySelector("#your-selector")');
    console.log('');
    console.log('4. Write down the working selectors for:');
    console.log('   - emailInput');
    console.log('   - passwordInput');
    console.log('   - submitButton');
    console.log('   - loginForm (container)');
    console.log('');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('');
    console.log('⏸️  Pausing for 5 minutes... Press Ctrl+C to exit early.');
    console.log('');

    // Wait 5 minutes
    await new Promise((resolve) => setTimeout(resolve, 300000));

    console.log('\n✅ Inspection complete!');
  } catch (error) {
    console.error('\n❌ Error:', error);
    throw error;
  } finally {
    console.log('\n🧹 Closing browser...');
    await driverService.close();
    console.log('✅ Browser closed');
  }
}

// Run
inspectPage()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Failed:', error);
    process.exit(1);
  });
