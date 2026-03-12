"""
api/routes.py
-------------
Defines the REST API endpoints controlling access to the schemes and recommendation engine.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.schema import UserProfileRequest, SchemeResponse, RecommendationResponse
from app.models.scheme import Scheme
from app.services.eligibility_engine import get_eligible_schemes

router = APIRouter()

@router.post("/recommend", response_model=RecommendationResponse)
def recommend_schemes(user_profile: UserProfileRequest, db: Session = Depends(get_db)):
    """
    Analyzes the user's demographic profile and returns matching government schemes.
    """
    try:
        profile_dict = user_profile.model_dump()
        eligible_schemes = get_eligible_schemes(db, profile_dict)
        
        return RecommendationResponse(
            status="success",
            match_count=len(eligible_schemes),
            recommendations=eligible_schemes
        )
    except Exception as e:
        # Log the internal error in production
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while generating recommendations: {str(e)}"
        )

@router.get("/schemes", response_model=List[SchemeResponse])
def fetch_all_schemes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieves a paginated list of all active government schemes in the database.
    """
    schemes = db.query(Scheme).offset(skip).limit(limit).all()
    return schemes

@router.get("/scheme/{id}", response_model=SchemeResponse)
def fetch_scheme_by_id(id: int, db: Session = Depends(get_db)):
    """
    Retrieves the complete details of a single government scheme by its unique ID.
    """
    scheme = db.query(Scheme).filter(Scheme.id == id).first()
    if not scheme:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Scheme with ID {id} not found."
        )
    return scheme
