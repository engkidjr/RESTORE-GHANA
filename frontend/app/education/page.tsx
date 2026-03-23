"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Glasses, Download, ShieldAlert, HeartPulse, 
  Map, Activity, BookOpen, ChevronRight, PlayCircle, Sprout, CheckCircle,
  Trophy, Share2, Zap, GitBranch, Database, Search, Shield, Eye, LineChart, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

export default function EducationPage() {
  const [seniorMode, setSeniorMode] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<{ [key: number]: boolean }>({});

  const toggleSeniorMode = () => setSeniorMode(!seniorMode);

  // Styling helpers based on senior mode
  const textBase = seniorMode ? "text-xl md:text-2xl" : "text-base md:text-lg";
  const textTitle = seniorMode ? "text-4xl md:text-6xl font-black tracking-tight" : "text-3xl md:text-5xl font-extrabold tracking-tight";
  const contrastBg = seniorMode ? "bg-[#050d0a] text-white border-4 border-yellow-400" : "bg-white text-slate-800 border border-slate-200";
  const textMuted = seniorMode ? "text-gray-300 font-medium" : "text-slate-600";
  const cardBg = seniorMode ? "bg-[#111827] text-white border-2 border-green-500" : "bg-white text-slate-800 border border-slate-100 shadow-lg";

  // Quiz Logic
  const handleQuizAnswer = (qIndex: number, isCorrect: boolean) => {
    if (quizAnswered[qIndex]) return;
    setQuizAnswered(prev => ({ ...prev, [qIndex]: true }));
    if (isCorrect) {
      setQuizScore(prev => prev + 10);
    }
  };

  return (
    <div className={`min-h-screen ${seniorMode ? 'bg-[#000000] text-white' : 'bg-slate-50 text-slate-900'} pb-24 transition-colors duration-300`}>
      {/* Hero & Toggle Section */}
      <section className={`relative pt-12 pb-20 px-6 ${seniorMode ? 'bg-black border-b-8 border-yellow-400' : 'bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 text-white'}`}>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex justify-end mb-8">
            <button 
              onClick={toggleSeniorMode}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-xl transition-transform hover:scale-105 ${
                seniorMode ? 'bg-yellow-400 text-black text-xl border-4 border-white' : 'bg-white text-green-900'
              }`}
            >
              <Glasses size={seniorMode ? 28 : 20} />
              {seniorMode ? "Disable Senior Mode" : "Enable Senior Mode (Large Text)"}
            </button>
          </div>
          
          <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
            <h1 className={`${textTitle} mb-6 leading-tight`}>
              Education & Action Portal
            </h1>
            <p className={`${textBase} font-light mb-8 ${seniorMode ? 'text-yellow-300' : 'text-green-100'}`}>
              Whether you are a community elder passing down wisdom or a youth taking action—learn how to protect our water, soil, and future.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className={`px-4 py-2 rounded-full font-bold text-sm ${seniorMode ? 'bg-white text-black' : 'bg-green-700 border border-green-500'}`}>SDG 6: Clean Water</span>
              <span className={`px-4 py-2 rounded-full font-bold text-sm ${seniorMode ? 'bg-white text-black' : 'bg-green-700 border border-green-500'}`}>SDG 15: Life on Land</span>
            </div>
          </div>
        </div>
      </section>

      {/* The 'Why' (Multi-generational baseline) */}
      <section className="py-16 px-6 container mx-auto max-w-5xl">
        <div className={`p-8 rounded-3xl ${cardBg}`}>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className={`p-4 rounded-full flex-shrink-0 ${seniorMode ? 'bg-yellow-400 text-black' : 'bg-red-100 text-red-600'}`}>
              <HeartPulse size={40} strokeWidth={seniorMode ? 3 : 2} />
            </div>
            <div>
              <h2 className={`${seniorMode ? 'text-3xl font-black text-yellow-400' : 'text-2xl font-bold text-slate-800'} mb-4`}>
                The Hidden Danger: Mercury & Health
              </h2>
              <p className={`${textBase} ${textMuted} mb-4`}>
                Illegal mining (galamsey) uses heavy metals like mercury to extract gold. This mercury runs directly into our rivers—poisoning the drinking water and the fish we eat.
              </p>
              <ul className={`space-y-3 ${textBase} ${seniorMode ? 'font-bold text-white' : ''}`}>
                <li className="flex items-center gap-3">
                  <ShieldAlert className={seniorMode ? 'text-yellow-400' : 'text-red-500'} /> Causes severe neurological damage in children.
                </li>
                <li className="flex items-center gap-3">
                  <ShieldAlert className={seniorMode ? 'text-yellow-400' : 'text-red-500'} /> Poisons soil, ruining crops for generations.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* YOUTH PORTAL */}
      {!seniorMode && (
        <section className="py-12 px-6 container mx-auto max-w-6xl">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-slate-800">Youth Action Hub</h2>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">Interactive</span>
          </div>
          
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Column: Progress & Leaderboard */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 flex flex-col">
                <h3 className="text-xl font-bold mb-2">Your Guardian Impact</h3>
                <p className="text-slate-500 mb-6 font-medium">Earn 50 Points to unlock a 50 GHS Mobile Money Reward.</p>
                
                <div className="mb-4 flex justify-between text-sm font-bold text-green-700">
                  <span>{quizScore} Points</span>
                  <span>50 Points Goal</span>
                </div>
                <div className="h-6 w-full bg-slate-100 rounded-full overflow-hidden mb-6">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((quizScore / 50) * 100, 100)}%` }}
                    transition={{ duration: 1, type: "spring" }}
                  />
                </div>
                <p className="text-sm text-slate-400 mt-auto italic">Pro-tip: Answer quiz questions or report verified incidents to accelerate your progress!</p>
              </div>

              {/* Top Guardian Leaderboard */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 flex flex-col">
                 <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Trophy className="text-yellow-500" /> Top Guardians</h3>
                 <div className="space-y-4">
                   <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                     <span className="font-bold flex items-center gap-2">🥇 Ama Boateng</span>
                     <span className="text-green-600 font-bold">120 pts</span>
                   </div>
                   <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                     <span className="font-bold flex items-center gap-2 text-slate-600">🥈 Kwame Mensah</span>
                     <span className="text-green-600 font-bold">95 pts</span>
                   </div>
                   <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                     <span className="font-bold flex items-center gap-2 text-slate-700">🥉 You</span>
                     <span className="text-green-600 font-bold">{quizScore} pts</span>
                   </div>
                 </div>
              </div>
            </div>

            {/* Right Column: Slider & Quiz */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="bg-slate-900 rounded-3xl p-8 shadow-lg text-white relative overflow-hidden group border border-slate-800 min-h-[250px] flex-shrink-0">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 group-hover:opacity-20 transition-opacity"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="relative z-10 flex flex-col h-full justify-end">
                  <div>
                    <span className="flex items-center gap-2 bg-emerald-500 text-white w-max px-3 py-1 rounded-full text-xs font-bold mb-4">
                      <Sprout size={14} /> Restoration Visualizer
                    </span>
                    <h3 className="text-2xl font-bold mb-2">Healing the Land</h3>
                    <p className="text-slate-300 line-clamp-2">Slide to see how corporate compliance regulations mandated by RestoreGhana transform barren mine pits back to lush forests.</p>
                  </div>
                  <button className="bg-white text-slate-900 font-bold py-3 px-6 rounded-full mt-6 w-max flex items-center gap-2 hover:bg-green-400 hover:text-white transition">
                    Try the Slider <ChevronRight size={18} />
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 flex-grow">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><BookOpen className="text-blue-500" /> Knowledge Check (Earn +10 pts)</h3>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <p className="font-semibold text-slate-800 mb-4 text-lg">What is the safest way to report an active illegal mining site?</p>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <button 
                      onClick={() => handleQuizAnswer(1, false)}
                      className={`p-4 rounded-xl border-2 text-left font-medium transition ${quizAnswered[1] ? 'opacity-50 border-red-200 bg-red-50' : 'border-slate-200 hover:border-blue-500 hover:bg-blue-50'}`}
                      disabled={quizAnswered[1]}
                    >
                      A. Confront the miners directly and tell them to stop.
                    </button>
                    <button 
                      onClick={() => handleQuizAnswer(1, true)}
                      className={`p-4 rounded-xl border-2 text-left font-medium transition ${quizAnswered[1] ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-200 hover:border-blue-500 hover:bg-blue-50'}`}
                      disabled={quizAnswered[1]}
                    >
                      B. Open app, take a photo hidden from distance, and submit.
                    </button>
                  </div>
                  {quizAnswered[1] && (
                    <div className="mt-4 p-4 bg-green-100 rounded-lg text-green-800 flex items-center gap-2 font-bold animate-pulse">
                      <CheckCircle size={20} /> Correct! Earned 10 points.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Digital Classroom */}
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-lg text-white border border-slate-700">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><Activity className="text-red-400" /> Mercury Bioaccumulation</h3>
              <p className="text-slate-400 text-sm mb-6">See how toxic Mercury ($Hg$) enters the human food chain.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="bg-red-500/20 p-3 rounded-xl text-red-500"><GitBranch /></div>
                  <div><h4 className="font-bold">1. Mine Pit Runoff</h4><p className="text-xs text-slate-400">Mercury used to extract gold washes directly into rivers.</p></div>
                </div>
                <div className="w-1 h-3 bg-yellow-400/50 mx-auto animate-pulse rounded-full"></div>
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="bg-blue-500/20 p-3 rounded-xl text-blue-400"><Sprout /></div>
                  <div><h4 className="font-bold">2. Plankton & Fish</h4><p className="text-xs text-slate-400">Microbes convert Hg to methylmercury, eaten by local fish.</p></div>
                </div>
                <div className="w-1 h-3 bg-yellow-400/50 mx-auto animate-pulse rounded-full"></div>
                <div className="flex items-center gap-4 bg-red-900/40 p-4 rounded-2xl border border-red-500/50">
                  <div className="bg-red-500/30 p-3 rounded-xl text-red-300"><HeartPulse /></div>
                  <div><h4 className="font-bold">3. Human Diet</h4><p className="text-xs text-red-200">Causes severe neurological and birth defects when consumed.</p></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><Database className="text-blue-500" /> How AI Saves Rivers</h3>
                <p className="text-slate-500 text-sm mb-6">Computer Science in Action: Our AI detects illegal mining patterns.</p>
                <div className="relative p-6 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden font-mono text-xs text-slate-600 mb-6">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                  <p className="mb-2"><span className="text-purple-600 font-bold">Input:</span> 50 scattered citizen photos</p>
                  <p className="mb-2"><span className="text-blue-600 font-bold">Process:</span> <span className="animate-pulse inline-flex items-center gap-1 bg-white px-2 py-1 rounded shadow-sm border border-slate-200 mt-1"><Search size={12}/> Gemini Models Clustering...</span></p>
                  <p className="mt-2"><span className="text-green-600 font-bold">Output:</span> 3 High-Risk Hotspots Identified! Auto-reporting to EPA.</p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2"><Zap size={16}/> Career Pathway: Data Analyst</h4>
                <p className="text-sm text-blue-800">Love tech? Data-as-a-Service (DaaS) is booming in environmental science. Code to save the Earth!</p>
              </div>
            </div>
          </div>

          {/* Global Citizenship & Youth Toolkit */}
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="md:col-span-2 bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl p-8 shadow border border-green-100">
              <h3 className="text-xl font-bold mb-6 text-green-900 flex items-center gap-2"><Shield className="text-green-600" /> Youth Action Toolkit</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-white">
                  <Eye className="text-blue-500 mb-3" size={24} />
                  <h4 className="font-bold text-slate-800 mb-2">1. Identification</h4>
                  <p className="text-xs text-slate-600">Learn to spot unnatural 'coffee-colored' chemical water vs. safe mud silt.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-white">
                  <ShieldAlert className="text-red-500 mb-3" size={24} />
                  <h4 className="font-bold text-slate-800 mb-2">2. Safety First</h4>
                  <p className="text-xs text-slate-600">Never confront illegal miners. Snap geotagged photos from a hidden distance.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-white">
                  <LineChart className="text-green-500 mb-3" size={24} />
                  <h4 className="font-bold text-slate-800 mb-2">3. Advocacy</h4>
                  <p className="text-xs text-slate-600">Use this app's live Dashboard data to pressure local chiefs into action.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4 shadow-xl shadow-green-200">
                <ShieldCheck size={40} className="text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">SDG 6 Impact Badge</h3>
              <p className="text-xs text-slate-500 mb-6">See yourself as a global citizen. Share your Guardian status to inspire peers!</p>
              <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition">
                <Share2 size={18} /> Share to Socials
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ELDER PORTAL (Always visible if senior mode, else merged below) */}
      <section className="py-12 px-6 container mx-auto max-w-6xl">
        <h2 className={`${seniorMode ? 'text-4xl font-black mb-10 border-b-4 border-yellow-400 inline-block' : 'text-3xl font-bold mb-8 text-slate-800'}`}>
          The Guardian's Guide
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Action Card 1 */}
          <div className={`${cardBg} p-8 rounded-3xl`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${seniorMode ? 'bg-yellow-400 text-black' : 'bg-blue-100 text-blue-600'}`}>
              <Map size={32} strokeWidth={seniorMode ? 3 : 2} />
            </div>
            <h3 className={`${seniorMode ? 'text-2xl font-black mb-4' : 'text-xl font-bold mb-3'}`}>1. Find the Problem</h3>
            <p className={`${textBase} ${textMuted}`}>
              Look for rivers turning brown or yellow. Look for machines destroying the forest. Do not go too close. Stay hidden and safe.
            </p>
          </div>
          {/* Action Card 2 */}
          <div className={`${cardBg} p-8 rounded-3xl`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${seniorMode ? 'bg-yellow-400 text-black' : 'bg-green-100 text-green-600'}`}>
              <Activity size={32} strokeWidth={seniorMode ? 3 : 2} />
            </div>
            <h3 className={`${seniorMode ? 'text-2xl font-black mb-4' : 'text-xl font-bold mb-3'}`}>2. Take a Picture</h3>
            <p className={`${textBase} ${textMuted}`}>
              Use your phone to take a clear picture. The app will save your location. We will never reveal your identity.
            </p>
          </div>
          {/* Action Card 3 */}
          <div className={`${cardBg} p-8 rounded-3xl`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${seniorMode ? 'bg-yellow-400 text-black' : 'bg-purple-100 text-purple-600'}`}>
              <ShieldAlert size={32} strokeWidth={seniorMode ? 3 : 2} />
            </div>
            <h3 className={`${seniorMode ? 'text-2xl font-black mb-4' : 'text-xl font-bold mb-3'}`}>3. We Take Action</h3>
            <p className={`${textBase} ${textMuted}`}>
              We send your report to the Environmental Protection Agency (EPA). The company must clean up the water or pay a heavy fine.
            </p>
          </div>
        </div>

        {/* Community Wisdom */}
        <div className={`p-8 md:p-12 rounded-3xl ${seniorMode ? 'bg-[#111827] border-4 border-white' : 'bg-amber-50 border border-amber-100'}`}>
          <h3 className={`${seniorMode ? 'text-3xl font-black mb-6 text-yellow-400' : 'text-2xl font-bold mb-4 text-amber-900'}`}>
            Community Wisdom: The River Pra
          </h3>
          <p className={`${textBase} ${seniorMode ? 'text-white' : 'text-amber-800 font-medium'} max-w-4xl leading-relaxed italic border-l-4 ${seniorMode ? 'border-yellow-400' : 'border-amber-400'} pl-6`}>
            "When I was a boy in the 1970s, the Pra River was so clear you could count the pebbles at the bottom. We drank from it, we fished from it, our life depended on it. We must report the machines that turned our lifeblood into mud." <br/><br/>
            <span className="font-bold">— Elder Kwame, Western Region</span>
          </p>
        </div>
      </section>

      {/* Toolkit & Documentary */}
      <section className="py-12 px-6 container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8">
          
          <div className={`p-8 rounded-3xl flex flex-col justify-center items-center text-center ${seniorMode ? 'bg-white text-black border-4 border-yellow-400' : 'bg-green-900 text-white'}`}>
            <PlayCircle size={64} className={`mb-6 ${seniorMode ? 'text-red-600' : 'text-green-300'}`} />
            <h3 className={`${seniorMode ? 'text-3xl font-black mb-4' : 'text-2xl font-bold mb-3'}`}>The Accountability Loop</h3>
            <p className={`${textBase} mb-8 ${seniorMode ? 'font-bold' : 'text-green-100'}`}>
              Watch how your anonymous reports instantly trigger corporate fines and mandatory environmental remediation.
            </p>
            <Link href="/accountability-flow.html" target="_blank" className={`px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 ${seniorMode ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-green-900 hover:bg-green-50'}`}>
              <PlayCircle size={20} /> View Flow Chart
            </Link>
          </div>

          <div className={`${cardBg} p-8 rounded-3xl flex flex-col justify-center items-center text-center`}>
            <Download size={64} className={`mb-6 ${seniorMode ? 'text-yellow-400' : 'text-slate-400'}`} />
            <h3 className={`${seniorMode ? 'text-3xl font-black mb-4' : 'text-2xl font-bold mb-3'}`}>Restoration Toolkit</h3>
            <p className={`${textBase} mb-8 ${textMuted}`}>
              Download our offline guide on safe water consumption, basic soil testing, and how to spot mercury poisoning symptoms in your community.
            </p>
            <button className={`px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 ${seniorMode ? 'bg-yellow-400 text-black border-2 border-black hover:bg-yellow-300' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
               <Download size={20} /> Download PDF (2MB)
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
