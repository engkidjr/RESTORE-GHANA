# RestoreGhana 🌍

A National Galamsey Recovery Dashboard built to reverse the effects of illegal mining and restore the Earth. 
This platform acts as a civic tech solution where Ghanaians report illegal mining damage, AI detects patterns, and the public tracks environmental recovery—tied to SDGs 3 (Good Health), 6 (Clean Water), and 4 (Quality Education).

## 📦 Tech Stack
- **Frontend**: Next.js 14 (App Router) + Tailwind CSS + Leaflet Maps + Recharts
- **Backend**: Python (FastAPI) + Scikit-learn (DBSCAN Clustering)
- **Database & Auth**: Supabase (PostgreSQL + Auth)
- **Containerization**: Docker + Docker Compose

## 🚀 Getting Started Locally

### 1. Database Setup
We have included a Supabase SQL schema in `/supabase/migrations/0000_schema.sql`.
Create a new project at [supabase.com](https://supabase.com), go to the SQL Editor, and paste/run that file.

### 2. Run the Backend API (FastAPI)
```bash
cd backend
python -m venv venv
# Windows: .\venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install fastapi uvicorn scikit-learn python-dotenv pydantic pydantic-settings
uvicorn main:app --reload --port 8000
```

### 3. Run the Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000` to view the application.

## 🌍 Phase 8: Deployment Guide

### Deploying the Frontend (Vercel)
1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com) and import the repository.
3. Select the `frontend` directory as the Root Directory.
4. Framework Preset: Next.js.
5. Click **Deploy**.

### Deploying the Backend (Railway or Render)
1. Go to [Railway.app](https://railway.app) or [Render.com](https://render.com).
2. Create a new Web Service and link your GitHub repository.
3. Set the Root Directory to `/backend`.
4. Ensure the start command is: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Click **Deploy**.
