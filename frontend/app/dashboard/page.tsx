"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import StatsBar from '../components/StatsBar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

// Dynamically import Map with ssr disabled
const Map = dynamic(() => import('../components/Map'), { ssr: false, loading: () => <div className="h-[500px] w-full bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center">Loading Map...</div> });

export default function Dashboard() {
    const [stats, setStats] = useState({ total_reports: 0, active_restoration_projects: 0, identified_risk_zones: 0 });
    const [reports, setReports] = useState([]);
    const [riskZones, setRiskZones] = useState([]);
    const [restorationProjects, setRestorationProjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

                const [statsRes, reportsRes, zonesRes, projectsRes] = await Promise.all([
                    fetch(`${apiUrl}/dashboard/stats`),
                    fetch(`${apiUrl}/reports`),
                    fetch(`${apiUrl}/risk-zones`),
                    fetch(`${apiUrl}/restoration`),
                ]);

                if (statsRes.ok) setStats(await statsRes.json());
                if (reportsRes.ok) setReports(await reportsRes.json());
                if (zonesRes.ok) setRiskZones(await zonesRes.json());
                if (projectsRes.ok) setRestorationProjects(await projectsRes.json());
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
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
        <div className="min-h-screen bg-slate-50 py-10 px-6">
            <div className="container mx-auto max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">National Recovery Dashboard</h1>
                    <p className="text-slate-500 mt-2 text-lg">Real-time tracking of Galamsey impact, AI risk zones, and restoration progress.</p>
                </div>

                <StatsBar stats={stats} />

                {/* Map Section */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-10">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Live AI Risk Map & Tracking</h2>
                    <Map reports={reports} riskZones={riskZones} restorationProjects={restorationProjects} />
                    <div className="flex gap-6 mt-6 justify-center text-sm font-medium text-slate-600">
                        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-red-500"></div> New Report</div>
                        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-orange-400 opacity-60"></div> AI Risk Hotline</div>
                        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-green-500"></div> Restoration Project</div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                        <h3 className="text-xl font-bold text-slate-800 mb-6">Incident Reports Over Time</h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={reportData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis dataKey="name" stroke="#94a3b8" />
                                    <YAxis stroke="#94a3b8" />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Line type="monotone" dataKey="reports" stroke="#0ea5e9" strokeWidth={3} activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                        <h3 className="text-xl font-bold text-slate-800 mb-6">Restoration Progress by Region (%)</h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={restorationData.length > 0 ? restorationData : []}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis dataKey="region" stroke="#94a3b8" />
                                    <YAxis stroke="#94a3b8" domain={[0, 100]} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Bar dataKey="progress" fill="#22c55e" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
