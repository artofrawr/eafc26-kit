/**
 * User fixture data for testing
 */

import { UserProfile, UserCurrencies, UserClubInfo } from '../../types/user.types';
import { ClubStats } from '../../types/club.types';

/**
 * Sample user profile
 */
export const mockUserProfile: UserProfile = {
  personaId: 12345678,
  personaName: 'TestPlayer123',
  club: {
    name: 'Test FC United',
    abbreviation: 'TFU',
    established: 2015,
    badgeId: 1001,
    stadiumId: 2001,
    divisionOnline: 5,
  },
  currencies: {
    coins: 250000,
    points: 1200,
    draftTokens: 3,
  },
  platform: 'pc',
};

/**
 * Sample user currencies
 */
export const mockUserCurrencies: UserCurrencies = {
  coins: 250000,
  points: 1200,
  draftTokens: 3,
  seasonTokens: 500,
};

/**
 * Sample rich user currencies
 */
export const mockRichUserCurrencies: UserCurrencies = {
  coins: 5000000,
  points: 12000,
  draftTokens: 10,
  seasonTokens: 2500,
};

/**
 * Sample poor user currencies
 */
export const mockPoorUserCurrencies: UserCurrencies = {
  coins: 500,
  points: 0,
  draftTokens: 0,
  seasonTokens: 50,
};

/**
 * Sample club info
 */
export const mockClubInfo: UserClubInfo = {
  name: 'Test FC United',
  abbreviation: 'TFU',
  established: 2015,
  badgeId: 1001,
  stadiumId: 2001,
  divisionOnline: 5,
};

/**
 * Sample club stats
 */
export const mockClubStats: ClubStats = {
  totalItems: 1250,
  players: 980,
  managers: 15,
  consumables: 200,
  clubItems: 55,
  clubValue: 2500000,
  transferListSize: 45,
  transferListMax: 100,
  watchlistSize: 30,
  watchlistMax: 50,
  unassignedSize: 5,
};

/**
 * Sample empty club stats (new account)
 */
export const mockEmptyClubStats: ClubStats = {
  totalItems: 50,
  players: 40,
  managers: 2,
  consumables: 8,
  clubItems: 0,
  clubValue: 15000,
  transferListSize: 0,
  transferListMax: 30,
  watchlistSize: 0,
  watchlistMax: 50,
  unassignedSize: 0,
};

/**
 * Sample full club stats
 */
export const mockFullClubStats: ClubStats = {
  totalItems: 5000,
  players: 4500,
  managers: 100,
  consumables: 300,
  clubItems: 100,
  clubValue: 50000000,
  transferListSize: 100,
  transferListMax: 100,
  watchlistSize: 50,
  watchlistMax: 50,
  unassignedSize: 50,
};
