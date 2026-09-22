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
# (Force build commit to ensure Railway pulls latest)
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Routers
# ---------------------------------------------------------------------------
app.include_router(health_router, prefix="/api/v1")
app.include_router(assessments_router, prefix="/api/v1")
