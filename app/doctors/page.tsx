'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import NewsTicker from '@/components/NewsTicker';
import TopBar from '@/components/TopBar';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import { fetchDoctors, DoctorData } from '@/lib/api';
import { matchDepartment } from '@/lib/departments';

function DoctorsContent() {
  const searchParams = useSearchParams();
  const initialDept = searchParams.get('department') || 'All';
  const initialQuery = searchParams.get('search') || '';

  const [activeDepartment, setActiveDepartment] = useState<string>(initialDept);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [doctorsList, setDoctorsList] = useState<DoctorData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Sync URL search params if they change
  useEffect(() => {
    const dept = searchParams.get('department');
    if (dept) setActiveDepartment(dept);
    const q = searchParams.get('search');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Fetch real doctors from backend API (never show dummy data)
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const docs = await fetchDoctors();
        if (isMounted) {
          setDoctorsList(docs || []);
        }
      } catch (err) {
        console.error('Failed to load doctors:', err);
        if (isMounted) {
          setDoctorsList([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute doctor counts for every department
  const departmentCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    doctorsList.forEach((doc) => {
      const dept = doc.department ? doc.department.trim() : 'General';
      counts[dept] = (counts[dept] || 0) + 1;
    });
    return counts;
  }, [doctorsList]);

  // Dynamically extract ALL departments present among real doctors
  const uniqueDepartments = useMemo(() => {
    const deptsSet = new Set<string>();
    doctorsList.forEach((d) => {
      if (d.department && d.department.trim()) {
        deptsSet.add(d.department.trim());
      }
    });

    const sorted = Array.from(deptsSet).sort((a, b) => {
      // Sort by doctor count descending, then alphabetically
      const countA = departmentCounts[a] || 0;
      const countB = departmentCounts[b] || 0;
      if (countB !== countA) return countB - countA;
      return a.localeCompare(b);
    });

    return ['All', ...sorted];
  }, [doctorsList, departmentCounts]);

  // Filter doctors based on active department & search query
  const filteredDoctors = useMemo(() => {
    return doctorsList.filter((doc) => {
      const matchesDept =
        activeDepartment === 'All' ||
        doc.department === activeDepartment ||
        doc.category === activeDepartment ||
        matchDepartment(doc.department, doc.category, activeDepartment);

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        doc.name.toLowerCase().includes(q) ||
        (doc.specialty && doc.specialty.toLowerCase().includes(q)) ||
        (doc.department && doc.department.toLowerCase().includes(q)) ||
        (doc.qualification && doc.qualification.toLowerCase().includes(q)) ||
        (doc.designation && doc.designation.toLowerCase().includes(q));

      return matchesDept && matchesSearch;
    });
  }, [doctorsList, activeDepartment, searchQuery]);

  return (
    <>
      {/* HERO BANNER */}
      <section
        className="relative bg-[#172a34] text-white py-12 sm:py-16 md:py-20 bg-cover bg-center"
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
            <span className="text-amber-400">DOCTORS DIRECTORY</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-black tracking-tight mb-3 leading-tight max-w-4xl">
            Meet Our World-Class Specialists &amp; Surgeons
          </h1>
          <p className="text-slate-200 text-xs sm:text-base 2xl:text-lg max-w-3xl font-medium leading-relaxed">
            Over 20+ specialized clinical disciplines with round-the-clock emergency, trauma, and tertiary critical care physicians serving Jaipur and Rajasthan.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs">
            <span className="bg-white/10 text-white backdrop-blur-sm px-3.5 py-1.5 rounded-full font-bold border border-white/20">
              🩺 {loading ? 'Loading specialists...' : `${doctorsList.length} Active Specialists`}
            </span>
            <span className="bg-white/10 text-white backdrop-blur-sm px-3.5 py-1.5 rounded-full font-bold border border-white/20">
              🏢 {loading ? 'Loading...' : `${uniqueDepartments.length - 1} Medical Departments`}
            </span>
            <span className="bg-amber-400 text-[#172a34] px-3.5 py-1.5 rounded-full font-black shadow-sm">
              ⚡ 24×7 Emergency Consultations
            </span>
          </div>
        </div>
      </section>

      {/* SEARCH & DYNAMIC DEPARTMENT FILTER TOOLBAR */}
      <section className="bg-white border-b border-slate-200 sticky top-16 sm:top-[70px] z-30 shadow-xs py-3.5">
        <div className="w-full max-w-7xl 2xl:max-w-[1600px] min-[1900px]:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-3">
          
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search by doctor name, specialty, degree, department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#c83220] font-medium"
              />
              <span className="absolute left-3 top-2.5 text-slate-400 text-xs sm:text-sm">🔍</span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 text-xs font-bold px-1.5 py-0.5 rounded"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Summary / Status */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 w-full md:w-auto justify-between md:justify-end">
              <span>
                Showing <strong className="text-[#c83220]">{loading ? '...' : filteredDoctors.length}</strong> of{' '}
                {doctorsList.length} Doctors
              </span>
              {(activeDepartment !== 'All' || searchQuery) && (
                <button
                  onClick={() => {
                    setActiveDepartment('All');
                    setSearchQuery('');
                  }}
                  className="text-[#c83220] hover:underline text-xs font-black cursor-pointer ml-2"
                >
                  Reset Filter ↺
                </button>
              )}
            </div>
          </div>

          {/* DYNAMIC ALL DEPARTMENTS PILLS ROW */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-slate-300">
            {loading ? (
              // Shimmer pills while loading
              <div className="flex gap-2 animate-pulse py-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="h-8 w-28 bg-slate-200 rounded-full shrink-0" />
                ))}
              </div>
            ) : (
              uniqueDepartments.map((dept) => {
                const count = dept === 'All' ? doctorsList.length : departmentCounts[dept] || 0;
                const isSelected = activeDepartment === dept;

                return (
                  <button
                    key={dept}
                    onClick={() => setActiveDepartment(dept)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                      isSelected
                        ? 'bg-[#c83220] text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
                    }`}
                  >
                    <span>{dept}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-white text-slate-600 shadow-xs'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* DOCTORS GRID */}
      <section className="py-10 sm:py-16 bg-[#fdfbf7]">
        <div className="w-full max-w-7xl 2xl:max-w-[1600px] min-[1900px]:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          
          {/* 1. LOADING SHIMMER SKELETON (NO DUMMY DATA DISPLAYED) */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm animate-pulse flex flex-col justify-between"
                >
                  <div>
                    {/* Skeleton photo */}
                    <div className="aspect-square sm:aspect-[4/5] bg-gradient-to-b from-slate-200 to-slate-100 relative">
                      <div className="absolute top-2.5 right-2.5 h-4 w-16 bg-slate-300 rounded-full" />
                    </div>

                    {/* Skeleton info */}
                    <div className="p-4 sm:p-5 space-y-2.5">
                      <div className="h-3 w-28 bg-slate-200 rounded" />
                      <div className="h-5 w-44 bg-slate-300 rounded" />
                      <div className="h-3.5 w-36 bg-slate-200 rounded" />
                      <div className="h-3 w-48 bg-slate-100 rounded" />
                      <div className="h-8 w-full bg-slate-100 rounded-lg mt-2" />
                    </div>
                  </div>

                  {/* Skeleton buttons */}
                  <div className="p-4 sm:p-5 pt-0 space-y-2">
                    <div className="h-8 w-full bg-slate-100 rounded-xl" />
                    <div className="h-9 w-full bg-slate-200 rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredDoctors.length === 0 ? (
            /* 2. NO DOCTORS MATCH SEARCH */
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 max-w-lg mx-auto p-8 shadow-sm space-y-3">
              <div className="text-4xl">🔍</div>
              <h3 className="text-lg font-black text-[#172a34]">No Specialists Match This Filter</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No doctor found for &quot;{searchQuery || activeDepartment}&quot;. Try selecting &apos;All&apos; or searching by doctor name.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveDepartment('All');
                }}
                className="mt-2 px-5 py-2 bg-[#c83220] hover:bg-[#a82415] text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
              >
                Clear Filters &amp; View All Specialists
              </button>
            </div>
          ) : (
            /* 3. REAL DOCTORS GRID */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredDoctors.map((doc, idx) => {
                const docUrl = `/doctors/${doc._id || doc.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                const message = `Hello Dr. B. S. Tomar Hospital Jagatpura, I would like to book a consultation with ${doc.name} (${doc.specialty} - ${doc.department}). Please share OPD slot details.`;
                const whatsappUrl = `https://wa.me/917412077125?text=${encodeURIComponent(message)}`;

                return (
                  <div
                    key={doc._id || idx}
                    className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-200/90 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Doctor Photo - Responsive aspect ratio prevents awkward zooming & cropping */}
                      <a href={docUrl} className="block relative aspect-square sm:aspect-[4/5] bg-gradient-to-b from-slate-100 to-slate-200 overflow-hidden cursor-pointer">
                        <img
                          src={doc.image || '/doctors/doctor-womens-health.png'}
                          alt={doc.name}
                          className="w-full h-full object-cover object-[center_12%] opacity-95 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2.5 right-2.5 bg-[#172a34]/90 text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-sm">
                          {doc.experience || 'Experienced'}
                        </div>
                      </a>

                      {/* Doctor Info */}
                      <div className="p-4 sm:p-5">
                        <span className="text-[#c83220] text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-1 block line-clamp-1">
                          {doc.specialty}
                        </span>
                        <a href={docUrl}>
                          <h3 className="text-base font-black text-[#172a34] mb-1 leading-snug group-hover:text-[#c83220] transition-colors line-clamp-1">
                            {doc.name}
                          </h3>
                        </a>
                        <p className="text-slate-600 text-[11px] font-bold mb-1 leading-snug line-clamp-1">
                          {doc.qualification}
                        </p>
                        <p className="text-slate-500 text-[11px] mb-2.5 font-medium line-clamp-1">
                          🏢 {doc.department}
                        </p>
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 text-[11px] text-slate-700 font-medium truncate">
                          🕒 {doc.opdTimings || 'Mon - Sat: 9:00 AM - 4:00 PM'}
                        </div>
                      </div>
                    </div>

                    {/* ACTION BUTTONS: VIEW PROFILE & WHATSAPP */}
                    <div className="p-4 sm:p-5 pt-0 space-y-2">
                      <a
                        href={docUrl}
                        className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#172a34] font-bold text-xs transition"
                      >
                        <span>View Profile &amp; Bio</span>
                        <span>➔</span>
                      </a>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-3 rounded-xl bg-[#c83220] hover:bg-[#a82415] text-white font-bold text-xs transition-all shadow-sm hover:shadow-md cursor-pointer"
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
    </>
  );
}

export default function DoctorsPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <NewsTicker />
      <TopBar />
      <NavigationBar />

      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center py-24">
            <div className="text-center space-y-3">
              <div className="w-10 h-10 border-4 border-[#c83220] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-bold text-slate-500">Loading Doctor Directory...</p>
            </div>
          </div>
        }
      >
        <DoctorsContent />
      </Suspense>

      <Footer />
    </main>
  );
}
