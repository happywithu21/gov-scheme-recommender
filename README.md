# YojanaMitra 🏛️

> **Your companion for government schemes**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?logo=postgresql)](https://www.postgresql.org/)

YojanaMitra is a full-stack platform that helps Indian citizens **discover government schemes they are eligible for**, using official open data from [data.gov.in](https://data.gov.in/). Powered by a smart AI assistant (Mitra), users can find personalised welfare programs, subsidies, and benefits in seconds.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **Mitra AI Chatbot** | Context-aware assistant that extracts user profile from natural language and recommends schemes |
| 🔍 **Eligibility Engine** | Smart backend filters schemes by age, income, state, gender, and social category |
| 📊 **Insights Dashboard** | Interactive charts showing scheme distribution by state, category, and popularity |
| 🗂️ **Advanced Filters** | Sidebar with keyword search, quick-action pills (Students, Farmers, Women), and income slider |
| 📋 **Scheme Comparison** | Compare multiple schemes side-by-side |
| 🎨 **Modern UI** | Glassmorphism design, smooth micro-animations, and a responsive mobile layout |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, Recharts, Lucide Icons |
| **Backend** | Python 3.11, FastAPI, SQLAlchemy, Uvicorn |
| **Database** | PostgreSQL 15 |
| **Data ETL** | Python scripts consuming the [data.gov.in](https://data.gov.in) API |
| **Deployment** | Docker, Docker Compose, GitHub Actions CI/CD |

---

## 📁 Project Structure

```
yojanamitra/
│
├── backend/                  # FastAPI application
│   └── app/
│       ├── api/routes.py     # REST API endpoints + smart chat engine
│       ├── services/         # Eligibility matching engine
│       ├── models/           # SQLAlchemy ORM + Pydantic schemas
│       └── main.py           # App entry point + CORS config
│
├── frontend/                 # React + Vite SPA
│   └── src/
│       ├── components/       # Navbar, Footer, Chatbot, SchemeCard, etc.
│       ├── pages/            # Home, AllSchemes, Insights, Compare, etc.
│       └── services/api.js   # API service layer
│
├── database/
│   └── schema.sql            # PostgreSQL schema
│
├── scripts/
│   ├── data_collection.py    # ETL: fetch schemes from data.gov.in
│   └── load_schemes.py       # ETL: populate the database
│
├── docs/                     # Project documentation
├── tests/                    # Backend test suite
│
├── .github/workflows/        # GitHub Actions CI/CD pipeline
├── docker-compose.yml        # Full-stack orchestration
├── .env.example              # Environment variable template
├── requirements.txt          # Python dependencies
└── README.md
```

---

## 🚀 Setup Instructions

### Prerequisites
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [Node.js 18+](https://nodejs.org/)
- [Python 3.11+](https://www.python.org/)
- API Key from [data.gov.in](https://data.gov.in/)

---

### Option A — Docker (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/your-username/yojanamitra.git
cd yojanamitra

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your actual values

# 3. Build and start all services
docker-compose up --build

# 4. Populate the database with scheme data
python scripts/data_collection.py
python scripts/load_schemes.py
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| Swagger Docs | http://localhost:8000/docs |

---

### Option B — Local Development

```bash
# Start just the database via Docker
docker-compose up -d db

# Backend
python -m venv venv
.\venv\Scripts\activate       # Windows
pip install -r requirements.txt
$env:PYTHONPATH="$PWD/backend"
uvicorn app.main:app --reload --port 8000 --app-dir backend

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

---

## 🤖 Using the Mitra AI Chatbot

Simply describe yourself in natural language:

> *"I am a 22-year-old student from Punjab with income 2 lakh"*

Mitra will:
1. Extract your profile (age, state, income, category)
2. Run the eligibility engine
3. Return matching schemes with explanations like:
   - ✔ Age 22 falls in eligible range (18–35)
   - ✔ Income ₹2,00,000 ≤ scheme limit ₹2,50,000
   - ✔ Available in Punjab

---

## 🔮 Future Improvements

- [ ] Multilingual support (Hindi, Tamil, Telugu, Bengali)
- [ ] Voice input via Web Speech API
- [ ] Push notifications for scheme deadlines
- [ ] Integration with DigiLocker for auto-document verification
- [ ] Mobile app (React Native)
- [ ] Real LLM integration (Gemini / GPT-4) for richer conversations

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [Open Government Data Platform India](https://data.gov.in/) for the official scheme dataset
- Built with ❤️ for Bharat
