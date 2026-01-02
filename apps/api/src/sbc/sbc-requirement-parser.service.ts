import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@eafc26-kit/database';
import {
  SBCRequirementSet,
  LeagueConstraint,
  CountryConstraint,
  ClubConstraint,
  QualityConstraint,
  RarityConstraint,
  RatingConstraint,
  ChemistryConstraint,
  ConstraintType,
  QualityType,
} from '@eafc26-kit/shared-types';

/**
 * Service to parse SBC requirement text into structured constraints
 */
@Injectable()
export class SBCRequirementParserService {
  private readonly logger = new Logger(SBCRequirementParserService.name);
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Parse requirement text strings into a structured requirement set
   *
   * @param requirementTexts Array of requirement text strings
   * @param squadSize Optional squad size (will try to extract if not provided)
   * @returns Structured SBC requirements
   */
  async parseRequirements(
    requirementTexts: string[],
    squadSize?: number
  ): Promise<SBCRequirementSet> {
    this.logger.log(`Parsing ${requirementTexts.length} requirement texts`);

    const requirements: SBCRequirementSet = {
      squadSize: squadSize || 11, // Default to 11
    };

    for (const text of requirementTexts) {
      await this.parseRequirementText(text, requirements);
    }

    this.logger.log('Parsed requirements:', JSON.stringify(requirements, null, 2));

    return requirements;
  }

  /**
   * Parse a single requirement text and add to requirements object
   */
  private async parseRequirementText(
    text: string,
    requirements: SBCRequirementSet
  ): Promise<void> {
    const lowerText = text.toLowerCase().trim();

    // Try to parse squad size
    const squadSizeResult = this.parseSquadSize(lowerText);
    if (squadSizeResult !== null) {
      requirements.squadSize = squadSizeResult;
      return;
    }

    // Try to parse team rating
    const ratingResult = this.parseRating(lowerText);
    if (ratingResult) {
      requirements.teamRating = ratingResult;
      return;
    }

    // Try to parse chemistry
    const chemistryResult = this.parseChemistry(lowerText);
    if (chemistryResult) {
      requirements.chemistry = chemistryResult;
      return;
    }

    // Try to parse quality (bronze/silver/gold)
    const qualityResult = this.parseQuality(lowerText);
    if (qualityResult) {
      if (!requirements.quality) requirements.quality = [];
      requirements.quality.push(qualityResult);
      return;
    }

    // Try to parse rarity (rare)
    const rarityResult = this.parseRarity(lowerText);
    if (rarityResult) {
      if (!requirements.rarity) requirements.rarity = [];
      requirements.rarity.push(rarityResult);
      return;
    }

    // Try to parse league constraints
    const leagueResult = await this.parseLeague(text, lowerText);
    if (leagueResult) {
      if (!requirements.leagues) requirements.leagues = [];
      requirements.leagues.push(leagueResult);
      return;
    }

    // Try to parse country constraints
    const countryResult = await this.parseCountry(text, lowerText);
    if (countryResult) {
      if (!requirements.countries) requirements.countries = [];
      requirements.countries.push(countryResult);
      return;
    }

    // Try to parse club constraints
    const clubResult = await this.parseClub(text, lowerText);
    if (clubResult) {
      if (!requirements.clubs) requirements.clubs = [];
      requirements.clubs.push(clubResult);
      return;
    }

    this.logger.warn(`Could not parse requirement: "${text}"`);
  }

  /**
   * Parse squad size from text
   */
  private parseSquadSize(text: string): number | null {
    // Patterns: "11", "Squad Size: 11", "Number of Players: 11", "Players: 11"
    const patterns = [
      /(?:squad\s+size|number\s+of\s+players|players)[\s:]*(\d+)/i,
      /^(\d+)$/,
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        const num = parseInt(match[1], 10);
        if (num >= 1 && num <= 11) {
          return num;
        }
      }
    }

