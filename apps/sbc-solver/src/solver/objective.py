"""
Objective function for SBC solver
Goal: Minimize use of high-rated players and avoid squad players
"""

from typing import List
from ortools.sat.python import cp_model
from .models import SolverPlayer


def build_objective(
    model: cp_model.CpModel,
    player_vars: List[cp_model.IntVar],
    players: List[SolverPlayer]
) -> None:
    """
    Build the objective function to minimize use of high-rated players

    Strategy:
    1. Penalize high OVR players more (base cost = rating)
    2. Heavily penalize squad players (want to avoid using them)
    3. Slightly penalize SBC storage players (prefer using club players)

    Args:
        model: CP-SAT model
        player_vars: Binary variables for player selection
        players: List of available players
    """

    costs = []

    for i, player in enumerate(players):
        # Base cost is the player's overall rating
        # This naturally prefers lower-rated players
        cost = player.ovr

        # Heavy penalty for squad players - we NEVER want to use them
        # This ensures they are only selected if absolutely no other option exists
        if player.squad:
            cost += 1000  # Very high penalty to effectively exclude squad players

        # No penalty for SBC storage - treat them the same as regular club players
        # We want to use the lowest-rated players regardless of storage location

        costs.append(cost)

    # Debug: Show cost breakdown for lowest-rated players
    sorted_players = sorted(
        [(i, p, costs[i]) for i, p in enumerate(players)],
        key=lambda x: x[2]  # Sort by cost
    )
    print("\nObjective function - 10 lowest cost players:")
    for i, player, cost in sorted_players[:10]:
        squad_flag = " [SQUAD]" if player.squad else ""
        sbc_flag = " [SBC]" if player.sbc else ""
        print(f"  {player.display_name} (OVR {player.ovr}, quality_id={player.quality_id}): cost={cost}{squad_flag}{sbc_flag}")

    # Create the objective: minimize total cost
    total_cost = sum(
        player_vars[i] * costs[i]
        for i in range(len(players))
    )

    model.Minimize(total_cost)
