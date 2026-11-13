'use client';

import React, { useState } from 'react';

// Medical clinical SVG icons
function StethoscopeIcon({ className = "w-6 h-6 text-blue-600" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 3v5a4.5 4.5 0 0 0 9 0V3" />
      <path d="M9 12.5v3.5a3 3 0 0 0 6 0v-2" />
      <circle cx="17" cy="14" r="2" />
      <path d="M3 3h3" />
      <path d="M12 3h3" />
    </svg>
  );
}

function ExecutiveShieldIcon({ className = "w-6 h-6 text-[#c83220]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12h6" />
      <path d="M12 9v6" />
    </svg>
  );
}

function HeartEcgIcon({ className = "w-6 h-6 text-rose-600" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
      <path d="M2 13h4l2 -4l3 7l2 -5l2 2h7" strokeWidth="1.8" />
    </svg>
  );
}

function SeniorCareIcon({ className = "w-6 h-6 text-purple-600" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9s-9 4.03-9 9a9 9 0 0 0 9 9z" />
      <path d="M9 12h6" />
      <path d="M12 9v6" />
      <circle cx="12" cy="5" r="1.5" />
    </svg>
  );
}

function DiabetesIcon({ className = "w-6 h-6 text-teal-600" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      <path d="M12 10v6" />
      <path d="M9 13h6" />
    </svg>
  );
}

function KidneyIcon({ className = "w-6 h-6 text-cyan-600" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7.5 4C5 4 3 6.5 3 10c0 4.5 3 8 5.5 8c1.5 0 2.5-1 2.5-2.5c0-1.5-.5-2.5-1-3.5c-.5-1-.5-2 0-3C10.5 8 10 4 7.5 4z" />
      <path d="M16.5 4C19 4 21 6.5 21 10c0 4.5-3 8-5.5 8c-1.5 0-2.5-1-2.5-2.5c0-1.5.5-2.5 1-3.5c.5-1 .5-2 0-3C13.5 8 14 4 16.5 4z" />
    </svg>
  );
}

function LiverIcon({ className = "w-6 h-6 text-amber-600" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 8c1-3 5-4 10-3c4 1 7 4 7 8c0 3-2 6-5 6c-4 0-7-2-9-4c-2-2-3-4-3-7z" />
      <path d="M14 5c-1 3-3 6-6 7" strokeDasharray="2 2" />
    </svg>
  );
}

function ThyroidIcon({ className = "w-6 h-6 text-indigo-600" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v18" strokeDasharray="2 2" />
      <path d="M7 6c-2.5 0-4 2-4 5.5c0 4 2 7.5 4.5 7.5c2 0 3-2.5 3.5-5c.5 2.5 1.5 5 3.5 5c2.5 0 4.5-3.5 4.5-7.5c0-3.5-1.5-5.5-4-5.5c-2 0-3 1.5-4 3c-1-1.5-2-3-4-3z" />
    </svg>
  );
}

interface HealthPackage {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  originalPrice: string;
  tag: string;
  badgeColor: string;
  icon: React.ReactNode;
  iconBg: string;
  category: 'general' | 'organ';
  features: string[];
}

