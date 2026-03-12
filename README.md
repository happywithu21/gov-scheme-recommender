# Government Scheme Recommendation System

A web application designed to recommend Indian government schemes to citizens based on their demographic profile. Natively processes and consumes APIs from `data.gov.in`.

## Project Overview

- **Backend**: Python + FastAPI (High performance, async-ready capabilities)
- **Frontend**: React.js + Vite (Fast compilation, modern SPA rendering)
- **Database**: PostgreSQL (Structured relational queries and powerful indexing)
- **Data ETL**: Custom Python scripting interacting iteratively with the Open Govt API.

## Repository Structure

- `backend/`: FastAPI application code (Controllers, Services, Models, Schema).
- `frontend/`: React UI, including the dynamic `UserForm` and `SchemeCard` pipelines.
- `data/`: Automated storage container holding JSON sets parsed from Data.gov.
- `scripts/`: ETL jobs (`data_collection.py`, `load_schemes.py`).
- `database/`: `.sql` scripts dynamically mounted via Docker to build the schema.

---

## Setup Instructions

Ensure you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed on your machine.
Ensure you have an API Key generated from [data.gov.in](https://data.gov.in/).

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/gov-scheme-recommender.git
   cd gov-scheme-recommender
   ```

2. **Configure Environment Variables:**
   Copy the example config and inject your real secure values.
   ```bash
   cp .env.example .env
   ```
   Add your API Keys to `.env`.

---

## Run Locally (Docker)

To instantly spin up the Database, Backend APIs, and Frontend Webapp:

```bash
docker-compose up --build
```

- **Frontend Application:** Available at [http://localhost:3000](http://localhost:3000)
- **FastAPI Backend (Swagger Docs):** Available at [http://localhost:8000/docs](http://localhost:8000/docs)

*Note: You must first run the ETL scripts to populate your database with scheme datasets to see recommendations in action.*

### Running ETL Scripts manually

Open a separate terminal and ensure your virtual environment is active:
```bash
pip install -r requirements.txt
python scripts/data_collection.py
python scripts/load_schemes.py
```

---

## Deployment Instructions

This repository is pre-configured with a **GitHub Actions CI/CD Pipeline**.

To deploy to your own servers / cloud environment:
1. Ensure your server environment accepts SSH connections via GitHub Secrets.
2. Push your code to the `main` branch. 
3. The pipeline in `.github/workflows/deploy.yml` will automatically:
   - Lint and Test code with `pytest`.
   - Build `gov-scheme-backend` Docker images.
   - Build `gov-scheme-frontend` Docker images.
   - Execute the deploy simulation command.
   
For production web hosting, it's recommended to deploy the Next.js/React App via Vercel or Netlify, while hosting the Dockerized FastAPI & PostgreSQL array on a VPS (e.g. AWS EC2, DigitalOcean) and configuring standard Nginx Reverse Proxies with SSL.
