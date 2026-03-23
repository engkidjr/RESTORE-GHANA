"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // 'user' or 'admin'
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const toastId = toast.loading("Creating account...");

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        role: role
                    }
                }
            });
            if (error) throw error;
            toast.success('Check your email for the confirmation link!', { id: toastId });
            // Optionally redirect to login
            setTimeout(() => router.push('/login'), 2000);
        } catch (error: any) {
            toast.error(error.message, { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <Toaster position="top-center" />
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
                    Create a RestoreGhana Account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Join the effort to map and restore our ecosystems.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSignUp}>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Account Type</label>
                            <div className="mt-2 grid grid-cols-2 gap-4">
                                <label className={`border rounded-xl p-4 cursor-pointer transition ${role === 'user' ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                                    <input type="radio" name="role" value="user" className="hidden" checked={role === 'user'} onChange={() => setRole('user')} />
                                    <div className="block text-sm font-bold text-slate-800 mb-1">Community User</div>
                                    <div className="text-xs text-slate-500">I want to report incidents and track progress.</div>
                                </label>
                                <label className={`border rounded-xl p-4 cursor-pointer transition ${role === 'admin' ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                                    <input type="radio" name="role" value="admin" className="hidden" checked={role === 'admin'} onChange={() => setRole('admin')} />
                                    <div className="block text-sm font-bold text-slate-800 mb-1">NGO / Admin</div>
                                    <div className="text-xs text-slate-500">I want to manage data and deploy restoration projects.</div>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">Email address</label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">Password</label>
                            <div className="mt-1">
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                            >
                                {loading ? 'Creating Account...' : 'Sign Up'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <Link href="/login" className="text-sm font-medium text-green-600 hover:text-green-500">
                            Already have an account? Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
