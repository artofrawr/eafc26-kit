/**
 * Mock EA services object for unit testing
 *
 * This creates a mock version of the window.services object that
 * mimics EA's Observable pattern for testing without a browser.
 *
 * Note: This file uses generic mock types that work with any test framework.
 * When using with Jest, the mocks are automatically compatible with jest.fn().
 */

import { SBCSet, SBCChallenge } from '../types/sbc.types';
import { TransferItem } from '../types/item.types';
import { ClubStats } from '../types/club.types';
import { UserProfile, UserCurrencies } from '../types/user.types';
import { Pack } from '../types/store.types';

/**
 * Observable callback type matching EA's pattern
 */
type ObserveCallback<T> = (sender: unknown, response: T) => void;

/**
 * Generic mock function type (compatible with jest.fn())
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MockFn<T = any> = ((...args: any[]) => T) & {
  mockReturnValue?: (value: T) => MockFn<T>;
  mockResolvedValue?: (value: T) => MockFn<T>;
  mock?: { calls: unknown[][] };
};

/**
 * Mock observable that can be configured to succeed or fail
 */
export interface MockObservable<T> {
  observe: MockFn<void>;
  _resolve: (data: T) => void;
  _reject: (error: { code: string; message: string }) => void;
}

/**
 * Create a mock observable with configurable success/failure
 */
export function createMockObservable<T>(defaultData?: T): MockObservable<T> {
  let storedCallback: ObserveCallback<T> | null = null;

  const observeFn: MockFn<void> = ((sender: unknown, callback: ObserveCallback<T>) => {
    storedCallback = callback;
    // Auto-resolve with default data if provided
    if (defaultData !== undefined) {
      setTimeout(() => {
        callback(sender, { success: true, data: defaultData } as T);
      }, 0);
    }
  }) as MockFn<void>;

  // Add mock tracking if available (for Jest compatibility)
  observeFn.mock = { calls: [] };

  const observable: MockObservable<T> = {
    observe: observeFn,
    _resolve: (data: T) => {
      if (storedCallback) {
        storedCallback(null, { success: true, data } as T);
      }
    },
    _reject: (error: { code: string; message: string }) => {
      if (storedCallback) {
        storedCallback(null, { success: false, error } as unknown as T);
      }
    },
  };

  return observable;
}

/**
 * Create a simple mock function
 */
function createMockFn<T>(returnValue?: T): MockFn<T> {
  const fn = ((..._args: unknown[]) => returnValue) as MockFn<T>;
  fn.mock = { calls: [] };
  fn.mockReturnValue = (value: T) => {
    return createMockFn(value);
  };
  return fn;
}

/**
 * Mock SBC service
 */
export interface MockSBCService {
  requestSets: MockFn<MockObservable<SBCSet[]>>;
  requestChallengesForSet: MockFn<MockObservable<SBCChallenge[]>>;
  loadChallenge: MockFn<MockObservable<SBCChallenge>>;
  saveChallenge: MockFn<MockObservable<void>>;
  submitChallenge: MockFn<MockObservable<unknown>>;
  getCachedSBCSquads: MockFn<unknown[]>;
  repository: {
    reset: MockFn<void>;
    getSets: MockFn<SBCSet[]>;
  };
}

/**
 * Mock Item service
 */
export interface MockItemService {
  searchTransferMarket: MockFn<MockObservable<TransferItem[]>>;
  bid: MockFn<MockObservable<TransferItem>>;
  list: MockFn<MockObservable<TransferItem>>;
  move: MockFn<MockObservable<void>>;
  requestTransferItems: MockFn<MockObservable<TransferItem[]>>;
  requestWatchedItems: MockFn<MockObservable<TransferItem[]>>;
  refreshAuctions: MockFn<MockObservable<TransferItem[]>>;
  relistExpiredAuctions: MockFn<MockObservable<void>>;
  untarget: MockFn<void>;
  requestMarketData: MockFn<MockObservable<unknown>>;
  requestUnassignedItems: MockFn<MockObservable<TransferItem[]>>;
  searchStorageItems: MockFn<MockObservable<TransferItem[]>>;
  discard: MockFn<MockObservable<{ coins: number }>>;
  clearTransferMarketCache: MockFn<void>;
}

/**
 * Mock Club service
 */
export interface MockClubService {
  search: MockFn<MockObservable<TransferItem[]>>;
  getStats: MockFn<MockObservable<ClubStats>>;
  clubDao: {
    resetStatsCache: MockFn<void>;
  };
}

