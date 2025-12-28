/**
 * Centralized CSS selectors for EA FC Companion App
 *
 * Note: These selectors are subject to change when EA updates their web app.
 * Update this file when selectors break.
 *
 * Last updated: 2025-12-27 (Tested against EA FC Web App)
 */

export const CompanionAppSelectors = {
  // Already logged in state
  loggedIn: {
    tabBar: '.ut-tab-bar', // If present, user is already logged in
  },

  // Login page
  login: {
    loginContent: '.ut-login-content', // Container for login area
    showLoginButton: 'button.primary', // Button to show login form
    emailInput: '#email',
    passwordInput: '#password',
    submitButton: '.otkbtn-primary', // Clicked twice: after email, then after password
    errorMessage: '.error-message',
  },

  // Two-factor authentication
  twoFactor: {
    codeInput: '#twoFactorCode',
    submitButton: '#btnSubmit',
    verificationForm: '#verification-form',
  },

  // Loading state
  loading: {
    clickShield: '.ut-click-shield', // Loading overlay
    loaderIcon: 'img.loaderIcon', // Loading spinner
  },

  // Navigation
  navigation: {
    tabBar: '.ut-tab-bar',
    sbcTab: 'button.icon-sbc', // In .ut-tab-bar
    transferMarketTab: 'button.icon-transfer',
    clubTab: 'button.icon-club',
    menuButton: '.menu-button',
  },

  // SBC section
  sbc: {
    pageTitle: 'h1.title', // Should contain "SBC" when on SBC page
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
