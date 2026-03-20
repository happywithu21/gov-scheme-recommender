"""
api/routes.py
-------------
Defines the REST API endpoints controlling access to the schemes and recommendation engine.
"""

import re
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.models.schema import (
    UserProfileRequest, SchemeResponse, RecommendationResponse,
    ChatMessageRequest, ChatMessageResponse, ChatSchemeResult
)
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

@router.get("/schemes")
def fetch_all_schemes(
    skip: int = 0, 
    limit: int = 100, 
    search: str = None,
    category: str = None,
    state: str = None,
    income_max: float = None,
    gender: str = None,
    db: Session = Depends(get_db)
):
    """
    Retrieves a paginated list of government schemes matching the optional query filters.
    Returns both the data array and the total count of matched records.
    """
    from sqlalchemy import or_
    import copy
    
    query = db.query(Scheme)
    
    # Optional Text Search
    if search:
        search_fmt = f"%{search}%"
        query = query.filter(
            or_(
                Scheme.scheme_name.ilike(search_fmt),
                Scheme.description.ilike(search_fmt),
                Scheme.benefits.ilike(search_fmt)
            )
        )
        
    # Optional Dropdown Filters
    if category and category != "All":
        query = query.filter(Scheme.category.ilike(category))
    if state and state != "All India":
        query = query.filter(Scheme.state.ilike(state))
    if gender and gender != "All":
        query = query.filter(Scheme.gender.ilike(gender))
    if income_max is not None:
        query = query.filter(
            or_(Scheme.income_limit == 0, Scheme.income_limit <= income_max)
        )
        
    # Execute Pagination
    total_count = query.count()
    schemes = query.offset(skip).limit(limit).all()
    
    return {
        "status": "success",
        "total": total_count,
        "skip": skip,
        "limit": limit,
        "data": schemes
    }

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

# ─────────────────────────────────────────────────────────────
# SMART CHAT ENGINE  –  NLP extraction + eligibility integration
# ─────────────────────────────────────────────────────────────

STATES = [
    "andhra pradesh","arunachal pradesh","assam","bihar","chhattisgarh",
    "goa","gujarat","haryana","himachal pradesh","jharkhand","karnataka",
    "kerala","madhya pradesh","maharashtra","manipur","meghalaya","mizoram",
    "nagaland","odisha","punjab","rajasthan","sikkim","tamil nadu",
    "telangana","tripura","uttar pradesh","uttarakhand","west bengal",
    "delhi","jammu","kashmir","ladakh","puducherry","chandigarh",
]

CATEGORIES = ["sc","st","obc","general","ews"]

OCCUPATIONS = {
    "student": ["student","studying","college","university","school","btech","engineering","medical","degree"],
    "farmer": ["farmer","agriculture","farming","kisan","crop"],
    "entrepreneur": ["entrepreneur","startup","business","self-employed","msme","shop"],
    "unemployed": ["unemployed","job","jobless","looking for work","no job"],
    "senior citizen": ["retired","pensioner","senior","old age","60+","elder"],
    "woman": ["woman","women","female","mother","widow","girl"],
    "disabled": ["disabled","handicapped","differently abled","pwd"],
}

CONVERSATION_FLOW = ["age","gender","state","income","category"]

QUESTIONS = {
    "age":      "How old are you? (e.g., 22)",
    "gender":   "What is your gender? (Male / Female / Other)",
    "state":    "Which state do you live in? (e.g., Punjab, Maharashtra)",
    "income":   "What is your approximate annual family income in rupees? (e.g., 2,00,000)",
    "category": "What is your social category? (General / OBC / SC / ST / EWS)",
}


