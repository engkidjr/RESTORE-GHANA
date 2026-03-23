"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import StatsBar from '../components/StatsBar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { motion } from 'framer-motion';

// Dynamically import RiskMap with ssr disabled
const RiskMap = dynamic(() => import('../components/RiskMap'), { ssr: false, loading: () => <div className="h-[600px] w-full bg-[#0a0a0a] animate-pulse rounded-2xl flex items-center justify-center text-cyan-500 border border-slate-800">Booting AI Cartography...</div> });

export default function Dashboard() {
    const [stats, setStats] = useState({ total_reports: 0, active_restoration_projects: 0, identified_risk_zones: 0 });
    const [reports, setReports] = useState<any[]>([]);
    const [riskZones, setRiskZones] = useState([]);
    const [restorationProjects, setRestorationProjects] = useState([]);
    const [predictedHotspots, setPredictedHotspots] = useState([]);

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
        const fetchData = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

                const [statsRes, reportsRes, zonesRes, projectsRes, hotspotsRes] = await Promise.all([
                    fetch(`${apiUrl}/dashboard/stats`),
                    fetch(`${apiUrl}/reports`),
                    fetch(`${apiUrl}/risk-zones`),
                    fetch(`${apiUrl}/restoration`),
                    fetch('/api/analyze-hotspots', { method: 'POST', body: JSON.stringify({ reports: [] }) }) // Will pass real reports when backend is active
                ]);

                if (reportsRes.ok) {
                    const data = await reportsRes.json();
                    setReports(data.length > 0 ? data : MOCK_REPORTS);
                } else {
                    setReports(MOCK_REPORTS);
                }
                
                if (zonesRes.ok) setRiskZones(await zonesRes.json());
                if (projectsRes.ok) setRestorationProjects(await projectsRes.json());
                if (hotspotsRes.ok) {
                    const data = await hotspotsRes.json();
                    setPredictedHotspots(data.hotspots || []);
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                setReports(MOCK_REPORTS);
            }
        };

        fetchData();
    }, []);

    // Mock chart data - keeping static for now to focus on the map data flow, 
    // but in a real app this would aggregate the reports by month.
    const reportData = [
        { name: 'Jan', reports: 400 },
        { name: 'Feb', reports: 300 },
        { name: 'Mar', reports: 550 },
        { name: 'Apr', reports: 480 },
        { name: 'May', reports: 690 },
        { name: 'Jun', reports: 850 },
    ];

    const restorationData = restorationProjects.length > 0
        ? restorationProjects.map((p: any) => ({
            region: p.name.split(' ')[0] || "Unknown", // Simplified label
            progress: p.progress_percent
        }))
        : [
            { region: 'Ashanti', progress: 15 },
            { region: 'Western', progress: 42 },
            { region: 'Eastern', progress: 8 },
            { region: 'Central', progress: 27 },
            { region: 'Ahafo', progress: 35 },
        ];

    return (
        <div className="min-h-screen bg-[#050505] py-10 px-6 text-slate-300">
            <div className="container mx-auto max-w-7xl">
                <div className="mb-8 border-b border-slate-800 pb-6">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse"></span>
                        National AI Risk Control
                    </h1>
                    <p className="text-slate-400 mt-2 text-lg">Real-time geospatial tracking, Galamsey hotspots, and restoration verification.</p>
                </div>

                <div className="mb-10">
                    <StatsBar stats={stats} />
                </div>

                {/* Cyberpunk Map Section */}
                <motion.div 
                    whileHover={{ scale: 1.01, rotateX: 2, rotateY: -1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ perspective: 1000 }}
                    className="bg-[#0a0a0a] p-1 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-slate-800/60 mb-10 relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-10"></div>
                    <RiskMap reports={reports} riskZones={riskZones} restorationProjects={restorationProjects} totalReports={stats.total_reports} predictedHotspots={predictedHotspots} />
                    
                    {/* Legend */}
                    <div className="flex flex-wrap gap-6 mt-6 justify-center text-sm font-medium text-slate-400 p-4 bg-black/40 rounded-2xl border border-slate-800/50">
                        <div className="flex items-center gap-3"><div className="w-4 h-4 rounded-sm bg-red-500 shadow-[0_0_10px_#ef4444] border border-red-400 animate-pulse"></div> Active Reports</div>
                        <div className="flex items-center gap-3"><div className="w-4 h-4 rounded-sm bg-orange-500 shadow-[0_0_15px_#f97316] border border-orange-400"></div> Flagged Incidents</div>
                        <div className="flex items-center gap-3"><div className="w-4 h-4 rounded-sm bg-cyan-400 shadow-[0_0_15px_#22d3ee] border border-cyan-300"></div> AI Predicted Hotspot</div>
                        <div className="flex items-center gap-3"><div className="w-4 h-4 rounded-sm bg-yellow-500 shadow-[0_0_10px_#eab308] border border-yellow-400"></div> Mitigation In-Progress</div>
                        <div className="flex items-center gap-3"><div className="w-4 h-4 rounded-sm bg-green-500 shadow-[0_0_10px_#22c55e] border border-green-400"></div> Restored / Verified Safe</div>
                    </div>
                </motion.div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 opacity-80 hover:opacity-100 transition-opacity">
                    <div className="bg-[#0a0a0a] p-6 rounded-3xl shadow-lg border border-slate-800">
                        <h3 className="text-xl font-bold text-slate-200 mb-6">Incident Reports Over Time</h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={reportData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                    <XAxis dataKey="name" stroke="#64748b" />
                                    <YAxis stroke="#64748b" />
                                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#e2e8f0', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }} />
                                    <Line type="monotone" dataKey="reports" stroke="#06b6d4" strokeWidth={3} activeDot={{ r: 8, fill: '#06b6d4', stroke: '#fff' }} className="drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-[#0a0a0a] p-6 rounded-3xl shadow-lg border border-slate-800">
                        <h3 className="text-xl font-bold text-slate-200 mb-6">Restoration Progress by Region (%)</h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={restorationData.length > 0 ? restorationData : []}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                    <XAxis dataKey="region" stroke="#64748b" />
                                    <YAxis stroke="#64748b" domain={[0, 100]} />
                                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#e2e8f0', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }} cursor={{ fill: '#1e293b' }} />
                                    <Bar dataKey="progress" fill="#22c55e" radius={[6, 6, 0, 0]} className="drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
