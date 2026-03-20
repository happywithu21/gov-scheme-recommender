"""
main.py
-------
Production-ready entry point for the YojanaMitra FastAPI application.
- CORS origins loaded from environment variables
- Structured logging for Render log streaming
- Health check endpoint for Render's uptime monitoring
"""

import os
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.api.routes import router as api_router

# Load .env for local development (no-op in production where env vars are set directly)
load_dotenv()

# ── Logging ────────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger("yojanamitra")

# ── App ────────────────────────────────────────────────────────────────────────
app = FastAPI(
    title="YojanaMitra API",
    description="YojanaMitra – Your companion for government schemes. Discover and recommend government schemes based on citizen eligibility.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ── CORS ───────────────────────────────────────────────────────────────────────
# Read from env so the same code works locally and on Render without changes.
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    FRONTEND_URL,                          # Vercel production URL
    "https://yojanamitra-seven.vercel.app",  # explicit fallback
]
# Deduplicate
origins = list(set(origins))

logger.info(f"CORS allowed origins: {origins}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routes ─────────────────────────────────────────────────────────────────────
app.include_router(api_router, prefix="/api/v1")

# ── Health / Root endpoints ────────────────────────────────────────────────────
@app.get("/", tags=["Health"])
async def root():
    """Root health check – used by Render to confirm the service is alive."""
    return {
        "status": "ok",
        "service": "YojanaMitra API",
        "version": "1.0.0",
        "docs": "/docs",
    }

@app.get("/health", tags=["Health"])
async def health():
    """Lightweight health-check endpoint for Render uptime monitoring."""
    return {"status": "healthy"}
