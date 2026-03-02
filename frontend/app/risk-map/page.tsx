"use client";

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/Map'), { ssr: false, loading: () => <div className="h-[700px] w-full bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center">Loading Live Map...</div> });

export default function RiskMapPage() {
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
                <Map />
            </div>
        </div>
    );
}
