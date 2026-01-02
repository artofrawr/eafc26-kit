"""
FastAPI routes for SBC solver
"""

from fastapi import APIRouter, HTTPException
from ..solver.models import SolveSBCRequest, SolveSBCResponse
from ..solver.or_tools_solver import SBCSolver

router = APIRouter()


@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "sbc-solver",
        "version": "0.1.0"
    }


@router.post("/solve", response_model=SolveSBCResponse)
async def solve_sbc(request: SolveSBCRequest):
    """
    Solve an SBC using constraint programming

    Args:
        request: SBC solve request with requirements and players

    Returns:
        Solver response with solution or error status
    """
    try:
        # Create solver instance
        solver = SBCSolver()

        # Solve the SBC
        response = solver.solve(request)

        return response

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Solver error: {str(e)}"
        )
