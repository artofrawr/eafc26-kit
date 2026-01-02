"""
Main SBC solver using Google OR-Tools CP-SAT
"""

import time
import threading
from typing import Callable, Optional
from ortools.sat.python import cp_model
from .models import SolveSBCRequest, SolveSBCResponse
from .constraint_builder import SBCConstraintBuilder
from .objective import build_objective


class SolutionPrinter(cp_model.CpSolverSolutionCallback):
    """
    Callback to track solution progress and improvements
    Implements automatic stopping after no improvement timeout
    """

    def __init__(
        self,
        log_callback: Callable[[str], None],
        no_improvement_time: int
    ):
        cp_model.CpSolverSolutionCallback.__init__(self)
        self.log_callback = log_callback
        self.solution_count = 0
        self.start_time = time.time()
        self.last_improvement_time = time.time()
        self.no_improvement_time = no_improvement_time
        self.best_objective = None
        self.stop_requested = False
        self._start_timeout_monitor()

    def _start_timeout_monitor(self):
        """Start a background thread to monitor for no-improvement timeout"""
        def monitor():
            while not self.stop_requested:
                time.sleep(1)  # Check every second

                # Only check timeout if we've found at least one solution
                if self.solution_count > 0:
                    time_since_improvement = time.time() - self.last_improvement_time
                    if time_since_improvement >= self.no_improvement_time:
                        self.log_callback(
                            f"⏱️  No improvement for {self.no_improvement_time}s, stopping search..."
                        )
                        self.stop_requested = True
                        self.StopSearch()
                        break

        self.monitor_thread = threading.Thread(target=monitor, daemon=True)
        self.monitor_thread.start()

    def on_solution_callback(self):
        """Called each time a new solution is found"""
        self.solution_count += 1
        current_time = time.time()
        elapsed = current_time - self.start_time
        self.last_improvement_time = current_time  # Reset the no-improvement timer

        objective = self.ObjectiveValue()
        self.best_objective = objective

        self.log_callback(
            f"✓ Solution #{self.solution_count} found at {elapsed:.2f}s "
            f"(objective: {objective})"
        )


