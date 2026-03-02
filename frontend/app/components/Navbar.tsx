"use client";

import Link from 'next/link';
import { Home, Map as MapIcon, FileText, Activity, BookOpen, User, Briefcase } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [session, setSession] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setRole(session?.user?.user_metadata?.role || null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setRole(session?.user?.user_metadata?.role || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <nav className="bg-green-800 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold text-2xl flex items-center space-x-2">
          <span>🌍 RestoreGhana</span>
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/dashboard" className="flex items-center space-x-1 hover:text-green-300 transition"><Activity size={18} /><span>Dashboard</span></Link>
          <Link href="/risk-map" className="flex items-center space-x-1 hover:text-green-300 transition"><MapIcon size={18} /><span>Risk Map</span></Link>
          <Link href="/report" className="flex items-center space-x-1 hover:text-green-300 transition"><FileText size={18} /><span>Report</span></Link>
          <Link href="/restoration" className="flex items-center space-x-1 hover:text-green-300 transition"><Home size={18} /><span>Restoration</span></Link>
          <Link href="/education" className="flex items-center space-x-1 hover:text-green-300 transition"><BookOpen size={18} /><span>Education</span></Link>
          <Link href="/business" className="flex items-center space-x-1 hover:text-green-300 transition"><Briefcase size={18} /><span>Business</span></Link>
        </div>
        <div className="flex items-center space-x-4">
          {session ? (
            <>
              {role === 'admin' ? (
                <Link href="/admin" className="flex items-center space-x-1 text-green-200 hover:text-white transition">
                  <User size={18} />
                  <span className="hidden sm:inline">Admin Panel</span>
                </Link>
              ) : (
                <Link href="/dashboard" className="flex items-center space-x-1 text-green-200 hover:text-white transition">
                  <Activity size={18} />
                  <span className="hidden sm:inline">My Dashboard</span>
                </Link>
              )}
              <button onClick={handleSignOut} className="bg-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition shadow">
                Sign Out
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/login" className="text-white hover:text-green-300 font-medium px-2 py-2 transition">
                Log In
              </Link>
              <Link href="/signup" className="bg-white text-green-800 px-4 py-2 rounded-full font-semibold hover:bg-green-100 transition shadow">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
