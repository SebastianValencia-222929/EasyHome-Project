# EasyHome 🏠

**EasyHome** is a home-services marketplace that connects clients with verified service providers (plumbers, carpenters, cleaners, and more). Clients can browse listings, compare prices and reviews, and hire professionals. Workers can publish their services, manage requests, and grow their business through subscription plans.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Main Features](#main-features)
- [Frontend Contributions – Sebastián Valencia](#frontend-contributions--sebastián-valencia)

---

## Tech Stack

| Layer     | Technology |
|-----------|------------|
| Frontend  | React 19, Vite, React Router v7, Axios, react-oidc-context |
| Backend   | Python 3, FastAPI, SQLAlchemy 2 (async), Alembic, Uvicorn |
| Database  | PostgreSQL (asyncpg driver) |
| Auth      | AWS Cognito (OIDC / JWT) |
| Storage   | AWS S3 (local filesystem fallback for development) |

---

## Project Structure

```
EasyHome-Project/
├── easyhome-backend/       # FastAPI REST API
│   ├── app/
│   │   ├── api/v1/endpoints/   # Route handlers (auth, categories, publicaciones, etc.)
│   │   ├── core/               # Config & database session
│   │   ├── models/             # SQLAlchemy ORM models
│   │   ├── schemas/            # Pydantic request/response schemas
│   │   └── services/           # Business logic
│   ├── scripts/                # Utility & migration scripts
│   ├── main.py                 # Application entry point
│   └── requirements.txt
└── easyhome-frontend/      # React + Vite SPA
    ├── src/
    │   ├── components/         # Reusable UI, layout, features & routes
    │   ├── contexts/           # AuthContext (Cognito)
    │   ├── hooks/              # Custom React hooks
    │   ├── pages/              # Page-level components (Home, Perfil, Admin, etc.)
    │   ├── services/           # API call wrappers
    │   └── utils/
    ├── index.html
    └── package.json
```

---

## Prerequisites

- **Node.js** ≥ 18 and **npm** ≥ 9
- **Python** ≥ 3.11
- **PostgreSQL** ≥ 14 (running locally or via a cloud provider)
- An **AWS account** with a configured Cognito User Pool (optional for local development — auth flow requires it)

---

## Getting Started

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd easyhome-backend

# 2. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Create the .env file (see Environment Variables section)
cp .env.example .env            # or create it manually
```

### Frontend Setup

```bash
# 1. Navigate to the frontend directory
cd easyhome-frontend

# 2. Install dependencies
npm install

# 3. Create the .env file (see Environment Variables section)
cp .env.example .env            # or create it manually
```

---

## Environment Variables

### Backend (`easyhome-backend/.env`)

```env
# Database
DB_NAME=easyhome
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

# Security
SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_secret_key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# AWS Cognito (required for authentication)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_access_key
COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX

# AWS S3 (optional – local storage is used if omitted)
S3_BUCKET_NAME=your_bucket
S3_REGION=us-east-1
```

### Frontend (`easyhome-frontend/.env`)

```env
VITE_API_URL=http://localhost:8000

# AWS Cognito / OIDC
VITE_COGNITO_AUTHORITY=https://cognito-idp.<region>.amazonaws.com/<user_pool_id>
VITE_COGNITO_CLIENT_ID=your_cognito_app_client_id
VITE_COGNITO_REDIRECT_URI=http://localhost:5173/callback
```

---

## Running the Project

### Start the Backend

```bash
cd easyhome-backend

# (First time only) Initialise the database
python scripts/init_db.py

# Run the development server
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.  
Interactive docs: `http://localhost:8000/docs`

### Start the Frontend

```bash
cd easyhome-frontend
npm run dev
```

The app will be available at `http://localhost:5173`.

> **Tip:** Run both servers simultaneously in separate terminal windows.

---

## Main Features

| Feature | Description |
|---------|-------------|
| **Authentication** | Sign-up / login / logout via AWS Cognito; Google OAuth supported |
| **Role-based access** | Three roles: *Cliente*, *Trabajador* (service provider), *Admin* |
| **Service listings** | Workers publish services; clients browse and filter by category |
| **Service requests** | Clients hire workers; requests tracked through the platform |
| **User profiles** | Separate views for clients and workers (portfolio, reviews, contact info) |
| **Subscription plans** | Workers can upgrade their plan for more visibility and unlimited listings |
| **Advertising** | Businesses can purchase banner slots (rotatory, lateral, superior) |
| **Admin panel** | Manage users, categories, reports, and open solicitudes |
| **File uploads** | Profile photos and portfolio images stored in S3 (or locally in development) |

---

## Frontend Contributions – Sebastián Valencia

The following sections of the frontend were designed and implemented by **Sebastián Valencia**:

### Pages & Views
- **Home (`/`)** – Landing page including the hero section, service categories carousel, *¿Cómo funciona?* step-by-step guide, benefits highlights (Verified Providers, Review System, Best Prices), and the call-to-action section for worker sign-up.
- **Subscriptions (`/subscriptions`)** – Full subscription plans page featuring pricing cards (Básico, Esencial, Premium), a side-by-side comparison table, and an interactive FAQ accordion.
- **Advertise (`/advertise`)** – Advertising plans page for businesses, with pricing cards (Rotatorio, Lateral, Superior), a feature comparison table, and FAQ section.
- **Profile (`/perfil`)** – Unified profile page with role-aware tab navigation: client tabs (Change Data, Contracted Services, Reviews Made) and worker tabs (About Me, My Services, Portfolio, Reviews, Services), plus photo editing modal.
- **Service Publication Form (`/publicarservicio`)** – Form for workers to publish new service listings.
- **Postulate (`/postulate`)** – Application flow for clients wishing to become service providers.

### Components
- **HeroSection** – Main hero banner on the home page.
- **Categories** – Dynamic service category grid displayed on the home page.
- **FAQSection** – Reusable accordion FAQ component used in both Subscriptions and Advertise pages.
- **PremiumMembers** – Section highlighting premium service providers.
- **Publicaciones** – Feed of service publication cards.
- **Filters** – Filter controls for the service feed.

### Routing & Auth
- **AppRoutes** – Centralised route definitions with protected routes enforcing role-based access (`Clientes`, `Trabajadores`, `Admin`).
- **AuthContext** – React context wrapping AWS Cognito OIDC integration for session management across the app.
- **useCognitoSync** hook – Synchronises the authenticated Cognito user with the backend database on login.
