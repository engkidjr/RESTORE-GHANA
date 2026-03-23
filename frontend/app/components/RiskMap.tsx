"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap, Circle, Popup, Marker } from 'react-leaflet';
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3';
import L, { LatLngBoundsExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Report {
    id: string;
    created_at: string;
    type: string;
    lat: number;
    lng: number;
    status: string;
    description: string;
    photo_url?: string;
    intensity?: number;
    latitude?: number;
    longitude?: number;
}

type RiskMapProps = {
    reports?: Report[];
    riskZones?: any[];
    restorationProjects?: any[];
    totalReports?: number;
    predictedHotspots?: any[];
};

const ghanaBounds: LatLngBoundsExpression = [
    [4.7, -3.3], // South-West
    [11.2, 1.2]  // North-East
];

// Apple-style Glassmorphism Custom Markers
const createCustomIcon = (color: string) => {
    return L.divIcon({
        className: 'bg-transparent border-0',
        html: `
            <div class="relative flex items-center justify-center w-8 h-8 group transition-transform duration-300 hover:scale-125">
                <div class="absolute inset-0 rounded-full opacity-60 animate-ping" style="background-color: ${color}; animation-duration: 2s;"></div>
                <div class="relative w-4 h-4 rounded-full shadow-lg border-[1.5px] border-white backdrop-blur-md" style="background-color: ${color};"></div>
            </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
    });
};

const flagIcon = L.divIcon({
    className: 'bg-transparent border-0',
    html: `
        <div class="relative flex items-center justify-center w-10 h-10 group transition-transform duration-300 hover:scale-125">
            <div class="absolute inset-0 rounded-full opacity-60 animate-ping" style="background-color: #f97316; animation-duration: 2s;"></div>
            <div class="relative w-8 h-8 flex items-center justify-center rounded-full shadow-lg border-[2px] border-white backdrop-blur-md bg-orange-500 text-white text-lg drop-shadow-md">
                🚩
            </div>
        </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
});

const ICONS: Record<string, L.DivIcon> = {
    'galamsey': createCustomIcon('#a855f7'), // Purple
    'water-pollution': createCustomIcon('#eab308'), // Yellow
    'deforestation': createCustomIcon('#ec4899'), // Pink
    'restored': createCustomIcon('#22c55e'), // Green
    'reported': createCustomIcon('#ef4444'), // Red (User requested red dots)
};

const getIconForReport = (type: string, status: string) => {
    if (status === 'flagged') return flagIcon;
    if (status === 'restored' || status === 'safe') return ICONS['restored'];
    // User requested "make sure that data that was reported will show red dots"
    return ICONS['reported'];
};

const MapMask = ({ ghanaGeojson }: { ghanaGeojson: any }) => {
    const map = useMap();
    useEffect(() => {
        if (!ghanaGeojson) return;
        const worldCoords = [[-90, -180], [90, -180], [90, 180], [-90, 180], [-90, -180]];
        let ghanaCoords: any[] = [];
        
        ghanaGeojson.features.forEach((feature: any) => {
            if (feature.geometry.type === 'Polygon') {
               ghanaCoords.push(feature.geometry.coordinates[0].map((coord: [number, number]) => [coord[1], coord[0]]));
            } else if (feature.geometry.type === 'MultiPolygon') {
                feature.geometry.coordinates.forEach((poly: any) => {
                    ghanaCoords.push(poly[0].map((coord: [number, number]) => [coord[1], coord[0]]));
                });
            }
        });

        const maskPolygon = L.polygon([worldCoords, ...ghanaCoords], {
            color: 'transparent',
            fillColor: '#000000',
            fillOpacity: 0.8,
            stroke: false,
            interactive: false
        }).addTo(map);

        return () => { map.removeLayer(maskPolygon); };
    }, [ghanaGeojson, map]);
    return null;
};

export default function RiskMap({ reports = [], riskZones = [], restorationProjects = [], totalReports = 0, predictedHotspots = [] }: RiskMapProps) {
    const [geojsonData, setGeojsonData] = useState<any>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        fetch('/ghana-regions.json')
            .then((res) => res.json())
            .then(setGeojsonData)
            .catch(() => console.error("Error loading geojson"));
    }, []);

    if (!mounted) return null; // Avoid SSR mapping issues with leaflet

    return (
        <div className="relative h-[650px] w-full rounded-3xl overflow-hidden glassmorphism shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 font-sans group">
            
            {/* Dynamic Floating Counter - Apple Style */}
            <div className="absolute top-6 left-6 z-[1000] pointer-events-none transition-transform duration-500 ease-out group-hover:translate-y-1">
                <div className="bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-xl">
                    <div className="text-gray-200 dark:text-gray-400 text-[10px] tracking-[0.2em] uppercase font-bold mb-1">Live Incidents</div>
                    <div className="text-4xl font-black text-white tabular-nums drop-shadow-md">
                        {totalReports.toLocaleString()}
                    </div>
                </div>
            </div>

            <MapContainer 
                center={[7.9465, -1.0232]} 
                zoom={6.8} 
                className="h-full w-full bg-[#050505]"
                zoomControl={false}
                scrollWheelZoom={true}
                maxBounds={ghanaBounds}
                maxBoundsViscosity={1.0}
                minZoom={6.5}
            >
                {/* High Contrast Dark TileLayer for that Premium Feel */}
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
                    className="map-tiles blend-luminosity"
                />

                {/* Heatmap Layer Component */}
                {reports.length > 0 && (
                    <HeatmapLayer
                        fitBoundsOnLoad={false}
                        fitBoundsOnUpdate={false}
                        points={reports}
                        longitudeExtractor={(m: Report) => m.lng || m.longitude || 0}
                        latitudeExtractor={(m: Report) => m.lat || m.latitude || 0}
                        intensityExtractor={(m: Report) => m.intensity || 80}
                        radius={25}
                        max={100}
                        minOpacity={0.1}
                        blur={20}
                        gradient={{
                            0.2: '#0ea5e9', // Blueish
                            0.4: '#eab308', // Water Pollution / Mid Risk
                            0.6: '#ec4899', // Deforestation / High Risk
                            1.0: '#a855f7'  // Galamsey / Extreme Hotspot
                        }}
                    />
                )}

                {/* Individual Incident Markers with specific color coding */}
                {reports.map((report, idx) => (
                    <Marker 
                        key={`report-${idx}`} 
                        position={[report.lat || report.latitude || 0, report.lng || report.longitude || 0]} 
                        icon={getIconForReport(report.type || 'galamsey', report.status || 'active')}
                    >
                        <Popup className="rounded-xl border-none">
                            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-3 rounded-lg text-sm text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-xl">
                                <span className="block font-bold mb-1 capitalize">{report.type || 'Illegal Mining'}</span>
                                <span className="text-xs opacity-75">{report.description || 'No description provided.'}</span>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {geojsonData && (
                    <>
                        {/* Geofencing Mask */}
                        <MapMask ghanaGeojson={geojsonData} />
                        
                        {/* Light borders for regions */}
                        <GeoJSON 
                            data={geojsonData} 
                            style={() => ({
                                color: 'rgba(255, 255, 255, 0.15)',
                                weight: 1.5,
                                fillOpacity: 0
                            })}
                        />
                    </>
                )}
            </MapContainer>
        </div>
    );
}
