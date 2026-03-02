import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function EducationCard({ title, sdg, desc, slug }: { title: string, sdg: string, desc: string, slug: string }) {
    const getBadgeColor = (sdg: string) => {
        if (sdg.includes('3')) return 'bg-green-100 text-green-700'; // Good Health
        if (sdg.includes('6')) return 'bg-blue-100 text-blue-700'; // Clean Water
        if (sdg.includes('4')) return 'bg-red-100 text-red-700'; // Quality Education
        return 'bg-slate-100 text-slate-700';
    };

    return (
        <Link href={`/education/${slug}`} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 block hover:-translate-y-1 hover:shadow-lg transition">
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${getBadgeColor(sdg)}`}>
                {sdg}
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
            <p className="text-slate-600 mb-6 text-sm">{desc}</p>
            <span className="text-green-600 font-bold flex items-center gap-2 text-sm">
                <BookOpen size={16} /> Read Module
            </span>
        </Link>
    );
}
