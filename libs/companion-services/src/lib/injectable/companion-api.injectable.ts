/**
 * Self-contained injectable script for EA FC Companion App
 *
 * This script is injected into the browser via Selenium's executeScript.
 * It must be completely self-contained with NO external imports.
 * The script wraps EA's Observable-based services with Promise-based APIs.
 */

export const COMPANION_API_INJECTABLE = `
(function() {
  'use strict';

  // Skip if already initialized
  if (window.CompanionAPI && window.CompanionAPI._initialized) {
    return window.CompanionAPI;
  }

  /**
   * Custom error class for service errors
   */
  function CompanionServiceError(code, message, debug) {
    this.name = 'CompanionServiceError';
    this.code = code;
    this.message = message;
    this.debug = debug;
  }
  CompanionServiceError.prototype = Object.create(Error.prototype);
  CompanionServiceError.prototype.constructor = CompanionServiceError;

  /**
   * Convert EA's Observable .observe() pattern to a Promise
   */
  function observeToPromise(observable, timeout) {
    timeout = timeout || 30000;

    return new Promise(function(resolve, reject) {
      if (!observable || typeof observable.observe !== 'function') {
        reject(new CompanionServiceError('INVALID_OBSERVABLE', 'Invalid observable object'));
        return;
      }

      var timeoutId = setTimeout(function() {
        reject(new CompanionServiceError('TIMEOUT', 'Request timed out after ' + timeout + 'ms'));
      }, timeout);

      try {
        observable.observe(this, function onComplete(sender, response) {
          clearTimeout(timeoutId);

          if (response && response.success === false) {
            reject(new CompanionServiceError(
              response.status || response.error?.code || 'ERROR',
              response.error?.message || 'Request failed',
              response
            ));
            return;
          }

          // Handle different response formats
          if (response && response.data !== undefined) {
            resolve(response.data);
          } else if (response && response.response !== undefined) {
            resolve(response.response);
          } else {
            resolve(response);
          }
        });
      } catch (e) {
        clearTimeout(timeoutId);
        reject(new CompanionServiceError('OBSERVE_ERROR', e.message || 'Failed to observe', e));
      }
    });
  }

  /**
   * Safely get the services object
   */
  function getServices() {
    if (typeof window === 'undefined') {
      throw new CompanionServiceError('NO_WINDOW', 'Window object not available');
    }
    if (!window.services) {
      throw new CompanionServiceError('NO_SERVICES', 'EA services object not available. Make sure you are logged into the Companion App.');
    }
    return window.services;
  }

  /**
   * Safely get repositories object
   */
  function getRepositories() {
    if (typeof window === 'undefined' || !window.repositories) {
      return null;
    }
    return window.repositories;
  }

  /**
   * Item pile constants (matches EA's ItemPile enum)
   */
  var ItemPile = {
    CLUB: 'club',
    TRANSFER: window.ItemPile ? window.ItemPile.TRANSFER : 2,
    WATCHLIST: window.ItemPile ? window.ItemPile.WATCHLIST : 4,
    UNASSIGNED: window.ItemPile ? window.ItemPile.UNASSIGNED : 5,
    SBC_STORAGE: 'sbcStorage'
  };

  // ============================================
  // COMPANION API - Main API Object
  // ============================================

  window.CompanionAPI = {
    _initialized: true,
    _version: '1.0.0',

    // ----------------------------------------
    // SBC Services
    // ----------------------------------------
    sbc: {
      /**
       * Get all available SBC sets
       */
      requestSets: function() {
        return observeToPromise(getServices().SBC.requestSets());
      },

      /**
       * Get challenges for a specific set
       * @param {Object} set - The SBC set object or { id: setId }
       */
      requestChallengesForSet: function(set) {
        return observeToPromise(getServices().SBC.requestChallengesForSet(set));
      },

      /**
       * Load a specific challenge (populates squad data)
       * @param {Object} challenge - The challenge object or { id: challengeId }
       */
      loadChallenge: function(challenge) {
        return observeToPromise(getServices().SBC.loadChallenge(challenge));
      },

      /**
       * Save current squad to a challenge
       * @param {Object} challenge - The challenge with squad data
       */
      saveChallenge: function(challenge) {
        return observeToPromise(getServices().SBC.saveChallenge(challenge));
      },

      /**
       * Submit a completed challenge
       * @param {Object} challenge - The completed challenge
       * @param {Object} set - The parent set
       */
      submitChallenge: function(challenge, set) {
        return observeToPromise(getServices().SBC.submitChallenge(challenge, set, true, true));
      },

      /**
       * Get cached SBC squads (synchronous)
       */
      getCachedSBCSquads: function() {
        try {
          return getServices().SBC.getCachedSBCSquads() || [];
        } catch (e) {
          return [];
        }
      },

      /**
       * Reset SBC repository cache
       */
      resetCache: function() {
        try {
          if (getServices().SBC.repository && getServices().SBC.repository.reset) {
            getServices().SBC.repository.reset();
          }
          return true;
        } catch (e) {
          return false;
        }
      }
    },

    // ----------------------------------------
    // Item / Transfer Market Services
    // ----------------------------------------
    item: {
      /**
       * Search the transfer market
       * @param {Object} criteria - Search criteria
       * @param {number} page - Page number (0-indexed)
       */
      searchTransferMarket: function(criteria, page) {
        getServices().Item.clearTransferMarketCache();
        return observeToPromise(getServices().Item.searchTransferMarket(criteria, page || 0));
      },

      /**
       * Place a bid on an item
       * @param {Object} item - The item to bid on
       * @param {number} price - The bid amount
       */
      bid: function(item, price) {
        return observeToPromise(getServices().Item.bid(item, price));
      },

      /**
       * List an item for sale
       * @param {Object} item - The item to list
       * @param {number} startingBid - Starting bid price
       * @param {number} buyNowPrice - Buy now price
       * @param {number} duration - Duration in seconds (3600, 10800, 21600, 43200, 86400, 259200)
       */
      list: function(item, startingBid, buyNowPrice, duration) {
        return observeToPromise(getServices().Item.list(item, startingBid, buyNowPrice, duration));
      },

      /**
       * Move items between piles
       * @param {Array|Object} items - Item(s) to move
       * @param {string|number} pile - Destination pile
       */
      move: function(items, pile) {
        var itemArray = Array.isArray(items) ? items : [items];
        return observeToPromise(getServices().Item.move(itemArray, pile));
      },

      /**
       * Get items on the transfer list
       */
      requestTransferItems: function() {
        return observeToPromise(getServices().Item.requestTransferItems());
      },

      /**
       * Get watched items
       */
      requestWatchedItems: function() {
        return observeToPromise(getServices().Item.requestWatchedItems());
      },

      /**
       * Refresh auction data for items
       * @param {Array} items - Items to refresh
       */
      refreshAuctions: function(items) {
        return observeToPromise(getServices().Item.refreshAuctions(items));
      },

      /**
       * Relist all expired auctions
       */
      relistExpiredAuctions: function() {
        return observeToPromise(getServices().Item.relistExpiredAuctions());
      },

      /**
       * Remove items from watchlist
       * @param {Array} items - Items to untarget
       */
      untarget: function(items) {
        try {
          getServices().Item.untarget(items);
          return Promise.resolve({ success: true });
        } catch (e) {
          return Promise.reject(new CompanionServiceError('UNTARGET_ERROR', e.message));
        }
      },

      /**
       * Get market data (price range) for an item
       * @param {Object} item - The item to check
       */
      requestMarketData: function(item) {
        return observeToPromise(getServices().Item.requestMarketData(item));
      },

      /**
       * Get unassigned items
       */
      requestUnassignedItems: function() {
        return observeToPromise(getServices().Item.requestUnassignedItems());
      },

      /**
       * Search storage (SBC storage) items
       * @param {Object} criteria - Search criteria
       */
      searchStorageItems: function(criteria) {
        return observeToPromise(getServices().Item.searchStorageItems(criteria));
      },

      /**
       * Discard (quick sell) items
       * @param {Array|Object} items - Item(s) to discard
       */
      discard: function(items) {
        var itemArray = Array.isArray(items) ? items : [items];
        return observeToPromise(getServices().Item.discard(itemArray));
      },

      /**
       * Clear transfer market cache
       */
      clearCache: function() {
        try {
          getServices().Item.clearTransferMarketCache();
          return true;
        } catch (e) {
          return false;
        }
      }
    },

    // ----------------------------------------
    // Club Services
    // ----------------------------------------
    club: {
      /**
       * Search club inventory
       * @param {Object} criteria - Search criteria
       */
      search: function(criteria) {
        return observeToPromise(getServices().Club.search(criteria));
      },

      /**
       * Get club statistics
       */
      getStats: function() {
        return observeToPromise(getServices().Club.getStats());
      },

      /**
       * Reset club stats cache
       */
      resetStatsCache: function() {
        try {
          if (getServices().Club.clubDao && getServices().Club.clubDao.resetStatsCache) {
            getServices().Club.clubDao.resetStatsCache();
          }
          return true;
        } catch (e) {
          return false;
        }
      }
    },

    // ----------------------------------------
    // User Services
    // ----------------------------------------
    user: {
      /**
       * Get current user info (synchronous)
       */
      getUser: function() {
        try {
          var user = getServices().User.getUser();
          if (!user) return null;

          var persona = user.getSelectedPersona ? user.getSelectedPersona() : null;
          return {
            personaId: user.personaId,
            personaName: user.personaName,
            coins: user.coins ? user.coins.amount : 0,
            points: user.points ? user.points.amount : 0,
            clubName: persona ? persona.clubName : null,
            clubAbbr: persona ? persona.clubAbbr : null,
            established: persona ? persona.established : null,
            platform: persona ? (persona.isPC ? 'pc' : 'console') : null
          };
        } catch (e) {
          return null;
        }
      },

      /**
       * Request/refresh currency data
       */
      requestCurrencies: function() {
        return observeToPromise(getServices().User.requestCurrencies());
      }
    },

    // ----------------------------------------
    // Store Services
    // ----------------------------------------
    store: {
      /**
       * Get available packs
       * @param {string} type - Pack category
       */
      getPacks: function(type) {
        return observeToPromise(getServices().Store.getPacks(type, false, false));
      }
    },

    // ----------------------------------------
    // Chemistry Services
    // ----------------------------------------
    chemistry: {
      /**
       * Request chemistry profiles
       */
      requestChemistryProfiles: function() {
        return observeToPromise(getServices().Chemistry.requestChemistryProfiles());
      },

      /**
       * Check if chemistry feature is enabled
       */
      isFeatureEnabled: function() {
        try {
          return getServices().Chemistry.isFeatureEnabled();
        } catch (e) {
          return false;
        }
      },

      /**
       * Reset custom chemistry profiles
       */
      resetCustomProfiles: function() {
        try {
          if (getServices().Chemistry.resetCustomProfiles) {
            getServices().Chemistry.resetCustomProfiles();
          }
          return true;
        } catch (e) {
          return false;
        }
      }
    },

    // ----------------------------------------
    // Notification Services
    // ----------------------------------------
    notification: {
      /**
       * Show an in-app notification
       * @param {string} message - The message to show
       * @param {string} type - 'positive', 'negative', or 'neutral'
       */
      queue: function(message, type) {
        try {
          var notificationType = type || 'neutral';
          var typeValue = window.UINotificationType ?
            window.UINotificationType[notificationType.toUpperCase()] : notificationType;
          getServices().Notification.queue([message, typeValue]);
          return true;
        } catch (e) {
          console.error('Notification error:', e);
          return false;
        }
      }
    },

    // ----------------------------------------
    // Localization Services
    // ----------------------------------------
    localization: {
      /**
       * Get localized string
       * @param {string} key - The localization key
       */
      localize: function(key) {
        try {
          return getServices().Localization.localize(key);
        } catch (e) {
          return key;
        }
      },

      /**
       * Get current locale
       */
      getLocale: function() {
        try {
          return getServices().Localization.locale ?
            getServices().Localization.locale.language : null;
        } catch (e) {
          return null;
        }
      }
    },

    // ----------------------------------------
    // Utility Methods
    // ----------------------------------------
    util: {
      /**
       * Check if services are available
       */
      isAvailable: function() {
        try {
          return typeof window !== 'undefined' &&
                 window.services !== undefined &&
                 window.services.SBC !== undefined;
        } catch (e) {
          return false;
        }
      },

      /**
       * Get all available services
       */
      getAvailableServices: function() {
        try {
          var services = getServices();
          return {
            SBC: !!services.SBC,
            Item: !!services.Item,
            Club: !!services.Club,
            User: !!services.User,
            Store: !!services.Store,
            Chemistry: !!services.Chemistry,
            Notification: !!services.Notification,
            Localization: !!services.Localization
          };
        } catch (e) {
          return null;
        }
      },

      /**
       * Item pile constants
       */
      ItemPile: ItemPile
    },

    // ----------------------------------------
    // Debug Helpers (for manual testing)
    // ----------------------------------------
    debug: {
      /**
       * Test all services and log results
       */
      testAllServices: async function() {
        var results = {};
        console.log('=== CompanionAPI Service Tests ===');

        // Test availability
        results.available = window.CompanionAPI.util.isAvailable();
        console.log('Services available:', results.available);

        if (!results.available) {
          console.error('Services not available. Tests aborted.');
          return results;
        }

        // Test user
        try {
          results.user = window.CompanionAPI.user.getUser();
          console.log('User:', results.user);
        } catch (e) {
          results.user = { error: e.message };
          console.error('User error:', e);
        }

        // Test SBC sets
        try {
          results.sbcSets = await window.CompanionAPI.sbc.requestSets();
          console.log('SBC Sets:', results.sbcSets?.length || 0, 'sets found');
        } catch (e) {
          results.sbcSets = { error: e.message };
          console.error('SBC Sets error:', e);
        }

        // Test club stats
        try {
          results.clubStats = await window.CompanionAPI.club.getStats();
          console.log('Club Stats:', results.clubStats);
        } catch (e) {
          results.clubStats = { error: e.message };
          console.error('Club Stats error:', e);
        }

        // Test transfer items
        try {
          results.transferItems = await window.CompanionAPI.item.requestTransferItems();
          console.log('Transfer Items:', results.transferItems?.length || 0, 'items');
        } catch (e) {
          results.transferItems = { error: e.message };
          console.error('Transfer Items error:', e);
        }

        console.log('=== Tests Complete ===');
        console.log('Full results:', results);
        return results;
      },

      /**
       * Log raw services object structure
       */
      logServicesStructure: function() {
        try {
          var services = getServices();
          var structure = {};
          for (var key in services) {
            if (services.hasOwnProperty(key)) {
              structure[key] = typeof services[key] === 'object' ?
                Object.keys(services[key]) : typeof services[key];
            }
          }
          console.log('Services structure:', structure);
          return structure;
        } catch (e) {
          console.error('Error logging services:', e);
          return null;
        }
      }
    }
  };

  console.log('CompanionAPI v' + window.CompanionAPI._version + ' initialized');
  return window.CompanionAPI;
})();
`;

/**
 * Get the injectable script string
 */
export function getInjectableScript(): string {
  return COMPANION_API_INJECTABLE;
}
