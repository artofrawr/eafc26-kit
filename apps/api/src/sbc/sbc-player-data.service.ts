import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@eafc26-kit/database';
import { SolverPlayer, QualityType } from '@eafc26-kit/shared-types';

/**
 * Service to fetch and transform player data for the SBC solver
 */
@Injectable()
export class SBCPlayerDataService {
  private readonly logger = new Logger(SBCPlayerDataService.name);
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Get quality name to ID mapping from database
   * Returns a map like { bronze: 4, silver: 3, gold: 2, special: 1 }
   */
  async getQualityMap(): Promise<Record<QualityType, number>> {
    const qualities = await this.prisma.quality.findMany();
    const map: Record<string, number> = {};

    for (const quality of qualities) {
      const name = quality.name.toLowerCase() as QualityType;
      map[name] = quality.id;
    }

    return map as Record<QualityType, number>;
  }

  /**
   * Get rarity name to ID mapping from database
   */
  async getRarityMap(): Promise<Record<string, number>> {
    const rarities = await this.prisma.rarity.findMany();
    const map: Record<string, number> = {};

    for (const rarity of rarities) {
      map[rarity.name.toLowerCase()] = rarity.id;
    }

    return map;
  }

  /**
   * Get all available players for SBC solving
   *
   * @param excludeSquadPlayers If true, excludes players in active squad (default: true)
   * @returns Array of players formatted for the solver
   */
  async getAvailablePlayers(excludeSquadPlayers: boolean = true): Promise<SolverPlayer[]> {
    this.logger.log('Fetching available players for SBC solver');

    const clubPlayers = await this.prisma.clubPlayer.findMany({
      where: excludeSquadPlayers ? { squad: false } : {},
      include: {
        player: {
          include: {
            positions: {
              include: {
                position: true,
              },
            },
          },
        },
      },
    });

    this.logger.log(`Found ${clubPlayers.length} available club players`);

    // Transform to SolverPlayer format
    const solverPlayers: SolverPlayer[] = clubPlayers.map((cp: any) => ({
      id: cp.id,
      playerId: cp.player.id,
      displayName: cp.player.displayName,
      fullName: cp.player.fullName,
      ovr: cp.player.ovr,
      rating1: cp.player.rating1,
      rating2: cp.player.rating2,
      rating3: cp.player.rating3,
      rating4: cp.player.rating4,
      rating5: cp.player.rating5,
      rating6: cp.player.rating6,
      qualityId: cp.player.qualityId,
      rarityId: cp.player.rarityId,
      countryId: cp.player.countryId,
      clubId: cp.player.clubId,
      leagueId: cp.player.leagueId,
      positions: cp.player.positions.map((pp: any) => pp.positionId),
      sbc: cp.sbc,
      squad: cp.squad,
    }));

    return solverPlayers;
  }

  /**
   * Get specific players by their ClubPlayer IDs
   * Useful for retrieving solution players after solving
   *
   * @param clubPlayerIds Array of ClubPlayer IDs
   * @returns Array of players with details
   */
  async getPlayersByIds(clubPlayerIds: number[]): Promise<SolverPlayer[]> {
    this.logger.log(`Fetching ${clubPlayerIds.length} specific players`);

    const clubPlayers = await this.prisma.clubPlayer.findMany({
      where: {
        id: {
          in: clubPlayerIds,
        },
      },
      include: {
        player: {
          include: {
            positions: {
              include: {
                position: true,
              },
            },
          },
        },
      },
    });

    return clubPlayers.map((cp: any) => ({
      id: cp.id,
      playerId: cp.player.id,
      displayName: cp.player.displayName,
      fullName: cp.player.fullName,
      ovr: cp.player.ovr,
      rating1: cp.player.rating1,
      rating2: cp.player.rating2,
      rating3: cp.player.rating3,
      rating4: cp.player.rating4,
      rating5: cp.player.rating5,
      rating6: cp.player.rating6,
      qualityId: cp.player.qualityId,
      rarityId: cp.player.rarityId,
      countryId: cp.player.countryId,
      clubId: cp.player.clubId,
      leagueId: cp.player.leagueId,
      positions: cp.player.positions.map((pp: any) => pp.positionId),
      sbc: cp.sbc,
      squad: cp.squad,
    }));
  }
}
