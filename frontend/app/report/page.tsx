import ReportForm from '../components/ReportForm';

export default function ReportPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="container mx-auto max-w-4xl text-center mb-10">
                <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Report an Incident</h1>
                <p className="text-lg text-slate-600">
                    Your report helps AI track illegal mining activity and protects our water sources.
                    Please be as accurate as possible.
                </p>
            </div>
            <ReportForm />
        </div>
    );
}
