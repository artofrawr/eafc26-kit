/**
 * Common types shared across all companion services
 */

/**
 * EA FC Companion App error structure
 */
export interface EAError {
  code: string | number;
  message: string;
  debug?: unknown;
}

/**
 * Unified response type for all service calls
 */
export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: EAError;
}

/**
 * Auction duration in seconds
 * 1 hour, 3 hours, 6 hours, 12 hours, 1 day, 3 days
 */
export type AuctionDuration = 3600 | 10800 | 21600 | 43200 | 86400 | 259200;

/**
 * Item pile types for inventory management
 */
export enum ItemPile {
  CLUB = 'club',
  TRANSFER = 'tradepile',
  WATCHLIST = 'watchlist',
  UNASSIGNED = 'unassigned',
  SBC_STORAGE = 'sbcStorage',
}

/**
 * Item quality levels
 */
export enum ItemQuality {
  BRONZE = 'bronze',
  SILVER = 'silver',
  GOLD = 'gold',
  SPECIAL = 'special',
}

/**
 * Item rarity levels
 */
export enum ItemRarity {
  COMMON = 'common',
  RARE = 'rare',
}

/**
 * Notification types for in-app notifications
 */
export enum NotificationType {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  NEUTRAL = 'neutral',
}

/**
 * Bid state for auction items
 */
export type BidState = 'none' | 'outbid' | 'highest' | 'winning' | 'won' | 'lost' | 'expired';

/**
 * Trade state for listed items
 */
export type TradeState = 'active' | 'closed' | 'expired';
