/**
 * Unit tests for CompanionServicesDriver
 */

import { CompanionServicesDriver } from './companion-services.driver';
import { ScriptBuilder } from './script-builder';
import { WebDriver } from 'selenium-webdriver';

// Mock WebDriver
const createMockDriver = () => {
  const mockDriver = {
    executeScript: jest.fn(),
  } as unknown as jest.Mocked<WebDriver>;
  return mockDriver;
};

describe('CompanionServicesDriver', () => {
  let driver: jest.Mocked<WebDriver>;
  let companionDriver: CompanionServicesDriver;

  beforeEach(() => {
    driver = createMockDriver();
    companionDriver = new CompanionServicesDriver(driver);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('initialize', () => {
    it('should inject CompanionAPI when services are available', async () => {
      // First call checks if services exist
      driver.executeScript
        .mockResolvedValueOnce(true) // services available check
        .mockResolvedValueOnce(undefined) // injection
        .mockResolvedValueOnce(true); // availability check

      const result = await companionDriver.initialize();

      expect(result).toBe(true);
      expect(driver.executeScript).toHaveBeenCalledTimes(3);
    });

    it('should throw error when services are not available', async () => {
      driver.executeScript.mockResolvedValueOnce(false); // services not available

      await expect(companionDriver.initialize()).rejects.toThrow(
        'EA Companion App services not available'
      );
    });

    it('should throw error when injection fails', async () => {
      driver.executeScript
        .mockResolvedValueOnce(true) // services available
        .mockResolvedValueOnce(undefined) // injection
        .mockResolvedValueOnce(false); // availability check fails

      await expect(companionDriver.initialize()).rejects.toThrow(
        'Failed to initialize CompanionAPI'
      );
    });

    it('should skip re-initialization if already initialized', async () => {
      // First initialization
      driver.executeScript
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce(undefined)
        .mockResolvedValueOnce(true);

      await companionDriver.initialize();

      // Second initialization - should check if still initialized
      driver.executeScript.mockResolvedValueOnce(true); // still initialized check

      const result = await companionDriver.initialize();

      expect(result).toBe(true);
      // Should only add one more call for the check
      expect(driver.executeScript).toHaveBeenCalledTimes(4);
    });
  });

  describe('SBC operations', () => {
    beforeEach(async () => {
      // Setup successful initialization
      driver.executeScript
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce(undefined)
        .mockResolvedValueOnce(true);
      await companionDriver.initialize();
      jest.clearAllMocks();
    });

    it('should request SBC sets', async () => {
      const mockSets = [{ id: 1, name: 'Daily Bronze' }];
      driver.executeScript.mockResolvedValueOnce({
        success: true,
        data: mockSets,
      });

      const result = await companionDriver.requestSBCSets();

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockSets);
    });

    it('should handle SBC request errors', async () => {
      driver.executeScript.mockResolvedValueOnce({
        success: false,
        error: { code: 'TIMEOUT', message: 'Request timed out' },
      });

      const result = await companionDriver.requestSBCSets();

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('TIMEOUT');
    });

    it('should request challenges for a set', async () => {
      const mockChallenges = [{ id: 101, name: 'Challenge 1' }];
      driver.executeScript.mockResolvedValueOnce({
        success: true,
        data: mockChallenges,
      });

      const result = await companionDriver.requestChallengesForSet({ id: 1 });

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockChallenges);
    });
  });

  describe('Item operations', () => {
    beforeEach(async () => {
      driver.executeScript
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce(undefined)
        .mockResolvedValueOnce(true);
      await companionDriver.initialize();
      jest.clearAllMocks();
    });

    it('should search transfer market', async () => {
      const mockItems = [{ id: 1, rating: 85 }];
      driver.executeScript.mockResolvedValueOnce({
        success: true,
        data: { items: mockItems, page: 0, totalPages: 1 },
      });

      const result = await companionDriver.searchTransferMarket({ minBuy: 1000, maxBuy: 5000 }, 0);

      expect(result.success).toBe(true);
      expect(result.data?.items).toEqual(mockItems);
    });

    it('should get transfer list', async () => {
      const mockItems = [{ id: 2, rating: 80 }];
      driver.executeScript.mockResolvedValueOnce({
        success: true,
        data: { items: mockItems },
      });

      const result = await companionDriver.getTransferList();

      expect(result.success).toBe(true);
      expect(result.data?.items).toEqual(mockItems);
    });

    it('should get unassigned items', async () => {
      const mockItems = [{ id: 3, rating: 75 }];
      driver.executeScript.mockResolvedValueOnce({
        success: true,
        data: { items: mockItems },
      });

      const result = await companionDriver.getUnassignedItems();

      expect(result.success).toBe(true);
    });
  });

  describe('Club operations', () => {
    beforeEach(async () => {
      driver.executeScript
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce(undefined)
        .mockResolvedValueOnce(true);
      await companionDriver.initialize();
      jest.clearAllMocks();
    });

    it('should search club', async () => {
      const mockItems = [{ id: 1, rating: 82 }];
      driver.executeScript.mockResolvedValueOnce({
        success: true,
        data: { items: mockItems, count: 1, totalItems: 100 },
      });

      const result = await companionDriver.searchClub({ minRating: 80 });

      expect(result.success).toBe(true);
      expect(result.data?.items).toEqual(mockItems);
    });

    it('should get club stats', async () => {
      const mockStats = { totalItems: 1000, players: 800 };
      driver.executeScript.mockResolvedValueOnce({
        success: true,
        data: mockStats,
      });

      const result = await companionDriver.getClubStats();

      expect(result.success).toBe(true);
      expect(result.data?.totalItems).toBe(1000);
    });
  });

  describe('User operations', () => {
    beforeEach(async () => {
      driver.executeScript
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce(undefined)
        .mockResolvedValueOnce(true);
      await companionDriver.initialize();
      jest.clearAllMocks();
    });

    it('should get user info', async () => {
      const mockUser = {
        personaId: 12345,
        personaName: 'TestUser',
        coins: 100000,
      };
      driver.executeScript.mockResolvedValueOnce({
        success: true,
        data: mockUser,
      });

      const result = await companionDriver.getUser();

      expect(result.success).toBe(true);
      expect(result.data?.personaName).toBe('TestUser');
    });

    it('should get currencies', async () => {
      const mockCurrencies = { coins: 250000, points: 500 };
      driver.executeScript.mockResolvedValueOnce({
        success: true,
        data: mockCurrencies,
      });

      const result = await companionDriver.getCurrencies();

      expect(result.success).toBe(true);
      expect(result.data?.coins).toBe(250000);
    });
  });

  describe('auto-initialization', () => {
    it('should auto-initialize on first method call', async () => {
      // Setup successful initialization
      driver.executeScript
        .mockResolvedValueOnce(true) // services check
        .mockResolvedValueOnce(undefined) // injection
        .mockResolvedValueOnce(true) // availability check
        .mockResolvedValueOnce({ success: true, data: [] }); // actual method call

      // Call a method without explicit initialization
      const result = await companionDriver.requestSBCSets();

      expect(result.success).toBe(true);
      expect(driver.executeScript).toHaveBeenCalledTimes(4);
    });
  });
});

