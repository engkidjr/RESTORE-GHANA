import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function EducationModule({ params }: { params: { slug: string } }) {
    // Simple mock content router
    const contentMap: Record<string, any> = {
        'mercury-health-risks': {
            title: 'Mercury Health Risks in Mining',
            sdg: 'SDG 3: Good Health and Well-being',
            content: `Mercury is widely used in artisanal and small-scale gold mining (Galamsey) across Ghana to extract gold from ore. 
      \nWhen burned, mercury vaporizes and poses a severe health hazard to miners and surrounding communities.
      \nSymptoms of mercury poisoning include tremors, memory loss, and severe kidney damage.`
        },
        'safe-water-practices': {
            title: 'Safe Water Practices',
            sdg: 'SDG 6: Clean Water and Sanitation',
            content: `Galamsey operations often discharge massive amounts of silt, heavy metals, and chemicals directly into major rivers like the Pra, Ankobra, and Birim.
      \nCommunities relying on these water bodies must employ strict filtration and purification mechanisms to avoid waterborne diseases and heavy metal toxicity.`
        },
        'environmental-duty': {
            title: 'Environmental Responsibility',
            sdg: 'SDG 4: Quality Education',
            content: `Education is our strongest weapon against environmental degradation. 
      \nBy educating the youth on the impacts of deforestation and land degradation, we build a future generation that prioritizes sustainable development over short-term gains.`
        }
    };

    const module = contentMap[params.slug] || { title: 'Not Found', content: 'Module not found.' };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="container mx-auto max-w-3xl">
                <Link href="/education" className="text-green-600 font-semibold flex items-center gap-2 mb-8 hover:underline">
                    <ArrowLeft size={18} /> Back to Modules
                </Link>
                <div className="bg-white p-10 rounded-3xl shadow-lg border border-slate-100">
                    <span className="inline-block px-4 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-bold mb-6">
                        {module.sdg}
                    </span>
                    <h1 className="text-4xl font-extrabold text-slate-800 mb-8 leading-tight">{module.title}</h1>
                    <div className="prose prose-lg text-slate-600 space-y-4 whitespace-pre-line">
                        {module.content}
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
                        <button className="bg-green-100 text-green-800 px-6 py-3 rounded-xl font-bold hover:bg-green-200 transition">Take Quiz</button>
                        <button className="bg-slate-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-700 transition">Share Module</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
