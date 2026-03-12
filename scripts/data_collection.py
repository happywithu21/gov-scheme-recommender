"""
scripts/data_collection.py
--------------------------
Module to fetch government scheme datasets from the data.gov.in API.
Features:
- Connects to data.gov.in using a provided API key.
- Handles API connection errors and includes a retry mechanism.
- Logs events, successes, and errors to the console.
- Saves the fetched data in JSON format within 'data/raw/'.
"""

import os
import json
import time
import logging
from pathlib import Path
from typing import Dict, Any, Optional
import requests
from requests.exceptions import RequestException

from dotenv import load_dotenv

# Initialize basic properties
load_dotenv()

# Setup Logging
logger = logging.getLogger("data_collection")
logger.setLevel(logging.INFO)

# Console handler
ch = logging.StreamHandler()
ch.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

# Constants
API_KEY = os.getenv("DATA_GOV_API_KEY")
# Default scheme resource ID (e.g. from an open dataset). Replace with actual ID needed.
RESOURCE_ID = os.getenv("DATA_GOV_SCHEME_RESOURCE_ID", "default_resource_id_here")
BASE_URL = "https://api.data.gov.in/resource"
MAX_RETRIES = 3
RETRY_DELAY = 5  # seconds

# Paths
PROJECT_ROOT = Path(__file__).parent.parent
RAW_DATA_DIR = PROJECT_ROOT / "data" / "raw"

class DataGovAPIClient:
    """Client to handle communication with data.gov.in"""
    
    def __init__(self, api_key: str, base_url: str = BASE_URL):
        if not api_key:
            logger.error("API Key not found. Please set DATA_GOV_API_KEY in the .env file.")
            raise ValueError("DATA_GOV_API_KEY environment variable is missing.")
            
        self.api_key = api_key
        self.base_url = base_url
        self.session = requests.Session()

    def fetch_dataset(self, resource_id: str, limit: int = 100, format: str = "json") -> Optional[Dict[str, Any]]:
        """
        Fetches dataset for a given resource ID with retry mechanism.
        """
        url = f"{self.base_url}/{resource_id}"
        params = {
            "api-key": self.api_key,
            "format": format,
            "limit": limit
        }

        for attempt in range(1, MAX_RETRIES + 1):
            logger.info(f"Fetching data from {url} (Attempt {attempt}/{MAX_RETRIES})...")
            try:
                response = self.session.get(url, params=params, timeout=15)
                
                # Raise an exception for HTTP errors (4xx, 5xx)
                response.raise_for_status()
                
                logger.info(f"Successfully fetched data for resource: {resource_id}.")
                return response.json()

            except RequestException as e:
                logger.warning(f"Failed to fetch data: {str(e)}")
                if attempt < MAX_RETRIES:
                    logger.info(f"Retrying in {RETRY_DELAY} seconds...")
                    time.sleep(RETRY_DELAY)
                else:
                    logger.error("Max retries reached. Data fetching failed.")
                    return None
            except ValueError as e:
                logger.error(f"Failed to parse JSON response: {str(e)}")
                return None

def save_data_to_file(data: Dict[str, Any], filename: str = "schemes.json") -> bool:
    """
    Saves fetched dictionary data into the raw data directory as JSON.
    """
    # Create the directory if it doesn't exist
    RAW_DATA_DIR.mkdir(parents=True, exist_ok=True)
    
    filepath = RAW_DATA_DIR / filename
    
    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        logger.info(f"Data successfully written to {filepath}")
        return True
    except IOError as e:
        logger.error(f"Failed to write data to file {filepath}: {str(e)}")
        return False

def main():
    """Main execution block"""
    logger.info("Initializing Data Collection Module...")
    
    try:
        client = DataGovAPIClient(api_key=API_KEY)
    except ValueError:
        return

    # Fetch the actual dataset
    dataset = client.fetch_dataset(resource_id=RESOURCE_ID, limit=500)
    
    if dataset:
        # We save it into the data/raw folder
        save_data_to_file(data=dataset, filename="schemes_raw.json")
    else:
        logger.error("No data fetched. Aborting save operation.")

if __name__ == "__main__":
    main()
