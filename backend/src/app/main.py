"""
SolarResolve — FastAPI application entry point.

Day 3 scope: health endpoint only.
No AI service, database, authentication, or payment flow is present.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.api.health import router as health_router
from src.api.assessments import router as assessments_router

app = FastAPI(
    title="SolarResolve API",
    version="0.1.0",
    description=(
        "Decision-support service for Nigerian solar owners experiencing "
        "declining battery runtime. Day 3 foundation — health endpoint only."
    ),
    # Disable the automatic OpenAPI docs in production when the AI phase is
    # added and credentials are present.
    docs_url="/docs",
    redoc_url="/redoc",
)

# ---------------------------------------------------------------------------
# CORS — allow the Vite dev server and future production origins.
# Adjust CORS_ORIGINS via environment variable before deploying.
# ---------------------------------------------------------------------------
import os

_raw_origins = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:5173,http://127.0.0.1:5173",
)
_allowed_origins = [o.strip() for o in _raw_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Accept"],
)

# ---------------------------------------------------------------------------
# Routers
# ---------------------------------------------------------------------------
app.include_router(health_router, prefix="/api/v1")
app.include_router(assessments_router, prefix="/api/v1")
