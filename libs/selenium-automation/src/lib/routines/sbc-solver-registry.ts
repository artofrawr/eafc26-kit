import { WebDriver } from 'selenium-webdriver';
import { DailyBronzeUpgradeSolver } from './sbc-solvers/daily-bronze-upgrade.solver';
import { DailySilverUpgradeSolver } from './sbc-solvers/daily-silver-upgrade.solver';
import { DailyCommonGoldUpgradeSolver } from './sbc-solvers/daily-common-gold-upgrade.solver';
import { DailyRareGoldUpgradeSolver } from './sbc-solvers/daily-rare-gold-upgrade.solver';
import { WWDailyLoginUpgradeSolver } from './sbc-solvers/ww-daily-login-upgrade.solver';

/**
 * Interface that all SBC solvers must implement
 */
export interface SBCSolver {
  solve(): Promise<void>;
}

/**
 * Type for solver factory function
 */
export type SolverFactory = (driver: WebDriver) => SBCSolver;

/**
 * Registry mapping SBC names to their solver implementations
 */
export class SBCSolverRegistry {
  private static solvers: Map<string, SolverFactory> = new Map<string, SolverFactory>([
    ['Daily Bronze Upgrade', (driver: WebDriver) => new DailyBronzeUpgradeSolver(driver)],
    ['Daily Silver Upgrade', (driver: WebDriver) => new DailySilverUpgradeSolver(driver)],
    ['Daily Common Gold Upgrade', (driver: WebDriver) => new DailyCommonGoldUpgradeSolver(driver)],
    ['Daily Rare Gold Upgrade', (driver: WebDriver) => new DailyRareGoldUpgradeSolver(driver)],
    ['WW Daily Login Upgrade', (driver: WebDriver) => new WWDailyLoginUpgradeSolver(driver)],
    // Add more SBC solvers here as they are implemented
    // ['Another SBC Name', (driver) => new AnotherSBCSolver(driver)],
  ]);

  /**
   * Get a solver for a specific SBC by name
   * @param sbcName Name of the SBC
   * @param driver WebDriver instance
   * @returns Solver instance or null if not found
   */
  static getSolver(sbcName: string, driver: WebDriver): SBCSolver | null {
    const factory = this.solvers.get(sbcName);
    if (!factory) {
      console.warn(`No solver registered for SBC: "${sbcName}"`);
      return null;
    }
    return factory(driver);
  }

  /**
   * Check if a solver exists for a given SBC name
   * @param sbcName Name of the SBC
   * @returns true if solver exists, false otherwise
   */
  static hasSolver(sbcName: string): boolean {
    return this.solvers.has(sbcName);
  }

  /**
   * Get all SBC names that have registered solvers
   * @returns Array of SBC names
   */
  static getSupportedSBCs(): string[] {
    return Array.from(this.solvers.keys());
  }
}
