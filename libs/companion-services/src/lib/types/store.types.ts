/**
 * Store and pack types
 */

/**
 * Pack information
 */
export interface Pack {
  id: number;
  name: string;
  description: string;
  packType: PackType;
  coins?: number; // Price in coins
  points?: number; // Price in FC Points
  isPromo: boolean;
  isLimitedTime: boolean;
  expiresAt?: number; // Unix timestamp
  quantity?: number; // How many user owns (for "My Packs")
  maxQuantity?: number; // Purchase limit
  contents: PackContents;
}

/**
 * Pack type categories
 */
export type PackType =
  | 'gold'
  | 'silver'
  | 'bronze'
  | 'premium'
  | 'promo'
  | 'objective'
  | 'sbc'
  | 'draft'
  | 'preview';

/**
 * Pack contents description
 */
export interface PackContents {
  totalItems: number;
  rareItems?: number;
  goldItems?: number;
  silverItems?: number;
  bronzeItems?: number;
  players?: number;
  guaranteedRating?: number;
}

/**
 * Store category for getPacks
 */
export type StoreCategory = 'packs' | 'points' | 'myPacks';

/**
 * Get packs response
 */
export interface GetPacksResponse {
  packs: Pack[];
  entitlements?: PackEntitlement[];
}

/**
 * Pack entitlement (packs the user owns)
 */
export interface PackEntitlement {
  packId: number;
  quantity: number;
  source: PackSource;
}

/**
 * Source of a pack entitlement
 */
export type PackSource = 'purchase' | 'sbc' | 'objective' | 'season' | 'gift';
