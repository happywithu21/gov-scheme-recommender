"""
main.py
-------
Entry point for the FastAPI application.
Initializes the application, configures CORS, and includes API routers.
Follows clean architecture by delegating business logic to the services layer.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router as api_router

app = FastAPI(
    title="Government Scheme Recommendation API",
    description="API for recommending government schemes based on citizen eligibility.",
    version="1.0.0"
)

# Configure CORS for the frontend React application
origins = [
    "http://localhost:3000",   # React local development port
    "http://127.0.0.1:3000",
    # Add production frontend URLs here when deploying
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incorporate defined endpoints
app.include_router(api_router, prefix="/api/v1")

@app.get("/")
async def root():
    """
    Health check endpoint to ensure the API is running correctly.
    """
    return {"status": "ok", "message": "API is up and running"}

