'use client';

import { useState, useEffect } from 'react';
import NewsTicker from '@/components/NewsTicker';
import TopBar from '@/components/TopBar';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import { HOSPITAL_DEPARTMENTS } from '@/lib/departments';
import { fetchDoctors, DoctorData } from '@/lib/api';
import { matchDepartment } from '@/lib/departments';

export default function DepartmentsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [doctors, setDoctors] = useState<DoctorData[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const docs = await fetchDoctors();
        if (docs) setDoctors(docs);
      } catch (err) {
        console.error('Failed to load doctors count for departments:', err);
      }
    }
    load();
  }, []);

  const categories = ['All', 'Clinical', 'Surgical', 'Diagnostics', 'Academic', 'Support'];

  const filteredDepts = HOSPITAL_DEPARTMENTS.filter((d) =>
    activeTab === 'All' ? true : d.category === activeTab
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7] font-sans overflow-x-hidden text-slate-800">
      <NewsTicker />
      <TopBar />
      <NavigationBar />

      {/* BANNER WITH HOSPITAL EXTERIOR */}
      <section
        className="relative text-white py-12 sm:py-16 md:py-20 border-b-4 border-[#c83220] bg-cover bg-center flex items-center overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(23, 42, 52, 0.94) 0%, rgba(15, 35, 46, 0.88) 45%, rgba(158, 36, 23, 0.78) 100%), url('/images/bst-hospital-exterior.jpg')",
        }}
      >
        <div className="w-full max-w-7xl 2xl:max-w-[1600px] min-[1900px]:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 text-center md:text-left">
          <nav
            aria-label="breadcrumb"
            className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-slate-300 uppercase tracking-widest mb-2"
          >
            <a href="/" className="hover:text-white transition">
              HOME
            </a>
            <span className="text-[#c83220]">/</span>
            <span className="text-amber-400">DEPARTMENTS</span>
          </nav>

          <span className="inline-block bg-[#c83220] text-white text-[10px] sm:text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full mb-3 shadow-md">
            ⚡ SPECIALIZED CLINICAL CENTERS
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3 leading-tight max-w-4xl">
            Departments &amp; Centers of Excellence
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm md:text-base max-w-3xl font-medium leading-relaxed">
            {HOSPITAL_DEPARTMENTS.length}+ specialized clinical, surgical, diagnostic, and academic departments under one roof in Jagatpura, Jaipur.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs">
            <span className="bg-white/10 text-white backdrop-blur-sm px-3.5 py-1.5 rounded-full font-bold border border-white/20">
              🏢 {HOSPITAL_DEPARTMENTS.length} Specialized Departments
            </span>
            <span className="bg-white/10 text-white backdrop-blur-sm px-3.5 py-1.5 rounded-full font-bold border border-white/20">
              🩺 {doctors.length > 0 ? `${doctors.length} Expert Specialists` : 'Full Specialist Faculty'}
            </span>
            <a
              href="/doctors"
              className="bg-amber-400 hover:bg-amber-300 text-[#172a34] font-black px-4 py-1.5 rounded-full transition shadow-sm"
            >
              Browse Doctor Directory ➔
            </a>
          </div>
        </div>
      </section>

      {/* FILTER TABS */}
      <section className="bg-white border-b border-slate-200 sticky top-16 sm:top-[70px] z-30 shadow-xs py-3">
        <div className="w-full max-w-7xl 2xl:max-w-[1600px] min-[1900px]:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const count =
              cat === 'All'
                ? HOSPITAL_DEPARTMENTS.length
                : HOSPITAL_DEPARTMENTS.filter((d) => d.category === cat).length;
            const isSelected = activeTab === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#c83220] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{cat === 'All' ? 'All Departments' : `${cat} Departments`}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* DEPARTMENTS GRID */}
      <section className="py-12 sm:py-16 bg-[#fdfbf7]">
        <div className="w-full max-w-7xl 2xl:max-w-[1600px] min-[1900px]:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDepts.map((dept) => {
              // Count matching doctors in this department
              const deptDoctors = doctors.filter((doc) =>
                matchDepartment(doc.department, doc.category, dept.name, doc.specialty)
              );

              const whatsappUrl = `https://wa.me/919216076757?text=${encodeURIComponent(
                `Hello Dr. B. S. Tomar Hospital Jagatpura, I would like to consult with the ${dept.name} department.`
              )}`;

              const deptPageUrl = `/departments/${dept.id}`;
              const doctorsPageUrl = `/doctors?department=${encodeURIComponent(dept.name)}`;

              return (
                <div
                  key={dept.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-200/90 flex flex-col justify-between group"
                >
                  <div>
                    {/* Image */}
                    <a href={deptPageUrl} className="block relative aspect-[16/10] bg-slate-100 overflow-hidden cursor-pointer">
                      <img
                        src={dept.image}
                        alt={dept.name}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/images/bst-doctor-consultation.jpg';
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 bg-[#172a34]/90 text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-sm">
                        {dept.badge}
                      </span>
                      <span className="absolute top-3 right-3 bg-white/90 text-[#c83220] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {dept.category}
                      </span>

                      {/* Doctor Count Pill if doctors exist */}
                      {deptDoctors.length > 0 && (
                        <span className="absolute bottom-3 left-3 bg-[#c83220] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
                          <span>🩺</span>
                          <span>{deptDoctors.length} Specialists Available</span>
                        </span>
                      )}
                    </a>

                    {/* Content */}
                    <div className="p-6">
                      <a href={deptPageUrl}>
                        <h3 className="text-lg font-black text-[#172a34] mb-2 group-hover:text-[#c83220] transition-colors leading-snug">
                          {dept.name}
                        </h3>
                      </a>
                      <p className="text-slate-600 text-xs leading-relaxed mb-4">{dept.desc}</p>

                      {/* Key highlights */}
                      <div className="space-y-1.5 pt-3 border-t border-slate-100">
                        {dept.facilities.map((fac, fIdx) => (
                          <div
                            key={fIdx}
                            className="flex items-center gap-2 text-[11px] text-slate-700 font-semibold"
                          >
                            <span className="text-[#c83220] text-xs">✓</span>
                            <span>{fac}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions: View Department Page & WhatsApp */}
                  <div className="p-6 pt-0 space-y-2">
                    <a
                      href={deptPageUrl}
                      className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#172a34] font-bold text-xs transition"
                    >
                      <span>🏥 Department Overview &amp; Doctors {deptDoctors.length > 0 ? `(${deptDoctors.length})` : ''}</span>
                      <span>➔</span>
                    </a>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#c83220] hover:bg-[#a82415] text-white font-bold text-xs shadow-xs hover:shadow-md transition-all"
                    >
                      <span>💬 Consult Department</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
