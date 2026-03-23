import RestoreProgressCard from '../components/RestoreProgressCard';

export default function RestorationTracker() {
    const projects = [
        { id: 1, title: 'Birim River Cleanup', location: 'Eastern Region', progress: 67, org: 'Green Ghana' },
        { id: 2, title: 'Atewa Forest Reforestation', location: 'Eastern Region', progress: 45, org: 'Forestry Commission' },
        { id: 3, title: 'Pra River Desilting', location: 'Central Region', progress: 82, org: 'Water Resources Comm.' },
        { id: 4, title: 'Offin River Rehabilitation', location: 'Ashanti Region', progress: 15, org: 'Local Council' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Restoration Tracker</h1>
                <p className="text-lg text-slate-600 mb-10">
                    Monitor the real-time progress of cleanup and reforestation projects reversing the effects of Galamsey.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((p) => (
                        <RestoreProgressCard
                            key={p.id}
                            title={p.title}
                            location={p.location}
                            progress={p.progress}
                            org={p.org}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
