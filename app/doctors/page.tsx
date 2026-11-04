'use client';

import { useState, useEffect } from 'react';
import NewsTicker from '@/components/NewsTicker';
import TopBar from '@/components/TopBar';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import { fetchDoctors, DoctorData } from '@/lib/api';

const DEFAULT_DOCTORS: DoctorData[] = [
  {
    name: 'Dr. Sunita Verma',
    specialty: 'Critical Care & ICU Specialist',
    category: 'Critical Care / ICU',
    department: 'Critical Care & Emergency Medicine',
    qualification: 'MBBS, MD (Anaesthesia), Fellowship in Critical Care',
    experience: '14+ Years',
    opdTimings: 'Mon - Sat: 9:00 AM - 4:00 PM',
    image: '/doctors/doctor-womens-health.png',
  },
  {
    name: 'Dr. Anita Sharma',
    specialty: 'Senior Obstetrician & Gynaecologist',
    category: 'Gynaecology',
    department: 'Obstetrics & Gynaecology',
    qualification: 'MBBS, MS (Obs & Gynae), DNB',
    experience: '16+ Years',
    opdTimings: 'Mon - Sat: 10:00 AM - 2:00 PM',
    image: '/doctors/doctor-womens-health.png',
  },
  {
    name: 'Dr. Rajiv Mathur',
    specialty: 'Senior Joint Replacement & Spine Surgeon',
    category: 'Orthopedics',
    department: 'Orthopaedics & Joint Replacement',
    qualification: 'MBBS, MS (Orthopaedics), M.Ch (UK)',
    experience: '18+ Years',
    opdTimings: 'Mon - Sat: 10:30 AM - 4:30 PM',
    image: '/doctors/doctor-orthopaedics.png',
  },
  {
    name: 'Dr. S. K. Gupta',
    specialty: 'Senior Pediatrician & Neonatologist',
    category: 'Pediatrics',
    department: 'Paediatrics & Neonatology (PICU/NICU)',
    qualification: 'MBBS, MD (Pediatrics), FIAP',
    experience: '15+ Years',
    opdTimings: 'Mon - Sat: 9:00 AM - 1:00 PM',
    image: '/doctors/doctor-paediatrics.png',
  },
  {
    name: 'Dr. Neha Singh',
    specialty: 'Internal Medicine & Diabetology Specialist',
    category: 'Internal Medicine',
    department: 'General & Internal Medicine',
    qualification: 'MBBS, MD (Medicine)',
    experience: '10+ Years',
    opdTimings: 'Mon - Sat: 11:00 AM - 5:00 PM',
    image: '/doctors/doctor-womens-health.png',
  },
  {
    name: 'Dr. Vikramaditya Rathore',
    specialty: 'Chief Interventional Cardiologist',
    category: 'Cardiology',
    department: 'Cardiology & Cath Lab',
    qualification: 'MBBS, MD, DM (Cardiology), FACC',
    experience: '20+ Years',
    opdTimings: 'Mon - Fri: 10:00 AM - 3:00 PM',
    image: '/doctors/doctor-orthopaedics.png',
  },
  {
    name: 'Dr. Meenakshi Sundaram',
    specialty: 'Senior Neurosurgeon & Spine Specialist',
    category: 'Neurology',
    department: 'Neurosurgery & Spine Center',
    qualification: 'MBBS, MS, M.Ch (Neurosurgery)',
    experience: '15+ Years',
    opdTimings: 'Mon - Sat: 12:00 PM - 5:00 PM',
    image: '/doctors/doctor-womens-health.png',
  },
  {
    name: 'Dr. Arvind Chawla',
    specialty: 'Pulmonologist & Sleep Medicine Specialist',
    category: 'Critical Care / ICU',
    department: 'Pulmonology & Respiratory Medicine',
    qualification: 'MBBS, MD (Chest & Respiratory)',
    experience: '13+ Years',
    opdTimings: 'Mon - Sat: 10:00 AM - 3:00 PM',
    image: '/doctors/doctor-orthopaedics.png',
  },
];

