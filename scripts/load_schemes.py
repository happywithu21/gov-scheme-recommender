"""
scripts/load_schemes.py
-----------------------
Utility script to load processed scheme data from JSON into the PostgreSQL database.
Uses SQLAlchemy to safely execute inserts based on the schema mapping.
"""

import os
import json
import logging
from pathlib import Path
from dotenv import load_dotenv

# Ensure we can import from the backend directory
import sys
PROJECT_ROOT = Path(__file__).parent.parent
sys.path.append(str(PROJECT_ROOT / "backend"))

from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from app.database import SessionLocal, engine

# Setup Logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Paths
PROCESSED_DATA_DIR = PROJECT_ROOT / "data" / "processed"
DEFAULT_FILENAME = "schemes_cleaned.json"

def get_data_file(filename: str) -> Path:
    """Utility to locate the data file in processed or raw folders."""
    filepath = PROCESSED_DATA_DIR / filename
    if not filepath.exists():
        # Fallback to raw if processed doesn't exist yet for testing
        filepath = PROJECT_ROOT / "data" / "raw" / "schemes_raw.json"
    return filepath

def load_data_to_db(filepath: Path):
    """Parses the JSON file and inserts records into the 'schemes' table."""
    
    if not filepath.exists():
        logger.error(f"Data file not found at: {filepath}")
        return

    logger.info(f"Loading data from {filepath}")
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except (IOError, json.JSONDecodeError) as e:
        logger.error(f"Failed to read or parse JSON file: {e}")
        return

    # Ensure list representation (handling if wrapped in dict keys)
    if isinstance(data, dict):
        # Extract the list of records from data.gov.in format if applicable
        # The 'records' key is standard for data.gov.in JSON responses
        data_list = data.get('records', [])
    else:
        data_list = data

    if not data_list:
        logger.warning("No records found in the data file.")
        return

    # Connect to DB and insert
    if not SessionLocal:
        logger.error("Database connection is not configured.")
        return

    db = SessionLocal()
    successful_inserts = 0

    try:
        for record in data_list:
            # Note: Fields are mapped safely using text() bindings to avoid SQL Injection.
            # You may need to map the JSON keys to match these schema columns depending on true dataset layout.
            query = text("""
                INSERT INTO schemes (
                    scheme_name, description, min_age, max_age, 
                    income_limit, category, gender, state, 
                    benefits, documents_required, application_link
                ) VALUES (
                    :scheme_name, :description, :min_age, :max_age, 
                    :income_limit, :category, :gender, :state, 
                    :benefits, :documents_required, :application_link
                )
            """)

            db.execute(query, {
                "scheme_name": str(record.get('scheme_name') or record.get('title', 'Unknown Scheme'))[:255],
                "description": record.get('description', ''),
                "min_age": int(record.get('min_age')) if record.get('min_age') else None,
                "max_age": int(record.get('max_age')) if record.get('max_age') else None,
                "income_limit": float(record.get('income_limit')) if record.get('income_limit') else None,
                "category": str(record.get('category') or 'All')[:100],
                "gender": str(record.get('gender') or 'All')[:50],
                "state": str(record.get('state') or 'All India')[:100],
                "benefits": str(record.get('benefits', '')),
                "documents_required": str(record.get('documents_required', '')),
                "application_link": str(record.get('application_link', ''))[:500]
            })
            successful_inserts += 1
            
        db.commit()
        logger.info(f"Successfully inserted {successful_inserts} schemes into the database.")
    
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Database error during insertion: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    load_dotenv()
    source_file = get_data_file(DEFAULT_FILENAME)
    load_data_to_db(source_file)
