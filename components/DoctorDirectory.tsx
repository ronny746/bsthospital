'use client';

import { useEffect, useState } from 'react';
import { fetchDoctors, DoctorData } from '@/lib/api';

const DEFAULT_DOCTORS: DoctorData[] = [
  { image: '/doctors/doctor-womens-health.png', specialty: 'Critical Care & Emergency Medicine', name: 'Dr. Sunita Verma', department: 'Critical Care & Emergency Medicine', experience: '14+ Yrs' } as DoctorData,
  { image: '/doctors/doctor-womens-health.png', specialty: 'Women’s Health & Gynaecology', name: 'Dr. Anita Sharma', department: 'Obstetrics & Gynaecology', experience: '16+ Yrs' } as DoctorData,
  { image: '/doctors/doctor-orthopaedics.png', specialty: 'Orthopaedics & Joint Care', name: 'Dr. Rajiv Mathur', department: 'Bone, Joint & Spine Surgery', experience: '18+ Yrs' } as DoctorData,
  { image: '/doctors/doctor-paediatrics.png', specialty: 'Paediatrics & Neonatology', name: 'Dr. S. K. Gupta', department: 'Child Healthcare & PICU', experience: '12+ Yrs' } as DoctorData,
];

export default function DoctorDirectory() {
  const [doctors, setDoctors] = useState<DoctorData[]>(DEFAULT_DOCTORS);

  useEffect(() => {
    async function load() {
      const data = await fetchDoctors();
      if (data && data.length > 0) {
        setDoctors(data.slice(0, 4));
      }
    }
    load();
  }, []);

  return (
    <section className="py-8 sm:py-16 md:py-20 bg-slate-50" id="doctors">
      <div className="container mx-auto px-3 sm:px-6 max-w-7xl">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {doctors.map((doc, idx) => {
            const docUrl = `/doctors/${doc._id || doc.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
            const message = `Hello Dr. B. S. Tomar Hospital, I would like to book a consultation with ${doc.name} (${doc.specialty} - ${doc.department}). Please share OPD timings.`;
            const whatsappUrl = `https://wa.me/917412077125?text=${encodeURIComponent(message)}`;

            return (
              <div key={doc._id || idx} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200/90 flex flex-col justify-between">
                <div>
                  <a href={docUrl} className="block relative h-48 sm:h-60 bg-slate-100 overflow-hidden cursor-pointer">
                    <img 
                      src={doc.image || '/doctors/doctor-womens-health.png'} 
                      alt={doc.name} 
                      className="absolute inset-0 w-full h-full object-cover object-top opacity-95 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-[#172a34]/90 text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-sm">
                      {doc.experience}
                    </div>
                  </a>
                  <div className="p-3 sm:p-4 text-center">
                    <span className="text-[#c83220] text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-0.5 sm:mb-1 block">
                      {doc.specialty}
                    </span>
                    <a href={docUrl}>
                      <h3 className="text-sm sm:text-base font-black text-[#172a34] mb-0.5 group-hover:text-[#c83220] transition-colors">{doc.name}</h3>
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
      </div>
    </section>
  );
}
