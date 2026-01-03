/**
 * Mock exports
 */

// Mock services
export {
  createMockServices,
  createMockObservable,
  installMockServices,
  MockServices,
  MockSBCService,
  MockItemService,
  MockClubService,
  MockUserService,
  MockStoreService,
  MockChemistryService,
  MockNotificationService,
  MockLocalizationService,
  MockObservable,
} from './services.mock';

// SBC fixtures
export {
  mockDailySBCSet,
  mockPromoSBCSet,
  mockSBCChallenge,
  mockCompletedChallenge,
  mockSBCSquad,
  mockSBCSets,
} from './fixtures/sbc-sets.fixture';

// Player fixtures
export {
  createMockPlayer,
  createMockAuctionItem,
  mockGoldPlayer,
  mockSilverPlayer,
  mockBronzePlayer,
  mockSpecialPlayer,
  mockUntradeablePlayer,
  mockStoragePlayer,
  mockPlayers,
  mockTransferListItems,
  mockWatchedItems,
} from './fixtures/players.fixture';

// User fixtures
export {
  mockUserProfile,
  mockUserCurrencies,
  mockRichUserCurrencies,
  mockPoorUserCurrencies,
  mockClubInfo,
  mockClubStats,
  mockEmptyClubStats,
  mockFullClubStats,
} from './fixtures/user.fixture';
