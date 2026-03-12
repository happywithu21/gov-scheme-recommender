"""
models/schema.py
----------------
Pydantic models for request validation and response serialization in the FastAPI application.
"""

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

# --- Request Models ---

class UserProfileRequest(BaseModel):
    """
    Schema for validating the incoming user profile payload to the recommendation engine.
    """
    age: Optional[int] = Field(None, description="Age of the citizen in years", ge=0, le=120)
    gender: Optional[str] = Field(None, description="Gender (e.g., Male, Female, Transgender)")
    state: Optional[str] = Field(None, description="State of residence")
    income: Optional[float] = Field(None, description="Annual family income in INR", ge=0)
    category: Optional[str] = Field(None, description="Social category (e.g., SC, ST, OBC, General)")
    occupation: Optional[str] = None
    education: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "age": 25,
                "gender": "Female",
                "state": "Maharashtra",
                "income": 150000.0,
                "category": "OBC"
            }
        }

# --- Response Models ---

class SchemeResponse(BaseModel):
    """
    Schema for serializing a single Scheme database object to JSON.
    """
    id: int
    scheme_name: str
    description: Optional[str] = None
    min_age: Optional[int] = None
    max_age: Optional[int] = None
    income_limit: Optional[float] = None
    category: Optional[str] = None
    gender: Optional[str] = None
    state: Optional[str] = None
    benefits: Optional[str] = None
    documents_required: Optional[str] = None
    application_link: Optional[str] = None
    
    # Enable Pydantic's mapping from SQLAlchemy objects
    class Config:
        from_attributes = True

class RecommendationResponse(BaseModel):
    """
    Schema representing the final payload sent back for a recommendation request.
    """
    status: str
    match_count: int
    recommendations: List[SchemeResponse]
