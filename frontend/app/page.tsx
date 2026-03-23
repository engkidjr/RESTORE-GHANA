import Link from 'next/link';
import { ArrowRight, Activity, Map, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"></div>
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            Reverse the Effects of Galamsey.<br />Restore the Earth.
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-green-100 max-w-3xl mx-auto font-light">
            A national civic platform using AI to track illegal mining, empower communities to report issues, and monitor restoration progress across Ghana.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/report" className="bg-white text-green-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 shadow-xl transition flex items-center gap-2 transform hover:scale-105">
              Report an Incident <ArrowRight size={20} />
            </Link>
            <Link href="/dashboard" className="bg-green-700 text-white border border-green-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 shadow-xl transition flex items-center gap-2 transform hover:scale-105">
              View Dashboard <Activity size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-16">How RestoreGhana Works</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center hover:shadow-xl transition">
            <div className="bg-amber-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center text-amber-600 mb-6">
              <Map size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">1. Community Reporting</h3>
            <p className="text-slate-600">
              Citizens can easily report brown water, deforestation, and illegal mining activities with GPS locations and photos.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center hover:shadow-xl transition">
            <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center text-blue-600 mb-6">
              <Activity size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">2. AI Pattern Detection</h3>
            <p className="text-slate-600">
              Our backend instantly clusters reports using Scikit-learn DBSCAN to identify high-risk zones and predict future hotspots.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center hover:shadow-xl transition">
            <div className="bg-emerald-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center text-emerald-600 mb-6">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">3. Track Restoration</h3>
            <p className="text-slate-600">
              Monitor ongoing cleanup projects, verify water safety, and educate the public on environmental responsibility.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
