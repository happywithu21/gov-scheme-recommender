"""
services/eligibility_engine.py
------------------------------
Core business logic module for matching citizen profiles to government schemes.
Queries the database using SQLAlchemy with dynamic parameter filtering.
"""

from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import Dict, Any, List

from app.models.scheme import Scheme

def get_eligible_schemes(db: Session, user_profile: Dict[str, Any]) -> List[Scheme]:
    """
    Evaluates a user's profile against scheme requirements.
    
    Expected user_profile dictionary mapping:
    {
        "age": int,
        "gender": str,
        "state": str,
        "income": float,
        "category": str,
        "occupation": str,  # Optional/Extensible
        "education": str    # Optional/Extensible
    }
    """
    age = user_profile.get("age")
    income = user_profile.get("income")
    category = user_profile.get("category")
    gender = user_profile.get("gender")
    state = user_profile.get("state")
    
    # Start with a base query resolving all schemes
    query = db.query(Scheme)
    
    # 1. Filter by Age (min_age <= age <= max_age) or age limit is null
    if age is not None:
        query = query.filter(
            or_(Scheme.min_age == None, Scheme.min_age <= age),
            or_(Scheme.max_age == None, Scheme.max_age >= age)
        )
        
    # 2. Filter by Income limit (income <= income_limit) or limit is null
    if income is not None:
        query = query.filter(
            or_(Scheme.income_limit == None, Scheme.income_limit >= income)
        )
        
    # 3. Filter by Category (match or All)
    if category:
        query = query.filter(
            or_(
                Scheme.category.ilike(category), 
                Scheme.category.ilike("All"),
                Scheme.category == None
            )
        )
        
    # 4. Filter by Gender (match or All)
    if gender:
        query = query.filter(
            or_(
                Scheme.gender.ilike(gender), 
                Scheme.gender.ilike("All"),
                Scheme.gender == None
            )
        )
        
    # 5. Filter by State (match or National/All India)
    if state:
        query = query.filter(
            or_(
                Scheme.state.ilike(state), 
                Scheme.state.ilike("National"), 
                Scheme.state.ilike("All India"),
                Scheme.state.ilike("All"),
                Scheme.state == None
            )
        )
        
    # Execute query and return matched schemes
    return query.all()
