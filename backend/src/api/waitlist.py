from fastapi import APIRouter
from datetime import datetime, timezone
import uuid
import logging

from src.models.waitlist import WaitlistRequest, WaitlistResponse

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/", response_model=WaitlistResponse)
async def submit_waitlist(request: WaitlistRequest):
    # Log the submission
    logger.info(f"Received waitlist submission for role: {request.role} in {request.community}, {request.state}")
    
    # Generate a simple reference format SP360-XXXX
    ref_id = str(uuid.uuid4())[:4].upper()
    reference = f"SP360-{ref_id}"

    # In a real app, this would save to a database.
    # For the pilot MVP, we acknowledge the receipt and return the reference.
    
    return WaitlistResponse(
        reference=reference,
        status="received",
        timestamp=datetime.now(timezone.utc).isoformat()
    )