def _extract_profile(text: str, existing: dict) -> dict:
    """Extract structured profile fields from free-form user text."""
    ctx = dict(existing)  # work on a copy
    lower = text.lower()

    # Age – e.g. "I am 22", "22 years old", "age 22"
    if "age" not in ctx:
        _age = re.search(r"\b(\d{1,3})\s*(?:year|yr|years|yrs)?\s*old\b", lower) or \
               re.search(r"\bage[d\s:]+?(\d{1,3})\b", lower) or \
               re.search(r"\bi(?:'m|\sam)\s+(\d{1,3})\b", lower) or \
               re.search(r"\b(\d{1,3})\s*(?:year|yr|yrs)?\b", lower)
        if _age:
            val = int(_age.group(1))
            if 1 <= val <= 120:
                ctx["age"] = val

    # Gender
    if "gender" not in ctx:
        if re.search(r"\b(male|man|boy|he/him)\b", lower):
            ctx["gender"] = "Male"
        elif re.search(r"\b(female|woman|girl|she/her)\b", lower):
            ctx["gender"] = "Female"
        elif "other" in lower or "transgender" in lower:
            ctx["gender"] = "Other"

    # State
    if "state" not in ctx:
        for s in STATES:
            if re.search(rf"\b{re.escape(s)}\b", lower):
                ctx["state"] = s.title()
                break

    # Income –  "2 lakh", "2,00,000", "200000"
    if "income" not in ctx:
        _inc = re.search(r"(\d+(?:[.,]\d+)?)\s*(?:lakh|lac)", lower)
        if _inc:
            ctx["income"] = float(_inc.group(1).replace(",",".")) * 100000
        else:
            _inc = re.search(r"(?:rs\.?|inr|₹)?\s*([\d,]+)", lower)
            if _inc:
                raw = _inc.group(1).replace(",","")
                val = float(raw)
                if val > 1000:          # ignore short age-like numbers
                    ctx["income"] = val

    # Social Category
    if "category" not in ctx:
        for cat in CATEGORIES:
            if re.search(rf"\b{cat}\b", lower):
                ctx["category"] = cat.upper()
                break

    # Occupation (inferred; used for reply tone)
    if "occupation" not in ctx:
        for occ, keywords in OCCUPATIONS.items():
            if any(re.search(rf"\b{re.escape(kw)}\b", lower) for kw in keywords):
                ctx["occupation"] = occ
                break

    return ctx


def _next_question(ctx: dict) -> Optional[str]:
    """Return the field key of the next missing piece of information."""
    for field in CONVERSATION_FLOW:
        if field not in ctx:
            return field
    return None          # all data collected


def _build_why(scheme: Scheme, ctx: dict) -> list:
    """Explain why the user qualifies for a given scheme."""
    reasons = []
    age = ctx.get("age")
    income = ctx.get("income")
    state = ctx.get("state","").lower()
    category = ctx.get("category","").upper()

    if age is not None:
        if scheme.min_age is None and scheme.max_age is None:
            reasons.append("✔ No age restriction")
        else:
            lo = scheme.min_age or 0
            hi = scheme.max_age or 200
            if lo <= age <= hi:
                reasons.append(f"✔ Age {age} falls in the eligible range ({lo}–{hi})")

    if income is not None:
        if scheme.income_limit is None or scheme.income_limit == 0:
            reasons.append("✔ No income restriction")
        elif income <= scheme.income_limit:
            reasons.append(f"✔ Income ₹{int(income):,} ≤ scheme limit ₹{int(scheme.income_limit):,}")

    if scheme.state and scheme.state.lower() in ("national","all india","all",""):
        reasons.append("✔ Available nationwide")
    elif scheme.state and (not state or state in scheme.state.lower()):
        reasons.append(f"✔ Available in {scheme.state}")

    if scheme.category and (not category or category.lower() in scheme.category.lower() or scheme.category.lower() == "all"):
        reasons.append(f"✔ Matches your category ({category or 'All'})")

    return reasons or ["✔ You meet the general eligibility criteria"]


