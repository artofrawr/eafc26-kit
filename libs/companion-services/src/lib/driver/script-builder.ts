/**
 * Script builder utilities for constructing executable JavaScript strings
 * that can be injected into the browser via Selenium's executeScript
 */

import { COMPANION_API_INJECTABLE } from '../injectable/companion-api.injectable';

/**
 * Builds executable script strings for Selenium injection
 */
export class ScriptBuilder {
  /**
   * Get the full injectable API initialization script
   */
  static getInjectionScript(): string {
    return COMPANION_API_INJECTABLE;
  }

  /**
   * Build a script that checks if CompanionAPI is initialized
   */
  static buildAvailabilityCheck(): string {
    return `return window.CompanionAPI && window.CompanionAPI.util.isAvailable();`;
  }

  /**
   * Build a script that checks if CompanionAPI needs initialization
   */
  static buildInitializationCheck(): string {
    return `return !!(window.CompanionAPI && window.CompanionAPI._initialized);`;
  }

  /**
   * Build a script that calls a CompanionAPI method and returns the result
   * wrapped in a ServiceResponse format
   *
   * @param namespace - The service namespace (e.g., 'sbc', 'item', 'club')
   * @param method - The method name to call
   * @param args - Arguments to pass to the method
   */
  static buildMethodCall(namespace: string, method: string, args: unknown[] = []): string {
    const argsJson = JSON.stringify(args);

    return `
      return (async function() {
        if (!window.CompanionAPI || !window.CompanionAPI._initialized) {
          return { success: false, error: { code: 'NOT_INITIALIZED', message: 'CompanionAPI not initialized' } };
        }

        if (!window.CompanionAPI['${namespace}'] || typeof window.CompanionAPI['${namespace}']['${method}'] !== 'function') {
          return { success: false, error: { code: 'METHOD_NOT_FOUND', message: 'Method ${namespace}.${method} not found' } };
        }

        try {
          var args = ${argsJson};
          var result = await window.CompanionAPI['${namespace}']['${method}'].apply(null, args);
          return { success: true, data: result };
        } catch (error) {
          return {
            success: false,
            error: {
              code: error.code || 'ERROR',
              message: error.message || 'Unknown error'
            }
          };
        }
      })();
    `;
  }

  /**
   * Build a script for a synchronous method call (like user.getUser)
   */
  static buildSyncMethodCall(namespace: string, method: string, args: unknown[] = []): string {
    const argsJson = JSON.stringify(args);

    return `
      return (function() {
        if (!window.CompanionAPI || !window.CompanionAPI._initialized) {
          return { success: false, error: { code: 'NOT_INITIALIZED', message: 'CompanionAPI not initialized' } };
        }

        if (!window.CompanionAPI['${namespace}'] || typeof window.CompanionAPI['${namespace}']['${method}'] !== 'function') {
          return { success: false, error: { code: 'METHOD_NOT_FOUND', message: 'Method ${namespace}.${method} not found' } };
        }

        try {
          var args = ${argsJson};
          var result = window.CompanionAPI['${namespace}']['${method}'].apply(null, args);
          return { success: true, data: result };
        } catch (error) {
          return {
            success: false,
            error: {
              code: error.code || 'ERROR',
              message: error.message || 'Unknown error'
            }
          };
        }
      })();
    `;
  }

  /**
   * Build a script to get available services info
   */
  static buildGetAvailableServices(): string {
    return `
      return (function() {
        if (!window.CompanionAPI || !window.CompanionAPI.util) {
          return null;
        }
        return window.CompanionAPI.util.getAvailableServices();
      })();
    `;
  }

  /**
   * Build a script to run debug tests
   */
  static buildDebugTests(): string {
    return `
      return (async function() {
        if (!window.CompanionAPI || !window.CompanionAPI.debug) {
          return { error: 'CompanionAPI not available' };
        }
        return await window.CompanionAPI.debug.testAllServices();
      })();
    `;
  }
}
