import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RestoreGhana - National Galamsey Recovery Dashboard",
  description: "Report illegal mining, track recovery, and educate the public on sustainability.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-slate-50 min-h-screen flex flex-col"}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-slate-900 text-slate-400 text-center py-6 mt-12">
          <p>RestoreGhana © {new Date().getFullYear()} - Working towards SDGs 3, 4, and 6.</p>
        </footer>
      </body>
    </html>
  );
}
