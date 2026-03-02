import React from 'react';
import { BookOpen, Droplets, TreePine, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function EducationPortal() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="container mx-auto max-w-5xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Community Education Hub</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Empowering communities through knowledge. Learn about the dangers of illegal mining, safe water practices, and environmental stewardship.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                            <AlertTriangle size={28} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">The Impact of Galamsey</h2>
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-4 text-lg">
                        Illegal artisanal gold mining, locally known as "Galamsey," is one of the most pressing environmental challenges in Ghana.
                        It involves the reckless excavation of land and the heavy use of toxic chemicals like mercury and cyanide to extract gold dust.
                    </p>
                    <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                        <li><strong>Loss of Cocoa Farms:</strong> Thousands of hectares of fertile agricultural land are destroyed, threatening food security and generational wealth.</li>
                        <li><strong>Mercury Poisoning:</strong> Mercury vapor is inhaled during the burning process, and liquid mercury settles into riverbeds, entering the food chain through fish.</li>
                        <li><strong>Deep Trenches:</strong> Abandoned deep mining pits fill with water and become breeding grounds for mosquitoes and death traps for community members.</li>
                    </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                                <Droplets size={28} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">Safe Water Practices</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            Major water bodies such as the Pra, Ankobra, and Birim rivers have seen unprecedented levels of turbidity (mud/dirt) and heavy metal pollution.
                        </p>
                        <h3 className="font-semibold text-slate-800 mb-2">How to protect your family:</h3>
                        <ul className="list-disc list-inside text-slate-600 space-y-2 ml-2">
                            <li>Avoid drinking directly from rivers near mining zones.</li>
                            <li>Use community boreholes or treated tap water where available.</li>
                            <li>Boiling water kills bacteria but <strong>does not remove mercury</strong> or heavy metals.</li>
                            <li>Report sudden severe water discoloration to local authorities or via our <Link href="/report" className="text-green-600 hover:underline">Report Page</Link>.</li>
                        </ul>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                                <TreePine size={28} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">Land Restoration</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            Healing the earth takes time, but it is possible. Restoration stops erosion and returns the land to agricultural use.
                        </p>
                        <h3 className="font-semibold text-slate-800 mb-2">The 3-Step Reclamation Process:</h3>
                        <ol className="list-decimal list-inside text-slate-600 space-y-2 ml-2">
                            <li><strong>Refilling:</strong> Using heavy machinery to collapse and fill dangerous open pits.</li>
                            <li><strong>Topsoil Replacement:</strong> Spreading nutrient-rich soil over the leveled ground.</li>
                            <li><strong>Reforestation:</strong> Planting fast-growing native trees to stabilize the soil and returning the plot to farmers.</li>
                        </ol>
                    </div>
                </div>

                <div className="bg-green-800 text-white p-10 rounded-3xl shadow-lg text-center">
                    <BookOpen size={48} className="mx-auto mb-4 text-green-300" />
                    <h2 className="text-3xl font-bold mb-4">Knowledge is Power</h2>
                    <p className="text-lg text-green-100 max-w-2xl mx-auto mb-8">
                        It takes an entire community working together to reverse the damage. By educating others and reporting illegal activity, you are directly contributing to the survival of Ghana's ecosystems.
                    </p>
                    <Link href="/report">
                        <button className="bg-white text-green-800 px-8 py-3 rounded-full font-bold text-lg hover:bg-green-100 transition shadow-lg">
                            Take Action: Make a Report
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
