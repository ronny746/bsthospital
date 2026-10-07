'use client';

import { useState } from 'react';
import NewsTicker from '@/components/NewsTicker';
import TopBar from '@/components/TopBar';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';

export default function DepartmentsPage() {
  const [activeTab, setActiveTab] = useState('All');

  const allDepartments = [
    {
      name: 'General Medicine & Critical Care',
      category: 'Clinical',
      badge: 'Level-1 Emergency ICU',
      desc: 'Comprehensive adult internal medicine, multi-organ critical illness management, and infectious disease care.',
      image: '/images/bst-icu-ward.jpg',
      facilities: ['24/7 ICU & HDU Beds', 'Ventilator & Dialysis Support', 'Dedicated Resident Physicians'],
    },
    {
      name: 'Orthopaedics & Joint Replacement',
      category: 'Surgical',
      badge: 'Advanced Trauma Center',
      desc: 'Total knee and hip replacements, complex accident trauma reconstructions, arthroscopic surgery and spine therapies.',
      image: '/images/ortho.webp',
      facilities: ['Modular Ortho OT', 'C-Arm Fluoroscopy', 'Post-Op Physiotherapy Rehab'],
    },
    {
      name: 'Paediatrics & Neonatology (PICU/NICU)',
      category: 'Clinical',
      badge: 'Child & Newborn Care',
      desc: 'Expert care for newborns, infants, and adolescents, supervised by pioneering pediatric clinicians.',
      image: '/images/paeditrics.webp',
      facilities: ['Level-3 NICU Incubators', 'Pediatric Intensive Care Unit', 'Child Immunization Clinic'],
    },
    {
      name: 'Radio-Diagnosis & Advanced Imaging',
      category: 'Diagnostics',
      badge: '24×7 Imaging Labs',
      desc: 'Cutting-edge diagnostic radiology, digital multi-slice CT scans, high-resolution ultrasound and digital X-rays.',
      image: '/images/Radio diagonosis.webp',
      facilities: ['Multi-Slice CT Scanner', 'Color Doppler Ultrasound', 'Digital Radiography (DR)'],
    },
    {
      name: 'Otorhinolaryngology (ENT)',
      category: 'Surgical',
      badge: 'Microscopic & Endoscopic',
      desc: 'Diagnosis and surgical treatments for ear disorders, endoscopic sinus surgery, voice problems and head-neck conditions.',
      image: '/images/Otorhinolaryngology.webp',
      facilities: ['ENT Operating Microscope', 'Diagnostic Endoscopy Unit', 'Audiometry & Speech Therapy'],
    },
    {
      name: 'Pathology & Molecular Biochemistry',
      category: 'Diagnostics',
      badge: 'Automated 24/7 Labs',
      desc: 'Automated diagnostic pathology, hematology, clinical microbiology, histopathology, and comprehensive health panels.',
      image: '/images/bst-diagnostic-lab.jpg',
      facilities: ['Fully Automated Analyzers', 'Blood Component Storage', 'Biochemical Profiling'],
    },
    {
      name: 'Psychiatry & Behavioral Health',
      category: 'Clinical',
      badge: 'Mental Wellness',
      desc: 'Comprehensive mental health support, adult neuropsychiatry, counseling therapies, and addiction de-addiction programs.',
      image: '/images/psychiatry.webp',
      facilities: ['Private Counseling Chambers', 'Cognitive Behavioral Support', 'De-addiction Consultation'],
    },
    {
      name: 'Cardiology & Emergency Heart Care',
      category: 'Clinical',
      badge: '24×7 Emergency Response',
      desc: 'Rapid evaluation and stabilization of heart attacks, arrhythmias, hypertension and non-invasive cardiac testing.',
      image: '/images/hd_banner_2.jpg',
      facilities: ['12-Lead Digital ECG', '2D Echocardiography', 'Cardiac Emergency Care Unit'],
    },
    {
      name: 'Clinical Pharmacy & Pharmacology',
      category: 'Support',
      badge: '24×7 In-House Dispensary',
      desc: 'Round-the-clock authentic medicine dispensation, critical care drug availability, and medication management.',
      image: '/images/Pharmacy.webp',
      facilities: ['24/7 Cold-Chain Storage', 'Life-Saving ICU Drug Stocks', 'Bedside Medication Delivery'],
    },
    {
      name: 'Medical Skills & Simulation Lab',
      category: 'Academic',
      badge: 'Academic Pedagogy',
      desc: 'Hands-on clinical training facility for medical students, emergency simulation mannequins, and life-support drills.',
      image: '/images/bst-medical-research.jpg',
      facilities: ['High-Fidelity Mannequins', 'BLS & ACLS Certified Training', 'Surgical Skills Workstations'],
    },
    {
      name: 'Central Medical Library & E-Learning',
      category: 'Academic',
      badge: 'Medical Research Hub',
      desc: 'Extensive repository of global medical journals, clinical research papers, textbooks, and high-speed digital research terminals.',
      image: '/images/library.webp',
      facilities: ['20,000+ Medical Volumes', 'National & International Journals', 'Digital Research Commons'],
    },
    {
      name: 'Emergency & Trauma Reception',
      category: 'Support',
      badge: 'Immediate Triage',
      desc: '24/7 centralized triage desk facilitating instant admission, ambulance reception, and emergency casualty beds.',
      image: '/images/bst-reception.jpg',
      facilities: ['Immediate Triage Assessment', 'Dedicated Ambulance Bay', 'Direct ICU Stretcher Access'],
    },
  ];

  const categories = ['All', 'Clinical', 'Surgical', 'Diagnostics', 'Academic', 'Support'];

  const filteredDepts = allDepartments.filter((d) => 
    activeTab === 'All' ? true : d.category === activeTab
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7] font-sans overflow-x-hidden text-slate-800">
      <NewsTicker />
      <TopBar />
      <NavigationBar />

      {/* COMPACT NIMS-STYLE PAGE BANNER WITH BUILDING BACKGROUND */}
      <section 
        className="relative text-white py-8 sm:py-10 md:py-12 border-b-4 border-[#c83220] bg-cover bg-center flex items-center overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(90deg, rgba(23, 42, 52, 0.94) 0%, rgba(15, 35, 46, 0.88) 45%, rgba(158, 36, 23, 0.78) 100%), url('/images/bst-hospital-exterior.jpg')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center md:text-left w-full">
          <nav aria-label="breadcrumb" className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">
            <a href="/" className="hover:text-white transition">HOME</a>
            <span className="text-[#c83220]">/</span>
            <span className="text-amber-400">DEPARTMENTS</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-[#c83220] text-white px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider mb-2 shadow-sm">
            <span>⚕️ Specialized Clinical Centers</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-2 leading-tight max-w-4xl text-white">
            Departments & Centers of Excellence
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm max-w-2xl font-medium leading-relaxed">
            20+ specialized clinical, surgical, diagnostic, and academic departments under one roof in Jagatpura, Jaipur.
          </p>
        </div>
      </section>

      {/* FILTER TABS */}
      <section className="py-6 bg-white border-b border-slate-200 sticky top-16 z-30 shadow-sm backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-2 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === cat
                  ? 'bg-[#c83220] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat} Departments
            </button>
          ))}
        </div>
      </section>

      {/* DEPARTMENTS GRID */}
      <section className="py-12 sm:py-16 bg-[#fdfbf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDepts.map((dept, idx) => {
              const whatsappUrl = `https://wa.me/917412077125?text=${encodeURIComponent(
                `Hello Dr. BST Hospital Jagatpura, I would like to consult with the ${dept.name} department.`
              )}`;

              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/90 flex flex-col justify-between group"
                >
                  <div>
                    {/* Image */}
                    <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                      <img
                        src={dept.image}
                        alt={dept.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 bg-[#172a34]/90 text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-sm">
                        {dept.badge}
                      </span>
                      <span className="absolute top-3 right-3 bg-white/90 text-[#c83220] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {dept.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-black text-[#172a34] mb-2 group-hover:text-[#c83220] transition-colors leading-snug">
                        {dept.name}
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed mb-4">
                        {dept.desc}
                      </p>

                      {/* Key highlights */}
                      <div className="space-y-1.5 pt-3 border-t border-slate-100">
                        {dept.facilities.map((fac, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-[11px] text-slate-700 font-semibold">
                            <span className="text-[#c83220] text-xs">✓</span>
                            <span>{fac}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Compact Red Action Button */}
                  <div className="p-6 pt-0">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#c83220] hover:bg-[#a82415] text-white font-bold text-xs shadow-sm hover:shadow-md transition-all"
                    >
                      <span>💬</span>
                      <span>Consult Department</span>
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