export default function DoctorsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [doctorsList, setDoctorsList] = useState<DoctorData[]>(DEFAULT_DOCTORS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const docs = await fetchDoctors();
      if (docs && docs.length > 0) {
        setDoctorsList(docs);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const categories = [
    'All',
    'General Surgery',
    'Internal Medicine',
    'Orthopedics',
    'Gynaecology',
    'Pediatrics',
    'Critical Care / ICU',
    'ENT & Ophthalmology',
    'Dermatology',
    'Radiodiagnosis',
    'Pathology',
  ];

  const filteredDoctors = doctorsList.filter((doc) => {
    const matchesCategory = activeCategory === 'All' || doc.category === activeCategory;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.qualification.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <NewsTicker />
      <TopBar />
      <NavigationBar />

      {/* HERO BANNER */}
      <section
        className="relative bg-[#172a34] text-white py-14 sm:py-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(23, 42, 52, 0.94) 0%, rgba(15, 35, 46, 0.88) 45%, rgba(158, 36, 23, 0.78) 100%), url('/images/bst-hospital-exterior.jpg')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center md:text-left w-full">
          <nav aria-label="breadcrumb" className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">
            <a href="/" className="hover:text-white transition">HOME</a>
            <span className="text-[#c83220]">/</span>
            <span className="text-amber-400">DOCTORS DIRECTORY</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3 leading-tight max-w-4xl">
            Meet Our World-Class Specialists &amp; Surgeons
          </h1>
          <p className="text-slate-200 text-xs sm:text-base max-w-2xl font-medium leading-relaxed">
            Over 20+ specialized medical disciplines with round-the-clock emergency, trauma, and tertiary critical care physicians serving Jaipur and Rajasthan.
          </p>
        </div>
      </section>

      {/* SEARCH & FILTER STRIP */}
      <section className="bg-white border-b border-slate-200 sticky top-16 sm:top-[70px] z-30 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search by doctor name, specialty, or condition..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#c83220] font-medium"
              />
              <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#c83220] text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DOCTORS GRID */}
      <section className="py-12 sm:py-16 bg-[#fdfbf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 max-w-lg mx-auto p-6 shadow-sm">
              <div className="text-4xl mb-2">🔍</div>
              <h3 className="text-base font-bold text-[#172a34] mb-1">No Doctors Match Your Search</h3>
              <p className="text-xs text-slate-500">Try adjusting your keyword or switch category to &apos;All&apos;.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                className="mt-4 px-4 py-1.5 bg-[#c83220] text-white rounded-lg text-xs font-bold"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredDoctors.map((doc, idx) => {
                const docUrl = `/doctors/${doc._id || doc.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                const message = `Hello Dr. BST Hospital Jagatpura, I would like to book a consultation with ${doc.name} (${doc.specialty} - ${doc.department}). Please share OPD slot details.`;
                const whatsappUrl = `https://wa.me/917412077125?text=${encodeURIComponent(message)}`;

                return (
                  <div
                    key={doc._id || idx}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200/90 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Doctor Photo */}
                      <a href={docUrl} className="block relative h-60 bg-slate-100 overflow-hidden cursor-pointer">
                        <img
                          src={doc.image || '/doctors/doctor-womens-health.png'}
                          alt={doc.name}
                          className="w-full h-full object-cover object-top opacity-95 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2.5 right-2.5 bg-[#172a34]/90 text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-sm">
                          {doc.experience}
                        </div>
                      </a>

                      {/* Doctor Info */}
                      <div className="p-5">
                        <span className="text-[#c83220] text-[11px] font-black uppercase tracking-wider mb-1 block">
                          {doc.specialty}
                        </span>
                        <a href={docUrl}>
                          <h3 className="text-base font-black text-[#172a34] mb-1 leading-snug group-hover:text-[#c83220] transition-colors">
                            {doc.name}
                          </h3>
                        </a>
                        <p className="text-slate-600 text-[11px] font-bold mb-1 leading-snug">
                          {doc.qualification}
                        </p>
                        <p className="text-slate-500 text-[11px] mb-3">
                          {doc.department}
                        </p>
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 text-[11px] text-slate-700 font-medium">
                          🕒 {doc.opdTimings}
                        </div>
                      </div>
                    </div>

                    {/* ACTION BUTTONS: VIEW PROFILE & WHATSAPP */}
                    <div className="p-5 pt-0 space-y-2">
                      <a
                        href={docUrl}
                        className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#172a34] font-bold text-xs transition"
                      >
                        <span>View Profile &amp; Bio</span>
                        <span>➔</span>
                      </a>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-3 rounded-xl bg-[#c83220] hover:bg-[#a82415] text-white font-bold text-xs transition-all shadow-sm hover:shadow-md"
                      >
                        <span>💬 Book Consultation</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
