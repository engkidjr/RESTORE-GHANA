export default function RestoreProgressCard({
    title, location, progress, org
}: {
    title: string, location: string, progress: number, org: string
}) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-slate-800">{title}</h3>
                    <p className="text-slate-500 text-sm">{location} • Led by {org}</p>
                </div>
                <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm">
                    {progress}%
                </span>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-3 mb-2 overflow-hidden">
                <div
                    className="bg-green-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <p className="text-right text-xs text-slate-400 font-medium">{100 - progress}% remaining</p>
        </div>
    );
}
