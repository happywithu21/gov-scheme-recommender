"""
models/scheme.py
----------------
SQLAlchemy ORM Model for the 'schemes' table.
Allows the eligibility engine and FastAPI endpoints to query DB rows as Python objects.
"""

from sqlalchemy import Column, Integer, String, Numeric, Text, TIMESTAMP
from app.database import Base

class Scheme(Base):
    __tablename__ = 'schemes'
    
    id = Column(Integer, primary_key=True, index=True)
    scheme_name = Column(String(255), nullable=False)
    description = Column(Text)
    min_age = Column(Integer)
    max_age = Column(Integer)
    income_limit = Column(Numeric(15, 2))
    category = Column(String(100))
    gender = Column(String(50))
    state = Column(String(100))
    benefits = Column(Text)
    documents_required = Column(Text)
    application_link = Column(String(500))
    ministry = Column(String(255))
    created_at = Column(TIMESTAMP)
    updated_at = Column(TIMESTAMP)
