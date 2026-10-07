'use client';

import React from 'react';

export default function ChairmanMessage() {
  const globalGalleries = [
    {
      src: '/images/resource/image1.webp',
      title: 'Global Health Summit 2025',
      desc: 'Prof. (Dr.) Balvir S. Tomar addressing international medical delegations & bilateral health leaders.',
    },
    {
      src: '/images/resource/image2.webp',
      title: 'With Union Minister Shri Nitin Gadkari',
      desc: 'Presentation of Clinical Healthcare Initiatives & Research Monograph on rural health accessibility.',
    },
    {
      src: '/images/resource/image3.webp',
      title: 'European Academic Collaboration',
      desc: 'MoU signing fostering international medical exchange, surgical pedagogy and global clinical training.',
    },
    {
      src: '/images/resource/image4.webp',
      title: 'National Healthcare Excellence Award',
      desc: 'Honoring pioneering contributions in pediatric gastroenterology, organ transplant and healthcare leadership.',
    },
  ];

  return (
    <section className="pt-2 sm:pt-6 md:pt-10 pb-10 sm:pb-20 bg-[#fdfbf7] relative overflow-hidden" id="about">
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-100/30 to-transparent pointer-events-none" />

      <div className="container mx-auto px-3 sm:px-6 relative z-10 max-w-7xl space-y-5 sm:space-y-10 md:space-y-12">
        {/* ========================================================
            PART 1: VISION & MISSION OF BST HOSPITAL IN JAGATPURA JAIPUR
            ======================================================== */}
        <div className="bg-gradient-to-r from-[#172a34] via-[#0f232e] to-[#791017] rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 text-white shadow-xl border-b-6 sm:border-b-8 border-[#c83220] relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#c83220] text-white rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-2 sm:mb-4 shadow-sm">
            <span>🏛️ Dr. BST Hospital • Jagatpura, Jaipur</span>
          </div>
          <h2 className="text-base sm:text-2xl md:text-4xl lg:text-5xl font-black mb-2 sm:mb-4 leading-snug sm:leading-tight">
            Our Vision Behind Establishing BST Hospital in Jagatpura, Jaipur
          </h2>
          <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed max-w-4xl font-normal">
            Jagatpura and the greater southern corridor of Jaipur are experiencing unprecedented residential, educational, and industrial growth. Prof. (Dr.) Balvir S. Tomar recognized that this vital region urgently required a fully integrated <strong className="text-white">1000+ bed tertiary medical college and Level-1 trauma critical care center</strong> so that residents of Jagatpura, Sitapura, Malviya Nagar, and connecting highways wouldn't have to navigate city-center traffic during medical emergencies.
          </p>

          {/* Vision & Mission Cards Grid */}
          <div className="grid md:grid-cols-2 gap-3 sm:gap-6 mt-3.5 sm:mt-8">
            <div className="bg-white/10 backdrop-blur-md p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-white/15 shadow-inner">
              <div className="flex items-center gap-2 mb-1.5 sm:mb-3 text-amber-300 font-black text-xs sm:text-sm uppercase tracking-wider">
                <span className="text-base sm:text-xl">🎯</span>
                <span>Our Mission in Jagatpura</span>
              </div>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                To enhance community health by delivering compassionate, round-the-clock emergency and super-specialty healthcare. We are committed to ethical treatment, modern diagnostics, accessible patient beds, and training 150+ dedicated MBBS medical professionals each year under the Indian Medical Trust.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-white/15 shadow-inner">
              <div className="flex items-center gap-2 mb-1.5 sm:mb-3 text-emerald-300 font-black text-xs sm:text-sm uppercase tracking-wider">
                <span className="text-base sm:text-xl">👁️</span>
                <span>Our Vision</span>
              </div>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                To be recognized as Rajasthan&apos;s apex institution for quaternary healthcare excellence, world-class medical pedagogy, and clinical research—setting modern benchmarks in patient outcomes, compassionate healing, and surgical innovation.
              </p>
            </div>
          </div>

          {/* Key Numbers Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mt-3.5 sm:mt-8 pt-3.5 sm:pt-8 border-t border-white/10 text-center">
            <div className="bg-white/5 p-2 sm:p-4 rounded-xl border border-white/10">
              <div className="text-xl sm:text-3xl md:text-4xl font-black text-amber-400 font-mono">1000+</div>
              <div className="text-[10px] sm:text-[11px] font-bold text-slate-300 mt-0.5 sm:mt-1 uppercase">Beds Capacity</div>
            </div>
            <div className="bg-white/5 p-2 sm:p-4 rounded-xl border border-white/10">
              <div className="text-xl sm:text-3xl md:text-4xl font-black text-emerald-400 font-mono">20+</div>
              <div className="text-[10px] sm:text-[11px] font-bold text-slate-300 mt-0.5 sm:mt-1 uppercase">Specialties</div>
            </div>
            <div className="bg-white/5 p-2 sm:p-4 rounded-xl border border-white/10">
              <div className="text-xl sm:text-3xl md:text-4xl font-black text-blue-400 font-mono">150</div>
              <div className="text-[10px] sm:text-[11px] font-bold text-slate-300 mt-0.5 sm:mt-1 uppercase">MBBS Seats / Yr</div>
            </div>
            <div className="bg-white/5 p-2 sm:p-4 rounded-xl border border-white/10">
              <div className="text-xl sm:text-3xl md:text-4xl font-black text-red-400 font-mono">250+</div>
              <div className="text-[10px] sm:text-[11px] font-bold text-slate-300 mt-0.5 sm:mt-1 uppercase">Medical Faculties</div>
            </div>
          </div>
        </div>

        {/* ========================================================
            PART 2: CHAIRMAN PROFILE (MATCHING 4th REFERENCE IMAGE)
            ======================================================== */}
        <div className="bg-white p-4 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border-2 border-slate-200/90 shadow-xl relative overflow-hidden">
          {/* Header Distinction Banner */}
          <div className="absolute top-0 right-0 bg-[#c83220] text-white text-[10px] sm:text-[11px] font-black uppercase px-4 sm:px-6 py-1 sm:py-1.5 rounded-bl-2xl tracking-widest shadow-md hidden sm:block">
            LEADERSHIP & DISTINCTION
          </div>

          <div className="grid lg:grid-cols-12 gap-5 md:gap-10 items-start">
            {/* Left Side: Photo & Identity */}
            <div className="lg:col-span-4 space-y-3 sm:space-y-4 text-center lg:text-left">
              <div className="relative inline-block mx-auto lg:mx-0 group max-w-[200px] sm:max-w-xs">
                <div className="absolute -inset-1.5 sm:-inset-2 bg-gradient-to-tr from-[#172a34] via-[#c83220] to-[#e5b64a] rounded-2xl sm:rounded-3xl transform rotate-1 group-hover:rotate-0 transition-transform duration-300 opacity-90"></div>
                <img
                  src="/images/resource/Balvir.webp"
                  alt="Prof. (Dr.) Balvir S. Tomar - Founder & Chairman"
                  className="relative rounded-xl sm:rounded-2xl shadow-xl object-cover w-full z-10 border-3 sm:border-4 border-white bg-slate-100"
                  onError={(e) => {
                    e.currentTarget.src = '/images/BST-Chairman.png';
                  }}
                />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 bg-[#172a34] text-[#e5b64a] border-2 border-[#e5b64a] text-[9px] sm:text-[10px] font-black uppercase px-3 sm:px-4 py-0.5 sm:py-1 rounded-full whitespace-nowrap shadow-lg">
                  👑 FOUNDER & CHAIRMAN
                </div>
              </div>

              <div className="pt-2 sm:pt-3">
                <h3 className="text-lg sm:text-2xl md:text-3xl font-black text-[#172a34]">
                  Prof. (Dr.) Balvir S. Tomar
                </h3>
                <p className="text-[11px] sm:text-xs font-black text-[#c83220] uppercase tracking-wider mt-0.5 sm:mt-1">
                  FOUNDER, DR B S TOMAR INSTITUTE OF MEDICAL SCIENCES & RESEARCH
                </p>
                <p className="text-[11px] sm:text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                  Founder, NIMS University & NIMS Hospital • Globally Renowned Pediatric Gastroenterologist
                </p>
              </div>

              {/* Red Contact / Book Button */}
              <div className="pt-1 sm:pt-2">
                <a
                  href="https://wa.me/917412077125?text=Hello%20BST%20Hospital%2C%20I%20would%20like%20to%20connect%20regarding%20Dr.%20BST%20Hospital%20Jagatpura."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 w-full py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl bg-[#c83220] hover:bg-[#a82415] text-white font-bold text-xs shadow-md transition-all"
                >
                  <span>💬</span>
                  <span>Connect With BST Hospital</span>
                </a>
              </div>
            </div>

            {/* Right Side: Credentials & Roles Layout */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-5 text-[#172a34]">
              {/* Header Title */}
              <div className="border-b border-slate-200 pb-2 sm:pb-3">
                <div className="inline-flex items-center gap-1 text-[#c83220] text-[10px] sm:text-xs font-black uppercase tracking-wider mb-0.5 sm:mb-1">
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#c83220] animate-pulse"></span>
                  FOUNDER & CHAIRMAN PROFILE
                </div>
                <h4 className="text-base sm:text-xl md:text-3xl font-black leading-snug text-[#172a34]">
                  Pioneering Medical Education, Research & Patient Compassion
                </h4>
              </div>

              {/* 🎓 Box 1: Academic Affiliations & Fellowships */}
              <div className="p-3 sm:p-5 bg-gradient-to-r from-amber-500/10 via-amber-100/40 to-slate-50 rounded-xl sm:rounded-2xl border border-amber-300/60 shadow-sm">
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-black uppercase text-amber-950 tracking-wider mb-1.5 sm:mb-2">
                  <span className="text-sm sm:text-base">🎓</span>
                  <span>ACADEMIC AFFILIATIONS & FELLOWSHIPS</span>
                </div>
                <div className="space-y-0.5 sm:space-y-1 font-mono text-[10px] sm:text-xs md:text-sm font-black text-slate-900 leading-relaxed bg-white/90 p-2.5 sm:p-3.5 rounded-lg sm:rounded-xl border border-amber-200">
                  <div>M.B.B.S., M.D., M.C.H. (USA) — M.I.A.P., M.A.H.T. (ENGLAND)</div>
                  <div>F.I.A.P., F.A.A.P. (USA) – F.I.C.A. (USA) — F.A.C.U. (LONDON)</div>
                </div>
              </div>

              {/* 🩺 Box 2: Clinical Expertise & Internships */}
              <div className="p-3 sm:p-5 bg-gradient-to-r from-red-500/10 via-red-100/40 to-slate-50 rounded-xl sm:rounded-2xl border border-red-200 shadow-sm">
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-black uppercase text-[#c83220] tracking-wider mb-2 sm:mb-3">
                  <span className="text-sm sm:text-base">🩺</span>
                  <span>CLINICAL EXPERTISE & INTERNSHIPS</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-red-200 flex items-start gap-2 shadow-sm">
                    <span className="text-[#c83220] font-black text-xs">▸</span>
                    <div>
                      <span className="font-bold text-slate-900 text-[11px] sm:text-xs">Pediatric Hepatology</span>
                      <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Kings College Hospital, London (U.K.)</div>
                    </div>
                  </div>
                  <div className="bg-white p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-red-200 flex items-start gap-2 shadow-sm">
                    <span className="text-[#c83220] font-black text-xs">▸</span>
                    <div>
                      <span className="font-bold text-slate-900 text-[11px] sm:text-xs">Pediatric Gastroenterology</span>
                      <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Harvard University (USA)</div>
                    </div>
                  </div>
                  <div className="bg-white p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-red-200 flex items-start gap-2 shadow-sm">
                    <span className="text-[#c83220] font-black text-xs">▸</span>
                    <div>
                      <span className="font-bold text-slate-900 text-[11px] sm:text-xs">Fellow Child Health (USA)</span>
                      <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Kings College Hospital, London (U.K.)</div>
                    </div>
                  </div>
                  <div className="bg-white p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-red-200 flex items-start gap-2 shadow-sm">
                    <span className="text-[#c83220] font-black text-xs">▸</span>
                    <div>
                      <span className="font-bold text-slate-900 text-[11px] sm:text-xs">Medical Fellow in London</span>
                      <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Commonwealth Medical Fellow (UK)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Two Column Grid: Global Leadership & Academic Leadership */}
              <div className="grid sm:grid-cols-2 gap-2.5 sm:gap-3.5 text-xs">
                <div className="p-3 sm:p-4 bg-blue-50/80 rounded-xl sm:rounded-2xl border border-blue-200 space-y-1.5 sm:space-y-2">
                  <h5 className="font-black text-blue-950 uppercase tracking-wider flex items-center gap-1.5 text-[11px] sm:text-xs">
                    <span>🌐</span> GLOBAL LEADERSHIP ROLES
                  </h5>
                  <ul className="space-y-1 sm:space-y-1.5 text-slate-700 font-semibold text-[10px] sm:text-[11px]">
                    <li className="flex items-start gap-1">
                      <span className="text-blue-600 font-black">•</span> International President, World Health Summit – 2025
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-blue-600 font-black">•</span> Board of Trustees – Virchow Foundation
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-blue-600 font-black">•</span> Vice President – Strategic Council of GUNI
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-blue-600 font-black">•</span> International Goodwill Ambassador – AUAP
                    </li>
                  </ul>
                </div>

                <div className="p-3 sm:p-4 bg-emerald-50/80 rounded-xl sm:rounded-2xl border border-emerald-200 space-y-1.5 sm:space-y-2">
                  <h5 className="font-black text-emerald-950 uppercase tracking-wider flex items-center gap-1.5 text-[11px] sm:text-xs">
                    <span>🎓</span> ACADEMIC LEADERSHIP
                  </h5>
                  <ul className="space-y-1 sm:space-y-1.5 text-slate-700 font-semibold text-[10px] sm:text-[11px]">
                    <li className="flex items-start gap-1">
                      <span className="text-emerald-600 font-black">•</span> President – Int. Soc. Pediatric Gastroenterology & Transplant
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-emerald-600 font-black">•</span> Chairman Panel on Healthcare – CII Rajasthan
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-emerald-600 font-black">•</span> Director: Institute of Nutrition & Public Health
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-emerald-600 font-black">•</span> Director: Stem Cell & Regenerative Medicine
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            PART 3: GLOBAL ENGAGEMENT PHOTO GALLERY (AS ON NIMS)
            "usme aur bhi phots lagi huyi hai"
            ======================================================== */}
        <div className="space-y-4 sm:space-y-6 pt-2 sm:pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-1.5 sm:gap-2 border-b border-slate-200 pb-2.5 sm:pb-3">
            <div>
              <span className="text-[#c83220] font-black text-[10px] sm:text-xs uppercase tracking-wider block">
                GLOBAL ENGAGEMENTS & DISTINCTIONS
              </span>
              <h3 className="text-base sm:text-xl md:text-3xl font-black text-[#172a34]">
                Moments of Clinical Leadership & International Honors
              </h3>
            </div>
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium">
              Prof. (Dr.) Balvir S. Tomar with national & international leaders
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {globalGalleries.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 transition-all duration-300 flex flex-col group"
              >
                <div className="h-36 sm:h-44 overflow-hidden bg-slate-100 relative">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2 right-2 text-white text-[11px] font-bold line-clamp-1 drop-shadow">
                    {item.title}
                  </div>
                </div>
                <div className="p-3 sm:p-3.5 flex flex-col flex-grow bg-white">
                  <h4 className="font-black text-xs text-[#172a34] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-normal flex-grow">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
