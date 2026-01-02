import { Injectable, Logger } from '@nestjs/common';
import { SolveSBCRequest, SolveSBCResponse } from '@eafc26-kit/shared-types';

/**
 * Client for communicating with the Python SBC solver service
 */
@Injectable()
export class PythonSolverClient {
  private readonly logger = new Logger(PythonSolverClient.name);
  private readonly solverUrl: string;

  constructor() {
    // Get solver URL from environment variable or use default
    this.solverUrl = process.env.PYTHON_SOLVER_URL || 'http://localhost:8000';
    this.logger.log(`Python solver URL: ${this.solverUrl}`);
  }

  /**
   * Solve an SBC using the Python solver service
   *
   * @param request SBC solve request with requirements and players
   * @returns Solver response with solution or error
   */
  async solve(request: SolveSBCRequest): Promise<SolveSBCResponse> {
    this.logger.log('Sending solve request to Python solver');

    try {
      const response = await fetch(`${this.solverUrl}/api/v1/solve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.convertToPythonFormat(request)),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Solver request failed: ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      const convertedResult = this.convertFromPythonFormat(result);

      this.logger.log(`Solver returned status: ${convertedResult.status}`);

      return convertedResult;
    } catch (error) {
      this.logger.error('Error calling Python solver:', error);
      throw error;
    }
  }

  /**
   * Check if the Python solver service is healthy
   *
   * @returns True if service is responsive
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.solverUrl}/api/v1/health`, {
        method: 'GET',
      });

      return response.ok;
    } catch (error) {
      this.logger.error('Python solver health check failed:', error);
      return false;
    }
  }

  /**
   * Convert TypeScript request to Python format (camelCase -> snake_case)
   */
  private convertToPythonFormat(request: SolveSBCRequest): any {
    return {
      requirements: {
        squad_size: request.requirements.squadSize,
        leagues: request.requirements.leagues?.map((l) => ({
          type: l.type,
          count: l.count,
          league_ids: l.leagueIds,
        })),
        countries: request.requirements.countries?.map((c) => ({
          type: c.type,
          count: c.count,
          country_ids: c.countryIds,
        })),
        clubs: request.requirements.clubs?.map((c) => ({
          type: c.type,
          count: c.count,
          club_id: c.clubId,
        })),
        quality: request.requirements.quality?.map((q) => ({
          type: q.type,
          count: q.count,
          quality: q.quality,
        })),
        rarity: request.requirements.rarity?.map((r) => ({
          type: r.type,
          count: r.count,
          rare: r.rare,
        })),
        team_rating: request.requirements.teamRating
          ? {
              type: request.requirements.teamRating.type,
              value: request.requirements.teamRating.value,
            }
          : undefined,
        chemistry: request.requirements.chemistry
          ? {
              type: request.requirements.chemistry.type,
              value: request.requirements.chemistry.value,
            }
          : undefined,
      },
      available_players: request.availablePlayers.map((p) => ({
        id: p.id,
        player_id: p.playerId,
        display_name: p.displayName,
        full_name: p.fullName,
        ovr: p.ovr,
        rating1: p.rating1,
        rating2: p.rating2,
        rating3: p.rating3,
        rating4: p.rating4,
        rating5: p.rating5,
        rating6: p.rating6,
        quality_id: p.qualityId,
        rarity_id: p.rarityId,
        country_id: p.countryId,
        club_id: p.clubId,
        league_id: p.leagueId,
        positions: p.positions,
        sbc: p.sbc,
        squad: p.squad,
      })),
      max_solve_time: request.maxSolveTime ?? 60,
      no_improvement_time: request.noImprovementTime ?? 30,
      quality_map: request.qualityMap,
      rarity_map: request.rarityMap,
    };
  }

  /**
   * Convert Python response to TypeScript format (snake_case -> camelCase)
   */
  private convertFromPythonFormat(response: any): SolveSBCResponse {
    return {
      success: response.success,
      status: response.status,
      selectedPlayerIds: response.selected_player_ids,
      squadRating: response.squad_rating,
      chemistry: response.chemistry,
      solveTime: response.solve_time,
      message: response.message,
    };
  }
}
