import React from 'react';
import { Briefcase, Target, Users, TrendingUp, HeartHandshake, TreePine } from 'lucide-react';

export default function BusinessModel() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-slate-800 mb-4 flex items-center justify-center gap-3">
                        <Briefcase className="text-green-600" size={36} />
                        Business Strategy & Canvas
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        A sustainable, community-driven approach to tracking illegal mining and restoring Ghana's ecosystems, specifically targeting rural undeducated populations affected by Galamsey.
                    </p>
                </div>

                {/* Target Audience Section */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-12">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                            <Target size={28} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">Our Target Demographic</h2>
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                        The primary users and beneficiaries of the RestoreGhana platform are <strong>rural, often uneducated community members</strong> whose livelihoods (farming, fishing) are being directly destroyed by illegal mining (Galamsey).
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><Users size={20} className="text-slate-500" /> Rural Farmers & Fishermen</h3>
                            <p className="text-sm text-slate-600">Their water sources are polluted and cocoa farms are excavated. They need a simple, voice-to-text or visual way to report land degradation without needing high technical literacy.</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><HeartHandshake size={20} className="text-slate-500" /> Local Chiefs & Leaders</h3>
                            <p className="text-sm text-slate-600">Traditional leaders need data-backed visual maps to show the government the exact areas of their districts that are compromised, speeding up intervention.</p>
                        </div>
                    </div>
                </div>

                {/* Business Model Canvas */}
                <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Business Model Canvas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-teal-100 border-l-4 border-l-teal-500">
                        <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2"><TrendingUp size={20} className="text-teal-500" /> Value Proposition</h3>
                        <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
                            <li>Real-time AI mapping of Galamsey hotspots.</li>
                            <li>Anonymous, safe reporting for rural citizens.</li>
                            <li>Data-driven insights for NGOs and Government to target restoration efforts.</li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-blue-100 border-l-4 border-l-blue-500">
                        <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2"><Users size={20} className="text-blue-500" /> Customer Segments</h3>
                        <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
                            <li><strong>Primary:</strong> Rural, uneducated populations affected by land/water destruction.</li>
                            <li><strong>Secondary:</strong> NGOs, Environmental Protection Agency (EPA), Forestry Commission.</li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-green-100 border-l-4 border-l-green-500">
                        <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2"><HeartHandshake size={20} className="text-green-500" /> Key Partners</h3>
                        <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
                            <li>Local District Assemblies & Chieftains</li>
                            <li>Telecommunication Networks (for SMS/USSD access later)</li>
                            <li>Satellite Imaging Providers (OpenStreetMap)</li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-purple-100 border-l-4 border-l-purple-500">
                        <h3 className="text-lg font-bold text-slate-800 mb-3">Revenue Streams</h3>
                        <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
                            <li>Grants from International Climate Funds (e.g., Green Climate Fund).</li>
                            <li>SaaS subscriptions for large NGOs & Mining companies doing mandated CSR restoration.</li>
                            <li>Government contracts for data-sharing API access.</li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-orange-100 border-l-4 border-l-orange-500">
                        <h3 className="text-lg font-bold text-slate-800 mb-3">Cost Structure</h3>
                        <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
                            <li>Cloud Hosting & Supabase Database.</li>
                            <li>AI Server Compute for running clustering algorithms.</li>
                            <li>Community outreach and offline educational campaigns.</li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-red-100 border-l-4 border-l-red-500">
                        <h3 className="text-lg font-bold text-slate-800 mb-3">Channels</h3>
                        <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
                            <li>Community town halls and radio stations (to reach uneducated users).</li>
                            <li>Progressive Web App (PWA) for minimal data usage.</li>
                            <li>B2B Direct pitch to government agencies.</li>
                        </ul>
                    </div>

                </div>

                <div className="mt-12 bg-green-800 text-white p-10 rounded-3xl shadow-lg text-center">
                    <TreePine size={48} className="mx-auto mb-4 text-green-300" />
                    <h2 className="text-3xl font-bold mb-4">Empowering the Vulnerable</h2>
                    <p className="text-lg text-green-100 max-w-2xl mx-auto">
                        The success of RestoreGhana hinges on making this technology accessible to the people who need it most. By simplifying the interface and providing localized education, we turn victims into active guardians of the ecosystem.
                    </p>
                </div>
            </div>
        </div>
    );
}