@router.post("/chat", response_model=ChatMessageResponse)
def handle_chat_message(
    request: ChatMessageRequest,
    db: Session = Depends(get_db)
):
    """
    Context-aware chatbot that extracts user profile data from natural language,
    asks follow-up questions for missing fields, then fetches and returns
    personalised scheme recommendations with eligibility explanations.
    """
    msg = request.message.strip()
    lower = msg.lower()
    ctx = request.context or {}

    # ── Greet ──
    if re.search(r"\b(hello|hi|hey|namaste|namaskar)\b", lower) and len(msg) < 20:
        return ChatMessageResponse(
            reply="👋 Namaste! I'm **Mitra**, your YojanaMitra assistant.\n\nTell me a little about yourself — your age, state, income — and I'll find the government schemes you're eligible for!",
            updated_context=ctx,
            next_question="age"
        )

    # ── Reset ──
    if re.search(r"\b(reset|start over|restart|clear)\b", lower):
        return ChatMessageResponse(
            reply="🔄 Sure! Let's start fresh.\n\n" + QUESTIONS["age"],
            updated_context={},
            next_question="age"
        )

    # ── Help / What can you do ──
    if re.search(r"\b(help|what can you|what do you|how do you work)\b", lower):
        return ChatMessageResponse(
            reply="I can help you:\n• 🔍 Find government schemes you're eligible for\n• 📋 Explain why you qualify\n• 🏫 Find student or farmer schemes\n\nJust describe yourself — e.g., *\"I'm a 25-year-old woman from Bihar with income 1.5 lakh\"*",
            updated_context=ctx,
        )

    # ── Quick-action intents ──
    if re.search(r"\bstudent scheme\b", lower):
        ctx["occupation"] = "student"
    if re.search(r"\bfarmer scheme\b", lower):
        ctx["occupation"] = "farmer"
    if re.search(r"\bwomen? scheme\b", lower) or re.search(r"\bschemes? for women\b", lower):
        ctx["gender"] = "Female"

    # ── Extract profile fields ──
    ctx = _extract_profile(msg, ctx)

    # ── Ask next missing question ──
    missing = _next_question(ctx)

    # Decide if we have enough data to recommend (at least age OR state collected)
    has_enough = "age" in ctx or "state" in ctx

    if not has_enough:
        reply_intro = "Thanks! " if ctx else "Let me help you find the right schemes. "
        return ChatMessageResponse(
            reply=reply_intro + QUESTIONS.get(missing, "Could you tell me more about yourself?"),
            updated_context=ctx,
            next_question=missing
        )

    # ── Run eligibility engine ──
    matches = get_eligible_schemes(db, ctx)
    top = matches[:5]   # return top 5

    if not top:
        follow_up = ("\n\nShall I try with fewer filters? Just say **reset** to start over.") if ctx else ""
        return ChatMessageResponse(
            reply="😔 I couldn't find any schemes matching your profile right now. This may be because our database is still being populated." + follow_up,
            updated_context=ctx,
        )

    # ── Build scheme results ──
    scheme_results = []
    for s in top:
        scheme_results.append(ChatSchemeResult(
            id=s.id,
            scheme_name=s.scheme_name,
            description=s.description,
            benefits=s.benefits,
            state=s.state,
            category=s.category,
            application_link=s.application_link,
            why_eligible=_build_why(s, ctx)
        ))

    # Build summary sentence about the user profile used
    profile_summary_parts = []
    if "age" in ctx:      profile_summary_parts.append(f"age {ctx['age']}")
    if "state" in ctx:    profile_summary_parts.append(f"{ctx['state']}")
    if "income" in ctx:   profile_summary_parts.append(f"income ₹{int(ctx['income']):,}")
    if "category" in ctx: profile_summary_parts.append(f"{ctx['category']}")
    profile_summary = ", ".join(profile_summary_parts)

    reply = f"🎯 Based on your profile ({profile_summary}), I found **{len(matches)} matching scheme(s)**. Here are the top results:\n\nClick **Apply** on any card to go to the official government portal."

    # If still missing some fields, offer to refine
    if missing:
        reply += f"\n\n💡 *Tip: Share your {missing} to get even more accurate results.*"

    return ChatMessageResponse(
        reply=reply,
        updated_context=ctx,
        schemes=scheme_results,
        next_question=missing
    )
