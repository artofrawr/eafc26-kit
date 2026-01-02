"""
FastAPI application for SBC solver service
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.routes import router

# Create FastAPI app
app = FastAPI(
    title="SBC Solver API",
    description="Constraint-based solver for EA FC Squad Building Challenges",
    version="0.1.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Next.js control panel
        "http://localhost:3001",  # NestJS API
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes with /api/v1 prefix
app.include_router(router, prefix="/api/v1")


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "service": "SBC Solver API",
        "version": "0.1.0",
        "status": "running"
    }
