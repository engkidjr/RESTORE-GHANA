import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timezone

# Import our supabase client and clustering logic
from database import supabase
from clustering import detect_risk_zones

app = FastAPI(title="RestoreGhana API")

# Allow frontend to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For production, restrict to frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ReportCreate(BaseModel):
    lat: float
    lng: float
    type: str
    description: str
    photo_url: Optional[str] = None
    user_id: Optional[str] = None

@app.get("/")
def read_root():
    return {"message": "Welcome to RestoreGhana API"}

@app.post("/reports")
def create_report(report: ReportCreate):
    try:
        data_to_insert = {
            "lat": report.lat,
            "lng": report.lng,
            "type": report.type,
            "description": report.description,
            "photo_url": report.photo_url,
            "status": "pending"
        }
        if report.user_id and report.user_id != "anon":
             data_to_insert["user_id"] = report.user_id
             
        response = supabase.table("reports").insert(data_to_insert).execute()
        new_report = response.data[0] if response.data else None

        # Re-run AI clustering on all reports
        all_reports_resp = supabase.table("reports").select("lat, lng").execute()
        all_reports = all_reports_resp.data

        new_risk_zones = detect_risk_zones(all_reports)
        
        if new_risk_zones:
            # Clear existing AI predicted risk zones to replace with new calculated ones
            supabase.table("risk_zones").delete().eq("predicted_by_ai", True).execute()
            
            for zone in new_risk_zones:
                supabase.table("risk_zones").insert({
                    "region": zone["region"],
                    "risk_level": zone["risk_level"],
                    "predicted_by_ai": zone["predicted_by_ai"],
                    "coordinates_polygon": zone["polygon"]
                }).execute()

        return {"message": "Report submitted successfully", "report": new_report, "found_risk_zones": len(new_risk_zones)}
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/reports")
def get_reports():
    response = supabase.table("reports").select("*").execute()
    return response.data

@app.get("/dashboard/stats")
def get_stats():
    reports_resp = supabase.table("reports").select("*", count="exact").execute()
    projects_resp = supabase.table("restoration_projects").select("*", count="exact").execute()
    zones_resp = supabase.table("risk_zones").select("*", count="exact").execute()
    
    return {
        "total_reports": reports_resp.count or 0,
        "active_restoration_projects": projects_resp.count or 0,
        "identified_risk_zones": zones_resp.count or 0
    }

@app.get("/risk-zones")
def get_risk_zones():
    response = supabase.table("risk_zones").select("*").execute()
    return response.data

@app.get("/restoration")
def get_restoration_projects():
    response = supabase.table("restoration_projects").select("*").execute()
    return response.data

@app.get("/education")
def get_education_content():
    response = supabase.table("education_content").select("*").execute()
    return response.data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
