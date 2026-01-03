/**
 * Club and inventory types
 */

import { ItemQuality, ItemRarity } from './common.types';
import { ItemType, TransferItem } from './item.types';

/**
 * Club search criteria
 */
export interface ClubSearchCriteria {
  type?: ItemType;
  position?: string;
  zone?: string; // 'defense', 'midfield', 'attacker', 'goalkeeper'
  nationality?: number;
  league?: number;
  club?: number;
  minRating?: number;
  maxRating?: number;
  quality?: ItemQuality;
  rarity?: ItemRarity;
  untradeable?: boolean;
  excludeActiveSquad?: boolean;
  excludeSbcSquads?: boolean;
  count?: number; // Items per page
  start?: number; // Pagination offset
  sortBy?: ClubSortOption;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Sort options for club search
 */
export type ClubSortOption =
  | 'rating'
  | 'name'
  | 'position'
  | 'league'
  | 'nation'
  | 'club'
  | 'acquired';

/**
 * Club search response
 */
export interface ClubSearchResponse {
  items: TransferItem[];
  count: number;
  totalItems: number;
}

/**
 * Club statistics
 */
export interface ClubStats {
  totalItems: number;
  players: number;
  managers: number;
  consumables: number;
  clubItems: number; // Badges, balls, stadiums
  clubValue: number;
  transferListSize: number;
  transferListMax: number;
  watchlistSize: number;
  watchlistMax: number;
  unassignedSize: number;
}

/**
 * Unassigned items response
 */
export interface UnassignedItemsResponse {
  items: TransferItem[];
  duplicates: TransferItem[];
}

/**
 * Storage (SBC storage) search criteria
 */
export interface StorageSearchCriteria {
  type?: ItemType;
  position?: string;
  nationality?: number;
  league?: number;
  club?: number;
  minRating?: number;
  maxRating?: number;
  quality?: ItemQuality;
  count?: number;
  start?: number;
}

/**
 * Storage search response
 */
export interface StorageSearchResponse {
  items: TransferItem[];
  count: number;
  totalItems: number;
}

/**
 * Move items result
 */
export interface MoveItemsResult {
  success: boolean;
  movedItems: TransferItem[];
  failedItems?: TransferItem[];
  errorCode?: string;
}

/**
 * Discard (quick sell) result
 */
export interface DiscardResult {
  success: boolean;
  coins: number; // Total coins received
  itemsDiscarded: number;
}
