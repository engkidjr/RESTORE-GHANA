"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Image as ImageIcon, X, Bot, User } from "lucide-react";
import clsx from "clsx";

// Types for our message structure
interface Message {
  role: 'user' | 'model';
  content: string;
  image?: string;
};

export default function GibbyChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hello! I am Gibby, your dedicated RestoreGhana environmental assistant. I can help you analyze reports and images related to illegal mining, deforestation, and water pollution in Ghana. How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // New state for handling files securely
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Clean up preview URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. File Size Limit (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("This image is too large. Please select an image under 5MB.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // 2. Instant, lightweight preview URL
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // 3. Just-in-time Base64 Converter
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSend = async () => {
    if (!input.trim() && !imageFile) return;

    setIsLoading(true);
    let base64Image = undefined;

    try {
      // Convert image only when sending
      if (imageFile) {
        base64Image = await convertToBase64(imageFile);
      }

      const userMsg: Message = { role: 'user' as const, content: input, image: base64Image || undefined };
      const currentMessages: Message[] = [...messages, userMsg];
      setMessages(currentMessages);

      setInput("");
      clearImage(); // Resets file states

      const res = await fetch("/api/gibby", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: currentMessages }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages(prev => [...prev, { role: 'model', content: data.message }]);
      } else {
        throw new Error(data.error || "Server Error");
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', content: "Sorry, I encountered an error communicating with the server." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[700px] max-h-[80vh] w-full max-w-4xl mx-auto rounded-3xl overflow-hidden glassmorphism shadow-2xl border border-white/20 bg-white/40 dark:bg-black/40 backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center space-x-3 px-6 py-4 border-b border-black/5 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-md">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 to-emerald-600 flex items-center justify-center shadow-lg">
            <Bot size={22} className="text-white" />
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"
          />
        </div>
        <div>
          <h2 className="font-semibold text-lg text-gray-900 dark:text-white">Gibby AI</h2>
          <p className="text-xs text-green-600 dark:text-green-400 font-medium">Online • Environmental Expert</p>
        </div>
      </div>

      {/* Messages Window */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-transparent">
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={clsx("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}
            >
              <div className={clsx(
                "max-w-[80%] flex items-end space-x-2",
                msg.role === 'user' ? "flex-row-reverse space-x-reverse" : "flex-row"
              )}>
                {/* Avatar */}
                <div className={clsx(
                  "w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mb-1",
                  msg.role === 'user' ? "bg-blue-600 text-white" : "bg-gradient-to-tr from-green-400 to-emerald-600 text-white shadow-md"
                )}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>

                {/* Bubble */}
                <div className={clsx(
                  "px-5 py-3 rounded-2xl shadow-sm border",
                  msg.role === 'user'
                    ? "bg-blue-600 border-blue-500 text-white rounded-br-sm"
                    : "bg-white/80 dark:bg-gray-800/80 border-white/50 dark:border-gray-700/50 text-gray-800 dark:text-gray-100 backdrop-blur-md rounded-bl-sm"
                )}>
                  {msg.image && (
                    <img src={msg.image} alt="Uploaded" className="max-w-xs rounded-xl mb-3 shadow-md" />
                  )}
                  <p className="leading-relaxed whitespace-pre-wrap text-[15px]">{msg.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start w-full">
              <div className="flex items-end space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-green-400 to-emerald-600 flex items-center justify-center mb-1 shadow-md">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="px-5 py-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 border border-white/50 backdrop-blur-md rounded-bl-sm flex space-x-2 shadow-sm">
                  <motion.div className="w-2 h-2 bg-green-500 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                  <motion.div className="w-2 h-2 bg-green-500 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                  <motion.div className="w-2 h-2 bg-green-500 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-t border-black/5 dark:border-white/10">
        {(previewUrl || imageFile) && (
          <div className="mb-3 relative inline-block group">
            <img src={previewUrl || ""} alt="Preview" className="h-20 w-auto rounded-lg shadow-md border border-gray-200 dark:border-gray-700" />
            <button
              onClick={clearImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600 transition"
            >
              <X size={14} />
            </button>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <input
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageSelect}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fileInputRef.current?.click()}
            className="p-3 rounded-full text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-gray-800 transition"
          >
            <ImageIcon size={22} />
          </motion.button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Gibby about environmental issues..."
              className="w-full px-5 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all shadow-inner"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={(!input.trim() && !imageFile) || isLoading}
            className="p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} className="ml-1" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}