"""
Tests for the /api/v1/health endpoint.

Uses FastAPI's synchronous TestClient (backed by httpx) per the Day 3 spec.
No async tests are needed for the health route.
"""

import pytest
from fastapi.testclient import TestClient

from src.app.main import app

client = TestClient(app)


def test_health_returns_200() -> None:
    """GET /api/v1/health must return HTTP 200."""
    response = client.get("/api/v1/health")
    assert response.status_code == 200


def test_health_status_is_ok() -> None:
    """Response body must contain status='ok'."""
    response = client.get("/api/v1/health")
    data = response.json()
    assert data["status"] == "ok"


def test_health_service_name() -> None:
    """Response must identify the service."""
    response = client.get("/api/v1/health")
    data = response.json()
    assert data["service"] == "SolarResolve API"


def test_health_contains_timestamp() -> None:
    """Response must include a non-empty ISO 8601 timestamp."""
    response = client.get("/api/v1/health")
    data = response.json()
    assert isinstance(data.get("timestamp"), str)
    assert len(data["timestamp"]) > 0


def test_health_response_schema() -> None:
    """Response must contain exactly the required fields."""
    response = client.get("/api/v1/health")
    data = response.json()
    assert set(data.keys()) == {"status", "service", "version", "timestamp"}
