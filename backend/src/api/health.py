"""
Health endpoint.

GET /api/v1/health

Returns a simple status payload so the service can be verified locally and
by deployment health checks. No AI service, database, or external call is made.
"""

from datetime import UTC, datetime

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(tags=["health"])


class HealthResponse(BaseModel):
    status: str
    service: str
    version: str
    timestamp: str


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Service health check",
    description=(
        "Returns status=ok when the service is running. "
        "No external dependencies are checked on Day 3."
    ),
)
def get_health() -> HealthResponse:
    return HealthResponse(
        status="ok",
        service="SolarResolve API",
        version="0.1.0",
        timestamp=datetime.now(UTC).isoformat(),
    )
