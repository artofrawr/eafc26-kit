/**
 * Item and Transfer Market types
 */

import { AuctionDuration, BidState, ItemPile, ItemQuality, TradeState } from './common.types';

/**
 * Base item in the game
 */
export interface TransferItem {
  id: number;
  resourceId: number;
  assetId: number;
  definitionId: number;
  rating: number;
  itemType: ItemType;
  discardValue: number;
  untradeable: boolean;
  pile?: ItemPile;
  timestamp?: number;

  // Auction data (when listed or being watched)
  auction?: AuctionData;

  // Player-specific data
  playerData?: PlayerData;

  // Price limits
  priceLimits?: PriceLimits;
}

/**
 * Item types in the game
 */
export type ItemType =
  | 'player'
  | 'manager'
  | 'training'
  | 'consumable'
  | 'badge'
  | 'ball'
  | 'stadium';

/**
 * Auction/listing data
 */
export interface AuctionData {
  tradeId: number;
  bidState: BidState;
  tradeState: TradeState;
  currentBid: number;
  buyNowPrice?: number;
  startingBid: number;
  expires: number; // Unix timestamp
  watched: boolean;
  sellerName?: string;
  sellerEstablished?: number;
}

/**
 * Player-specific data
 */
export interface PlayerData {
  name: string;
  firstName?: string;
  lastName?: string;
  commonName?: string;
  position: string;
  preferredPositions: string[];
  nationality: number;
  league: number;
  club: number;
  attributes: PlayerAttributes;
  skillMoves?: number;
  weakFoot?: number;
  workRates?: {
    attacking: string;
    defensive: string;
  };
}

/**
 * Player attribute ratings
 */
export interface PlayerAttributes {
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
}

/**
 * Price limits for an item
 */
export interface PriceLimits {
  min: number;
  max: number;
}

/**
 * Transfer market search criteria
 */
export interface TransferSearchCriteria {
  type?: ItemType;
  definitionId?: number; // Specific player/item
  position?: string;
  nationality?: number;
  league?: number;
  club?: number;
  minBuy?: number;
  maxBuy?: number;
  minBid?: number;
  maxBid?: number;
  quality?: ItemQuality;
  rarityIds?: number[];
  zone?: string; // 'defense', 'midfield', 'attacker', 'goalkeeper'
}

/**
 * Transfer market search response
 */
export interface TransferSearchResponse {
  items: TransferItem[];
  page: number;
  totalPages: number;
  totalResults: number;
}

/**
 * Transfer list response
 */
export interface TransferListResponse {
  items: TransferItem[];
  credits: number; // User's coins after sales
}

/**
 * Watched items response
 */
export interface WatchedItemsResponse {
  items: TransferItem[];
  total: number;
}

/**
 * Market data/price check response
 */
export interface MarketDataResponse {
  minBuyNow: number;
  maxBuyNow: number;
  averagePrice?: number;
  totalListings: number;
}

/**
 * List item request options
 */
export interface ListItemOptions {
  item: TransferItem;
  startingBid: number;
  buyNowPrice: number;
  duration: AuctionDuration;
}

/**
 * Bid result
 */
export interface BidResult {
  success: boolean;
  item?: TransferItem;
  newBidAmount?: number;
  errorCode?: string;
}
