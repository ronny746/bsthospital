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
      name: 'Anesthesia',
      category: 'Surgical',
      badge: 'Pain Management & OT Support',
      desc: 'General, regional, and local anesthesia for complex surgical interventions and acute/chronic pain management.',
      image: '/images/anesthesia.jpg',
      facilities: ['Modular OT Anesthesia Workstations', 'Post-Anesthesia Care Unit (PACU)', '24/7 Pain Clinic'],
    },
    {
      name: 'Critical Care',
      category: 'Clinical',
      badge: '24/7 Level-1 ICU & HDU',
      desc: '24/7 Level-1 Intensive Care Unit (ICU), High Dependency Unit (HDU), multi-organ failure support, and advanced ventilation.',
      image: '/images/bst-icu-ward.jpg',
      facilities: ['Multi-Para Vital Monitors', 'Advanced Mechanical Ventilators', 'Bedside Hemodialysis & ABG'],
    },
    {
      name: 'General Medicine',
      category: 'Clinical',
      badge: 'Internal Medicine & OPD',
      desc: 'Comprehensive adult internal medicine, metabolic disorders, infectious disease management, and preventive health.',
      image: '/images/bst-doctor-consultation.jpg',
      facilities: ['24/7 Inpatient Wards', 'Diabetology & Lifestyle Clinic', 'Senior Physician OPD'],
    },
    {
      name: 'General Surgery',
      category: 'Surgical',
      badge: 'Laparoscopic & Minimal Access',
      desc: 'Advanced laparoscopic surgeries, hernia repair, gallbladder, gastrointestinal, thyroid, and emergency trauma surgery.',
      image: '/images/general_surgery.jpg',
      facilities: ['HD Laparoscopy Towers', 'Surgical ICU Recovery', 'Emergency Surgery OT'],
    },
    {
      name: 'Orthopedic',
      category: 'Surgical',
      badge: 'Joint Replacement & Trauma',
      desc: 'Total knee and hip replacement, complex accident trauma reconstructions, arthroscopic knee/shoulder surgery, and spine care.',
      image: '/images/orthopedics.jpg',
      facilities: ['Modular Ortho OT with C-Arm', 'Arthroscope Suite', 'Physiotherapy & Rehab Unit'],
    },
    {
      name: 'ENT (Otorhinolaryngology)',
      category: 'Surgical',
      badge: 'Microscopic & Endoscopic',
      desc: 'Microscopic ear surgeries, endoscopic sinus surgery, throat and voice clinical care, and head-neck surgery.',
      image: '/images/ent.jpg',
      facilities: ['ENT Operating Microscope', 'Diagnostic Endoscopy Chamber', 'Pure Tone Audiometry'],
    },
    {
      name: 'Dermatology',
      category: 'Clinical',
      badge: 'Skin, Hair & Aesthetics',
      desc: 'Clinical dermatology, acne, psoriasis, eczema, pediatric skin disorders, and aesthetic skin procedures.',
      image: '/images/dermatology.jpg',
      facilities: ['Dermatosurgery Suite', 'Phototherapy Unit', 'Laser Skin Care Clinic'],
    },
    {
      name: 'Ophthalmology',
      category: 'Clinical',
      badge: 'Eye Care & Vision',
      desc: 'Comprehensive eye examinations, micro-incision cataract surgery (Phaco), glaucoma screening, and refractive eye care.',
      image: '/images/ophthalmology.jpg',
      facilities: ['Slit-Lamp Examination Unit', 'Autorefractometer', 'Ophthalmic OT'],
    },
    {
      name: 'Obs and Gynaecology',
      category: 'Clinical',
      badge: 'Maternal & Women Health',
      desc: 'Maternal health, high-risk pregnancy care, painless labor & delivery, laparoscopic gynecology, and infertility support.',
      image: '/images/gynaecology.jpg',
      facilities: ['Labor & Delivery Suites', 'Fetal Heart Monitoring (NST)', 'Advanced Laparoscopic Gynae OT'],
    },
    {
      name: 'Paediatric',
      category: 'Clinical',
      badge: 'Child Care & NICU',
      desc: 'Pioneering pediatric care, Level-3 Neonatal Intensive Care (NICU), Pediatric Intensive Care (PICU), and vaccinations.',
      image: '/images/paediatrics.jpg',
      facilities: ['Level-3 NICU Incubators', 'Pediatric ICU Beds', 'Child Immunization Desk'],
    },
    {
      name: 'Psychiatry',
      category: 'Clinical',
      badge: 'Mental Health & Wellness',
      desc: 'Behavioral health, stress management, counseling, adult neuropsychiatry, and addiction de-addiction consultation.',
      image: '/images/psychiatry.jpg',
      facilities: ['Private Counseling Chambers', 'Cognitive Behavioral Support', 'Neuropsychiatric OPD'],
    },
    {
      name: 'Physiotherapy',
      category: 'Support',
      badge: 'Rehab & Mobility',
      desc: 'Post-operative rehabilitation, sports injury recovery, stroke & neurological rehabilitation, and joint mobility restoration.',
      image: '/images/physiotherapy.jpg',
      facilities: ['Electrotherapy & Ultrasound', 'Exercise & Gym Therapy Unit', 'Neuro-Rehab Parallel Bars'],
    },
    {
      name: 'Radiology',
      category: 'Diagnostics',
      badge: '24/7 Imaging Diagnostics',
      desc: 'Multi-slice CT scans, 24/7 digital X-rays, high-resolution color Doppler ultrasound, and interventional radiology.',
      image: '/images/Radio diagonosis.webp',
      facilities: ['Multi-Slice CT Scanner', '3D/4D Ultrasound Machine', 'Digital Radiography (DR)'],
    },
    {
      name: 'Pathology',
      category: 'Diagnostics',
      badge: 'Automated 24/7 Labs',
      desc: 'Automated diagnostic pathology, hematology, histopathology, cytology, and round-the-clock emergency lab testing.',
      image: '/images/bst-diagnostic-lab.jpg',
      facilities: ['Fully Automated Analyzers', 'Histopathology Lab', '24/7 Blood Sample Collection'],
    },
    {
      name: 'Biochemistry',
      category: 'Diagnostics',
      badge: 'Clinical Biochemistry',
      desc: 'Automated biochemistry analyzers, hormonal assays, cardiac risk markers, diabetes panels, and metabolic profiles.',
      image: '/images/bst-clinical-diagnostics.jpg',
      facilities: ['Automated Immunoassay Systems', 'Electrolyte Analyzers', 'Glycated Hemoglobin (HbA1c)'],
    },
    {
      name: 'Microbiology',
      category: 'Diagnostics',
      badge: 'Infectious Diagnostics',
      desc: 'Infectious disease diagnostics, blood & body fluid cultures, antimicrobial sensitivity testing, and serology.',
      image: '/images/bst-medical-research.jpg',
      facilities: ['Bacteriology & Mycology Units', 'Automated Blood Culture System', 'Biosafety Cabinets'],
    },
    {
      name: 'Dietetics',
      category: 'Support',
      badge: 'Clinical Nutrition',
      desc: 'Therapeutic diet planning for ICU, diabetic, cardiac, renal, and post-surgical patients to accelerate healing.',
      image: '/images/dietetics.jpg',
      facilities: ['Inpatient Bedside Nutrition Audit', 'Customized Therapeutic Diets', 'OPD Nutrition Counseling'],
    },
    {
      name: 'Dental',
      category: 'Clinical',
      badge: 'Oral & Maxillofacial Care',
      desc: 'Comprehensive general dentistry, root canal treatment (RCT), dental implants, crown & bridge, and oral surgery.',
      image: '/images/dental.jpg',
      facilities: ['Modern Motorized Dental Chairs', 'Dental Digital X-Ray (RVG)', 'Sterilization Autoclave Suite'],
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
