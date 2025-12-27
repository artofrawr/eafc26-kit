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

