'use client';

import { useEffect, useState } from 'react';
import { fetchDoctors, DoctorData } from '@/lib/api';
import DoctorAvatar from '@/components/DoctorAvatar';

export default function DoctorDirectory() {
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchDoctors();
        if (data && data.length > 0) {
          setDoctors(data.slice(0, 4));
        }
      } catch (err) {
        console.error('Error loading featured doctors:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section className="py-8 sm:py-16 md:py-20 bg-slate-50" id="doctors">
      <div className="w-full max-w-7xl 2xl:max-w-[1600px] min-[1900px]:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-5 sm:mb-10 border-b border-slate-200 pb-3 sm:pb-6 gap-3 sm:gap-4">
          <div className="max-w-2xl">
            <span className="text-[#c83220] font-black tracking-widest text-[11px] sm:text-xs uppercase mb-1 sm:mb-2 block">
              OUR MEDICAL SPECIALISTS
            </span>
            <h2 className="text-lg sm:text-2xl md:text-4xl font-black text-[#172a34] leading-tight">
              Expert guidance &amp; compassionate medical care.
            </h2>
          </div>
          <a
            href="/doctors"
            className="inline-flex items-center gap-1.5 text-xs font-black text-[#c83220] hover:underline"
          >
            <span>View All Doctors</span>
            <span>➔</span>
          </a>
        </div>

        {/* LOADING SHIMMER SKELETON */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm animate-pulse flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-square sm:aspect-[4/5] bg-gradient-to-b from-slate-200 to-slate-100 relative">
                    <div className="absolute top-2.5 right-2.5 h-4 w-16 bg-slate-300 rounded-full" />
                  </div>
                  <div className="p-3 sm:p-4 space-y-2 text-center">
                    <div className="h-2.5 w-24 bg-slate-200 rounded mx-auto" />
                    <div className="h-4 w-36 bg-slate-300 rounded mx-auto" />
                    <div className="h-3 w-28 bg-slate-200 rounded mx-auto" />
                  </div>
                </div>
                <div className="p-3 pt-0 sm:p-4 sm:pt-0 space-y-1.5">
                  <div className="h-7 w-full bg-slate-100 rounded-xl" />
                  <div className="h-8 w-full bg-slate-200 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : doctors.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
            Specialists directory currently updating. Please visit{' '}
            <a href="/doctors" className="text-[#c83220] font-bold underline">
              All Doctors
            </a>
            .
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {doctors.map((doc, idx) => {
              const docUrl = `/doctors/${doc._id || doc.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
              const message = `Hello Dr. B. S. Tomar Hospital, I would like to book a consultation with ${doc.name} (${doc.specialty} - ${doc.department}). Please share OPD timings.`;
              const whatsappUrl = `https://wa.me/919216076757?text=${encodeURIComponent(message)}`;

              return (
                <div
                  key={doc._id || idx}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200/90 flex flex-col justify-between"
                >
                  <div>
                    <a href={docUrl} className="block relative aspect-square sm:aspect-[4/5] bg-gradient-to-b from-slate-100 to-slate-200 overflow-hidden cursor-pointer">
                      <DoctorAvatar
                        src={doc.image}
                        alt={doc.name}
                        className="absolute inset-0 w-full h-full object-cover object-[center_12%] group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 right-2.5 bg-[#172a34]/90 text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-sm z-10">
                        {doc.experience}
                      </div>
                    </a>
                    <div className="p-3 sm:p-4 text-center">
                      <span className="text-[#c83220] text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-0.5 sm:mb-1 block">
                        {doc.specialty}
                      </span>
                      <a href={docUrl}>
                        <h3 className="text-sm sm:text-base font-black text-[#172a34] mb-0.5 group-hover:text-[#c83220] transition-colors">
                          {doc.name}
                        </h3>
                      </a>
                      <p className="text-slate-500 text-xs font-semibold">{doc.department}</p>
                    </div>
                  </div>

                  {/* Compact Red Consultation Button - Direct WhatsApp */}
                  <div className="p-3 pt-0 sm:p-4 sm:pt-0 space-y-1.5">
                    <a
                      href={docUrl}
                      className="inline-flex items-center justify-center gap-1 w-full py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#172a34] font-bold text-[11px] transition"
                    >
                      <span>View Profile</span>
                      <span>➔</span>
                    </a>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-[#c83220] hover:bg-[#a82415] text-white font-bold text-xs transition-all shadow-sm hover:shadow-md"
                    >
                      <span>💬</span>
                      <span>Book Consultation</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
