"use client";

import { useState, useRef } from 'react';
import { Camera, MapPin, Send, Loader2, Search } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import toast, { Toaster } from 'react-hot-toast';
import FeedbackModal from './FeedbackModal';

export default function ReportForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [locationName, setLocationName] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchingLocation, setSearchingLocation] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                    setLocationName("Current GPS Location");
                    toast.success("GPS Location found!");
                },
                (err) => toast.error("Could not get location. " + err.message)
            );
        }
    };

    const handleSearchLocation = async () => {
        if (!searchQuery) return;
        setSearchingLocation(true);
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`);
            const data = await res.json();
            if (data && data.length > 0) {
                setLocation({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
                setLocationName(data[0].display_name);
                toast.success("Location found!");
            } else {
                toast.error("Location not found. Try a different search term.");
            }
        } catch (e) {
            toast.error("Failed to search location.");
        } finally {
            setSearchingLocation(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        if (!location) {
            toast.error("Please provide a location.");
            return;
        }

        setLoading(true);
        const toastId = toast.loading("Submitting report...");

        try {
            const formData = new FormData(e.currentTarget);
            const description = formData.get("description") as string;
            const type = formData.get("type") as string;

            let photoUrl = null;

            // Handle file upload to Supabase Storage
            if (file) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError, data } = await supabase.storage
                    .from('reports_images')
                    .upload(filePath, file);

                if (uploadError) {
                    throw new Error("Failed to upload image: " + uploadError.message);
                }

                const { data: publicUrlData } = supabase.storage
                    .from('reports_images')
                    .getPublicUrl(filePath);

                photoUrl = publicUrlData.publicUrl;
            }

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const { data: { session } } = await supabase.auth.getSession();

            const res = await fetch(`${apiUrl}/reports`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    lat: location.lat,
                    lng: location.lng,
                    type: type,
                    description: description,
                    photo_url: photoUrl,
                    user_id: session?.user?.id || "anon"
                })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.detail || "Failed to submit report");
            }

            setSuccess(true);
            toast.success("Report submitted successfully!", { id: toastId });
        } catch (err: unknown) {
            console.error("Submission error:", err);
            const message = err instanceof Error ? err.message : "An error occurred.";
            setError(message);
            toast.error(message, { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setSuccess(false);
        setLocation(null);
        setLocationName("");
        setSearchQuery("");
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <>
        <FeedbackModal isOpen={success} onClose={resetForm} />
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Submit an Incident Report</h2>

            {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

            <div className="mb-5">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Incident Type</label>
                <select name="type" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition text-slate-800 bg-slate-50">
                    <option value="">Select an option...</option>
                    <option value="brown_water">Brown Water (River Pollution)</option>
                    <option value="illegal_mining">Active Illegal Mining (Galamsey)</option>
                    <option value="deforestation">Deforestation / Land Degradation</option>
                </select>
            </div>

            <Toaster position="top-center" />
            <div className="mb-5">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>

                <div className="flex gap-2 mb-3">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search city or neighborhood..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                    />
                    <button type="button" onClick={handleSearchLocation} disabled={searchingLocation} className="bg-green-100 text-green-700 px-4 py-3 rounded-xl hover:bg-green-200 transition flex items-center whitespace-nowrap gap-2 disabled:opacity-50 font-medium">
                        {searchingLocation ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />} Search
                    </button>
                    <button type="button" onClick={handleGetLocation} className="bg-slate-800 text-white px-4 py-3 rounded-xl hover:bg-slate-700 transition flex items-center whitespace-nowrap gap-2 font-medium">
                        <MapPin size={18} /> GPS
                    </button>
                </div>

                <input
                    type="text"
                    readOnly
                    required
                    value={location ? `${locationName || 'GPS Location'} (${location.lat.toFixed(4)}, ${location.lng.toFixed(4)})` : ""}
                    placeholder="Location coordinates (required)"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                />
            </div>

            <div className="mb-5">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                <textarea name="description" required rows={4} placeholder="Describe what you see..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition text-slate-800 bg-slate-50"></textarea>
            </div>

            <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Photo Evidence</label>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="hidden"
                />
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition cursor-pointer flex flex-col items-center gap-2"
                >
                    {file ? (
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-lg bg-green-100 flex items-center justify-center mb-2 overflow-hidden relative">
                                <img src={URL.createObjectURL(file)} alt="Preview" className="object-cover w-full h-full" />
                            </div>
                            <span className="text-sm text-green-700 font-medium truncate max-w-[200px]">{file.name}</span>
                            <span className="text-xs text-slate-400 mt-1">Click to change</span>
                        </div>
                    ) : (
                        <>
                            <Camera size={24} className="text-slate-400" />
                            <span className="text-sm text-slate-500 font-medium">Click to upload or take a photo</span>
                        </>
                    )}
                </div>
            </div>

            <button disabled={loading} type="submit" className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:opacity-70">
                {loading ? <><Loader2 className="animate-spin" size={20} /> Submitting...</> : <><Send size={20} /> Submit Report</>}
            </button>
        </form>
        </>
    );
}
