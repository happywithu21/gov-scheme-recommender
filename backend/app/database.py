"""
database.py
-----------
Provides database connectivity using SQLAlchemy.
Abstracts session lifecycle for FastAPI dependency injection.
"""

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

load_dotenv()

# Build the Database URL from environment variables, defaulting to a local dev setup
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD", "postgres")
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "gov_schemes")

SQLALCHEMY_DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Create SQLAlchemy engine
try:
    engine = create_engine(SQLALCHEMY_DATABASE_URL, pool_pre_ping=True)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base = declarative_base()
except Exception as e:
    print(f"Failed to initialize database connection: {e}")
    engine = None
    SessionLocal = None
    Base = None

def get_db():
    """
    Dependency function to yield a database session for incoming HTTP requests.
    Automatically closes the session after the request is processed.
    """
    if SessionLocal is None:
        raise ConnectionError("Database session could not be established.")
    
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
