'use client';

import { useState } from 'react';

export default function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-md transition-all">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-2.5 sm:py-3 flex items-center justify-between relative">
        {/* 1. LEFT: LOGO */}
        <div className="flex items-center shrink-0">
          <a
            href="/"
            className="block w-52 sm:w-72 md:w-[360px] lg:w-[400px] xl:w-[440px] max-w-[calc(100vw-80px)] transition-transform hover:scale-[1.01]"
            aria-label="Dr. B. S. Tomar Institute of Medical Sciences, Research & Hospital, Jagatpura, Jaipur home"
          >
            <img
              src="/bst-nav-logo.jpg"
              alt="Dr. B. S. Tomar Institute of Medical Sciences, Research & Hospital, Jagatpura, Jaipur Logo"
              className="w-full h-auto max-h-11 sm:max-h-13 lg:max-h-14 object-contain object-left"
            />
          </a>
        </div>

        {/* 2. CENTER: NAV TABS (DESKTOP) */}
        <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 2xl:gap-10 flex-1 px-4">
          <a
            href="/"
            className="text-sm xl:text-base font-extrabold text-slate-800 hover:text-[#c83220] transition-colors py-1 relative group whitespace-nowrap"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c83220] transition-all group-hover:w-full"></span>
          </a>
          <a
            href="/about"
            className="text-sm xl:text-base font-bold text-slate-700 hover:text-[#c83220] transition-colors py-1 whitespace-nowrap"
          >
            About Us
          </a>
          <a
            href="/departments"
            className="text-sm xl:text-base font-bold text-slate-700 hover:text-[#c83220] transition-colors py-1 whitespace-nowrap"
          >
            Departments
          </a>
          <a
            href="/doctors"
            className="text-sm xl:text-base font-bold text-slate-700 hover:text-[#c83220] transition-colors py-1 whitespace-nowrap"
          >
            Doctors
          </a>
        </nav>

        {/* 3. RIGHT: 24/7 EMERGENCY CARE BUTTON (DESKTOP) & MOBILE HAMBURGER */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:+917412077125"
            className="hidden sm:inline-flex items-center justify-center gap-2 bg-[#c83220] hover:bg-[#a82415] text-white px-4 sm:px-5 xl:px-6 py-2 xl:py-2.5 rounded-full text-xs xl:text-sm font-black shadow-md shadow-red-600/30 hover:scale-105 transition-all border border-red-400 whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping"></span>
            <span>🚨 24×7 Emergency Care ➔</span>
          </a>

          {/* MOBILE TOGGLE BUTTON */}
          <button
            className="lg:hidden w-10 h-10 rounded-xl bg-slate-100/90 border border-slate-200 text-[#172a34] flex items-center justify-center font-black text-xl hover:bg-slate-200 transition shadow-sm cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        {menuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-xl border-b-4 border-[#c83220] shadow-2xl p-6 flex flex-col gap-4 z-50">
            <a
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-base font-extrabold text-slate-800 hover:text-[#c83220] transition-colors py-1"
            >
              Home
            </a>
            <a
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="text-base font-bold text-slate-700 hover:text-[#c83220] transition-colors py-1"
            >
              About Us
            </a>
            <a
              href="/departments"
              onClick={() => setMenuOpen(false)}
              className="text-base font-bold text-slate-700 hover:text-[#c83220] transition-colors py-1"
            >
              Departments
            </a>
            <a
              href="/doctors"
              onClick={() => setMenuOpen(false)}
              className="text-base font-bold text-slate-700 hover:text-[#c83220] transition-colors py-1"
            >
              Doctors
            </a>
            <a
              href="tel:+917412077125"
              className="w-full bg-[#c83220] hover:bg-[#a82415] text-white px-5 py-3 rounded-full text-xs font-black shadow-md flex items-center justify-center gap-2 border border-red-400 mt-2"
            >
              <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping"></span>
              <span>🚨 24×7 Emergency Care ➔</span>
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
