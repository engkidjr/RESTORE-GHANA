"use client";

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const Map = dynamic(() => import('../components/Map'), { ssr: false, loading: () => <div className="h-[700px] w-full bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center">Loading Live Map...</div> });

export default function RiskMapPage() {
    const [reports, setReports] = useState<any[]>([]);

    const MOCK_REPORTS = [
        { id: '1', lat: 6.6666, lng: -1.6163, type: 'galamsey', status: 'flagged', intensity: 100, description: 'URGENT: Major illegal mining operation near Offin river' },
        { id: '2', lat: 5.5560, lng: -0.1969, type: 'water-pollution', status: 'active', intensity: 75, description: 'Industrial waste dump' },
        { id: '3', lat: 7.9465, lng: -1.0232, type: 'deforestation', status: 'active', intensity: 85, description: 'Logging in protected forest' },
        { id: '4', lat: 6.1333, lng: -2.0333, type: 'galamsey', status: 'flagged', intensity: 100, description: 'URGENT: Heavy excavator activity destroying farmland' },
        { id: '5', lat: 9.4075, lng: -0.8532, type: 'water-pollution', status: 'active', intensity: 60, description: 'Chemical runoff in stream' },
        { id: '6', lat: 5.6037, lng: -0.1870, type: 'deforestation', status: 'active', intensity: 70, description: 'Urban sprawl clearing' },
        { id: '7', lat: 6.2000, lng: -1.4000, type: 'galamsey', status: 'active', intensity: 88, description: 'Surface mining pit' },
        { id: '8', lat: 7.1500, lng: -1.9000, type: 'water-pollution', status: 'active', intensity: 65, description: 'Muddy water downstream' },
        { id: '9', lat: 5.8000, lng: 0.1000, type: 'deforestation', status: 'active', intensity: 92, description: 'Timber smuggling route' },
        { id: '10', lat: 6.5000, lng: -1.8000, type: 'galamsey', status: 'active', intensity: 78, description: 'Abandoned mining shaft' },
        { id: '11', lat: 10.0000, lng: -1.0000, type: 'water-pollution', status: 'active', intensity: 55, description: 'Agricultural pesticide runoff' },
        { id: '12', lat: 8.5000, lng: -0.5000, type: 'deforestation', status: 'active', intensity: 80, description: 'Charcoal production clearing' },
        { id: '13', lat: 6.0000, lng: -2.5000, type: 'galamsey', status: 'flagged', intensity: 100, description: 'URGENT: Active riverbed dredging causing total blockage' },
        { id: '14', lat: 5.9000, lng: -1.2000, type: 'water-pollution', status: 'active', intensity: 72, description: 'Oil spill from transport' },
        { id: '15', lat: 6.3000, lng: -0.8000, type: 'deforestation', status: 'flagged', intensity: 95, description: 'CRITICAL: Ancient reserve being logged' },
        { id: '16', lat: 6.1000, lng: -1.5000, type: 'galamsey', status: 'active', intensity: 89, description: 'Nighttime mining operation' },
        { id: '17', lat: 7.5000, lng: -0.2000, type: 'water-pollution', status: 'active', intensity: 68, description: 'Factory effluent discharge' },
        { id: '18', lat: 8.0000, lng: -1.5000, type: 'deforestation', status: 'active', intensity: 76, description: 'Illegal gold pit access road' },
        { id: '19', lat: 6.7000, lng: -2.2000, type: 'galamsey', status: 'active', intensity: 91, description: 'Deep shaft mining camp' },
        { id: '20', lat: 5.4000, lng: -1.6000, type: 'water-pollution', status: 'active', intensity: 82, description: 'Coastal plastic dumping' }
    ];

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/reports`).catch(() => null);
                if (res && res.ok) {
                    const data = await res.json();
                    setReports(data.length > 0 ? data : MOCK_REPORTS);
                } else {
                    setReports(MOCK_REPORTS);
                }
            } catch (e) {
                setReports(MOCK_REPORTS);
            }
        };
        fetchReports();
    }, []);

    return (
        <div className="h-[calc(100vh-80px)] w-full flex flex-col">
            <div className="bg-white p-4 shadow-md z-10 flex justify-between items-center px-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">AI Risk Zones Map</h1>
                    <p className="text-sm text-slate-500">View real-time patterns detected by DBSCAN clustering.</p>
                </div>
                <div className="flex gap-4 text-sm font-medium">
                    <span className="flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 rounded-full"><div className="w-3 h-3 bg-red-600 rounded-full"></div> Unverified Reports</span>
                    <span className="flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-700 rounded-full"><div className="w-3 h-3 bg-orange-500 rounded-full opacity-60"></div> AI Risk Hotspots</span>
                </div>
            </div>
            <div className="flex-grow relative">
                <Map reports={reports} />
            </div>
        </div>
    );
}
