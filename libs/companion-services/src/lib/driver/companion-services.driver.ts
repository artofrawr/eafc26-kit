/**
 * CompanionServicesDriver - Selenium WebDriver integration for CompanionAPI
 *
 * This class manages the injection and execution of CompanionAPI calls
 * through Selenium WebDriver, providing a typed interface for all services.
 */

import { WebDriver } from 'selenium-webdriver';
import { ScriptBuilder } from './script-builder';
import { ServiceResponse, ItemPile, AuctionDuration } from '../types/common.types';
import { SBCSet, SBCChallenge, SBCSquad } from '../types/sbc.types';
import {
  TransferItem,
  TransferSearchCriteria,
  TransferSearchResponse,
  TransferListResponse,
  WatchedItemsResponse,
  MarketDataResponse,
} from '../types/item.types';
import {
  ClubSearchCriteria,
  ClubSearchResponse,
  ClubStats,
  UnassignedItemsResponse,
  StorageSearchCriteria,
  StorageSearchResponse,
} from '../types/club.types';
import { UserProfile, UserCurrencies } from '../types/user.types';
import { Pack, StoreCategory } from '../types/store.types';

/**
 * Available services info
 */
export interface AvailableServices {
  SBC: boolean;
  Item: boolean;
  Club: boolean;
  User: boolean;
  Store: boolean;
  Chemistry: boolean;
  Notification: boolean;
  Localization: boolean;
}

/**
 * Bridge between Selenium WebDriver and CompanionAPI
 */
export class CompanionServicesDriver {
  private driver: WebDriver;
  private initialized: boolean = false;

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  // ============================================
  // Initialization
  // ============================================

  /**
   * Initialize the CompanionAPI in the browser
   * Must be called after navigating to the companion app and logging in
   */
  async initialize(): Promise<boolean> {
    if (this.initialized) {
      // Check if still initialized (page might have reloaded)
      const stillInitialized = await this.driver.executeScript<boolean>(
        ScriptBuilder.buildInitializationCheck()
      );
      if (stillInitialized) {
        return true;
      }
    }

    // Check if EA services are available
    const servicesAvailable = await this.driver.executeScript<boolean>(
      'return typeof window.services !== "undefined" && window.services.SBC !== undefined;'
    );

    if (!servicesAvailable) {
      throw new Error(
        'EA Companion App services not available. Ensure you are logged into the web app.'
      );
    }

    // Inject the CompanionAPI
    await this.driver.executeScript(ScriptBuilder.getInjectionScript());

    // Verify injection
    const apiAvailable = await this.driver.executeScript<boolean>(
      ScriptBuilder.buildAvailabilityCheck()
    );

    if (!apiAvailable) {
      throw new Error('Failed to initialize CompanionAPI');
    }

    this.initialized = true;
    return true;
  }

  /**
   * Check if CompanionAPI is initialized
   */
  async isInitialized(): Promise<boolean> {
    return this.driver.executeScript<boolean>(ScriptBuilder.buildInitializationCheck());
  }

  /**
   * Get available services
   */
  async getAvailableServices(): Promise<AvailableServices | null> {
    await this.ensureInitialized();
    return this.driver.executeScript<AvailableServices | null>(
      ScriptBuilder.buildGetAvailableServices()
    );
  }

  // ============================================
  // Private Helpers
  // ============================================

