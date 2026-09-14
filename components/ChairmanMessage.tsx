'use client';

import React from 'react';

export default function ChairmanMessage() {
  return (
    <section className="py-20 bg-[#f7f4ed] relative overflow-hidden" id="about">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-100/50 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl space-y-16">
        {/* About Institute Banner */}
        <div className="bg-gradient-to-r from-[#172a34] via-[#0f232e] to-[#791017] rounded-3xl p-8 md:p-12 text-white shadow-2xl border-b-8 border-[#bd171c]">
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
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <div className="text-3xl font-black text-amber-400 font-mono">2500+</div>
              <div className="text-xs font-bold text-slate-200 mt-1 uppercase">Beds Capacity</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <div className="text-3xl font-black text-emerald-400 font-mono">20</div>
              <div className="text-xs font-bold text-slate-200 mt-1 uppercase">Departments</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <div className="text-3xl font-black text-blue-400 font-mono">150</div>
              <div className="text-xs font-bold text-slate-200 mt-1 uppercase">MBBS Seats / Year</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <div className="text-3xl font-black text-red-400 font-mono">250+</div>
              <div className="text-xs font-bold text-slate-200 mt-1 uppercase">Faculties</div>
            </div>
          </div>
        </div>

        {/* Chairman Detailed Profile Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-2xl">
          {/* Photo & Badge */}
          <div className="lg:col-span-4 space-y-6 text-center">
            <div className="relative inline-block mx-auto">
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#172a34] to-[#bd171c] rounded-3xl transform rotate-2"></div>
              <img
                src="/images/BST-Chairman.png"
                alt="Prof. (Dr.) Balvir S. Tomar"
                className="relative rounded-2xl shadow-2xl object-cover w-full max-w-sm mx-auto z-10 border-4 border-white"
              />
            </div>
            <div>
              <h3 className="text-2xl font-black text-[#172a34]">Prof. (Dr.) Balvir S. Tomar</h3>
              <p className="text-xs font-extrabold text-[#bd171c] uppercase tracking-wider mt-1">
                Founder, Dr B S Tomar Institute of Medical Sciences & Research
              </p>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Founder, NIMS University & NIMS Hospital • Globally Renowned Pediatric Gastroenterologist
              </p>
            </div>
          </div>

          {/* Detailed Credentials & Leadership */}
          <div className="lg:col-span-8 space-y-6 text-[#172a34]">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-10 h-1 bg-[#bd171c] rounded-full"></span>
                <h4 className="text-xs font-black text-[#bd171c] tracking-widest uppercase">Founder & Chairman Profile</h4>
              </div>
              <h3 className="text-2xl md:text-3xl font-black leading-tight text-[#172a34]">
                Pioneering Medical Education, Research & Patient Compassion
              </h3>
            </div>

            {/* Academic Affiliations */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h5 className="text-xs font-black uppercase text-[#172a34] tracking-wider flex items-center gap-2">
                🎓 Academic Affiliations & Fellowships
              </h5>
              <p className="text-xs font-bold text-slate-700 leading-relaxed font-mono">
                M.B.B.S., M.D., M.C.H. (USA) — M.I.A.P., M.A.H.T. (ENGLAND) <br />
                F.I.A.P., F.A.A.P. (USA) – F.I.C.A. (USA) — F.A.C.U. (LONDON)
              </p>
            </div>

            {/* Grid of Achievements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Clinical Expertise */}
              <div className="p-5 bg-red-50/60 rounded-2xl border border-red-100 space-y-2">
                <h5 className="font-black text-[#bd171c] uppercase tracking-wider flex items-center gap-2">
                  🩺 Clinical Expertise & Internships
                </h5>
                <ul className="space-y-1 text-slate-700 font-semibold list-disc list-inside">
                  <li>Pediatric Hepatology – Kings College Hospital, London (U.K.)</li>
                  <li>Pediatric Gastroenterology – Harvard University (USA)</li>
                  <li>Fellow Child Health in the USA – Kings College Hospital, London (U.K.)</li>
                  <li>Medical Fellow in London (UK) – Commonwealth</li>
                </ul>
              </div>

              {/* Global Leadership */}
              <div className="p-5 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-2">
                <h5 className="font-black text-blue-900 uppercase tracking-wider flex items-center gap-2">
                  🌐 Global Leadership Roles
                </h5>
                <ul className="space-y-1 text-slate-700 font-semibold list-disc list-inside">
                  <li>International President, World Health Summit – 2025</li>
                  <li>Board of Trustees – Virchow Foundation</li>
                  <li>Vice President – Strategic Council of GUNI (Global University Network for Innovation)</li>
                  <li>International Goodwill Ambassador – AUAP (Association of Universities of Asia And The Pacific)</li>
                </ul>
              </div>

              {/* Academic Leadership */}
              <div className="p-5 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-2">
                <h5 className="font-black text-emerald-900 uppercase tracking-wider flex items-center gap-2">
                  🔬 Academic Leadership & Director Positions
                </h5>
                <ul className="space-y-1 text-slate-700 font-semibold list-disc list-inside">
                  <li>President – International Society of Pediatric Gastroenterology Hepatology, Transplant & Nutrition</li>
                  <li>Chairman Panel on Healthcare – CII Rajasthan</li>
                  <li>Director: Institute of Nutrition & Public Health</li>
                  <li>Director: Institute of Stem Cell & Regenerative Medicine</li>
                  <li>Executive Member: WHS Academic Alliance, Germany</li>
                </ul>
              </div>

              {/* Committee Memberships */}
              <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-100 space-y-2">
                <h5 className="font-black text-amber-900 uppercase tracking-wider flex items-center gap-2">
                  📋 International Committee Memberships
                </h5>
                <ul className="space-y-1 text-slate-700 font-semibold list-disc list-inside">
                  <li>Member Country Chapter Chair Committee – AUAP</li>
                  <li>Advisory Council – AUAP</li>
                  <li>Accreditation and Ranking Committee – AUAP</li>
                  <li>Internationalization Committee of AUAP (Chairman)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
