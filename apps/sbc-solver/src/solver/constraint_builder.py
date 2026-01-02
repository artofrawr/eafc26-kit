"""
Constraint builder for SBC solver
Builds OR-Tools CP-SAT constraints from SBC requirements
"""

from typing import List
from ortools.sat.python import cp_model
from .models import (
    SolverPlayer,
    LeagueConstraint,
    CountryConstraint,
    ClubConstraint,
    QualityConstraint,
    RarityConstraint,
    RatingConstraint,
    ChemistryConstraint
)


class SBCConstraintBuilder:
    """Builds CP-SAT constraints for SBC requirements"""

    def __init__(self, model: cp_model.CpModel):
        self.model = model

    def create_player_variables(
        self,
        num_players: int
    ) -> List[cp_model.IntVar]:
        """
        Create binary variables for each player selection

        Args:
            num_players: Total number of available players

        Returns:
            List of binary variables (1 = selected, 0 = not selected)
        """
        return [
            self.model.NewBoolVar(f'player_{i}')
            for i in range(num_players)
        ]

    def add_squad_size_constraint(
        self,
        player_vars: List[cp_model.IntVar],
        squad_size: int
    ) -> None:
        """
        Add constraint for exact squad size

        Args:
            player_vars: Player selection variables
            squad_size: Required number of players
        """
        self.model.Add(sum(player_vars) == squad_size)

    def add_league_constraints(
        self,
        player_vars: List[cp_model.IntVar],
        players: List[SolverPlayer],
        constraints: List[LeagueConstraint]
    ) -> None:
        """
        Add league-based constraints

        Args:
            player_vars: Player selection variables
            players: Available players
            constraints: League constraints to apply
        """
        for constraint in constraints:
            if constraint.league_ids:
                # Specific leagues constraint
                count = sum(
                    player_vars[i]
                    for i, p in enumerate(players)
                    if p.league_id in constraint.league_ids
                )
                self._apply_constraint_type(count, constraint.type, constraint.count)
            else:
                # "Same league" constraint - all selected players must share a league
                self._add_same_attribute_constraint(
                    player_vars,
                    players,
                    lambda p: p.league_id,
                    constraint.type,
                    constraint.count,
                    'league'
                )

    def add_country_constraints(
        self,
        player_vars: List[cp_model.IntVar],
        players: List[SolverPlayer],
        constraints: List[CountryConstraint]
    ) -> None:
        """
        Add country-based constraints

        Args:
            player_vars: Player selection variables
            players: Available players
            constraints: Country constraints to apply
        """
        for constraint in constraints:
            if constraint.country_ids:
                # Specific countries constraint
                count = sum(
                    player_vars[i]
                    for i, p in enumerate(players)
                    if p.country_id in constraint.country_ids
                )
                self._apply_constraint_type(count, constraint.type, constraint.count)
            else:
                # "Same country" constraint
                self._add_same_attribute_constraint(
                    player_vars,
                    players,
                    lambda p: p.country_id,
                    constraint.type,
                    constraint.count,
                    'country'
                )

    def add_club_constraints(
        self,
        player_vars: List[cp_model.IntVar],
        players: List[SolverPlayer],
        constraints: List[ClubConstraint]
    ) -> None:
        """
        Add club-based constraints

        Args:
            player_vars: Player selection variables
            players: Available players
            constraints: Club constraints to apply
        """
        for constraint in constraints:
            if constraint.club_id:
                # Specific club constraint
                count = sum(
                    player_vars[i]
                    for i, p in enumerate(players)
                    if p.club_id == constraint.club_id
                )
                self._apply_constraint_type(count, constraint.type, constraint.count)
            else:
                # "Same club" constraint
                self._add_same_attribute_constraint(
                    player_vars,
                    players,
                    lambda p: p.club_id,
                    constraint.type,
                    constraint.count,
                    'club'
                )

    def add_quality_constraints(
        self,
        player_vars: List[cp_model.IntVar],
        players: List[SolverPlayer],
        constraints: List[QualityConstraint],
        quality_map: dict = None
    ) -> None:
        """
        Add quality (bronze/silver/gold/special) constraints

        Args:
            player_vars: Player selection variables
            players: Available players
            constraints: Quality constraints to apply
            quality_map: Maps quality name to database ID (from database)
        """
        # Use provided quality map or fallback to default
        # (fallback should not be used if database is set up correctly)
        if quality_map is None:
            quality_map = {
                'bronze': 1,
                'silver': 2,
                'gold': 3,
                'special': 4
            }
            print("⚠️  WARNING: Using hardcoded quality map. Database mapping should be provided!")

        for constraint in constraints:
            quality_id = quality_map.get(constraint.quality)
            if quality_id is None:
                print(f"⚠️  WARNING: Unknown quality '{constraint.quality}' in constraint")
                continue

            # Count how many players match this quality
            matching_players = [p for p in players if p.quality_id == quality_id]
            print(f"Found {len(matching_players)} {constraint.quality} players (quality_id={quality_id})")
            print(f"  Constraint: {constraint.type} {constraint.count}")

            # Show sample of matching players
            sorted_matching = sorted(matching_players, key=lambda p: p.ovr)
            print(f"  Sample {constraint.quality} players (sorted by OVR):")
            for p in sorted_matching[:10]:
                squad_flag = " [SQUAD]" if p.squad else ""
                sbc_flag = " [SBC]" if p.sbc else ""
                print(f"    {p.display_name} (OVR {p.ovr}){squad_flag}{sbc_flag}")

            # Show sample of quality IDs in dataset
            quality_ids_in_data = set(p.quality_id for p in players)
            print(f"  All quality_ids in dataset: {sorted(quality_ids_in_data)}")

            count = sum(
                player_vars[i]
                for i, p in enumerate(players)
                if p.quality_id == quality_id
            )
            self._apply_constraint_type(count, constraint.type, constraint.count)

    def add_rarity_constraints(
        self,
        player_vars: List[cp_model.IntVar],
        players: List[SolverPlayer],
        constraints: List[RarityConstraint]
    ) -> None:
        """
        Add rarity constraints (rare vs common)

        Note: This assumes rarity_id follows a pattern where certain IDs are "rare"
        This may need adjustment based on actual database values

        Args:
            player_vars: Player selection variables
            players: Available players
            constraints: Rarity constraints to apply
        """
        for constraint in constraints:
            # TODO: Determine which rarity_ids are considered "rare"
            # For now, assume rarity_id > 1 means rare (Common=1, Rare=2+)
            if constraint.rare:
                # Count rare players
                count = sum(
                    player_vars[i]
                    for i, p in enumerate(players)
                    if p.rarity_id > 1
                )
            else:
                # Count common players
                count = sum(
                    player_vars[i]
                    for i, p in enumerate(players)
                    if p.rarity_id == 1
                )

            self._apply_constraint_type(count, constraint.type, constraint.count)

    def add_rating_constraint(
        self,
        player_vars: List[cp_model.IntVar],
        players: List[SolverPlayer],
        constraint: RatingConstraint,
        squad_size: int
    ) -> None:
        """
        Add squad rating constraint

        Squad rating is calculated as the average of selected player ratings

        Args:
            player_vars: Player selection variables
            players: Available players
            constraint: Rating constraint to apply
            squad_size: Expected squad size
        """
        # Calculate weighted sum of ratings
        ratings = [p.ovr for p in players]
        weighted_sum = sum(
            player_vars[i] * ratings[i]
            for i in range(len(players))
        )

        # To avoid floating point, multiply both sides by squad_size
        # avg_rating >= target becomes: sum(ratings) >= target * squad_size
        target_sum = constraint.value * squad_size

        self._apply_constraint_type(weighted_sum, constraint.type, target_sum)

    def add_chemistry_constraint(
        self,
        player_vars: List[cp_model.IntVar],
        players: List[SolverPlayer],
        constraint: ChemistryConstraint
    ) -> None:
        """
        Add chemistry constraint

        Note: FC chemistry system is complex and not fully implemented yet
        This is a placeholder for future implementation

        Args:
            player_vars: Player selection variables
            players: Available players
            constraint: Chemistry constraint to apply
        """
        # TODO: Implement chemistry calculation
        # FC chemistry depends on:
        # - Position chemistry (rating1-6 based on position)
        # - League links between players
        # - Nation links between players
        # - Club links between players
        #
        # This requires additional research into FC26 chemistry mechanics
        pass

    def _add_same_attribute_constraint(
        self,
        player_vars: List[cp_model.IntVar],
        players: List[SolverPlayer],
        attribute_getter,
        constraint_type: str,
        count: int,
        attribute_name: str
    ) -> None:
        """
        Add constraint for "same attribute" (e.g., all players share same league)

        This creates auxiliary variables for each possible attribute value and
        ensures exactly one attribute is selected, then counts players with that attribute.

        Args:
            player_vars: Player selection variables
            players: Available players
            attribute_getter: Function to get attribute value from player
            constraint_type: 'min', 'max', or 'exact'
            count: Required count
            attribute_name: Name for variable naming (e.g., 'league')
        """
        # Get all unique attribute values
        attribute_values = set(attribute_getter(p) for p in players)

        # Create binary variables for each possible attribute value
        attribute_vars = {
            val: self.model.NewBoolVar(f'{attribute_name}_{val}')
            for val in attribute_values
        }

        # Exactly one attribute must be selected
        self.model.Add(sum(attribute_vars.values()) == 1)

        # For each attribute value, count how many players have it
        for attr_val, attr_var in attribute_vars.items():
            players_with_attr = [
                i for i, p in enumerate(players)
                if attribute_getter(p) == attr_val
            ]

            if not players_with_attr:
                continue

            # Count players with this attribute
            count_with_attr = sum(player_vars[i] for i in players_with_attr)

            # If this attribute is selected, enforce the count constraint
            # We use a big-M approach here:
            # If attr_var == 1, then count_with_attr must satisfy constraint
            # If attr_var == 0, then count_with_attr can be anything (we use 0)

            if constraint_type == 'min':
                # If selected: count >= required, else: count can be 0
                self.model.Add(count_with_attr >= count).OnlyEnforceIf(attr_var)
                self.model.Add(count_with_attr == 0).OnlyEnforceIf(attr_var.Not())
            elif constraint_type == 'max':
                # If selected: count <= required
                self.model.Add(count_with_attr <= count).OnlyEnforceIf(attr_var)
                self.model.Add(count_with_attr == 0).OnlyEnforceIf(attr_var.Not())
            elif constraint_type == 'exact':
                # If selected: count == required
                self.model.Add(count_with_attr == count).OnlyEnforceIf(attr_var)
                self.model.Add(count_with_attr == 0).OnlyEnforceIf(attr_var.Not())

    def _apply_constraint_type(
        self,
        expr,
        constraint_type: str,
        value: int
    ) -> None:
        """
        Apply min/max/exact constraint to an expression

        Args:
            expr: Linear expression to constrain
            constraint_type: 'min', 'max', or 'exact'
            value: Target value
        """
        if constraint_type == 'min':
            self.model.Add(expr >= value)
        elif constraint_type == 'max':
            self.model.Add(expr <= value)
        elif constraint_type == 'exact':
            self.model.Add(expr == value)
