"""
SolarResolve — FastAPI application entry point.

Day 3 scope: health endpoint only.
No AI service, database, authentication, or payment flow is present.
"""

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.api.assessments import router as assessments_router
from src.api.health import router as health_router

app = FastAPI(
    title="SolarResolve API",
    version="0.1.0",
    description=(
        "Decision-support service for Nigerian solar owners experiencing "
        "declining battery runtime. Day 4 AI integration."
    ),
    # Disable the automatic OpenAPI docs in production when the AI phase is
    # added and credentials are present.
    docs_url="/docs",
    redoc_url="/redoc",
)

# ---------------------------------------------------------------------------
# CORS
# ---------------------------------------------------------------------------
allowed_origins_str = os.environ.get("ALLOWED_ORIGINS", "https://solar-resolve-24.vercel.app")
allowed_origins = [o.strip() for o in allowed_origins_str.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Routers
# ---------------------------------------------------------------------------
app.include_router(health_router, prefix="/api/v1")
app.include_router(assessments_router, prefix="/api/v1")
