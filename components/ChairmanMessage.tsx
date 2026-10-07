'use client';

import React from 'react';

export default function ChairmanMessage() {
  return (
    <section className="py-20 bg-[#f7f4ed] relative overflow-hidden" id="about">
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-100/40 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl space-y-16">
        {/* About Institute Banner */}
        <div className="bg-gradient-to-r from-[#172a34] via-[#0f232e] to-[#791017] rounded-3xl p-8 md:p-12 text-white shadow-2xl border-b-8 border-[#bd171c] relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#bd171c] text-white rounded-full text-xs font-black uppercase tracking-widest mb-4">
            🏛️ Flagship Initiative of Indian Medical Trust
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            A New Beginning in Excellence and Compassionate Care
          </h2>
          <p className="text-slate-200 text-sm md:text-base leading-relaxed max-w-4xl font-medium">
            Dr B S Tomar Institute of Medical Sciences & Research is a state-of-the-art medical education and healthcare facility established in Jaipur, Rajasthan. Spread across 100 acres, the institute is a flagship initiative of the Indian Medical Trust, envisioned by Prof. (Dr.) Balvir S. Tomar—a globally renowned pediatric gastroenterologist and the visionary founder of NIMS University and NIMS Hospital.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10 text-center">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-inner">
              <div className="text-3xl md:text-4xl font-black text-amber-400 font-mono">1000+</div>
              <div className="text-xs font-bold text-slate-200 mt-1 uppercase">Beds Capacity</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-inner">
              <div className="text-3xl md:text-4xl font-black text-emerald-400 font-mono">20</div>
              <div className="text-xs font-bold text-slate-200 mt-1 uppercase">Departments</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-inner">
              <div className="text-3xl md:text-4xl font-black text-blue-400 font-mono">150</div>
              <div className="text-xs font-bold text-slate-200 mt-1 uppercase">MBBS Seats / Year</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-inner">
              <div className="text-3xl md:text-4xl font-black text-red-400 font-mono">250+</div>
              <div className="text-xs font-bold text-slate-200 mt-1 uppercase">Faculties</div>
            </div>
          </div>
        </div>

        {/* Chairman Detailed Profile Card */}
        <div className="bg-white p-8 md:p-12 rounded-3xl border-2 border-slate-200/80 shadow-2xl relative overflow-hidden">
          {/* Decorative Corner Ribbon */}
          <div className="absolute top-0 right-0 bg-[#bd171c] text-white text-[11px] font-black uppercase px-6 py-1.5 rounded-bl-2xl tracking-widest shadow-md hidden sm:block">
            Leadership & Distinction
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* Left Side: Photo & Badge Header */}
            <div className="lg:col-span-4 space-y-6 text-center lg:text-left">
              <div className="relative inline-block mx-auto lg:mx-0 group">
                <div className="absolute -inset-3 bg-gradient-to-tr from-[#172a34] via-[#bd171c] to-[#e5b64a] rounded-3xl transform rotate-2 group-hover:rotate-0 transition-transform duration-500 opacity-90 blur-[1px]"></div>
                <img
                  src="/images/BST-Chairman.png"
                  alt="Prof. (Dr.) Balvir S. Tomar"
                  className="relative rounded-2xl shadow-2xl object-cover w-full max-w-sm mx-auto z-10 border-4 border-white"
                />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20 bg-[#172a34] text-[#e5b64a] border-2 border-[#e5b64a] text-[10px] font-black uppercase px-4 py-1.5 rounded-full whitespace-nowrap shadow-lg">
                  👑 Founder & Chairman
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-2xl md:text-3xl font-black text-[#172a34]">
                  Prof. (Dr.) Balvir S. Tomar
                </h3>
                <p className="text-xs font-extrabold text-[#bd171c] uppercase tracking-wider mt-1.5">
                  Founder, Dr B S Tomar Institute of Medical Sciences & Research
                </p>
                <p className="text-xs text-slate-600 font-semibold mt-1 leading-relaxed">
                  Founder, NIMS University & NIMS Hospital • Globally Renowned Pediatric Gastroenterologist
                </p>
              </div>
            </div>

            {/* Right Side: Detailed Credentials & Academic Cards */}
            <div className="lg:col-span-8 space-y-6 text-[#172a34]">
              {/* Header Title Tag */}
              <div className="border-b border-slate-200 pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100/80 text-[#bd171c] rounded-lg text-xs font-black uppercase tracking-widest mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#bd171c] animate-pulse"></span>
                  Founder & Chairman Profile
                </div>
                <h4 className="text-2xl md:text-3xl font-black leading-tight text-[#172a34]">
                  Pioneering Medical Education, Research & Patient Compassion
                </h4>
              </div>

              {/* 🎓 Academic Affiliations & Fellowships Card */}
              <div className="p-6 bg-gradient-to-r from-amber-500/10 via-amber-100/40 to-slate-50 rounded-2xl border-2 border-amber-400/40 shadow-sm relative">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-950 tracking-wider mb-2">
                  <span className="text-lg">🎓</span>
                  <span>Academic Affiliations & Fellowships</span>
                </div>
                <div className="space-y-1.5 font-mono text-xs md:text-sm font-black text-slate-900 leading-relaxed bg-white/80 p-4 rounded-xl border border-amber-200 shadow-inner">
                  <div>M.B.B.S., M.D., M.C.H. (USA) — M.I.A.P., M.A.H.T. (ENGLAND)</div>
                  <div>F.I.A.P., F.A.A.P. (USA) – F.I.C.A. (USA) — F.A.C.U. (LONDON)</div>
                </div>
              </div>

              {/* 🩺 Clinical Expertise & Internships Card */}
              <div className="p-6 bg-gradient-to-r from-red-500/10 via-red-100/40 to-slate-50 rounded-2xl border-2 border-red-200 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-[#bd171c] tracking-wider mb-3">
                  <span className="text-lg">🩺</span>
                  <span>Clinical Expertise & Internships</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-3.5 rounded-xl border border-red-200 flex items-start gap-2 shadow-sm">
                    <span className="text-[#bd171c] font-black text-sm">▸</span>
                    <div>
                      <span className="font-bold text-slate-900">Pediatric Hepatology</span>
                      <div className="text-[11px] text-slate-500 font-medium">Kings College Hospital, London (U.K.)</div>
                    </div>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-red-200 flex items-start gap-2 shadow-sm">
                    <span className="text-[#bd171c] font-black text-sm">▸</span>
                    <div>
                      <span className="font-bold text-slate-900">Pediatric Gastroenterology</span>
                      <div className="text-[11px] text-slate-500 font-medium">Harvard University (USA)</div>
                    </div>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-red-200 flex items-start gap-2 shadow-sm">
                    <span className="text-[#bd171c] font-black text-sm">▸</span>
                    <div>
                      <span className="font-bold text-slate-900">Fellow Child Health (USA)</span>
                      <div className="text-[11px] text-slate-500 font-medium">Kings College Hospital, London (U.K.)</div>
                    </div>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-red-200 flex items-start gap-2 shadow-sm">
                    <span className="text-[#bd171c] font-black text-sm">▸</span>
                    <div>
                      <span className="font-bold text-slate-900">Medical Fellow in London</span>
                      <div className="text-[11px] text-slate-500 font-medium">Commonwealth Medical Fellow (UK)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid of Global Leadership & Achievements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Global Leadership */}
                <div className="p-5 bg-blue-50/70 rounded-2xl border border-blue-200 space-y-2">
                  <h5 className="font-black text-blue-950 uppercase tracking-wider flex items-center gap-2">
                    🌐 Global Leadership Roles
                  </h5>
                  <ul className="space-y-1.5 text-slate-700 font-semibold text-[11px]">
                    <li className="flex items-start gap-1.5">
                      <span className="text-blue-600 font-black">•</span> International President, World Health Summit – 2025
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-blue-600 font-black">•</span> Board of Trustees – Virchow Foundation
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-blue-600 font-black">•</span> Vice President – Strategic Council of GUNI
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-blue-600 font-black">•</span> International Goodwill Ambassador – AUAP
                    </li>
                  </ul>
                </div>

                {/* Academic Leadership */}
                <div className="p-5 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-2">
                  <h5 className="font-black text-emerald-950 uppercase tracking-wider flex items-center gap-2">
                    🔬 Academic Leadership
                  </h5>
                  <ul className="space-y-1.5 text-slate-700 font-semibold text-[11px]">
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-black">•</span> President – Int. Soc. Pediatric Gastroenterology & Transplant
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-black">•</span> Chairman Panel on Healthcare – CII Rajasthan
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-black">•</span> Director: Institute of Nutrition & Public Health
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-black">•</span> Director: Stem Cell & Regenerative Medicine
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
