'use client';

import { useState } from 'react';
import IcuBookingModal from './IcuBookingModal';

export default function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between">
          {/* LOGO */}
          <a href="/" className="block w-48 sm:w-60 md:w-64 transition-transform hover:scale-[1.01]" aria-label="BST Hospital home">
            <img src="/bst-logo.png" alt="BST Hospital Logo" className="w-full h-auto object-contain" />
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
            } lg:flex absolute lg:static top-full left-0 right-0 bg-white/98 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none flex-col lg:flex-row items-start lg:items-center gap-3 md:gap-6 p-6 lg:p-0 shadow-2xl lg:shadow-none border-b-4 lg:border-none border-[#bd171c] transition-all`}
          >
            <a
              href="/"
              className="text-xs sm:text-sm font-extrabold text-slate-800 hover:text-[#bd171c] transition-colors py-1 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#bd171c] transition-all group-hover:w-full"></span>
            </a>
            <a
              href="/#about"
              className="text-xs sm:text-sm font-bold text-slate-700 hover:text-[#bd171c] transition-colors py-1"
            >
              About Us
            </a>
            <a
              href="/#departments"
              className="text-xs sm:text-sm font-bold text-slate-700 hover:text-[#bd171c] transition-colors py-1"
            >
              Departments
            </a>
            <a
              href="/#doctors"
              className="text-xs sm:text-sm font-bold text-slate-700 hover:text-[#bd171c] transition-colors py-1"
            >
              Doctors
            </a>

            <a
              href="/icu-status"
              className="text-xs sm:text-sm font-bold text-slate-700 hover:text-[#bd171c] transition-colors py-1 flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Track Request
            </a>

            {/* LUXURY 24/7 ICU BED BOOKING BUTTON */}
            <button
              onClick={() => {
                setIsBookingModalOpen(true);
                setMenuOpen(false);
              }}
              className="w-full lg:w-auto ml-0 lg:ml-2 bg-gradient-to-r from-[#bd171c] via-[#9e1217] to-[#791017] hover:from-[#791017] hover:to-[#bd171c] text-white px-5 py-2.5 rounded-full text-xs font-black shadow-lg shadow-red-900/20 hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer border border-red-400/30"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span>Nims Tatkaal Seva (ICU Booking) ➔</span>
            </button>
          </nav>
        </div>
      </header>

      {/* POPUP DIALOG MODAL */}
      <IcuBookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </>
  );
}
