from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class WaitlistRequest(BaseModel):
    role: str
    buyerContext: Optional[str] = None
    knowsOwner: Optional[str] = None
    name: str = Field(..., min_length=1)
    phone: str = Field(..., min_length=5)
    state: str
    community: str
    notes: Optional[str] = None
    consent: bool

class WaitlistResponse(BaseModel):
    reference: str
    status: str = "received"
    timestamp: str
