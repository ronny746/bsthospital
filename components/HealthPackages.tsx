'use client';

import React, { useState } from 'react';

export default function HealthPackages() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const packages = [
    {
      id: 'basic',
      name: 'Basic Health Checkup',
      subtitle: 'Essential Health Screening for Adults',
      price: '₹999',
      originalPrice: '₹2,500',
      tag: 'POPULAR',
      badgeColor: 'bg-blue-600',
      icon: '🩺',
      features: [
        'Complete Blood Count (CBC - 24 Parameters)',
        'Fasting Blood Sugar (FBS)',
        'Lipid Profile (Cholesterol, Triglycerides, HDL/LDL)',
        'Kidney Function (Serum Creatinine & Blood Urea)',
        'Urine Routine & Microscopic Examination',
        'Physical Examination & Physician Consultation',
      ],
    },
    {
      id: 'executive',
      name: 'Executive Comprehensive Package',
      subtitle: 'Complete Master Health Screening',
      price: '₹2,499',
      originalPrice: '₹5,500',
      tag: 'MOST RECOMMENDED',
      badgeColor: 'bg-[#c83220]',
      icon: '🏆',
      features: [
        'Comprehensive Blood Profile (65+ Parameters)',
        'Liver Function Test (LFT - 11 Parameters)',
        'Kidney Function Test (KFT - Renal Profile)',
        'Thyroid Profile (T3, T4, TSH)',
        '12-Lead Digital ECG & Chest X-Ray (PA View)',
        'Full Body Abdominal Ultrasound (USG)',
        'Senior Consultant Physician & Diet Review',
      ],
    },
    {
      id: 'cardiac',
      name: 'Cardiac Wellness Care',
      subtitle: 'Advanced Heart Health & Vascular Audit',
      price: '₹3,199',
      originalPrice: '₹7,000',
      tag: 'HEART CARE',
      badgeColor: 'bg-[#0e191f]',
      icon: '❤️',
      features: [
        'Complete Lipid & Cardiac Risk Markers',
        '12-Lead Digital ECG',
        '2D Echocardiography & Color Doppler',
        'Treadmill Test (TMT / Stress Test)',
        'Blood Sugar & Glycated Hemoglobin (HbA1c)',
        'Senior Cardiologist Consultation & Risk Audit',
      ],
    },
    {
      id: 'senior',
      name: 'Senior Citizen Care Package',
      subtitle: 'Tailored Geriatric & Mobility Screening',
      price: '₹3,499',
      originalPrice: '₹7,500',
      tag: 'SENIOR CARE',
      badgeColor: 'bg-amber-600',
      icon: '👴',
      features: [
        'Full Body Blood & Metabolic Panel (70+ Tests)',
        'HbA1c (3-Month Average Sugar)',
        'Bone Density / Vitamin D3 & Vitamin B12',
        'Kidney, Liver & Prostate (PSA for Men) / Gynec',
        'Joint Mobility & Orthopedic Screening',
        'Senior Physician & Joint Specialist Consultation',
      ],
    },
    {
      id: 'women',
      name: "Women's Wellness Package",
      subtitle: 'Comprehensive Health & Hormonal Checkup',
      price: '₹2,799',
      originalPrice: '₹6,000',
      tag: 'WOMEN HEALTH',
      badgeColor: 'bg-pink-600',
      icon: '👩',
      features: [
        'Complete Hemogram & Anemia Screening',
        'Thyroid Hormone Profile (T3, T4, TSH)',
        'Pelvic Ultrasound (USG) & Mammography screening',
        'Pap Smear Screening',
        'Blood Sugar & Renal Profile',
        'Senior Gynecologist & Women Health Specialist',
      ],
    },
    {
      id: 'master',
      name: 'Apex Whole Body Master Checkup',
      subtitle: 'Total Quaternary Health & Cancer Markers',
      price: '₹5,999',
      originalPrice: '₹12,000',
      tag: 'ALL INCLUSIVE',
      badgeColor: 'bg-[#172a34]',
      icon: '💎',
      features: [
        '85+ Advanced Clinical Laboratory Parameters',
        'Full Body USG + Digital Chest X-Ray',
        '2D Echo + ECG + TMT Cardiac Evaluation',
        'Cancer Screening Markers (PSA/CA-125/CEA)',
        'Complete Thyroid, Liver, Renal & Vitamin Audit',
        'Multi-Specialist Consultation (Cardio, Phys, Gynec/Ortho)',
      ],
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-slate-50 border-t border-slate-200" id="packages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="text-[#c83220] font-black tracking-widest text-xs uppercase mb-2 block">
            PREVENTIVE HEALTHCARE &amp; DIAGNOSTICS
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#172a34] leading-tight mb-3">
            Preventive Health Checkup Packages
          </h2>
          <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
            Early detection saves lives. Dr. BST Hospital offers comprehensive, physician-curated health checkup packages with same-day reports and expert doctor consultations.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {packages.map((pkg) => {
            const bookingText = `Hello Dr. BST Hospital Jagatpura,%0A%0AI would like to book the *${pkg.name}* (${pkg.price}). Please assist me with appointment booking.`;
            const whatsappUrl = `https://wa.me/917412077125?text=${bookingText}`;

            return (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative"
              >
                {/* Tag Badge */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{pkg.icon}</span>
                    <span className={`text-[10px] sm:text-[11px] font-black text-white px-3 py-1 rounded-full uppercase tracking-wider ${pkg.badgeColor} shadow-sm`}>
                      {pkg.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-[#172a34] group-hover:text-[#c83220] transition-colors">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">
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
                  <div className="pt-2 space-y-2.5">
                    <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider block">
                      INCLUDED SCREENING TESTS &amp; SERVICES:
                    </span>
                    <ul className="space-y-2">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                          <span className="text-[#c83220] font-bold shrink-0 mt-0.5">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Booking Button Footer */}
                <div className="p-6 pt-0 space-y-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#172a34] group-hover:bg-[#c83220] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>💬 Book Package on WhatsApp</span>
                    <span>➔</span>
                  </a>
                  <a
                    href="tel:+917412077125"
                    className="block text-center text-[11px] font-bold text-slate-500 hover:text-[#c83220] transition"
                  >
                    📞 Or Call Helpline: +91 74120 77125
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
                Dr. BST Hospital provides tailored health audits for corporate employees, senior citizens, and insurance policyholders.
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
