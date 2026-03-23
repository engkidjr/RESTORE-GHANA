import { Activity, ShieldAlert, Droplet } from 'lucide-react';

type StatsProps = {
    stats?: {
        identified_risk_zones: number;
        total_reports: number;
        active_restoration_projects: number;
    }
};

export default function StatsBar({ stats = { identified_risk_zones: 0, total_reports: 0, active_restoration_projects: 0 } }: StatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="bg-red-100 text-red-600 p-4 rounded-full">
                    <ShieldAlert size={28} />
                </div>
                <div>
                    <p className="text-slate-500 text-sm font-semibold">AI Verified Risk Zones</p>
                    <h3 className="text-3xl font-bold text-slate-800">{stats.identified_risk_zones}</h3>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="bg-amber-100 text-amber-600 p-4 rounded-full">
                    <Activity size={28} />
                </div>
                <div>
                    <p className="text-slate-500 text-sm font-semibold">Community Reports</p>
                    <h3 className="text-3xl font-bold text-slate-800">{stats.total_reports}</h3>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="bg-blue-100 text-blue-600 p-4 rounded-full">
                    <Droplet size={28} />
                </div>
                <div>
                    <p className="text-slate-500 text-sm font-semibold">Active Restorations</p>
                    <h3 className="text-3xl font-bold text-slate-800">{stats.active_restoration_projects}</h3>
                </div>
            </div>
        </div>
    );
}