export default function HealthPackages() {
  const [activeTab, setActiveTab] = useState<'all' | 'general' | 'organ'>('all');

  const packages: HealthPackage[] = [
    {
      id: 'basic',
      name: 'Basic Health Package',
      subtitle: 'Essential Health Screening for Adults',
      price: '₹499',
      originalPrice: '₹1,200',
      tag: 'POPULAR',
      badgeColor: 'bg-blue-600',
      icon: <StethoscopeIcon className="w-6 h-6 text-blue-600" />,
      iconBg: 'bg-blue-50 border-blue-200',
      category: 'general',
      features: [
        'Complete Blood Count (CBC) & ESR',
        'Fasting Blood Sugar (FBS)',
        'Lipid Profile (Cholesterol Test)',
        'Liver Function Test (LFT)',
        'Serum Creatinine & Blood Urea',
        'Serum Uric Acid',
        'Urine Routine Examination',
        'Consultation with General Medicine Physician',
        'Consultation with Dietician',
      ],
    },
    {
      id: 'executive',
      name: 'Executive Health Package',
      subtitle: 'Complete Master Health Screening',
      price: '₹1,999',
      originalPrice: '₹5,000',
      tag: 'MOST RECOMMENDED',
      badgeColor: 'bg-[#c83220]',
      icon: <ExecutiveShieldIcon className="w-6 h-6 text-[#c83220]" />,
      iconBg: 'bg-red-50 border-red-200',
      category: 'general',
      features: [
        'Complete Blood Count (CBC) & Blood Group (ABO & Rh)',
        'Thyroid Profile (T3, T4, TSH) & Diabetes Profile',
        'Lipid Profile (Coronary Risk Profile)',
        'Liver Profile & Kidney Profile (LFT & KFT)',
        'Digital Chest X-Ray & 12-Lead Digital ECG',
        'USG Whole Abdomen (Ultrasound Screening)',
        'Pap Smear Screening (for Females)',
        'Urine Routine Examination',
        'Consultation with Gen Medicine, Eye Specialist & Dentist',
        'Consultation with Dietician',
      ],
    },
    {
      id: 'cardiac',
      name: 'Cardiac Care Package',
      subtitle: 'Advanced Heart Health & Vascular Audit',
      price: '₹1,099',
      originalPrice: '₹2,800',
      tag: 'HEART CARE',
      badgeColor: 'bg-rose-600',
      icon: <HeartEcgIcon className="w-6 h-6 text-rose-600" />,
      iconBg: 'bg-rose-50 border-rose-200',
      category: 'organ',
      features: [
        'Complete Blood Count (CBC) & ESR',
        'Fasting Blood Sugar & HbA1c (Average Sugar)',
        'Lipid Profile (Cholesterol & Coronary Markers)',
        '2D Echocardiography (ECHO) & TMT (Stress Test)',
        '12-Lead Electrocardiogram (ECG)',
        'Serum Creatinine, Blood Urea (BUN) & Uric Acid',
        'Consultation with General Medicine Physician',
        'Consultation with Dietician',
      ],
    },
    {
      id: 'senior',
      name: 'Comprehensive / Senior Citizen Package',
      subtitle: 'Tailored Geriatric & Full-Body Care',
      price: '₹1,999',
      originalPrice: '₹4,500',
      tag: 'SENIOR CARE',
      badgeColor: 'bg-purple-600',
      icon: <SeniorCareIcon className="w-6 h-6 text-purple-600" />,
      iconBg: 'bg-purple-50 border-purple-200',
      category: 'general',
      features: [
        'CBC & ESR, Fasting Blood Sugar & HbA1c',
        'Lipid Profile, Liver (LFT) & Kidney (RFT) Function',
        'Thyroid Profile (TSH Screening)',
        'Vitamin D3 & Vitamin B12 Levels',
        '12-Lead Digital ECG & USG Whole Abdomen',
        'PSA (Prostate for Men) / Pap Smear (for Females)',
        'Serum Creatinine, Blood Urea, Uric Acid & Urine R/M',
        'Consultation with Gen Medicine, Eye Specialist & Gynaecologist',
        'Consultation with Dietician',
      ],
    },
    {
      id: 'diabetes',
      name: 'Diabetes Care Package',
      subtitle: 'Glycemic Control & Vital Organ Protection',
      price: '₹699',
      originalPrice: '₹1,800',
      tag: 'DIABETES CARE',
      badgeColor: 'bg-teal-600',
      icon: <DiabetesIcon className="w-6 h-6 text-teal-600" />,
      iconBg: 'bg-teal-50 border-teal-200',
      category: 'organ',
      features: [
        'Fasting Blood Sugar (FBS)',
        'HbA1c (3-Month Glycated Hemoglobin)',
        'Lipid Profile (Cholesterol Test)',
        'Liver Function Test (LFT)',
        'Renal Profile Test (RFT) & Blood Urea',
        'Urine Routine Examination',
        'Urine Microalbumin (Early Kidney Risk Screening)',
        'Consultation with Gen Medicine & Ophthalmologist (Eye Check)',
        'Consultation with Dietician',
      ],
    },
    {
      id: 'kidney',
      name: 'Kidney Health Package',
      subtitle: 'Advanced Renal Profile & Microalbumin Screening',
      price: '₹999',
      originalPrice: '₹2,200',
      tag: 'KIDNEY CARE',
      badgeColor: 'bg-cyan-700',
      icon: <KidneyIcon className="w-6 h-6 text-cyan-600" />,
      iconBg: 'bg-cyan-50 border-cyan-200',
      category: 'organ',
      features: [
        'CBC & ESR (Blood Count & Inflammation)',
        'Fasting Blood Sugar (FBS) & HbA1c',
        'Serum Creatinine & Blood Urea',
        'Serum Uric Acid',
        'Urine Routine & Microscopic Examination',
        'Urine Microalbumin (Early Kidney Risk Screening)',
        'Consultation with General Medicine Physician',
        'Consultation with Dietician',
      ],
    },
    {
      id: 'liver',
      name: 'Liver Health Package',
      subtitle: 'Hepatic Function & Viral Marker Screening',
      price: '₹699',
      originalPrice: '₹1,800',
      tag: 'LIVER CARE',
      badgeColor: 'bg-amber-600',
      icon: <LiverIcon className="w-6 h-6 text-amber-600" />,
      iconBg: 'bg-amber-50 border-amber-200',
      category: 'organ',
      features: [
        'CBC & ESR (Blood Count & Inflammation)',
        'Liver Function Test (LFT - Complete Profile)',
        'Lipid Profile (Cholesterol Test)',
        'Serum Creatinine',
        'HBsAg (Hepatitis B Screening)',
        'Anti-HCV (Hepatitis C Screening)',
        'Consultation with General Medicine Physician',
        'Consultation with Dietician',
      ],
    },
    {
      id: 'thyroid',
      name: 'Thyroid Care Package',
      subtitle: 'Complete Thyroid Hormone Assessment',
      price: '₹499',
      originalPrice: '₹1,200',
      tag: 'THYROID CARE',
      badgeColor: 'bg-indigo-600',
      icon: <ThyroidIcon className="w-6 h-6 text-indigo-600" />,
      iconBg: 'bg-indigo-50 border-indigo-200',
      category: 'organ',
      features: [
        'TSH (Thyroid-Stimulating Hormone)',
        'FT3 (Free Triiodothyronine)',
        'FT4 (Free Thyroxine)',
        'Metabolic Health Screening',
        'Consultation with General Medicine Physician',
        'Consultation with Dietician',
      ],
    },
  ];

  const filteredPackages =
    activeTab === 'all'
      ? packages
      : packages.filter((pkg) => pkg.category === activeTab);

  return (
    <section className="py-12 sm:py-20 bg-slate-50 border-t border-slate-200" id="packages">
      <div className="w-full max-w-7xl 2xl:max-w-[1600px] min-[1900px]:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-[#c83220] font-black tracking-widest text-xs uppercase mb-2 block">
            PREVENTIVE HEALTHCARE &amp; DIAGNOSTICS
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#172a34] leading-tight mb-3">
            Preventive Health Checkup Packages
          </h2>
          <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
            Early detection saves lives. Dr. B. S. Tomar Hospital offers comprehensive, physician-curated health checkup packages with accurate diagnostics, same-day reports, and expert doctor consultations.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-[#c83220] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Packages ({packages.length})
            </button>
            <button
              onClick={() => setActiveTab('general')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'general'
                  ? 'bg-[#172a34] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Master &amp; Comprehensive (3)
            </button>
            <button
              onClick={() => setActiveTab('organ')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'organ'
                  ? 'bg-[#172a34] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Organ &amp; Chronic Care (5)
            </button>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPackages.map((pkg) => {
            const bookingText = encodeURIComponent(
              `Hello Dr. B. S. Tomar Hospital Jagatpura,\n\nI would like to book the *${pkg.name}* (${pkg.price}). Please assist me with appointment booking.`
            );
            const whatsappUrl = `https://wa.me/919216076757?text=${bookingText}`;

            return (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative"
              >
                {/* Tag Badge & Header */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs ${pkg.iconBg}`}>
                      {pkg.icon}
                    </div>
                    <span className={`text-[10px] sm:text-[11px] font-black text-white px-3 py-1 rounded-full uppercase tracking-wider ${pkg.badgeColor} shadow-sm`}>
                      {pkg.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-[#172a34] group-hover:text-[#c83220] transition-colors leading-snug">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold mt-1">
                      {pkg.subtitle}
                    </p>
                  </div>

                  {/* Pricing Box */}
                  <div className="flex items-baseline gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <span className="text-2xl sm:text-3xl font-black text-[#c83220] font-mono">
                      {pkg.price}
                    </span>
                    <span className="text-xs text-slate-400 line-through font-mono">
                      {pkg.originalPrice}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md ml-auto">
                      SAVE 50%+
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="pt-2 space-y-2">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                      INCLUDED TESTS &amp; SERVICES:
                    </span>
                    <ul className="space-y-1.5">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-700 font-medium leading-snug">
                          <span className="text-[#c83220] font-bold shrink-0 mt-0.5">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Booking Button Footer */}
                <div className="p-5 sm:p-6 pt-0 space-y-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#172a34] group-hover:bg-[#c83220] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>💬 Book on WhatsApp</span>
                    <span>➔</span>
                  </a>
                  <a
                    href="tel:9216076757"
                    className="block text-center text-[11px] font-bold text-slate-500 hover:text-[#c83220] transition"
                  >
                    📞 Helpline: +91 92160 76757
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quality Guarantee Strip */}
        <div className="mt-12 p-6 bg-gradient-to-r from-[#172a34] to-[#0e191f] text-white rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border-b-4 border-[#c83220]">
          <div className="flex items-center gap-4">
            <span className="text-3xl sm:text-4xl">🏥</span>
            <div>
              <h4 className="text-base sm:text-lg font-black">
                Need a Customized Corporate or Family Health Package?
              </h4>
              <p className="text-xs text-slate-300">
                Dr. B. S. Tomar Hospital provides tailored health audits for corporate employees, senior citizens, and insurance policyholders.
              </p>
            </div>
          </div>
          <a
            href="/contact"
            className="shrink-0 bg-[#c83220] hover:bg-[#a82415] text-white font-black text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-lg whitespace-nowrap"
          >
            Enquire Now ➔
          </a>
        </div>

      </div>
    </section>
  );
}
