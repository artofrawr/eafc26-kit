// Shared TypeScript types across the monorepo

export interface SbcChallenge {
  id: string;
  name: string;
  requirements: SbcRequirements;
  status: 'pending' | 'solving' | 'solved' | 'failed';
}

export interface SbcRequirements {
  minRating?: number;
  maxRating?: number;
  chemistry?: number;
  league?: string;
  nation?: string;
  club?: string;
  players?: PlayerRequirement[];
}

export interface PlayerRequirement {
  position?: string;
  rating?: number;
  chemistry?: number;
}

export interface SbcSolution {
  id: string;
  challengeId: string;
  players: Player[];
  cost?: number;
  rating?: number;
  isValid: boolean;
}

export interface Player {
  id: string;
  name: string;
  position: string;
  rating: number;
  price?: number;
}

// ============================================================================
// Generic SBC Solver Types (Phase 2)
// These types mirror the Python Pydantic models in apps/sbc-solver
// ============================================================================

/**
 * Constraint type for min/max/exact requirements
 */
export type ConstraintType = 'min' | 'max' | 'exact';

/**
 * Player quality types
 */
export type QualityType = 'bronze' | 'silver' | 'gold' | 'special';

/**
 * Solver status codes
 */
export type SolverStatus = 'OPTIMAL' | 'FEASIBLE' | 'INFEASIBLE' | 'MODEL_INVALID' | 'TIMEOUT';

/**
 * League constraint for SBC requirements
 * - If leagueIds is specified: min/max/exact players from those specific leagues
 * - If leagueIds is undefined: min/max/exact players sharing the same league
 */
export interface LeagueConstraint {
  type: ConstraintType;
  count: number;
  leagueIds?: number[];
}

/**
 * Country constraint for SBC requirements
 * - If countryIds is specified: min/max/exact players from those specific countries
 * - If countryIds is undefined: min/max/exact players sharing the same country
 */
export interface CountryConstraint {
  type: ConstraintType;
  count: number;
  countryIds?: number[];
}

/**
 * Club constraint for SBC requirements
 * - If clubId is specified: min/max/exact players from that specific club
 * - If clubId is undefined: min/max/exact players sharing the same club
 */
export interface ClubConstraint {
  type: ConstraintType;
  count: number;
  clubId?: number;
}

/**
 * Quality constraint (Bronze/Silver/Gold/Special)
 */
export interface QualityConstraint {
  type: ConstraintType;
  count: number;
  quality: QualityType;
}

/**
 * Rarity constraint (rare vs non-rare players)
 */
export interface RarityConstraint {
  type: ConstraintType;
  count: number;
  rare: boolean;
}

/**
 * Squad rating constraint
 */
export interface RatingConstraint {
  type: ConstraintType;
  value: number;
}

/**
 * Team chemistry constraint
 */
export interface ChemistryConstraint {
  type: ConstraintType;
  value: number;
}

/**
 * Complete set of SBC requirements
 */
export interface SBCRequirementSet {
  squadSize: number;
  leagues?: LeagueConstraint[];
  countries?: CountryConstraint[];
  clubs?: ClubConstraint[];
  quality?: QualityConstraint[];
  rarity?: RarityConstraint[];
  teamRating?: RatingConstraint;
  chemistry?: ChemistryConstraint;
}

/**
 * Player data structure sent to solver
 * Mirrors the Player + ClubPlayer database models
 */
export interface SolverPlayer {
  id: number; // ClubPlayer.id
  playerId: number; // Player.id
  displayName: string;
  fullName: string;
  ovr: number; // Overall rating
  rating1: number;
  rating2: number;
  rating3: number;
  rating4: number;
  rating5: number;
  rating6: number;
  qualityId: number;
  rarityId: number;
  countryId: number;
  clubId: number;
  leagueId: number;
  positions: number[]; // Position IDs
  sbc: boolean; // From SBC storage?
  squad: boolean; // In active squad?
}

/**
 * Request to solve an SBC
 */
export interface SolveSBCRequest {
  requirements: SBCRequirementSet;
  availablePlayers: SolverPlayer[];
  maxSolveTime?: number; // Default: 60 seconds
  noImprovementTime?: number; // Default: 30 seconds
  qualityMap?: Record<QualityType, number>; // Maps quality name to database ID
  rarityMap?: Record<string, number>; // Maps rarity name to database ID
}

/**
 * Response from SBC solver
 */
export interface SolveSBCResponse {
  success: boolean;
  status: SolverStatus;
  selectedPlayerIds?: number[];
  squadRating?: number;
  chemistry?: number;
  solveTime?: number;
  message?: string;
}
