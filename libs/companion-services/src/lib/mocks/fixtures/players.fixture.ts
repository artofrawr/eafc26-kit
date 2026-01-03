/**
 * Player/Item fixture data for testing
 */

import { TransferItem, PlayerData, AuctionData } from '../../types/item.types';
import { ItemPile } from '../../types/common.types';

/**
 * Create a mock player item
 */
export function createMockPlayer(overrides: Partial<TransferItem> = {}): TransferItem {
  return {
    id: Math.floor(Math.random() * 1000000),
    resourceId: 123456,
    assetId: 654321,
    definitionId: 111111,
    rating: 75,
    itemType: 'player',
    discardValue: 600,
    untradeable: false,
    playerData: {
      name: 'Test Player',
      firstName: 'Test',
      lastName: 'Player',
      position: 'CM',
      preferredPositions: ['CM', 'CDM'],
      nationality: 14, // England
      league: 13, // Premier League
      club: 10, // Arsenal
      attributes: {
        pace: 75,
        shooting: 70,
        passing: 78,
        dribbling: 76,
        defending: 65,
        physical: 72,
      },
      skillMoves: 3,
      weakFoot: 4,
    },
    ...overrides,
  };
}

/**
 * Create a mock auction item (listed on transfer market)
 */
export function createMockAuctionItem(overrides: Partial<TransferItem> = {}): TransferItem {
  const auction: AuctionData = {
    tradeId: Math.floor(Math.random() * 1000000),
    bidState: 'none',
    tradeState: 'active',
    currentBid: 650,
    buyNowPrice: 1000,
    startingBid: 650,
    expires: Date.now() + 3600 * 1000, // 1 hour from now
    watched: false,
  };

  return createMockPlayer({
    auction,
    ...overrides,
  });
}

/**
 * Sample gold player
 */
export const mockGoldPlayer: TransferItem = createMockPlayer({
  id: 100001,
  rating: 83,
  discardValue: 700,
  playerData: {
    name: 'Declan Rice',
    firstName: 'Declan',
    lastName: 'Rice',
    position: 'CDM',
    preferredPositions: ['CDM', 'CM'],
    nationality: 14,
    league: 13,
    club: 10,
    attributes: {
      pace: 72,
      shooting: 66,
      passing: 77,
      dribbling: 77,
      defending: 85,
      physical: 84,
    },
    skillMoves: 3,
    weakFoot: 3,
  },
});

/**
 * Sample silver player
 */
export const mockSilverPlayer: TransferItem = createMockPlayer({
  id: 100002,
  rating: 68,
  discardValue: 350,
  playerData: {
    name: 'Test Silver',
    firstName: 'Test',
    lastName: 'Silver',
    position: 'RB',
    preferredPositions: ['RB'],
    nationality: 14,
    league: 60, // EFL Championship
    club: 1000,
    attributes: {
      pace: 78,
      shooting: 45,
      passing: 62,
      dribbling: 65,
      defending: 68,
      physical: 70,
    },
    skillMoves: 2,
    weakFoot: 3,
  },
});

/**
 * Sample bronze player
 */
export const mockBronzePlayer: TransferItem = createMockPlayer({
  id: 100003,
  rating: 58,
  discardValue: 150,
  playerData: {
    name: 'Test Bronze',
    firstName: 'Test',
    lastName: 'Bronze',
    position: 'CB',
    preferredPositions: ['CB'],
    nationality: 14,
    league: 61, // EFL League One
    club: 2000,
    attributes: {
      pace: 55,
      shooting: 30,
      passing: 45,
      dribbling: 42,
      defending: 60,
      physical: 62,
    },
    skillMoves: 1,
    weakFoot: 2,
  },
});

/**
 * Sample special/promo player
 */
export const mockSpecialPlayer: TransferItem = createMockPlayer({
  id: 100004,
  rating: 91,
  discardValue: 10000,
  playerData: {
    name: 'TOTY Player',
    firstName: 'TOTY',
    lastName: 'Player',
    position: 'ST',
    preferredPositions: ['ST', 'CF'],
    nationality: 52, // Argentina
    league: 53, // Ligue 1
    club: 73, // PSG
    attributes: {
      pace: 95,
      shooting: 94,
      passing: 90,
      dribbling: 96,
      defending: 40,
      physical: 78,
    },
    skillMoves: 5,
    weakFoot: 4,
  },
});

/**
 * Sample untradeable player
 */
export const mockUntradeablePlayer: TransferItem = createMockPlayer({
  id: 100005,
  untradeable: true,
  discardValue: 0,
});

/**
 * Sample player in SBC storage
 */
export const mockStoragePlayer: TransferItem = createMockPlayer({
  id: 100006,
  pile: ItemPile.SBC_STORAGE,
});

/**
 * Array of sample players
 */
export const mockPlayers: TransferItem[] = [
  mockGoldPlayer,
  mockSilverPlayer,
  mockBronzePlayer,
  mockSpecialPlayer,
  mockUntradeablePlayer,
];

/**
 * Sample transfer list items (with auctions)
 */
export const mockTransferListItems: TransferItem[] = [
  createMockAuctionItem({
    id: 200001,
    rating: 80,
    auction: {
      tradeId: 300001,
      bidState: 'none',
      tradeState: 'active',
      currentBid: 1500,
      buyNowPrice: 2000,
      startingBid: 1500,
      expires: Date.now() + 2 * 3600 * 1000,
      watched: false,
    },
  }),
  createMockAuctionItem({
    id: 200002,
    rating: 78,
    auction: {
      tradeId: 300002,
      bidState: 'highest',
      tradeState: 'active',
      currentBid: 800,
      buyNowPrice: 1200,
      startingBid: 750,
      expires: Date.now() + 30 * 60 * 1000, // 30 mins
      watched: false,
    },
  }),
];

/**
 * Sample watched items
 */
export const mockWatchedItems: TransferItem[] = [
  createMockAuctionItem({
    id: 200003,
    rating: 85,
    auction: {
      tradeId: 300003,
      bidState: 'outbid',
      tradeState: 'active',
      currentBid: 15000,
      buyNowPrice: 20000,
      startingBid: 10000,
      expires: Date.now() + 45 * 60 * 1000,
      watched: true,
    },
  }),
];
