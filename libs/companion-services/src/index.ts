/**
 * companion-services - EA FC Companion App Services Library
 *
 * This library provides TypeScript wrappers for the EA FC Companion App's
 * JavaScript services object. It can be injected into the browser via
 * Selenium to enable direct API calls instead of UI-based interactions.
 *
 * @example
 * ```typescript
 * import { CompanionServicesDriver } from '@eafc26-kit/companion-services';
 *
 * const companionApi = new CompanionServicesDriver(seleniumDriver);
 * await companionApi.initialize();
 *
 * const sbcSets = await companionApi.requestSBCSets();
 * console.log('Available SBCs:', sbcSets.data);
 * ```
 */

// Types
export * from './lib/types';

// Driver (Selenium integration)
export { CompanionServicesDriver, AvailableServices } from './lib/driver';
export { ScriptBuilder } from './lib/driver';

// Injectable script
export { COMPANION_API_INJECTABLE, getInjectableScript } from './lib/injectable';

// Mocks (for testing)
export {
  createMockServices,
  createMockObservable,
  installMockServices,
  // SBC fixtures
  mockDailySBCSet,
  mockPromoSBCSet,
  mockSBCChallenge,
  mockCompletedChallenge,
  mockSBCSquad,
  mockSBCSets,
  // Player fixtures
  createMockPlayer,
  createMockAuctionItem,
  mockGoldPlayer,
  mockSilverPlayer,
  mockBronzePlayer,
  mockSpecialPlayer,
  mockPlayers,
  mockTransferListItems,
  mockWatchedItems,
  // User fixtures
  mockUserProfile,
  mockUserCurrencies,
  mockClubStats,
} from './lib/mocks';

// Testing utilities
export {
  getDevToolsInjectionScript,
  getFullTestScript,
  getMethodTestScript,
  getServicesInspectionScript,
  browserTestHelpers,
} from './lib/testing';
