'use client';

import { useState } from 'react';
import IcuBookingModal from './IcuBookingModal';

export default function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 glass-card bg-white/95">
        <div className="px-6 py-4 flex items-center justify-between">
          <a href="/" className="block w-64" aria-label="BST Hospital home">
            <img src="/bst-logo.png" alt="BST Hospital Logo" className="w-full h-auto" />
          </a>
          
          <button 
            className="lg:hidden text-2xl text-[#172a34] px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 font-black" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>

          <nav className={`${menuOpen ? 'flex' : 'hidden'} lg:flex absolute lg:static top-full left-0 right-0 bg-white lg:bg-transparent flex-col lg:flex-row items-start lg:items-center gap-4 p-6 lg:p-0 shadow-2xl lg:shadow-none border-b-4 lg:border-none border-[#bd171c] transition-all`}>
            <a href="/" className="text-sm font-bold text-slate-800 hover:text-secondary transition">Home</a>
            <a href="/#about" className="text-sm font-semibold text-slate-700 hover:text-secondary transition">About</a>
            <a href="/#departments" className="text-sm font-semibold text-slate-700 hover:text-secondary transition">Departments</a>
            <a href="/#doctors" className="text-sm font-semibold text-slate-700 hover:text-secondary transition">Doctors</a>
            
            <a href="/icu-status" className="text-sm font-semibold text-slate-700 hover:text-secondary transition py-1">Track Request</a>
            
            <button
              onClick={() => {
                setIsBookingModalOpen(true);
                setMenuOpen(false);
              }}
              className="w-full lg:w-auto ml-0 lg:ml-3 bg-[#bd171c] hover:bg-[#791017] text-white px-6 py-3 rounded-xl text-xs font-black shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              🚨 24/7 ICU Bed Booking
            </button>
          </nav>
        </div>
      </header>

      {/* POPUP DIALOG MODAL */}
      <IcuBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
