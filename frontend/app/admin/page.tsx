"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Session } from '@supabase/supabase-js';

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

export default function AdminDashboard() {
    const [session, setSession] = useState<Session | null>(null);
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuthAndFetchData = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                router.push('/login');
                return;
            }

            setSession(session);

            try {
                // Fetch reports from the backend instead of directly from Supabase 
                // to maintain consistency, or we could fetch directly from Supabase if preferred.
                // Since it&apos;s admin, fetching directly from DB is faster, but using our backend is also fine.
                // Let's use the backend API.
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
                const res = await fetch(`${apiUrl}/reports`);
                if (res.ok) {
                    const data = await res.json();
                    // Sort by newest first
                    const sorted = data.sort((a: Report, b: Report) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                    setReports(sorted);
                }
            } catch (err) {
                console.error("Failed to fetch reports:", err);
            } finally {
                setLoading(false);
            }
        };

        checkAuthAndFetchData();
    }, [router]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading Admin Dashboard...</div>;
    }

    if (!session) {
        return null; // Will redirect
    }

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-6">
            <div className="container mx-auto max-w-7xl">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Admin Dashboard</h1>
                        <p className="text-slate-500 mt-2 text-lg">Manage and review incoming incident reports.</p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-slate-600 text-sm font-semibold border-b border-slate-200">
                                    <th className="p-4 py-5 uppercase tracking-wider">Date</th>
                                    <th className="p-4 py-5 uppercase tracking-wider">Type</th>
                                    <th className="p-4 py-5 uppercase tracking-wider">Location (Lat, Lng)</th>
                                    <th className="p-4 py-5 uppercase tracking-wider">Status</th>
                                    <th className="p-4 py-5 uppercase tracking-wider">Description</th>
                                    <th className="p-4 py-5 uppercase tracking-wider text-right">Evidence</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {reports.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-slate-500">
                                            No reports found.
                                        </td>
                                    </tr>
                                ) : (
                                    reports.map((report) => (
                                        <tr key={report.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-4 text-sm text-slate-600 whitespace-nowrap">
                                                {new Date(report.created_at).toLocaleDateString()} {new Date(report.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </td>
                                            <td className="p-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 capitalize">
                                                    {report.type.replace(/_/g, " ")}
                                                </span>
                                            </td>
                                            <td className="p-4 text-sm text-slate-600 font-mono">
                                                {report.lat.toFixed(4)}, {report.lng.toFixed(4)}
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                                    ${report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                                                    ${report.status === 'verified' ? 'bg-green-100 text-green-800' : ''}
                                                    ${report.status === 'resolved' ? 'bg-blue-100 text-blue-800' : ''}
                                                `}>
                                                    {report.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-sm text-slate-700 max-w-xs truncate" title={report.description}>
                                                {report.description}
                                            </td>
                                            <td className="p-4 text-right">
                                                {report.photo_url ? (
                                                    <a href={report.photo_url} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 font-medium text-sm">
                                                        View Image
                                                    </a>
                                                ) : (
                                                    <span className="text-slate-400 text-sm">None</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
