"""
scripts/generate_bulk_schemes.py
---------------------------------
Generates 200+ mock government schemes with realistic diverse data 
for rigorous testing of pagination, filtering, search and UI scaling.
Executes inserts directly via SQLAlchemy using the application configuration.
"""

import os
import random
import logging
from pathlib import Path
from dotenv import load_dotenv

import sys
PROJECT_ROOT = Path(__file__).parent.parent
sys.path.append(str(PROJECT_ROOT / "backend"))

from sqlalchemy import text
from app.database import SessionLocal, engine
from app.models.scheme import Scheme

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# --- Synthetic Data Generation Dictionaries ---
CATEGORIES = ["SC", "ST", "OBC", "General", "Women", "Farmers", "Students", "Senior Citizens", "Entrepreneurs"]
STATES = ["All India", "Maharashtra", "Punjab", "Karnataka", "Delhi", "Uttar Pradesh", "Tamil Nadu", "Gujarat", "Kerala", "Rajasthan"]
MINISTRIES = [
    "Ministry of Education", "Ministry of Agriculture", "Ministry of Women and Child Development",
    "Ministry of MSME", "Ministry of Health", "Ministry of Social Justice", "Ministry of Finance",
    "Ministry of Rural Development", "Ministry of Labour", "Ministry of Housing"
]

BENEFIT_TEMPLATES = [
    "Up to Rs {amount} annually.",
    "Lump sum grant of Rs {amount}.",
    "{amount}% subsidy on loans.",
    "Full tuition reimbursement up to Rs {amount}.",
    "Monthly stipend of Rs {amount} for 5 years."
]

DOC_REQUIREMENTS = [
    "Aadhar Card, Bank Passbook, Passport Size Photo",
    "Income Certificate, Domicile, Aadhar",
    "Business Plan, PAN Card, Aadhar",
    "Marksheets, Income Certificate",
    "BPL Card, Aadhar, Medical Records"
]

SCHEME_NOUNS = ["Yojana", "Abhiyan", "Fund", "Scholarship", "Support Scheme", "Mission", "Program", "Grant"]
SCHEME_ADJECTIVES = ["Kisan", "Mahila", "Yuva", "Shiksha", "Swasthya", "Atmanirbhar", "Vikas", "Gramin"]

def generate_random_scheme():
    """Builds a single randomized Scheme dict"""
    category = random.choice(CATEGORIES)
    state = random.choice(STATES)
    ministry = random.choice(MINISTRIES)
    
    # Logic alignments for realism
    gender = "Female" if category == "Women" else random.choice(["All", "All", "All", "Male"])
    
    min_age = random.randint(0, 45)
    max_age = min_age + random.randint(10, 40)
    
    # Students get high age limit, low limit; Senior citizens high min age
    if category == "Students":
        min_age, max_age = 14, 25
    elif category == "Senior Citizens":
        min_age, max_age = 60, 100
        
    num = random.randint(10, 99)
    name = f"PM {random.choice(SCHEME_ADJECTIVES)} {random.choice(SCHEME_NOUNS)} - Phase {num}"
    
    if state != "All India":
        name = f"{state} {random.choice(SCHEME_ADJECTIVES)} {random.choice(SCHEME_NOUNS)}"
        
    income_limit = random.choice([0.0, 150000.0, 250000.0, 500000.0, 800000.0, None])
    
    amount = random.choice([5000, 10000, 20000, 50000, 100000, 500000])
    benefit = random.choice(BENEFIT_TEMPLATES).format(amount=amount)
    
    return {
        "scheme_name": name,
        "description": f"A flagship initiative by the {ministry} to assist eligible citizens in {state}.",
        "min_age": min_age,
        "max_age": max_age,
        "income_limit": income_limit,
        "category": category,
        "gender": gender,
        "state": state,
        "benefits": benefit,
        "documents_required": random.choice(DOC_REQUIREMENTS),
        "application_link": f"https://apply.gov.in/scheme/{num}",
        "ministry": ministry
    }

def main():
    load_dotenv()
    db = SessionLocal()
    
    # Clear existing to enforce clean slate testing
    logger.info("Clearing existing schemes for test bulk load...")
    db.query(Scheme).delete()
    db.commit()
    
    logger.info("Generating 250 test schemes...")
    schemes = [generate_random_scheme() for _ in range(250)]
    
    try:
        for idx, scheme_data in enumerate(schemes):
            db.execute(
                text("""
                    INSERT INTO schemes (
                        scheme_name, description, min_age, max_age, 
                        income_limit, category, gender, state, 
                        benefits, documents_required, application_link, ministry
                    ) VALUES (
                        :scheme_name, :description, :min_age, :max_age, 
                        :income_limit, :category, :gender, :state, 
                        :benefits, :documents_required, :application_link, :ministry
                    )
                """),
                scheme_data
            )
            # Commit every 50 to prevent huge memory spikes
            if idx % 50 == 0:
                db.commit()

        db.commit()
        logger.info("Successfully inserted 250 schemes into the database.")
    except Exception as e:
        db.rollback()
        logger.error(f"Error inserting schema: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    main()
