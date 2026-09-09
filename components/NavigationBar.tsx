'use client';
import { useState } from 'react';

export default function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-card bg-white/95">
      <div className="px-6 py-4 flex items-center justify-between">
        <a href="#home" className="block w-64" aria-label="BST Hospital home">
          <img src="/bst-logo.png" alt="BST Hospital Logo" className="w-full h-auto" />
        </a>
        
        <button 
          className="lg:hidden text-3xl text-primary" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <nav className={`${menuOpen ? 'flex' : 'hidden'} lg:flex absolute lg:static top-full left-0 right-0 bg-white lg:bg-transparent flex-col lg:flex-row items-start lg:items-center gap-6 p-6 lg:p-0 shadow-lg lg:shadow-none border-b lg:border-none border-gray-100 transition-all`}>
          <a href="#about" className="text-sm font-semibold text-slate-700 hover:text-secondary transition">About</a>
          <a href="#departments" className="text-sm font-semibold text-slate-700 hover:text-secondary transition">Departments</a>
          <a href="#doctors" className="text-sm font-semibold text-slate-700 hover:text-secondary transition">Doctors</a>
          <a href="#facilities" className="text-sm font-semibold text-slate-700 hover:text-secondary transition">Facilities</a>
          <a href="#contact" className="text-sm font-semibold text-slate-700 hover:text-secondary transition">Contact</a>
          <a href="#appointment" className="ml-0 lg:ml-4 bg-secondary text-white px-6 py-3 rounded-md text-sm font-bold shadow-md hover:bg-secondary-dark hover:-translate-y-0.5 transition-all">
            Book Appointment
          </a>
        </nav>
      </div>
    </header>
  );
}
