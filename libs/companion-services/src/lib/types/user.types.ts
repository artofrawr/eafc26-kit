/**
 * User and account types
 */

/**
 * User information
 */
export interface UserInfo {
  personaId: number;
  personaName: string;
  clubName: string;
  clubAbbr: string;
  established: number; // Year established
  platform: UserPlatform;
  division?: number;
  seasonXp?: number;
}

/**
 * Platform the user is playing on
 */
export type UserPlatform = 'pc' | 'ps' | 'xbox' | 'switch';

/**
 * User's currencies
 */
export interface UserCurrencies {
  coins: number;
  points: number; // FC Points
  draftTokens?: number;
  seasonTokens?: number;
}

/**
 * Full user profile (getUser response)
 */
export interface UserProfile {
  personaId: number;
  personaName: string;
  club: UserClubInfo;
  currencies: UserCurrencies;
  platform: UserPlatform;
}

/**
 * User's club information
 */
export interface UserClubInfo {
  name: string;
  abbreviation: string;
  established: number;
  badgeId?: number;
  stadiumId?: number;
  divisionOnline?: number;
}
