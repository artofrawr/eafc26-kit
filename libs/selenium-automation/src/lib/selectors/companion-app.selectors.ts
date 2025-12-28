/**
 * Centralized CSS selectors for EA FC Companion App
 *
 * Note: These selectors are subject to change when EA updates their web app.
 * Update this file when selectors break.
 */

export const CompanionAppSelectors = {
  // Login page
  login: {
    emailInput: '#email',
    passwordInput: '#password',
    submitButton: '#btnLogin',
    loginForm: '#login-form',
    errorMessage: '.error-message',
  },

  // Two-factor authentication
  twoFactor: {
    codeInput: '#twoFactorCode',
    submitButton: '#btnSubmit',
    verificationForm: '#verification-form',
  },

  // Navigation
  navigation: {
    sbcTab: '[data-nav="sbc"]',
    transferMarketTab: '[data-nav="transfer-market"]',
    clubTab: '[data-nav="club"]',
    menuButton: '.menu-button',
  },

  // SBC section
  sbc: {
    challengeList: '.sbc-challenge-list',
    challengeCard: (id: string) => `[data-challenge-id="${id}"]`,
    challengeName: '.challenge-name',
    challengeDescription: '.challenge-description',
    requirementsList: '.requirements-list',
    requirementItem: '.requirement-item',
    rewardsList: '.rewards-list',
  },

  // Common elements
  common: {
    loadingSpinner: '.loading-spinner',
    modalOverlay: '.modal-overlay',
    confirmButton: '.confirm-button',
    cancelButton: '.cancel-button',
  },
} as const;

/**
 * Helper to generate dynamic selectors
 */
export const SelectorHelpers = {
  /**
   * Get selector for a specific challenge by ID
   */
  getChallengeSelector: (challengeId: string): string => {
    return CompanionAppSelectors.sbc.challengeCard(challengeId);
  },

  /**
   * Get selector for a specific requirement by index
   */
  getRequirementSelector: (index: number): string => {
    return `${CompanionAppSelectors.sbc.requirementItem}:nth-child(${index + 1})`;
  },
};