  /**
   * Ensure the API is initialized before making calls
   */
  private async ensureInitialized(): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }
  }

  /**
   * Execute an async CompanionAPI method
   */
  private async executeAsync<T>(
    namespace: string,
    method: string,
    args: unknown[] = []
  ): Promise<ServiceResponse<T>> {
    await this.ensureInitialized();
    const script = ScriptBuilder.buildMethodCall(namespace, method, args);
    return this.driver.executeScript<ServiceResponse<T>>(script);
  }

  /**
   * Execute a sync CompanionAPI method
   */
  private async executeSync<T>(
    namespace: string,
    method: string,
    args: unknown[] = []
  ): Promise<ServiceResponse<T>> {
    await this.ensureInitialized();
    const script = ScriptBuilder.buildSyncMethodCall(namespace, method, args);
    return this.driver.executeScript<ServiceResponse<T>>(script);
  }

  // ============================================
  // SBC Services
  // ============================================

  /**
   * Request all available SBC sets
   */
  async requestSBCSets(): Promise<ServiceResponse<SBCSet[]>> {
    return this.executeAsync('sbc', 'requestSets');
  }

  /**
   * Request challenges for a specific set
   */
  async requestChallengesForSet(
    set: SBCSet | { id: number }
  ): Promise<ServiceResponse<SBCChallenge[]>> {
    return this.executeAsync('sbc', 'requestChallengesForSet', [set]);
  }

  /**
   * Load a specific challenge
   */
  async loadChallenge(
    challenge: SBCChallenge | { id: number }
  ): Promise<ServiceResponse<SBCChallenge>> {
    return this.executeAsync('sbc', 'loadChallenge', [challenge]);
  }

  /**
   * Save squad to a challenge
   */
  async saveChallenge(challenge: SBCChallenge): Promise<ServiceResponse<void>> {
    return this.executeAsync('sbc', 'saveChallenge', [challenge]);
  }

  /**
   * Submit a completed challenge
   */
  async submitChallenge(challenge: SBCChallenge, set: SBCSet): Promise<ServiceResponse<unknown>> {
    return this.executeAsync('sbc', 'submitChallenge', [challenge, set]);
  }

  /**
   * Get cached SBC squads (sync)
   */
  async getCachedSBCSquads(): Promise<ServiceResponse<SBCSquad[]>> {
    return this.executeSync('sbc', 'getCachedSBCSquads');
  }

  /**
   * Reset SBC cache
   */
  async resetSBCCache(): Promise<ServiceResponse<boolean>> {
    return this.executeSync('sbc', 'resetCache');
  }

  // ============================================
  // Item / Transfer Market Services
  // ============================================

  /**
   * Search the transfer market
   */
  async searchTransferMarket(
    criteria: TransferSearchCriteria,
    page: number = 0
  ): Promise<ServiceResponse<TransferSearchResponse>> {
    return this.executeAsync('item', 'searchTransferMarket', [criteria, page]);
  }

  /**
   * Place a bid on an item
   */
  async bid(item: TransferItem, price: number): Promise<ServiceResponse<TransferItem>> {
    return this.executeAsync('item', 'bid', [item, price]);
  }

  /**
   * List an item for sale
   */
  async listItem(
    item: TransferItem,
    startingBid: number,
    buyNowPrice: number,
    duration: AuctionDuration
  ): Promise<ServiceResponse<TransferItem>> {
    return this.executeAsync('item', 'list', [item, startingBid, buyNowPrice, duration]);
  }

  /**
   * Move items between piles
   */
  async moveItems(
    items: TransferItem | TransferItem[],
    pile: ItemPile
  ): Promise<ServiceResponse<void>> {
    return this.executeAsync('item', 'move', [items, pile]);
  }

  /**
   * Get transfer list items
   */
  async getTransferList(): Promise<ServiceResponse<TransferListResponse>> {
    return this.executeAsync('item', 'requestTransferItems');
  }

  /**
   * Get watched items
   */
  async getWatchedItems(): Promise<ServiceResponse<WatchedItemsResponse>> {
    return this.executeAsync('item', 'requestWatchedItems');
  }

  /**
   * Refresh auction data for items
   */
  async refreshAuctions(items: TransferItem[]): Promise<ServiceResponse<TransferItem[]>> {
    return this.executeAsync('item', 'refreshAuctions', [items]);
  }

  /**
   * Relist all expired auctions
   */
  async relistExpiredAuctions(): Promise<ServiceResponse<void>> {
    return this.executeAsync('item', 'relistExpiredAuctions');
  }

  /**
   * Remove items from watchlist
   */
  async removeFromWatchlist(items: TransferItem[]): Promise<ServiceResponse<void>> {
    return this.executeAsync('item', 'untarget', [items]);
  }

  /**
   * Get market data for an item
   */
  async getMarketData(item: TransferItem): Promise<ServiceResponse<MarketDataResponse>> {
    return this.executeAsync('item', 'requestMarketData', [item]);
  }

  /**
   * Get unassigned items
   */
  async getUnassignedItems(): Promise<ServiceResponse<UnassignedItemsResponse>> {
    return this.executeAsync('item', 'requestUnassignedItems');
  }

  /**
   * Search SBC storage
   */
  async searchStorage(
    criteria: StorageSearchCriteria
  ): Promise<ServiceResponse<StorageSearchResponse>> {
    return this.executeAsync('item', 'searchStorageItems', [criteria]);
  }

  /**
   * Discard (quick sell) items
   */
  async discardItems(
    items: TransferItem | TransferItem[]
  ): Promise<ServiceResponse<{ coins: number }>> {
    return this.executeAsync('item', 'discard', [items]);
  }

  // ============================================
  // Club Services
  // ============================================

  /**
   * Search club inventory
   */
  async searchClub(criteria: ClubSearchCriteria): Promise<ServiceResponse<ClubSearchResponse>> {
    return this.executeAsync('club', 'search', [criteria]);
  }

  /**
   * Get club statistics
   */
  async getClubStats(): Promise<ServiceResponse<ClubStats>> {
    return this.executeAsync('club', 'getStats');
  }

  // ============================================
  // User Services
  // ============================================

  /**
   * Get current user info (sync)
   */
  async getUser(): Promise<ServiceResponse<UserProfile>> {
    return this.executeSync('user', 'getUser');
  }

  /**
   * Request/refresh currency data
   */
  async getCurrencies(): Promise<ServiceResponse<UserCurrencies>> {
    return this.executeAsync('user', 'requestCurrencies');
  }

  // ============================================
  // Store Services
  // ============================================

  /**
   * Get available packs
   */
  async getPacks(category?: StoreCategory): Promise<ServiceResponse<Pack[]>> {
    return this.executeAsync('store', 'getPacks', [category]);
  }

  // ============================================
  // Notification Services
  // ============================================

  /**
   * Show an in-app notification
   */
  async showNotification(
    message: string,
    type: 'positive' | 'negative' | 'neutral' = 'neutral'
  ): Promise<ServiceResponse<boolean>> {
    return this.executeSync('notification', 'queue', [message, type]);
  }

  // ============================================
  // Localization Services
  // ============================================

  /**
   * Get localized string
   */
  async localize(key: string): Promise<ServiceResponse<string>> {
    return this.executeSync('localization', 'localize', [key]);
  }

  /**
   * Get current locale
   */
  async getLocale(): Promise<ServiceResponse<string>> {
    return this.executeSync('localization', 'getLocale');
  }

  // ============================================
  // Debug / Testing
  // ============================================

  /**
   * Run debug tests (logs results to browser console)
   */
  async runDebugTests(): Promise<ServiceResponse<Record<string, unknown>>> {
    await this.ensureInitialized();
    const script = ScriptBuilder.buildDebugTests();
    const result = await this.driver.executeScript<Record<string, unknown>>(script);
    return { success: true, data: result };
  }
}
