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
    clubTab: 'button.icon-club', // In .ut-tab-bar
    menuButton: '.menu-button',
  },

  // Club section
  club: {
    playersTile: 'div.players-tile', // Click to go to players page
    sbcStorageTile: 'div.sbc-storage-tile', // Click to go to SBC storage page

    // Player list
    playerList: 'ul.paginated', // Container for paginated player list
    playerCard: 'li.listFUTItem', // Individual player card within ul.paginated

    // Player card data
    playerName: 'div.name',
    playerRating: 'div.rating',
    playerPosition: 'div.position',
    playerStatsContainer: 'div.player-stats-data-component',
    playerStatValue: 'span.value', // Within stats container ul
    squadIcon: 'span.icon_squad', // Indicates player is in active squad

    // Player detail view (drawer)
    detailView: 'div.DetailView',
    playerBioButton: 'span.btn-text', // Button with text "Player Bio"

    // Player bio list
    bioList: '.ut-item-bio-list-view',
    bioListItem: 'li',
    bioFieldLabel: 'h1', // Field name (e.g., "Full Name", "Rarity")
    bioFieldValue: 'h2', // Field value

    // Pagination
    nextPageButton: '.pagingContainer button.next',
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
