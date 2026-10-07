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
    <section className="pt-2 sm:pt-6 md:pt-10 pb-10 sm:pb-20 bg-white relative overflow-hidden" id="about">
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl space-y-10 sm:space-y-14">
        {/* ========================================================
            PART 1: VISION & MISSION OF BST HOSPITAL IN JAGATPURA JAIPUR
            ======================================================== */}
        <div className="bg-gradient-to-r from-[#172a34] via-[#0f232e] to-[#791017] rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 text-white shadow-xl border-b-6 sm:border-b-8 border-[#c83220] relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#c83220] text-white rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-2 sm:mb-4 shadow-sm">
            <span>🏛️ Dr. BST Hospital • Jagatpura, Jaipur</span>
          </div>
          <h2 className="text-base sm:text-2xl md:text-4xl font-black mb-2 sm:mb-4 leading-snug sm:leading-tight">
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
            PART 2: CHAIRMAN LEADERSHIP (EXACT NIMS HOSPITALS STYLE)
            "is type se kro home pr h vo"
            ======================================================== */}
        <div className="py-6 sm:py-10 border-t border-slate-100">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Column: Portrait Photo with Signature Namecard Badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-50 border border-slate-200/80 group">
                <img
                  src="/images/resource/Balvir.webp"
                  alt="Prof. (Dr.) Balvir S. Tomar - Founder & Hon'ble Chancellor"
                  className="w-full h-[400px] sm:h-[480px] md:h-[520px] object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  onError={(e) => {
                    e.currentTarget.src = '/images/BST-Chairman.png';
                  }}
                />

                {/* Signature NIMS Style Floating Namecard Badge */}
                <div className="absolute bottom-4 right-4 left-4 sm:left-auto sm:-right-2 sm:bottom-6 bg-white/98 backdrop-blur-md rounded-2xl p-4 sm:p-5 border-l-5 border-[#c83220] shadow-2xl sm:max-w-[320px] z-20 border border-slate-100">
                  <h3 className="text-sm sm:text-base font-black text-[#c83220] leading-snug">
                    Prof. (Dr.) Balvir S. Tomar
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-[#172a34] mt-0.5">
                    Founder &amp; Hon&apos;ble Chancellor
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5 leading-snug">
                    Nims University Rajasthan, Jaipur &amp; Dr. BST Hospital
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Text & Visionary Story */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-5">
              <div>
                <span className="text-[#c83220] text-xs font-black uppercase tracking-widest block mb-2">
                  VISIONARY LEADERSHIP
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-[#172a34] leading-tight">
                  The <span className="text-[#c83220]">Leading Voice</span> in Unlocking Potential, and Changing Lives.
                </h2>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed text-justify">
                A rare precedent of exceptional talent, hard work and acute insight with an immense zeal to serve society, Dr. Tomar was born to a noble family of educationists and doctors in Varanasi. A bright student all through his academic career, he followed the wishes of his parents and decided to become a doctor early on for which he took admission in the Gojra Raja Medical College in Gwalior. A true achiever he passed his MBBS with a Gold Medal and claimed the top spot in his University.
              </p>

              <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed text-justify">
                With a steadfast vision to elevate healthcare to global standards in India, he established NIMS Hospital and University, combining world-class quaternary clinical infrastructure, affordable community healthcare, and groundbreaking pedagogical research. Dr. BST Hospital in Jagatpura, Jaipur carries forward this mission to deliver 1000+ beds, 24/7 Level-1 trauma response, and medical education to South Jaipur.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://wa.me/917412077125?text=Hello%20BST%20Hospital%2C%20I%20would%20like%20to%20connect%20regarding%20Dr.%20BST%20Hospital%20Jagatpura."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0e191f] hover:bg-[#c83220] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-md hover:scale-105"
                >
                  <span>Connect With BST Hospital</span>
                  <span>➔</span>
                </a>
                <a
                  href="tel:+917412077125"
                  className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-[#c83220] font-black text-xs sm:text-sm px-5 py-3 rounded-xl border border-red-200 transition-all shadow-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-[#c83220] animate-ping"></span>
                  <span>Emergency: +91 74120 77125</span>
                </a>
              </div>

              {/* Academic Distinctions Mini Strip */}
              <div className="pt-3 border-t border-slate-200/80">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block mb-1.5">
                  GLOBAL CLINICAL PEDAGOGY &amp; FELLOWSHIPS
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-bold text-slate-700">
                  <span className="px-2.5 py-1 bg-slate-100 rounded-lg border border-slate-200">
                    🎓 M.B.B.S. (Gold Medalist), M.D., M.C.H. (USA)
                  </span>
                  <span className="px-2.5 py-1 bg-slate-100 rounded-lg border border-slate-200">
                    🏛️ Harvard University (USA) Fellow
                  </span>
                  <span className="px-2.5 py-1 bg-slate-100 rounded-lg border border-slate-200">
                    🏥 Kings College Hospital London (UK)
                  </span>
                  <span className="px-2.5 py-1 bg-slate-100 rounded-lg border border-slate-200">
                    🌍 Commonwealth Medical Fellow (UK)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            PART 3: GLOBAL ENGAGEMENT PHOTO GALLERY (AS ON NIMS)
            "usme aur bhi phots lagi huyi hai"
            ======================================================== */}
        <div className="space-y-4 sm:space-y-6 pt-4 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-1.5 sm:gap-2 border-b border-slate-200 pb-2.5 sm:pb-3">
            <div>
              <span className="text-[#c83220] font-black text-[10px] sm:text-xs uppercase tracking-wider block">
                GLOBAL ENGAGEMENTS &amp; DISTINCTIONS
              </span>
              <h3 className="text-base sm:text-xl md:text-3xl font-black text-[#172a34]">
                Moments of Clinical Leadership &amp; International Honors
              </h3>
            </div>
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium">
              Prof. (Dr.) Balvir S. Tomar with national &amp; international leaders
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
