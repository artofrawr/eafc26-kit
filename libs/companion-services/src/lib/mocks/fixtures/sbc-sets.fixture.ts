/**
 * SBC fixture data for testing
 */

import { SBCSet, SBCChallenge, SBCSquad } from '../../types/sbc.types';

/**
 * Sample daily SBC set
 */
export const mockDailySBCSet: SBCSet = {
  id: 1001,
  name: 'Daily Bronze Upgrade',
  description: 'Exchange 11 Bronze players for 2 Silver players',
  repeatable: true,
  timesCompleted: 5,
  challenges: [],
  awards: [
    {
      type: 'pack',
      value: 'Two Silver Players Pack',
      untradeable: true,
    },
  ],
  category: 'Daily',
};

/**
 * Sample limited-time SBC set
 */
export const mockPromoSBCSet: SBCSet = {
  id: 2001,
  name: 'Winter Wildcards Hero',
  description: 'Complete all challenges to earn a Winter Wildcards Hero',
  endTime: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days from now
  repeatable: false,
  timesCompleted: 0,
  challenges: [],
  awards: [
    {
      type: 'player',
      value: 'Winter Wildcards Hero',
      untradeable: true,
    },
  ],
  category: 'Promo',
};

/**
 * Sample SBC challenge
 */
export const mockSBCChallenge: SBCChallenge = {
  id: 10001,
  setId: 1001,
  name: 'Bronze Upgrade',
  description: 'Submit 11 Bronze players',
  status: 'incomplete',
  requirements: [
    { type: 'playerCount', value: 11 },
    { type: 'minQuality', value: 'bronze' },
  ],
  awards: [
    {
      type: 'pack',
      value: 'Two Silver Players Pack',
      untradeable: true,
    },
  ],
  formation: '4-3-3',
};

/**
 * Sample completed challenge
 */
export const mockCompletedChallenge: SBCChallenge = {
  ...mockSBCChallenge,
  id: 10002,
  status: 'complete',
};

/**
 * Sample SBC squad solution
 */
export const mockSBCSquad: SBCSquad = {
  id: 50001,
  challengeId: 10001,
  players: [
    { index: 0, position: 'GK', chemistry: 3, locked: false },
    { index: 1, position: 'RB', chemistry: 3, locked: false },
    { index: 2, position: 'CB', chemistry: 3, locked: false },
    { index: 3, position: 'CB', chemistry: 3, locked: false },
    { index: 4, position: 'LB', chemistry: 3, locked: false },
    { index: 5, position: 'CM', chemistry: 3, locked: false },
    { index: 6, position: 'CM', chemistry: 3, locked: false },
    { index: 7, position: 'CM', chemistry: 3, locked: false },
    { index: 8, position: 'RW', chemistry: 3, locked: false },
    { index: 9, position: 'ST', chemistry: 3, locked: false },
    { index: 10, position: 'LW', chemistry: 3, locked: false },
  ],
  chemistry: 33,
  rating: 65,
  formation: '4-3-3',
};

/**
 * Array of sample SBC sets
 */
export const mockSBCSets: SBCSet[] = [
  mockDailySBCSet,
  mockPromoSBCSet,
  {
    id: 1002,
    name: 'Daily Silver Upgrade',
    description: 'Exchange 11 Silver players for 2 Gold players',
    repeatable: true,
    timesCompleted: 3,
    challenges: [],
    awards: [
      {
        type: 'pack',
        value: 'Two Gold Players Pack',
        untradeable: true,
      },
    ],
    category: 'Daily',
  },
  {
    id: 1003,
    name: 'Daily Gold Upgrade',
    description: 'Exchange 11 Common Gold players for 2 Rare Gold players',
    repeatable: true,
    timesCompleted: 2,
    challenges: [],
    awards: [
      {
        type: 'pack',
        value: 'Two Rare Gold Players Pack',
        untradeable: true,
      },
    ],
    category: 'Daily',
  },
];