    return null;
  }

  /**
   * Parse team rating constraint
   */
  private parseRating(text: string): RatingConstraint | null {
    // Patterns: "Team Rating: Min 80", "Min Team Rating: 80", "Rating: 80+"
    const minMatch = text.match(/(?:team\s+)?rating[\s:]*(?:min|minimum)[\s:]*(\d+)/i);
    if (minMatch && minMatch[1]) {
      return {
        type: 'min',
        value: parseInt(minMatch[1], 10),
      };
    }

    const maxMatch = text.match(/(?:team\s+)?rating[\s:]*(?:max|maximum)[\s:]*(\d+)/i);
    if (maxMatch && maxMatch[1]) {
      return {
        type: 'max',
        value: parseInt(maxMatch[1], 10),
      };
    }

    const exactMatch = text.match(/(?:team\s+)?rating[\s:]*(?:exact|exactly)[\s:]*(\d+)/i);
    if (exactMatch && exactMatch[1]) {
      return {
        type: 'exact',
        value: parseInt(exactMatch[1], 10),
      };
    }

    return null;
  }

  /**
   * Parse chemistry constraint
   */
  private parseChemistry(text: string): ChemistryConstraint | null {
    // Patterns: "Chemistry: 33", "Min Chemistry: 33", "Team Chemistry: 33"
    const minMatch = text.match(/chemistry[\s:]*(?:min|minimum)[\s:]*(\d+)/i);
    if (minMatch && minMatch[1]) {
      return {
        type: 'min',
        value: parseInt(minMatch[1], 10),
      };
    }

    const exactMatch = text.match(/chemistry[\s:]*(\d+)/i);
    if (exactMatch && exactMatch[1]) {
      return {
        type: 'min', // Default to min for chemistry
        value: parseInt(exactMatch[1], 10),
      };
    }

    return null;
  }

  /**
   * Parse quality constraint (bronze/silver/gold/special)
   */
  private parseQuality(text: string): QualityConstraint | null {
    const qualities: QualityType[] = ['bronze', 'silver', 'gold', 'special'];

    for (const quality of qualities) {
      if (text.includes(quality)) {
        // Extract constraint type and count
        const constraint = this.extractConstraintTypeAndCount(text);
        if (constraint) {
          return {
            type: constraint.type,
            count: constraint.count,
            quality,
          };
        }

        // If just quality mentioned, assume exact 11
        return {
          type: 'exact',
          count: 11,
          quality,
        };
      }
    }

    return null;
  }

  /**
   * Parse rarity constraint
   */
  private parseRarity(text: string): RarityConstraint | null {
    if (text.includes('rare')) {
      const constraint = this.extractConstraintTypeAndCount(text);
      if (constraint) {
        return {
          type: constraint.type,
          count: constraint.count,
          rare: true,
        };
      }
    }

    return null;
  }

  /**
   * Parse league constraint
   */
  private async parseLeague(text: string, lowerText: string): Promise<LeagueConstraint | null> {
    // Check for "same league" pattern
    if (lowerText.includes('same league')) {
      const constraint = this.extractConstraintTypeAndCount(lowerText);
      if (constraint) {
        return {
          type: constraint.type,
          count: constraint.count,
          leagueIds: undefined, // undefined means "same league"
        };
      }
    }

    // Check for specific league names
    const leagues = await this.prisma.league.findMany();
    for (const league of leagues) {
      if (text.toLowerCase().includes(league.name.toLowerCase())) {
        const constraint = this.extractConstraintTypeAndCount(lowerText);
        if (constraint) {
          return {
            type: constraint.type,
            count: constraint.count,
            leagueIds: [league.id],
          };
        }
      }
    }

    return null;
  }

  /**
   * Parse country constraint
   */
  private async parseCountry(text: string, lowerText: string): Promise<CountryConstraint | null> {
    // Check for "same country" or "same nation" pattern
    if (lowerText.includes('same country') || lowerText.includes('same nation')) {
      const constraint = this.extractConstraintTypeAndCount(lowerText);
      if (constraint) {
        return {
          type: constraint.type,
          count: constraint.count,
          countryIds: undefined, // undefined means "same country"
        };
      }
    }

    // Check for specific country names
    const countries = await this.prisma.country.findMany();
    for (const country of countries) {
      if (text.toLowerCase().includes(country.name.toLowerCase())) {
        const constraint = this.extractConstraintTypeAndCount(lowerText);
        if (constraint) {
          return {
            type: constraint.type,
            count: constraint.count,
            countryIds: [country.id],
          };
        }
      }
    }

    return null;
  }

  /**
   * Parse club constraint
   */
  private async parseClub(text: string, lowerText: string): Promise<ClubConstraint | null> {
    // Check for "same club" pattern
    if (lowerText.includes('same club')) {
      const constraint = this.extractConstraintTypeAndCount(lowerText);
      if (constraint) {
        return {
          type: constraint.type,
          count: constraint.count,
          clubId: undefined, // undefined means "same club"
        };
      }
    }

    // Check for specific club names
    const clubs = await this.prisma.club.findMany();
    for (const club of clubs) {
      if (text.toLowerCase().includes(club.name.toLowerCase())) {
        const constraint = this.extractConstraintTypeAndCount(lowerText);
        if (constraint) {
          return {
            type: constraint.type,
            count: constraint.count,
            clubId: club.id,
          };
        }
      }
    }

    return null;
  }

  /**
   * Extract constraint type (min/max/exact) and count from text
   */
  private extractConstraintTypeAndCount(text: string): {
    type: ConstraintType;
    count: number;
  } | null {
    // Try "Min X" pattern
    const minMatch = text.match(/(?:min|minimum)[\s:]*(\d+)/i);
    if (minMatch && minMatch[1]) {
      return {
        type: 'min',
        count: parseInt(minMatch[1], 10),
      };
    }

    // Try "Max X" pattern
    const maxMatch = text.match(/(?:max|maximum)[\s:]*(\d+)/i);
    if (maxMatch && maxMatch[1]) {
      return {
        type: 'max',
        count: parseInt(maxMatch[1], 10),
      };
    }

    // Try "Exactly X" or "X exactly" pattern
    const exactMatch = text.match(/(?:exact(?:ly)?|precisely)[\s:]*(\d+)/i);
    if (exactMatch && exactMatch[1]) {
      return {
        type: 'exact',
        count: parseInt(exactMatch[1], 10),
      };
    }

    // Try just a number (default to min)
    const numberMatch = text.match(/(\d+)/);
    if (numberMatch && numberMatch[1]) {
      return {
        type: 'min',
        count: parseInt(numberMatch[1], 10),
      };
    }

    return null;
  }
}
