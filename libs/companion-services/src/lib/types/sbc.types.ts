/**
 * SBC (Squad Building Challenge) types
 */

/**
 * SBC Set - a collection of related challenges
 */
export interface SBCSet {
  id: number;
  name: string;
  description: string;
  endTime?: number; // Unix timestamp if limited time
  challenges: SBCChallenge[];
  repeatable: boolean;
  timesCompleted: number;
  awards: SBCAward[];
  category?: string;
}

/**
 * Individual SBC challenge within a set
 */
export interface SBCChallenge {
  id: number;
  setId: number;
  name: string;
  description: string;
  requirements: SBCRequirement[];
  awards: SBCAward[];
  status: SBCChallengeStatus;
  squadId?: number;
  formation?: string;
}

/**
 * Challenge completion status
 */
export type SBCChallengeStatus = 'incomplete' | 'complete' | 'submitted';

/**
 * SBC Requirement constraint
 */
export interface SBCRequirement {
  type: SBCRequirementType;
  count?: number;
  value?: number | string;
  eligibilityIds?: number[];
  scope?: 'exact' | 'min' | 'max';
}

/**
 * Types of SBC requirements
 */
export type SBCRequirementType =
  | 'squadRating'
  | 'chemistry'
  | 'sameLeague'
  | 'sameNation'
  | 'sameClub'
  | 'minLeagues'
  | 'minNations'
  | 'minClubs'
  | 'maxLeagues'
  | 'maxNations'
  | 'maxClubs'
  | 'minQuality'
  | 'minRarity'
  | 'specificPlayer'
  | 'position'
  | 'playerCount'
  | 'minOverall'
  | 'maxOverall';

/**
 * SBC reward/award
 */
export interface SBCAward {
  type: SBCAwardType;
  value: number | string;
  untradeable?: boolean;
  quantity?: number;
}

/**
 * Types of SBC awards
 */
export type SBCAwardType = 'pack' | 'coins' | 'player' | 'consumable' | 'token';

/**
 * SBC Squad solution
 */
export interface SBCSquad {
  id: number;
  challengeId: number;
  players: SBCSquadSlot[];
  chemistry: number;
  rating: number;
  formation: string;
}

/**
 * Individual slot in an SBC squad
 */
export interface SBCSquadSlot {
  index: number;
  position: string;
  item?: SBCSquadItem;
  chemistry: number;
  locked: boolean;
}

/**
 * Item placed in an SBC squad slot
 */
export interface SBCSquadItem {
  id: number;
  resourceId: number;
  assetId: number;
  rating: number;
  position: string;
  name: string;
  nationId: number;
  leagueId: number;
  clubId: number;
}
