'use client';

import { useState } from 'react';

export default function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between">
        {/* LOGO */}
        <a href="/" className="block w-64 sm:w-80 md:w-[420px] transition-transform hover:scale-[1.01]" aria-label="Dr. BST Hospital Jagatpura Jaipur home">
          <img src="/bst-nav-logo.jpg" alt="Dr. BST Hospital, Jagatpura Jaipur Logo" className="w-full h-auto max-h-12 sm:max-h-14 object-contain" />
        </a>

        {/* MOBILE TOGGLE BUTTON */}
        <button
          className="lg:hidden w-10 h-10 rounded-xl bg-slate-100/90 border border-slate-200 text-[#172a34] flex items-center justify-center font-black text-xl hover:bg-slate-200 transition shadow-sm"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        {/* DESKTOP & MOBILE NAVIGATION MENU */}
        <nav
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } lg:flex absolute lg:static top-full left-0 right-0 bg-white/98 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none flex-col lg:flex-row items-start lg:items-center gap-3 md:gap-6 p-6 lg:p-0 shadow-2xl lg:shadow-none border-b-4 lg:border-none border-[#c83220] transition-all`}
        >
          <a
            href="/"
            className="text-xs sm:text-sm font-extrabold text-slate-800 hover:text-[#c83220] transition-colors py-1 relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c83220] transition-all group-hover:w-full"></span>
          </a>
          <a
            href="/about"
            className="text-xs sm:text-sm font-bold text-slate-700 hover:text-[#c83220] transition-colors py-1"
          >
            About Us
          </a>
          <a
            href="/departments"
            className="text-xs sm:text-sm font-bold text-slate-700 hover:text-[#c83220] transition-colors py-1"
          >
            Departments
          </a>
          <a
            href="/doctors"
            className="text-xs sm:text-sm font-bold text-slate-700 hover:text-[#c83220] transition-colors py-1"
          >
            Doctors
          </a>
          <a
            href="/careers"
            className="text-xs sm:text-sm font-bold text-slate-700 hover:text-[#c83220] transition-colors py-1"
          >
            Careers
          </a>
          <a
            href="/contact"
            className="text-xs sm:text-sm font-bold text-slate-700 hover:text-[#c83220] transition-colors py-1"
          >
            Contact Us
          </a>

          {/* RED ANIMATED 24/7 EMERGENCY CARE BUTTON */}
          <a
            href="tel:+917412077125"
            className="w-full lg:w-auto ml-0 lg:ml-2 bg-[#c83220] hover:bg-[#a82415] text-white px-5 py-2 rounded-full text-xs font-black shadow-md shadow-red-600/30 hover:scale-105 transition-all flex items-center justify-center gap-2 border border-red-400"
          >
            <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping"></span>
            <span>🚨 24×7 Emergency Care ➔</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
