"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, MessageSquare, Star } from 'lucide-react';

type FeedbackModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [suggestion, setSuggestion] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        if (rating === 0) return;
        
        setSubmitted(true);
        // Animate success then close
        setTimeout(() => {
            onClose();
            // Reset state after closing animation
            setTimeout(() => {
                setSubmitted(false);
                setRating(0);
                setSuggestion('');
            }, 500);
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
                    {/* Blurred Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/30 backdrop-blur-md pointer-events-auto"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ 
                            type: "spring", 
                            damping: 25, 
                            stiffness: 300 
                        }}
                        className="relative w-full max-w-lg bg-white/80 dark:bg-[#111]/80 backdrop-blur-2xl border border-white/30 dark:border-white/10 p-8 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] pointer-events-auto flex flex-col items-center mx-4"
                    >
                        {!submitted ? (
                            <>
                                <button 
                                    onClick={onClose}
                                    className="absolute top-5 right-5 p-2 bg-gray-100 dark:bg-white/10 rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                                >
                                    <X size={18} />
                                </button>
                                
                                <div className="w-16 h-16 bg-gradient-to-tr from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg mb-6 shadow-green-500/30">
                                    <MessageSquare className="text-white" size={28} />
                                </div>
                                
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">Report Submitted Successfully!</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-center mb-8">How easy was it to report this issue?</p>

                                {/* Bouncy Rating Stars */}
                                <div className="flex space-x-3 mb-8">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <motion.button
                                            key={star}
                                            whileHover={{ scale: 1.2, rotate: 5 }}
                                            whileTap={{ scale: 0.9 }}
                                            onMouseEnter={() => setHoveredRating(star)}
                                            onMouseLeave={() => setHoveredRating(0)}
                                            onClick={() => setRating(star)}
                                            className="focus:outline-none"
                                        >
                                            <Star 
                                                size={42} 
                                                className={`transition-colors duration-200 ${
                                                    (hoveredRating || rating) >= star 
                                                    ? 'fill-yellow-400 text-yellow-400 drop-shadow-md' 
                                                    : 'fill-transparent text-gray-300 dark:text-gray-600'
                                                }`} 
                                            />
                                        </motion.button>
                                    ))}
                                </div>

                                <textarea 
                                    className="w-full bg-white/50 dark:bg-black/40 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all resize-none mb-6 placeholder:text-gray-400 dark:text-white"
                                    rows={3}
                                    placeholder="Any suggestions to improve this experience? (Optional)"
                                    value={suggestion}
                                    onChange={(e) => setSuggestion(e.target.value)}
                                />

                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSubmit}
                                    disabled={rating === 0}
                                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 dark:from-white dark:to-gray-200 text-white dark:text-black font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                                >
                                    Submit Feedback
                                </motion.button>
                            </>
                        ) : (
                            // Success State
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-8"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1, rotate: [0, 10, 0] }}
                                    transition={{ type: "spring", damping: 12, stiffness: 200 }}
                                    className="w-24 h-24 bg-green-50 dark:bg-green-500/20 rounded-full flex items-center justify-center mb-6"
                                >
                                    <CheckCircle size={48} className="text-green-500" />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">Thank You!</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-center text-sm">Your feedback helps us improve RestoreGhana.</p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
