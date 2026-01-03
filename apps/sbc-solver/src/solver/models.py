"""
Pydantic models for SBC solver
These models mirror the TypeScript interfaces in libs/shared-types
"""

from typing import List, Optional, Literal, Dict
from pydantic import BaseModel, Field

# Type aliases
ConstraintType = Literal["min", "max", "exact"]
QualityType = Literal["bronze", "silver", "gold", "special"]
SolverStatus = Literal["OPTIMAL", "FEASIBLE", "INFEASIBLE", "MODEL_INVALID", "TIMEOUT"]


class LeagueConstraint(BaseModel):
    """
    League constraint for SBC requirements
    - If league_ids is specified: min/max/exact players from those specific leagues
    - If league_ids is None: min/max/exact players sharing the same league
    """

    type: ConstraintType
    count: int
    league_ids: Optional[List[int]] = None


class CountryConstraint(BaseModel):
    """
    Country constraint for SBC requirements
    - If country_ids is specified: min/max/exact players from those specific countries
    - If country_ids is None: min/max/exact players sharing the same country
    """

    type: ConstraintType
    count: int
    country_ids: Optional[List[int]] = None


class ClubConstraint(BaseModel):
    """
    Club constraint for SBC requirements
    - If club_ids is specified: min/max/exact players from those specific clubs (OR logic)
    - If club_ids is None: min/max/exact players sharing the same club
    """

    type: ConstraintType
    count: int
    club_ids: Optional[List[int]] = None


class QualityConstraint(BaseModel):
    """
    Quality constraint (Bronze/Silver/Gold/Special)
    """

    type: ConstraintType
    count: int
    quality: QualityType


class RarityConstraint(BaseModel):
    """
    Rarity constraint (rare vs non-rare players)
    """

    type: ConstraintType
    count: int
    rare: bool


class RatingConstraint(BaseModel):
    """
    Squad rating constraint
    """

    type: ConstraintType
    value: int


class ChemistryConstraint(BaseModel):
    """
    Team chemistry constraint
    """

    type: ConstraintType
    value: int


class DiversityConstraint(BaseModel):
    """
    Diversity constraint for unique clubs/leagues/countries in squad
    Example: "Clubs in Squad: Max. 4" = at most 4 different clubs
    """

    type: ConstraintType
    count: int
    attribute: Literal["clubs", "leagues", "countries"]


class SBCRequirementSet(BaseModel):
    """
    Complete set of SBC requirements
    """

    squad_size: int
    required_positions: Optional[List[int]] = (
        None  # Array of position IDs, one per squad slot
    )
    leagues: Optional[List[LeagueConstraint]] = None
    countries: Optional[List[CountryConstraint]] = None
    clubs: Optional[List[ClubConstraint]] = None
    quality: Optional[List[QualityConstraint]] = None
    rarity: Optional[List[RarityConstraint]] = None
    team_rating: Optional[RatingConstraint] = None
    chemistry: Optional[ChemistryConstraint] = None
    diversity: Optional[List[DiversityConstraint]] = None


class SolverPlayer(BaseModel):
    """
    Player data structure sent to solver
    Mirrors the Player + ClubPlayer database models
    """

    id: int  # ClubPlayer.id
    player_id: int = Field(alias="playerId")  # Player.id
    display_name: str = Field(alias="displayName")
    full_name: str = Field(alias="fullName")
    ovr: int  # Overall rating
    rating1: int
    rating2: int
    rating3: int
    rating4: int
    rating5: int
    rating6: int
    quality_id: int = Field(alias="qualityId")
    rarity_id: int = Field(alias="rarityId")
    country_id: int = Field(alias="countryId")
    club_id: int = Field(alias="clubId")
    league_id: int = Field(alias="leagueId")
    positions: List[int]  # Position IDs
    sbc: bool  # From SBC storage?
    squad: bool  # In active squad?

    class Config:
        populate_by_name = True  # Allow both camelCase and snake_case


class SolveSBCRequest(BaseModel):
    """
    Request to solve an SBC
    """

    requirements: SBCRequirementSet
    available_players: List[SolverPlayer]
    max_solve_time: int = Field(default=60, description="Maximum solve time in seconds")
    no_improvement_time: int = Field(
        default=30, description="Stop if no improvement for this many seconds"
    )
    quality_map: Optional[Dict[str, int]] = Field(
        default=None,
        alias="qualityMap",
        description="Maps quality name to database ID (e.g., {'bronze': 4, 'silver': 3})",
    )
    rarity_map: Optional[Dict[str, int]] = Field(
        default=None, alias="rarityMap", description="Maps rarity name to database ID"
    )

    class Config:
        populate_by_name = True  # Allow both camelCase and snake_case


class SolveSBCResponse(BaseModel):
    """
    Response from SBC solver
    """

    success: bool
    status: SolverStatus
    selected_player_ids: Optional[List[int]] = None
    squad_rating: Optional[float] = None
    chemistry: Optional[int] = None
    solve_time: Optional[float] = None
    message: Optional[str] = None
