'use client';

import { useState } from 'react';
import NewsTicker from '@/components/NewsTicker';
import TopBar from '@/components/TopBar';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import FadeIn from '@/components/FadeIn';
import IcuBookingModal from '@/components/IcuBookingModal';

export default function AboutPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-cream font-sans overflow-x-hidden text-slate-800">
      <NewsTicker />
      <TopBar />
      <NavigationBar />

      {/* HERO BANNER */}
      <section className="relative bg-gradient-to-r from-[#172a34] via-[#0f232e] to-[#791017] text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="0,0 100,0 100,100 0,80" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-[#e5b64a]/20 text-[#e5b64a] border border-[#e5b64a]/40 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <span>🏛️ Excellence in Healthcare & Medical Research</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight max-w-4xl">
            About Dr. B. S. Tomar Institute of Medical Sciences & Hospital
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-3xl font-medium leading-relaxed">
            Delivering world-class healthcare, advanced super-specialty treatment, and compassionate patient care in Jaipur, Rajasthan.
          </p>
        </div>
      </section>

      {/* INSTITUTION OVERVIEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <div>
                <span className="text-[#bd171c] font-black text-xs uppercase tracking-widest mb-2 block">
                  Our Legacy & Commitment
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-[#172a34] mb-6 leading-tight">
                  Pioneering Healthcare Excellence & Clinical Precision
                </h2>
                <p className="text-slate-600 text-base leading-relaxed mb-4">
                  Dr. B. S. Tomar Institute of Medical Sciences & Research and Hospital (BST Hospital) stands as one of Northern India’s premier healthcare and medical education centers. Situated in Jaipur, Rajasthan, our state-of-the-art facility integrates advanced medical technologies with compassionate patient care.
                </p>
                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  With over 2,500+ beds, 24/7 Tatkaal ICU Seva, multi-disciplinary trauma units, and ultra-modern operation theaters, BST Hospital is dedicated to serving patients with clinical accuracy, dignity, and care.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="text-3xl font-black text-[#bd171c] mb-1">2,500+</div>
                    <div className="text-xs font-bold text-slate-700">Hospital Beds</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="text-3xl font-black text-[#172a34] mb-1">50+</div>
                    <div className="text-xs font-bold text-slate-700">Medical Specialties</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="text-3xl font-black text-[#bd171c] mb-1">24/7</div>
                    <div className="text-xs font-bold text-slate-700">Tatkaal ICU Booking</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="text-3xl font-black text-[#172a34] mb-1">100K+</div>
                    <div className="text-xs font-bold text-slate-700">Patients Treated Yearly</div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="/images/hd_banner_1.jpg"
                    alt="BST Hospital Campus"
                    className="w-full h-[450px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-[#172a34] text-white p-6 rounded-2xl shadow-xl max-w-xs hidden sm:block border-2 border-[#e5b64a]">
                  <div className="text-sm font-black text-[#e5b64a] mb-1">NABH & NABL Standards</div>
                  <div className="text-xs text-slate-300">Certified for high quality patient care and laboratory diagnostic precision.</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#bd171c] font-black text-xs uppercase tracking-widest mb-3 block">
              Core Principles
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#172a34]">Our Mission & Vision</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-red-100 text-[#bd171c] rounded-2xl flex items-center justify-center text-2xl font-bold mb-6">
                🎯
              </div>
              <h3 className="text-xl font-black text-[#172a34] mb-3">Our Mission</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To provide high quality, accessible, and affordable super-specialty healthcare to every individual, backed by world-class medical innovation and ethics.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-blue-100 text-[#172a34] rounded-2xl flex items-center justify-center text-2xl font-bold mb-6">
                👁️
              </div>
              <h3 className="text-xl font-black text-[#172a34] mb-3">Our Vision</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To emerge as a global benchmark in medical care, clinical research, emergency critical care management, and compassionate patient outcome.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center text-2xl font-bold mb-6">
                ❤️
              </div>
              <h3 className="text-xl font-black text-[#172a34] mb-3">Core Values</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Integrity, empathy, 24/7 readiness, transparency, continuous medical research, and unwavering dedication to saving lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP MESSAGE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-[#172a34] to-[#0f232e] text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden border-2 border-[#e5b64a]/30">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1">
                <img
                  src="/chairman.png"
                  alt="Prof. Dr. Balvir S. Tomar"
                  className="w-full h-80 object-cover object-top rounded-2xl border-4 border-white/20 shadow-lg"
                />
              </div>
              <div className="lg:col-span-2">
                <span className="text-[#e5b64a] font-black text-xs uppercase tracking-widest mb-2 block">
                  Chairman's Vision
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                  Prof. (Dr.) Balvir S. Tomar
                </h3>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-medium italic">
                  "At BST Hospital, our commitment is simple: no patient in need of emergency critical care or medical assistance should ever be turned away. We have built 2,500+ beds and a dedicated 24/7 Tatkaal ICU infrastructure to ensure immediate life-saving care when every minute counts."
                </p>
                <div className="text-xs text-[#e5b64a] font-bold uppercase tracking-wider">
                  Founder & Chairman, Nims University & BST Hospital
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Single Floating ICU Booking Button */}
      <button
        onClick={() => setIsBookingModalOpen(true)}
        className="fixed bottom-5 right-5 z-40 bg-[#bd171c] hover:bg-[#791017] text-white px-4 py-3 rounded-full shadow-2xl transition-all hover:scale-105 flex items-center gap-2 border-2 border-white/30 text-xs font-black cursor-pointer"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
        <span>🚨 Nims Tatkaal Seva (ICU Booking)</span>
      </button>

      <IcuBookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </main>
  );
}
