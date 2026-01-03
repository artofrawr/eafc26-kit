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
    ChemistryConstraint,
    DiversityConstraint,
)


class SBCConstraintBuilder:
    """Builds CP-SAT constraints for SBC requirements"""

    def __init__(self, model: cp_model.CpModel):
        self.model = model

    def create_player_variables(self, num_players: int) -> List[cp_model.IntVar]:
        """
        Create binary variables for each player selection

        Args:
            num_players: Total number of available players

        Returns:
            List of binary variables (1 = selected, 0 = not selected)
        """
        return [self.model.NewBoolVar(f"player_{i}") for i in range(num_players)]

    def add_squad_size_constraint(
        self, player_vars: List[cp_model.IntVar], squad_size: int
    ) -> None:
        """
        Add constraint for exact squad size

        Args:
            player_vars: Player selection variables
            squad_size: Required number of players
        """
        self.model.Add(sum(player_vars) == squad_size)

    def add_unique_player_constraint(
        self, player_vars: List[cp_model.IntVar], players: List[SolverPlayer]
    ) -> None:
        """
        Add constraint to ensure each unique player (by player_id) is only used once

        This prevents selecting multiple copies of the same player when the user
        owns duplicates (e.g., 3 copies of the same card).

        Args:
            player_vars: Player selection variables
            players: Available players
        """
        # Group ClubPlayers by their underlying player_id
        player_id_groups = {}
        for i, p in enumerate(players):
            if p.player_id not in player_id_groups:
                player_id_groups[p.player_id] = []
            player_id_groups[p.player_id].append(i)

        # For each unique player_id, ensure at most 1 ClubPlayer is selected
        for player_id, club_player_indices in player_id_groups.items():
            if len(club_player_indices) > 1:
                # This player has multiple copies - add constraint
                count = sum(player_vars[i] for i in club_player_indices)
                self.model.Add(count <= 1)

    def add_position_constraints(
        self,
        player_vars: List[cp_model.IntVar],
        players: List[SolverPlayer],
        required_positions: List[int],
    ) -> None:
        """
        Add position constraints for each squad slot

        Each position in the squad must be filled by a player who can play there.
        For example, if slot 0 requires a GK (position_id=1), at least one selected
        player must have position_id 1 in their positions array.

        Args:
            player_vars: Player selection variables
            players: Available players
            required_positions: List of position IDs required for each squad slot
        """
        # Group required positions by position ID to count how many of each we need
        position_counts = {}
        for pos_id in required_positions:
            position_counts[pos_id] = position_counts.get(pos_id, 0) + 1

        # For each required position, ensure we have enough players
        for pos_id, count_needed in position_counts.items():
            # Count how many selected players can play this position
            players_with_position = sum(
                player_vars[i] for i, p in enumerate(players) if pos_id in p.positions
            )

            # Must have at least count_needed players who can play this position
            self.model.Add(players_with_position >= count_needed)

    def add_league_constraints(
        self,
        player_vars: List[cp_model.IntVar],
        players: List[SolverPlayer],
        constraints: List[LeagueConstraint],
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
                # "Same league" constraint interpretation depends on type:
                # - Min/exact: "at least/exactly X players from THE SAME league" (pick one league)
                # - Max: "at most X players from ANY SINGLE league" (cardinality constraint)
                if constraint.type == "max":
                    # For each league, at most X players can be from that league
                    self._add_cardinality_constraint(
                        player_vars,
                        players,
                        lambda p: p.league_id,
                        constraint.count,
                        "league",
                    )
                else:
                    # Min/exact: pick one league and have that many players from it
                    self._add_same_attribute_constraint(
                        player_vars,
                        players,
                        lambda p: p.league_id,
                        constraint.type,
                        constraint.count,
                        "league",
                    )

    def add_country_constraints(
        self,
        player_vars: List[cp_model.IntVar],
        players: List[SolverPlayer],
        constraints: List[CountryConstraint],
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
                print(
                    f"  Adding specific country constraint: {constraint.type} {constraint.count} from countries {constraint.country_ids}"
                )
                count = sum(
                    player_vars[i]
                    for i, p in enumerate(players)
                    if p.country_id in constraint.country_ids
                )
                self._apply_constraint_type(count, constraint.type, constraint.count)
            else:
                # "Same country" constraint interpretation depends on type:
                # - Min/exact: "at least/exactly X players from THE SAME country" (pick one country)
                # - Max: "at most X players from ANY SINGLE country" (cardinality constraint)
                if constraint.type == "max":
                    # For each country, at most X players can be from that country
                    print(
                        f"  Adding cardinality constraint: max {constraint.count} players per country"
                    )
                    self._add_cardinality_constraint(
                        player_vars,
                        players,
                        lambda p: p.country_id,
                        constraint.count,
                        "country",
                    )
                else:
                    # Min/exact: pick one country and have that many players from it
                    print(
                        f"  Adding same-country constraint: {constraint.type} {constraint.count} from same country"
                    )
                    self._add_same_attribute_constraint(
                        player_vars,
                        players,
                        lambda p: p.country_id,
                        constraint.type,
                        constraint.count,
                        "country",
                    )

    def add_club_constraints(
        self,
        player_vars: List[cp_model.IntVar],
        players: List[SolverPlayer],
        constraints: List[ClubConstraint],
    ) -> None:
        """
        Add club-based constraints

        Args:
            player_vars: Player selection variables
            players: Available players
            constraints: Club constraints to apply
        """
        for constraint in constraints:
            if constraint.club_ids:
                # Specific clubs constraint (OR logic)
                # Example: "Man City OR Chelsea: Min 2" = at least 2 from either club combined
                print(
                    f"  Adding specific club constraint: {constraint.type} {constraint.count} from clubs {constraint.club_ids}"
                )
                count = sum(
                    player_vars[i]
                    for i, p in enumerate(players)
                    if p.club_id in constraint.club_ids
                )
                self._apply_constraint_type(count, constraint.type, constraint.count)
            else:
                # "Same club" constraint interpretation depends on type:
                # - Min/exact: "at least/exactly X players from THE SAME club" (pick one club)
                # - Max: "at most X players from ANY SINGLE club" (cardinality constraint)
                if constraint.type == "max":
                    # For each club, at most X players can be from that club
                    print(
                        f"  Adding cardinality constraint: max {constraint.count} players per club"
                    )
                    self._add_cardinality_constraint(
                        player_vars,
                        players,
                        lambda p: p.club_id,
                        constraint.count,
                        "club",
                    )
                else:
                    # Min/exact: pick one club and have that many players from it
                    print(
                        f"  Adding same-club constraint: {constraint.type} {constraint.count} from same club"
                    )
                    self._add_same_attribute_constraint(
                        player_vars,
                        players,
                        lambda p: p.club_id,
                        constraint.type,
                        constraint.count,
                        "club",
                    )

    def add_quality_constraints(
        self,
        player_vars: List[cp_model.IntVar],
        players: List[SolverPlayer],
        constraints: List[QualityConstraint],
        quality_map: dict = None,
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
            quality_map = {"bronze": 1, "silver": 2, "gold": 3, "special": 4}
            print(
                "⚠️  WARNING: Using hardcoded quality map. Database mapping should be provided!"
            )

        for constraint in constraints:
            quality_id = quality_map.get(constraint.quality)
            if quality_id is None:
                print(
                    f"⚠️  WARNING: Unknown quality '{constraint.quality}' in constraint"
                )
                continue

            # Count how many players match this quality
            matching_players = [p for p in players if p.quality_id == quality_id]
            print(
                f"Found {len(matching_players)} {constraint.quality} players (quality_id={quality_id})"
            )
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
        constraints: List[RarityConstraint],
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
                    player_vars[i] for i, p in enumerate(players) if p.rarity_id > 1
                )
            else:
                # Count common players
                count = sum(
                    player_vars[i] for i, p in enumerate(players) if p.rarity_id == 1
                )

            self._apply_constraint_type(count, constraint.type, constraint.count)

    def add_rating_constraint(
        self,
        player_vars: List[cp_model.IntVar],
        players: List[SolverPlayer],
        constraint: RatingConstraint,
        squad_size: int,
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
        weighted_sum = sum(player_vars[i] * ratings[i] for i in range(len(players)))

        # To avoid floating point, multiply both sides by squad_size
        # avg_rating >= target becomes: sum(ratings) >= target * squad_size
        target_sum = constraint.value * squad_size

        self._apply_constraint_type(weighted_sum, constraint.type, target_sum)

    def add_chemistry_constraint(
        self,
        player_vars: List[cp_model.IntVar],
        players: List[SolverPlayer],
        constraint: ChemistryConstraint,
    ) -> None:
        """
        Add chemistry constraint

        EA FC 26 Chemistry System:
        - Each player gets 0-3 chemistry from teammates sharing club/league/nation
        - Chemistry buckets determine points based on number of shared teammates
        - Total chemistry = sum of all players' individual chemistry
        - Players must be in valid positions to contribute chemistry

        Args:
            player_vars: Player selection variables
            players: Available players
            constraint: Chemistry constraint to apply
        """
        # Chemistry bucket definitions (from EA FC reference)
        # Format: [[min, max], ...] where index = chemistry tier (0-3)
        club_buckets = [[0, 1], [2, 3], [4, 6], [7, 11]]
        league_buckets = [[0, 2], [3, 4], [5, 7], [8, 11]]
        nation_buckets = [[0, 1], [2, 4], [5, 7], [8, 11]]

        # Get all unique clubs, leagues, nations in player pool
        unique_clubs = set(p.club_id for p in players)
        unique_leagues = set(p.league_id for p in players)
        unique_nations = set(p.country_id for p in players)

        # For each player, calculate their chemistry contribution
        player_chemistry = []

        for i, player in enumerate(players):
            # Chemistry from club links
            club_chem_var = self.model.NewIntVar(0, 3, f"player_{i}_club_chem")
            self._add_bucket_chemistry(
                player_vars,
                players,
                player,
                i,
                lambda p: p.club_id,
                club_buckets,
                club_chem_var,
                "club",
            )

            # Chemistry from league links
            league_chem_var = self.model.NewIntVar(0, 3, f"player_{i}_league_chem")
            self._add_bucket_chemistry(
                player_vars,
                players,
                player,
                i,
                lambda p: p.league_id,
                league_buckets,
                league_chem_var,
                "league",
            )

            # Chemistry from nation links
            nation_chem_var = self.model.NewIntVar(0, 3, f"player_{i}_nation_chem")
            self._add_bucket_chemistry(
                player_vars,
                players,
                player,
                i,
                lambda p: p.country_id,
                nation_buckets,
                nation_chem_var,
                "nation",
            )

            # Total chemistry for this player (capped at 3)
            uncapped_chem = self.model.NewIntVar(0, 9, f"player_{i}_uncapped_chem")
            self.model.Add(
                uncapped_chem == club_chem_var + league_chem_var + nation_chem_var
            )

            capped_chem = self.model.NewIntVar(0, 3, f"player_{i}_chem")
            self.model.AddMinEquality(capped_chem, [uncapped_chem, 3])

            # Player only contributes chemistry if selected
            actual_chem = self.model.NewIntVar(0, 3, f"player_{i}_actual_chem")
            self.model.AddMultiplicationEquality(
                actual_chem, [player_vars[i], capped_chem]
            )

            player_chemistry.append(actual_chem)

        # Total team chemistry = sum of all players' chemistry
        total_chemistry = sum(player_chemistry)

        # Apply the constraint
        self._apply_constraint_type(total_chemistry, constraint.type, constraint.value)

    def _add_bucket_chemistry(
        self,
        player_vars: List[cp_model.IntVar],
        players: List[SolverPlayer],
        player: SolverPlayer,
        player_idx: int,
        attribute_getter,
        buckets: List[List[int]],
        chem_var: cp_model.IntVar,
        attribute_name: str,
    ) -> None:
        """
        Calculate chemistry for a player based on bucket system

        Args:
            player_vars: All player selection variables
            players: All available players
            player: The specific player to calculate chemistry for
            player_idx: Index of the player
            attribute_getter: Function to get attribute (club_id, league_id, country_id)
            buckets: Bucket ranges for chemistry tiers
            chem_var: Variable to store chemistry result (0-3)
            attribute_name: Name for debugging
        """
        player_attribute = attribute_getter(player)

        # Count how many OTHER selected players share this attribute
        # (Don't count the player themselves)
        teammates_with_same = sum(
            player_vars[j]
            for j, p in enumerate(players)
            if j != player_idx and attribute_getter(p) == player_attribute
        )

        # Determine which tier based on teammate count
        # If player not selected, chemistry = 0
        # Otherwise, use buckets to determine tier

        # When player is selected, map teammate count to chemistry tier
        # We'll create boolean variables for each tier and ensure exactly one is active
        tier_vars = []
        for tier, (min_count, max_count) in enumerate(buckets):
            tier_active = self.model.NewBoolVar(
                f"player_{player_idx}_{attribute_name}_tier_{tier}"
            )
            tier_vars.append(tier_active)

            # If this tier is active, teammate count must be in range
            self.model.Add(teammates_with_same >= min_count).OnlyEnforceIf(tier_active)
            self.model.Add(teammates_with_same <= max_count).OnlyEnforceIf(tier_active)

        # When player is selected, exactly one tier must be active
        self.model.Add(sum(tier_vars) == 1).OnlyEnforceIf(player_vars[player_idx])

        # Set chemistry based on which tier is active
        for tier, tier_active in enumerate(tier_vars):
            self.model.Add(chem_var == tier).OnlyEnforceIf(tier_active)

        # If player not selected, chemistry = 0
        self.model.Add(chem_var == 0).OnlyEnforceIf(player_vars[player_idx].Not())

    def add_diversity_constraints(
        self,
        player_vars: List[cp_model.IntVar],
        players: List[SolverPlayer],
        constraints: List[DiversityConstraint],
    ) -> None:
        """
        Add diversity constraints (max/min number of unique clubs/leagues/countries)

        Examples:
        - "Clubs in Squad: Max. 4" = at most 4 different clubs
        - "Leagues in Squad: Min. 2" = at least 2 different leagues

        Args:
            player_vars: Player selection variables
            players: Available players
            constraints: Diversity constraints to apply
        """
        for constraint in constraints:
            # Get the appropriate attribute getter based on the constraint type
            if constraint.attribute == "clubs":
                attribute_getter = lambda p: p.club_id
                attribute_name = "club"
            elif constraint.attribute == "leagues":
                attribute_getter = lambda p: p.league_id
                attribute_name = "league"
            else:  # countries
                attribute_getter = lambda p: p.country_id
                attribute_name = "country"

            # Get all unique attribute values in the player pool
            unique_values = set(attribute_getter(p) for p in players)

            # Create binary variables for each unique value
            # attribute_used[val] = 1 if at least one player with this value is selected
            attribute_used = {}
            for val in unique_values:
                attribute_used[val] = self.model.NewBoolVar(
                    f"{attribute_name}_{val}_used"
                )

            # For each unique value, link the "used" variable to player selection
            for val in unique_values:
                # Get players with this attribute value
                players_with_val = [
                    i for i, p in enumerate(players) if attribute_getter(p) == val
                ]

                if not players_with_val:
                    continue

                # attribute_used[val] == 1 iff at least one player with this value is selected
                # This is: attribute_used[val] <= sum(player_vars[i] for matching players)
                # And: sum(player_vars[i]) <= M * attribute_used[val] (where M = squad size)

                count_with_val = sum(player_vars[i] for i in players_with_val)

                # If any player with this value is selected, mark as used
                # attribute_used[val] == 1 iff count_with_val >= 1
                self.model.Add(count_with_val >= 1).OnlyEnforceIf(attribute_used[val])
                self.model.Add(count_with_val == 0).OnlyEnforceIf(
                    attribute_used[val].Not()
                )

            # Count how many unique values are used
            num_unique = sum(attribute_used.values())

            # Apply the constraint
            self._apply_constraint_type(num_unique, constraint.type, constraint.count)

    def _add_cardinality_constraint(
        self,
        player_vars: List[cp_model.IntVar],
        players: List[SolverPlayer],
        attribute_getter,
        max_count: int,
        attribute_name: str,
    ) -> None:
        """
        Add cardinality constraint: for EACH attribute value, at most max_count players

        Example: "Max 3 from same country" means for each country, at most 3 players
        This allows multiple countries with up to 3 players each.

        Args:
            player_vars: Player selection variables
            players: Available players
            attribute_getter: Function to get attribute value from player
            max_count: Maximum players allowed per attribute value
            attribute_name: Name for debugging (e.g., 'country')
        """
        # Get all unique attribute values
        attribute_values = set(attribute_getter(p) for p in players)

        # For each attribute value, ensure at most max_count players
        for attr_val in attribute_values:
            players_with_attr = [
                i for i, p in enumerate(players) if attribute_getter(p) == attr_val
            ]

            if not players_with_attr:
                continue

            # Count selected players with this attribute value
            count_with_attr = sum(player_vars[i] for i in players_with_attr)

            # Enforce max constraint
            self.model.Add(count_with_attr <= max_count)

    def _add_same_attribute_constraint(
        self,
        player_vars: List[cp_model.IntVar],
        players: List[SolverPlayer],
        attribute_getter,
        constraint_type: str,
        count: int,
        attribute_name: str,
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
            val: self.model.NewBoolVar(f"{attribute_name}_{val}")
            for val in attribute_values
        }

        # Exactly one attribute must be selected
        self.model.Add(sum(attribute_vars.values()) == 1)

        # For each attribute value, count how many players have it
        for attr_val, attr_var in attribute_vars.items():
            players_with_attr = [
                i for i, p in enumerate(players) if attribute_getter(p) == attr_val
            ]

            if not players_with_attr:
                continue

            # Count players with this attribute
            count_with_attr = sum(player_vars[i] for i in players_with_attr)

            # If this attribute is selected, enforce the count constraint
            # We use a big-M approach here:
            # If attr_var == 1, then count_with_attr must satisfy constraint
            # If attr_var == 0, then count_with_attr can be anything (we use 0)

            if constraint_type == "min":
                # If selected: count >= required, else: count can be 0
                self.model.Add(count_with_attr >= count).OnlyEnforceIf(attr_var)
                self.model.Add(count_with_attr == 0).OnlyEnforceIf(attr_var.Not())
            elif constraint_type == "max":
                # If selected: count <= required
                self.model.Add(count_with_attr <= count).OnlyEnforceIf(attr_var)
                self.model.Add(count_with_attr == 0).OnlyEnforceIf(attr_var.Not())
            elif constraint_type == "exact":
                # If selected: count == required
                self.model.Add(count_with_attr == count).OnlyEnforceIf(attr_var)
                self.model.Add(count_with_attr == 0).OnlyEnforceIf(attr_var.Not())

    def _apply_constraint_type(self, expr, constraint_type: str, value: int) -> None:
        """
        Apply min/max/exact constraint to an expression

        Args:
            expr: Linear expression to constrain
            constraint_type: 'min', 'max', or 'exact'
            value: Target value
        """
        if constraint_type == "min":
            self.model.Add(expr >= value)
        elif constraint_type == "max":
            self.model.Add(expr <= value)
        elif constraint_type == "exact":
            self.model.Add(expr == value)
