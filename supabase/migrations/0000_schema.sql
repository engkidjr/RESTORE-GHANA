-- Migration 0000_schema.sql

-- Enable PostGIS extension for geolocation
CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA extensions;

-- Create Reports Table
CREATE TABLE public.reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL,
    location geometry(Point, 4326),
    type VARCHAR(50) NOT NULL CHECK (type IN ('brown_water', 'illegal_mining', 'deforestation')),
    description TEXT NOT NULL,
    photo_url TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
    ai_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Trigger to automatically update location point based on lat/lng
CREATE OR REPLACE FUNCTION update_location_point()
RETURNS TRIGGER AS $$
BEGIN
  NEW.location = ST_SetSRID(ST_MakePoint(NEW.lng, NEW.lat), 4326);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_report_location
BEFORE INSERT OR UPDATE ON public.reports
FOR EACH ROW
EXECUTE FUNCTION update_location_point();


-- Create Restoration Projects Table
CREATE TABLE public.restoration_projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    start_date DATE NOT NULL,
    progress_percent INTEGER DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
    lead_org VARCHAR(255),
    updates JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Create Risk Zones Table
CREATE TABLE public.risk_zones (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    region VARCHAR(255) NOT NULL,
    risk_level VARCHAR(50) NOT NULL CHECK (risk_level IN ('high', 'medium', 'low')),
    predicted_by_ai BOOLEAN DEFAULT true,
    coordinates_polygon JSONB NOT NULL, -- Storing polygon as GeoJSON or lat/lng array for simplicity
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Create Education Content Table
CREATE TABLE public.education_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category VARCHAR(50) NOT NULL CHECK (category IN ('mercury_health', 'water_safety', 'environment')),
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    sdg_tag VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Set up Row Level Security (RLS) policies
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restoration_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risk_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education_content ENABLE ROW LEVEL SECURITY;

-- Reports: anyone can view, authenticated users can insert
CREATE POLICY "Reports are viewable by everyone" ON public.reports FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create reports" ON public.reports FOR INSERT WITH CHECK (auth.uid() = user_id);
-- Or allow anonymous for exhibition demo
CREATE POLICY "Anonymous can create reports" ON public.reports FOR INSERT WITH CHECK (true);

-- Restoration Projects: viewable by everyone
CREATE POLICY "Restoration projects are viewable by everyone" ON public.restoration_projects FOR SELECT USING (true);

-- Risk Zones: viewable by everyone
CREATE POLICY "Risk zones are viewable by everyone" ON public.risk_zones FOR SELECT USING (true);

-- Education Content: viewable by everyone
CREATE POLICY "Education content is viewable by everyone" ON public.education_content FOR SELECT USING (true);
