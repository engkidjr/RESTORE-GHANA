"use client";

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix typical Next.js leaflet marker icon issues
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const CustomRedIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const CustomGreenIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

interface Report {
    id: string;
    created_at: string;
    type: string;
    lat: number;
    lng: number;
    status: string;
    description: string;
    photo_url?: string;
}

interface RiskZone {
    id: string;
    region: string;
    risk_level: string;
    coordinates_polygon: { lat: number, lng: number }[];
}

interface RestorationProject {
    id: string;
    name: string;
    lat: number;
    lng: number;
    progress_percent: number;
}

type MapProps = {
    reports?: Report[];
    riskZones?: RiskZone[];
    restorationProjects?: RestorationProject[];
};

export default function InteractiveMap({ reports = [], riskZones = [], restorationProjects = [] }: MapProps) {
    const ghanaCenter = { lat: 7.9465, lng: -1.0232 };

    return (
        <div className="h-[500px] w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 z-0 relative">
            <MapContainer center={[ghanaCenter.lat, ghanaCenter.lng]} zoom={6} className="h-full w-full">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {reports.map((report) => (
                    <Marker key={report.id} position={[report.lat, report.lng]} icon={CustomRedIcon}>
                        <Popup>
                            <strong>Incident Report</strong><br />
                            Type: {report.type.replace(/_/g, " ")}<br />
                            Status: {report.status}<br />
                            Date: {new Date(report.created_at).toLocaleDateString()}
                        </Popup>
                    </Marker>
                ))}

                {restorationProjects.map((project) => (
                    <Marker key={project.id} position={[project.lat, project.lng]} icon={CustomGreenIcon}>
                        <Popup>
                            <strong>Restoration Project</strong><br />
                            {project.name}<br />
                            Progress: {project.progress_percent}%
                        </Popup>
                    </Marker>
                ))}

                {riskZones.map((zone) => {
                    // Extract center from the GeoJSON/polygon logic, or fallback to first point
                    let centerLat = 0;
                    let centerLng = 0;
                    if (zone.coordinates_polygon && zone.coordinates_polygon.length > 0) {
                        centerLat = zone.coordinates_polygon[0].lat;
                        centerLng = zone.coordinates_polygon[0].lng;
                    }

                    return centerLat && centerLng ? (
                        <Circle key={zone.id} center={[centerLat, centerLng]} radius={15000} pathOptions={{ color: 'orange', fillColor: 'orange', fillOpacity: 0.4 }}>
                            <Popup>
                                <strong>AI Verified Hotspot</strong><br />
                                Region: {zone.region}<br />
                                Risk Level: {zone.risk_level.toUpperCase()}
                            </Popup>
                        </Circle>
                    ) : null;
                })}
            </MapContainer>
        </div>
    );
}
