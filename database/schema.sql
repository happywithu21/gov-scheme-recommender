-- schema.sql
-- ----------
-- Defines the database schema for the Government Scheme Recommendation System.
-- Designed for PostgreSQL.

-- Table to store government scheme details
CREATE TABLE IF NOT EXISTS schemes (
    id SERIAL PRIMARY KEY,
    scheme_name VARCHAR(255) NOT NULL,
    description TEXT,
    min_age INTEGER,
    max_age INTEGER,
    income_limit NUMERIC(15, 2),
    category VARCHAR(100), -- E.g., SC, ST, OBC, General, All
    gender VARCHAR(50), -- E.g., Male, Female, Transgender, All
    state VARCHAR(100), -- Specific state or "All India"
    benefits TEXT, -- Descriptive text of what the scheme provides
    documents_required TEXT, -- CSV string or JSON of required proofs
    application_link VARCHAR(500), -- URL to apply
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table to log user eligibility queries for analytics and recommendations
CREATE TABLE IF NOT EXISTS user_queries (
    id SERIAL PRIMARY KEY,
    age INTEGER,
    income NUMERIC(15, 2),
    category VARCHAR(100),
    gender VARCHAR(50),
    state VARCHAR(100),
    query_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for potentially heavy search fields on schemes
CREATE INDEX IF NOT EXISTS idx_schemes_age ON schemes(min_age, max_age);
CREATE INDEX IF NOT EXISTS idx_schemes_income ON schemes(income_limit);
CREATE INDEX IF NOT EXISTS idx_schemes_category ON schemes(category);
CREATE INDEX IF NOT EXISTS idx_schemes_state ON schemes(state);
