/**
 * Browser test helpers for manual integration testing
 *
 * These utilities can be used in Chrome DevTools or via Selenium
 * to verify the CompanionAPI is working correctly with the real
 * EA FC Companion App.
 */

import { COMPANION_API_INJECTABLE } from '../injectable/companion-api.injectable';

/**
 * Get a script that can be pasted into Chrome DevTools to inject the API
 */
export function getDevToolsInjectionScript(): string {
  return `
// Inject CompanionAPI into the page
${COMPANION_API_INJECTABLE}

// Verify it's working
if (window.CompanionAPI && window.CompanionAPI.util.isAvailable()) {
  console.log('✅ CompanionAPI injected successfully');
  console.log('Available services:', window.CompanionAPI.util.getAvailableServices());
} else {
  console.error('❌ CompanionAPI injection failed or services not available');
}
`;
}

/**
 * Get a script that runs all debug tests and returns results
 */
export function getFullTestScript(): string {
  return `
(async function runFullTest() {
  console.log('='.repeat(50));
  console.log('CompanionAPI Full Test Suite');
  console.log('='.repeat(50));

  // Check if API needs injection
  if (!window.CompanionAPI || !window.CompanionAPI._initialized) {
    console.log('Injecting CompanionAPI...');
    ${COMPANION_API_INJECTABLE}
  }

  // Check availability
  if (!window.CompanionAPI.util.isAvailable()) {
    console.error('❌ EA services not available. Make sure you are logged in.');
    return { error: 'Services not available' };
  }

  const results = {};
  const startTime = Date.now();

  // Test 1: User Info
  console.log('\\n--- Test 1: User Info ---');
  try {
    results.user = window.CompanionAPI.user.getUser();
    console.log('✅ User:', results.user?.personaName || 'Unknown');
    console.log('   Coins:', results.user?.coins?.toLocaleString() || 0);
  } catch (e) {
    console.error('❌ User test failed:', e.message);
    results.user = { error: e.message };
  }

  // Test 2: Currencies
  console.log('\\n--- Test 2: Currencies ---');
  try {
    results.currencies = await window.CompanionAPI.user.requestCurrencies();
    console.log('✅ Currencies loaded');
  } catch (e) {
    console.error('❌ Currencies test failed:', e.message);
    results.currencies = { error: e.message };
  }

  // Test 3: SBC Sets
  console.log('\\n--- Test 3: SBC Sets ---');
  try {
    results.sbcSets = await window.CompanionAPI.sbc.requestSets();
    const count = Array.isArray(results.sbcSets) ? results.sbcSets.length : 0;
    console.log('✅ SBC Sets:', count, 'sets found');
    if (count > 0) {
      console.log('   First 3:', results.sbcSets.slice(0, 3).map(s => s.name).join(', '));
    }
  } catch (e) {
    console.error('❌ SBC Sets test failed:', e.message);
    results.sbcSets = { error: e.message };
  }

  // Test 4: Club Stats
  console.log('\\n--- Test 4: Club Stats ---');
  try {
    results.clubStats = await window.CompanionAPI.club.getStats();
    console.log('✅ Club Stats loaded');
    console.log('   Players:', results.clubStats?.players || 0);
  } catch (e) {
    console.error('❌ Club Stats test failed:', e.message);
    results.clubStats = { error: e.message };
  }

  // Test 5: Transfer List
  console.log('\\n--- Test 5: Transfer List ---');
  try {
    results.transferList = await window.CompanionAPI.item.requestTransferItems();
    const items = results.transferList?.items || results.transferList || [];
    const count = Array.isArray(items) ? items.length : 0;
    console.log('✅ Transfer List:', count, 'items');
  } catch (e) {
    console.error('❌ Transfer List test failed:', e.message);
    results.transferList = { error: e.message };
  }

  // Test 6: Unassigned Items
  console.log('\\n--- Test 6: Unassigned Items ---');
  try {
    results.unassigned = await window.CompanionAPI.item.requestUnassignedItems();
    const items = results.unassigned?.itemData || results.unassigned || [];
    const count = Array.isArray(items) ? items.length : 0;
    console.log('✅ Unassigned Items:', count, 'items');
  } catch (e) {
    console.error('❌ Unassigned Items test failed:', e.message);
    results.unassigned = { error: e.message };
  }

  // Summary
  const endTime = Date.now();
  console.log('\\n' + '='.repeat(50));
  console.log('Test completed in', endTime - startTime, 'ms');
  console.log('='.repeat(50));

  return results;
})();
`;
}

/**
 * Get a script for testing a specific service method
 */
export function getMethodTestScript(
  namespace: string,
  method: string,
  args: unknown[] = []
): string {
  const argsJson = JSON.stringify(args);

  return `
(async function testMethod() {
  if (!window.CompanionAPI || !window.CompanionAPI._initialized) {
    console.error('CompanionAPI not initialized');
    return { error: 'Not initialized' };
  }

  console.log('Testing: CompanionAPI.${namespace}.${method}');
  console.log('Args:', ${argsJson});

  try {
    const startTime = Date.now();
    const result = await window.CompanionAPI['${namespace}']['${method}'].apply(null, ${argsJson});
    const endTime = Date.now();

    console.log('✅ Success in', endTime - startTime, 'ms');
    console.log('Result:', result);
    return { success: true, data: result, time: endTime - startTime };
  } catch (e) {
    console.error('❌ Failed:', e.message);
    return { success: false, error: e.message };
  }
})();
`;
}

/**
 * Get a script that logs the raw services object structure
 */
export function getServicesInspectionScript(): string {
  return `
(function inspectServices() {
  if (!window.services) {
    console.error('window.services not available');
    return null;
  }

  const structure = {};

  for (const serviceName in window.services) {
    if (window.services.hasOwnProperty(serviceName)) {
      const service = window.services[serviceName];
      if (typeof service === 'object' && service !== null) {
        structure[serviceName] = {
          type: 'object',
          methods: Object.keys(service).filter(k => typeof service[k] === 'function'),
          properties: Object.keys(service).filter(k => typeof service[k] !== 'function'),
        };
      } else {
        structure[serviceName] = typeof service;
      }
    }
  }

  console.log('EA Services Structure:');
  console.log(JSON.stringify(structure, null, 2));
  return structure;
})();
`;
}

/**
 * Console colors for browser logging
 */
export const consoleStyles = {
  success: 'color: green; font-weight: bold;',
  error: 'color: red; font-weight: bold;',
  info: 'color: blue; font-weight: bold;',
  warning: 'color: orange; font-weight: bold;',
  header: 'color: purple; font-weight: bold; font-size: 14px;',
};

/**
 * Export helpers object for easy import
 */
export const browserTestHelpers = {
  getDevToolsInjectionScript,
  getFullTestScript,
  getMethodTestScript,
  getServicesInspectionScript,
  consoleStyles,
};