describe('ScriptBuilder', () => {
  describe('getInjectionScript', () => {
    it('should return a non-empty string', () => {
      const script = ScriptBuilder.getInjectionScript();
      expect(typeof script).toBe('string');
      expect(script.length).toBeGreaterThan(1000);
    });

    it('should contain CompanionAPI definition', () => {
      const script = ScriptBuilder.getInjectionScript();
      expect(script).toContain('window.CompanionAPI');
      expect(script).toContain('_initialized');
    });
  });

  describe('buildMethodCall', () => {
    it('should build valid async method call script', () => {
      const script = ScriptBuilder.buildMethodCall('sbc', 'requestSets', []);
      expect(script).toContain("window.CompanionAPI['sbc']['requestSets']");
      expect(script).toContain('async function');
    });

    it('should include arguments in the script', () => {
      const script = ScriptBuilder.buildMethodCall('item', 'searchTransferMarket', [
        { minBuy: 1000 },
        0,
      ]);
      expect(script).toContain('minBuy');
      expect(script).toContain('1000');
    });
  });

  describe('buildSyncMethodCall', () => {
    it('should build valid sync method call script', () => {
      const script = ScriptBuilder.buildSyncMethodCall('user', 'getUser', []);
      expect(script).toContain("window.CompanionAPI['user']['getUser']");
      expect(script).not.toContain('async');
    });
  });

  describe('buildAvailabilityCheck', () => {
    it('should build availability check script', () => {
      const script = ScriptBuilder.buildAvailabilityCheck();
      expect(script).toContain('window.CompanionAPI');
      expect(script).toContain('isAvailable');
    });
  });
});