/**
 * Mock User service
 */
export interface MockUserService {
  getUser: MockFn<UserProfile>;
  requestCurrencies: MockFn<MockObservable<UserCurrencies>>;
}

/**
 * Mock Store service
 */
export interface MockStoreService {
  getPacks: MockFn<MockObservable<Pack[]>>;
}

/**
 * Mock Chemistry service
 */
export interface MockChemistryService {
  requestChemistryProfiles: MockFn<MockObservable<unknown>>;
  isFeatureEnabled: MockFn<boolean>;
  resetCustomProfiles: MockFn<void>;
}

/**
 * Mock Notification service
 */
export interface MockNotificationService {
  queue: MockFn<void>;
}

/**
 * Mock Localization service
 */
export interface MockLocalizationService {
  localize: MockFn<string>;
  locale: { language: string };
}

/**
 * Full mock services object
 */
export interface MockServices {
  SBC: MockSBCService;
  Item: MockItemService;
  Club: MockClubService;
  User: MockUserService;
  Store: MockStoreService;
  Chemistry: MockChemistryService;
  Notification: MockNotificationService;
  Localization: MockLocalizationService;
}

/**
 * Create a full mock services object for testing
 */
export function createMockServices(): MockServices {
  const mockUser: UserProfile = {
    personaId: 12345,
    personaName: 'TestUser',
    club: {
      name: 'Test FC',
      abbreviation: 'TFC',
      established: 2020,
    },
    currencies: {
      coins: 100000,
      points: 500,
    },
    platform: 'pc' as const,
  };

  return {
    SBC: {
      requestSets: createMockFn(createMockObservable<SBCSet[]>([])),
      requestChallengesForSet: createMockFn(createMockObservable<SBCChallenge[]>([])),
      loadChallenge: createMockFn(createMockObservable<SBCChallenge>()),
      saveChallenge: createMockFn(createMockObservable<void>()),
      submitChallenge: createMockFn(createMockObservable<unknown>()),
      getCachedSBCSquads: createMockFn<unknown[]>([]),
      repository: {
        reset: createMockFn(),
        getSets: createMockFn<SBCSet[]>([]),
      },
    },
    Item: {
      searchTransferMarket: createMockFn(createMockObservable<TransferItem[]>([])),
      bid: createMockFn(createMockObservable<TransferItem>()),
      list: createMockFn(createMockObservable<TransferItem>()),
      move: createMockFn(createMockObservable<void>()),
      requestTransferItems: createMockFn(createMockObservable<TransferItem[]>([])),
      requestWatchedItems: createMockFn(createMockObservable<TransferItem[]>([])),
      refreshAuctions: createMockFn(createMockObservable<TransferItem[]>([])),
      relistExpiredAuctions: createMockFn(createMockObservable<void>()),
      untarget: createMockFn(),
      requestMarketData: createMockFn(createMockObservable<unknown>()),
      requestUnassignedItems: createMockFn(createMockObservable<TransferItem[]>([])),
      searchStorageItems: createMockFn(createMockObservable<TransferItem[]>([])),
      discard: createMockFn(createMockObservable<{ coins: number }>({ coins: 0 })),
      clearTransferMarketCache: createMockFn(),
    },
    Club: {
      search: createMockFn(createMockObservable<TransferItem[]>([])),
      getStats: createMockFn(createMockObservable<ClubStats>()),
      clubDao: {
        resetStatsCache: createMockFn(),
      },
    },
    User: {
      getUser: createMockFn(mockUser),
      requestCurrencies: createMockFn(
        createMockObservable<UserCurrencies>({
          coins: 100000,
          points: 500,
        })
      ),
    },
    Store: {
      getPacks: createMockFn(createMockObservable<Pack[]>([])),
    },
    Chemistry: {
      requestChemistryProfiles: createMockFn(createMockObservable<unknown>({})),
      isFeatureEnabled: createMockFn(true),
      resetCustomProfiles: createMockFn(),
    },
    Notification: {
      queue: createMockFn(),
    },
    Localization: {
      localize: createMockFn(''),
      locale: { language: 'en' },
    },
  };
}

/**
 * Install mock services on a mock window object
 */
export function installMockServices(mockWindow: { services?: MockServices }): MockServices {
  const services = createMockServices();
  mockWindow.services = services;
  return services;
}