class SBCSolver:
    """Main SBC solver using CP-SAT"""

    def __init__(self, log_callback: Optional[Callable[[str], None]] = None):
        """
        Initialize solver

        Args:
            log_callback: Optional callback for logging messages
        """
        self.log_callback = log_callback or print

    def solve(self, request: SolveSBCRequest) -> SolveSBCResponse:
        """
        Solve an SBC using constraint programming

        Args:
            request: SBC solve request with requirements and players

        Returns:
            Solver response with solution or error status
        """
        try:
            self.log_callback(
                f"Starting solver with {len(request.available_players)} players"
            )
            self.log_callback(f"Squad size: {request.requirements.squad_size}")

            # Create model
            model = cp_model.CpModel()
            builder = SBCConstraintBuilder(model)

            # Create variables
            num_players = len(request.available_players)
            player_vars = builder.create_player_variables(num_players)

            # Add constraints
            self.log_callback("Adding constraints...")

            # Squad size (required)
            builder.add_squad_size_constraint(
                player_vars,
                request.requirements.squad_size
            )

            # League constraints
            if request.requirements.leagues:
                self.log_callback(f"Adding {len(request.requirements.leagues)} league constraints")
                builder.add_league_constraints(
                    player_vars,
                    request.available_players,
                    request.requirements.leagues
                )

            # Country constraints
            if request.requirements.countries:
                self.log_callback(f"Adding {len(request.requirements.countries)} country constraints")
                builder.add_country_constraints(
                    player_vars,
                    request.available_players,
                    request.requirements.countries
                )

            # Club constraints
            if request.requirements.clubs:
                self.log_callback(f"Adding {len(request.requirements.clubs)} club constraints")
                builder.add_club_constraints(
                    player_vars,
                    request.available_players,
                    request.requirements.clubs
                )

            # Quality constraints
            if request.requirements.quality:
                self.log_callback(f"Adding {len(request.requirements.quality)} quality constraints")
                builder.add_quality_constraints(
                    player_vars,
                    request.available_players,
                    request.requirements.quality,
                    request.quality_map
                )

            # Rarity constraints
            if request.requirements.rarity:
                self.log_callback(f"Adding {len(request.requirements.rarity)} rarity constraints")
                builder.add_rarity_constraints(
                    player_vars,
                    request.available_players,
                    request.requirements.rarity
                )

            # Team rating constraint
            if request.requirements.team_rating:
                self.log_callback(f"Adding team rating constraint: {request.requirements.team_rating.type} {request.requirements.team_rating.value}")
                builder.add_rating_constraint(
                    player_vars,
                    request.available_players,
                    request.requirements.team_rating,
                    request.requirements.squad_size
                )

            # Chemistry constraint (if implemented)
            if request.requirements.chemistry:
                self.log_callback(f"Adding chemistry constraint: {request.requirements.chemistry.type} {request.requirements.chemistry.value}")
                builder.add_chemistry_constraint(
                    player_vars,
                    request.available_players,
                    request.requirements.chemistry
                )

            # Add objective function
            self.log_callback("Building objective function (minimize high-rated players)...")
            build_objective(model, player_vars, request.available_players)

            # Solve
            self.log_callback("Starting CP-SAT solver...")
            solver = cp_model.CpSolver()

            # Configure solver
            solver.parameters.max_time_in_seconds = request.max_solve_time
            solver.parameters.num_search_workers = 8  # Parallel search
            solver.parameters.log_search_progress = False  # We have our own logging

            # Solution callback for tracking improvements
            solution_printer = SolutionPrinter(
                self.log_callback,
                request.no_improvement_time
            )

            start_time = time.time()

            # Run solver with periodic timeout checking
            status = solver.Solve(model, solution_printer)

            solve_time = time.time() - start_time

            # Build and return response
            return self._build_response(
                status,
                solver,
                player_vars,
                request.available_players,
                solve_time,
                solution_printer
            )

        except Exception as e:
            self.log_callback(f"Error during solving: {str(e)}")
            return SolveSBCResponse(
                success=False,
                status='MODEL_INVALID',
                message=f"Solver error: {str(e)}"
            )

    def _build_response(
        self,
        status: int,
        solver: cp_model.CpSolver,
        player_vars,
        players,
        solve_time: float,
        solution_printer: SolutionPrinter
    ) -> SolveSBCResponse:
        """
        Build response based on solver status

        Args:
            status: CP-SAT status code
            solver: Solver instance
            player_vars: Player selection variables
            players: Available players
            solve_time: Total solve time
            solution_printer: Solution callback

        Returns:
            Formatted solver response
        """
        # Map CP-SAT status to our status codes
        status_map = {
            cp_model.OPTIMAL: 'OPTIMAL',
            cp_model.FEASIBLE: 'FEASIBLE',
            cp_model.INFEASIBLE: 'INFEASIBLE',
            cp_model.MODEL_INVALID: 'MODEL_INVALID',
            cp_model.UNKNOWN: 'TIMEOUT',
        }

        status_str = status_map.get(status, 'UNKNOWN')

        if status in (cp_model.OPTIMAL, cp_model.FEASIBLE):
            # Extract solution
            selected_ids = [
                players[i].id
                for i in range(len(players))
                if solver.Value(player_vars[i]) == 1
            ]

            # Calculate squad rating
            selected_players = [
                players[i]
                for i in range(len(players))
                if solver.Value(player_vars[i]) == 1
            ]

            if selected_players:
                squad_rating = sum(p.ovr for p in selected_players) / len(selected_players)
            else:
                squad_rating = 0.0

            self.log_callback(
                f"✓ Solution found! {len(selected_ids)} players selected, "
                f"avg rating: {squad_rating:.1f}"
            )

            # Log selected players
            self.log_callback("\nSelected players:")
            for player in sorted(selected_players, key=lambda p: p.ovr):
                storage_info = " [SBC Storage]" if player.sbc else ""
                squad_info = " [SQUAD]" if player.squad else ""
                self.log_callback(
                    f"  - {player.display_name} ({player.ovr} OVR){storage_info}{squad_info}"
                )

            return SolveSBCResponse(
                success=True,
                status=status_str,
                selected_player_ids=selected_ids,
                squad_rating=squad_rating,
                solve_time=solve_time,
                message=f"Found solution in {solve_time:.2f}s with {solution_printer.solution_count} improvements"
            )
        else:
            # No solution found
            if status == cp_model.INFEASIBLE:
                message = "No valid solution exists for these requirements"
            elif status == cp_model.UNKNOWN:
                message = f"Solver timeout after {solve_time:.2f}s"
            else:
                message = f"Solver failed with status: {status_str}"

            self.log_callback(f"✗ {message}")

            return SolveSBCResponse(
                success=False,
                status=status_str,
                solve_time=solve_time,
                message=message
            )
