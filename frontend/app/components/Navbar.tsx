"use client";

import Link from 'next/link';
import { Home, Map as MapIcon, FileText, Activity, BookOpen, User, Briefcase, GraduationCap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard', icon: Activity },
  { href: '/risk-map', label: 'Risk Map', icon: MapIcon },
  { href: '/report', label: 'Report', icon: FileText },
  { href: '/restoration', label: 'Restoration', icon: Home },
  { href: '/gibby', label: 'Gibby AI', icon: User },
  { href: '/education', label: 'Education', icon: GraduationCap },
  { href: '/accountability-flow.html', label: 'Accountability', icon: BookOpen, external: true },
  { href: '/policy-and-rewards.html', label: 'Policy', icon: Briefcase, external: true },
];

export default function Navbar() {
  const [session, setSession] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

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
        <div className="hidden md:flex space-x-2 relative items-center">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className="relative px-3 py-2 rounded-full flex items-center space-x-1 group"
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-green-700/60 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center space-x-1 text-white group-hover:text-green-200 transition-colors">
                  <link.icon size={18} />
                  <span>{link.label}</span>
                </span>
              </Link>
            );
          })}
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
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSignOut} 
                className="bg-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition shadow"
              >
                Sign Out
              </motion.button>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/login" className="text-white hover:text-green-300 font-medium px-2 py-2 transition">
                Log In
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/signup" className="bg-white text-green-800 px-4 py-2 rounded-full font-semibold hover:bg-green-100 transition shadow block">
                  Sign Up
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
