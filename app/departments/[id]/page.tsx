'use client';

import { use, useEffect, useState } from 'react';
import NavigationBar from '@/components/NavigationBar';
import TopBar from '@/components/TopBar';
import NewsTicker from '@/components/NewsTicker';
import Footer from '@/components/Footer';
import { HOSPITAL_DEPARTMENTS, matchDepartment, DepartmentItem } from '@/lib/departments';
import { fetchDoctors, DoctorData } from '@/lib/api';
import DoctorAvatar from '@/components/DoctorAvatar';

export default function DepartmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const deptId = resolvedParams.id.toLowerCase();

  const [department, setDepartment] = useState<DepartmentItem | null>(null);
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Match department by id, shortName, name, or clean slug alias
    const cleanId = deptId.replace(/[^a-z0-9]/g, '');
    const found = HOSPITAL_DEPARTMENTS.find((d) => {
      const dCleanId = d.id.replace(/[^a-z0-9]/g, '');
      const dCleanName = d.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const dCleanShort = d.shortName.toLowerCase().replace(/[^a-z0-9]/g, '');
      const dCleanDocCat = d.doctorCategory.toLowerCase().replace(/[^a-z0-9]/g, '');

      return (
        d.id.toLowerCase() === deptId ||
        d.shortName.toLowerCase().replace(/[^a-z0-9]+/g, '-') === deptId ||
        d.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === deptId ||
        dCleanId === cleanId ||
        dCleanName === cleanId ||
        dCleanShort === cleanId ||
        dCleanDocCat === cleanId ||
        (cleanId.includes('dermat') && dCleanName.includes('dermat')) ||
        (cleanId.includes('anaesth') && dCleanName.includes('anaesth')) ||
        (cleanId.includes('anesth') && dCleanName.includes('anaesth')) ||
        (cleanId.includes('ortho') && dCleanName.includes('ortho')) ||
        (cleanId.includes('gyn') && dCleanName.includes('gyn')) ||
        (cleanId.includes('obs') && dCleanName.includes('obs')) ||
        (cleanId.includes('paed') && dCleanName.includes('paed')) ||
        (cleanId.includes('pediat') && dCleanName.includes('paed')) ||
        (cleanId.includes('eye') && dCleanName.includes('ophthalm')) ||
        (cleanId === 'ent' && d.id === 'ent')
      );
    });
    setDepartment(found || null);

    // 2. Fetch doctors for this department
    async function loadDoctors() {
      try {
        const docs = await fetchDoctors();
        setDoctors(docs || []);
      } catch (err) {
        console.error('Error fetching doctors for department:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDoctors();
  }, [deptId]);

  if (!department) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
        <NewsTicker />
        <TopBar />
        <NavigationBar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <span className="text-4xl mb-4">🏥</span>
          <h1 className="text-2xl font-black text-[#172a34] mb-2">Department Not Found</h1>
          <p className="text-slate-500 text-xs sm:text-sm mb-6 max-w-md">
            The requested clinical department could not be located in our directory.
          </p>
          <a
            href="/departments"
            className="inline-block bg-[#c83220] hover:bg-[#a82415] text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow-md"
          >
            Explore All 35+ Departments ➔
          </a>
        </div>
        <Footer />
      </main>
    );
  }

  // Filter doctors that match this department
  const deptDoctors = doctors.filter((doc) =>
    matchDepartment(doc.department, doc.category, department.name, doc.specialty)
  );

  const whatsappDeptUrl = `https://wa.me/919216076757?text=${encodeURIComponent(
    `Hello Dr. B. S. Tomar Hospital Jagatpura,\n\nI would like to inquire about consultation and procedures in the ${department.name} department.`
  )}`;

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <NewsTicker />
      <TopBar />
      <NavigationBar />

      {/* Breadcrumb Navigation */}
      <div className="bg-[#172a34] text-white py-4 border-b border-white/10">
        <div className="w-full max-w-7xl 2xl:max-w-[1600px] min-[1900px]:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center gap-2 text-xs font-semibold text-slate-300">
          <a href="/" className="hover:text-white transition">Home</a>
          <span className="text-[#c83220]">/</span>
          <a href="/departments" className="hover:text-white transition">Departments</a>
          <span className="text-[#c83220]">/</span>
          <span className="text-amber-300 font-bold truncate">{department.name}</span>
        </div>
      </div>

      {/* Department Hero Banner */}
      <section className="bg-white border-b border-slate-200 py-10 sm:py-14">
        <div className="w-full max-w-7xl 2xl:max-w-[1600px] min-[1900px]:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

            {/* Left Info */}
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="bg-[#c83220] text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                  {department.badge}
                </span>
                <span className="bg-slate-100 text-slate-700 text-[11px] font-bold px-3 py-1 rounded-full border border-slate-200">
                  {department.category} Specialty
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#172a34] tracking-tight">
                Department of {department.name}
              </h1>

              <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl">
                {department.desc}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <a
                  href={whatsappDeptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#c83220] hover:bg-[#a82415] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>💬 Instant WhatsApp Consultation</span>
                  <span>➔</span>
                </a>
                <a
                  href="tel:9216076757"
                  className="w-full sm:w-auto bg-[#172a34] hover:bg-[#0e191f] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition shadow flex items-center justify-center gap-2"
                >
                  <span>📞 Call Helpline: +91 92160 76757</span>
                </a>
              </div>
            </div>

            {/* Right Photo */}
            <div className="w-full max-w-md lg:w-96 shrink-0">
              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl aspect-[16/11] bg-slate-100">
                <img
                  src={department.image}
                  alt={department.name}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/bst-doctor-consultation.jpg';
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#172a34]/90 text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                  Dr. B. S. Tomar Hospital
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Facilities & Clinical Scope */}
      <section className="py-10 sm:py-12 bg-[#fdfbf7] border-b border-slate-200">
        <div className="w-full max-w-7xl 2xl:max-w-[1600px] min-[1900px]:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-3xl mb-6">
            <span className="text-[#c83220] font-black tracking-widest text-[11px] uppercase mb-1 block">
              INFRASTRUCTURE &amp; CLINICAL SERVICES
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#172a34]">
              Specialized Facilities &amp; Technology
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {department.facilities.map((fac, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3.5"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-[#c83220] font-black flex items-center justify-center text-sm shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#172a34] mb-1">{fac}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Operated under certified clinical protocols with round-the-clock emergency backup.
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* OPD Schedule Box */}
          <div className="mt-8 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-slate-500 block">Outpatient OPD Hours</span>
              <span className="text-sm sm:text-base font-black text-[#172a34]">
                Mon – Sat: 9:00 AM to 4:00 PM
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 block">Emergency &amp; Trauma Support</span>
              <span className="text-xs sm:text-sm font-extrabold text-[#c83220]">
                24 Hours / 365 Days • Dial 0141-2602222
              </span>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Dr.+B.S.+Tomar+Institute+of+Medical+Sciences+%26+Research,+Jagatpura,+Jaipur"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-300 transition"
            >
              📍 View Hospital Location
            </a>
          </div>
        </div>
      </section>

      {/* DEPARTMENT SPECIALISTS & DOCTORS */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="w-full max-w-7xl 2xl:max-w-[1600px] min-[1900px]:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[#c83220] font-black tracking-widest text-[11px] uppercase mb-1 block">
                EXPERT CLINICIANS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#172a34]">
                Specialists in {department.name}
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {deptDoctors.length} Clinician{deptDoctors.length === 1 ? '' : 's'} Available
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-slate-100 h-80 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : deptDoctors.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 max-w-xl mx-auto space-y-3">
              <span className="text-3xl">👨‍⚕️</span>
              <h3 className="font-black text-[#172a34] text-base">Department Consultation Desk</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Senior faculty and visiting specialists are available on appointment for {department.name}.
              </p>
              <a
                href={whatsappDeptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#c83220] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md"
              >
                Inquire OPD Schedule on WhatsApp ➔
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {deptDoctors.map((doc, idx) => {
                const docUrl = `/doctors/${doc._id || doc.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                const message = `Hello Dr. B. S. Tomar Hospital, I would like to book a consultation with ${doc.name} (${doc.specialty} - ${doc.department}). Please share OPD slot details.`;
                const whatsappUrl = `https://wa.me/919216076757?text=${encodeURIComponent(message)}`;

                return (
                  <div
                    key={doc._id || idx}
                    className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-200/90 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Doctor Photo */}
                      <a href={docUrl} className="block relative aspect-square sm:aspect-[4/5] bg-gradient-to-b from-slate-100 to-slate-200 overflow-hidden cursor-pointer">
                        <DoctorAvatar
                          src={doc.image}
                          alt={doc.name}
                          className="w-full h-full object-cover object-[center_12%] group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2.5 right-2.5 bg-[#172a34]/90 text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-sm z-10">
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

                    {/* Action Buttons */}
                    <div className="p-4 sm:p-5 pt-0 space-y-2">
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
                        className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-3 rounded-xl bg-[#c83220] hover:bg-[#a82415] text-white font-bold text-xs transition shadow-sm hover:shadow-md cursor-pointer"
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

