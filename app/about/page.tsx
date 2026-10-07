'use client';

import { useState } from 'react';
import NewsTicker from '@/components/NewsTicker';
import TopBar from '@/components/TopBar';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'founder' | 'purpose'>('overview');
  const [activePurpose, setActivePurpose] = useState<'mission' | 'vision'>('mission');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleTabClick = (tab: 'overview' | 'founder' | 'purpose') => {
    setActiveTab(tab);
    if (tab === 'overview') scrollToSection('overview-section');
    if (tab === 'founder') scrollToSection('founder-section');
    if (tab === 'purpose') scrollToSection('vision-mission-section');
  };

  const chairmanGallery = [
    {
      src: '/images/resource/image1.webp',
      title: 'Global Health Summit & International Cooperation',
      sub: 'Prof. (Dr.) Balvir S. Tomar with Global Medical Dignitaries',
    },
    {
      src: '/images/resource/image2.webp',
      title: 'With Union Minister Shri Nitin Gadkari',
      sub: 'Presentation of Clinical Healthcare Initiatives & Research Monograph',
    },
    {
      src: '/images/resource/image3.webp',
      title: 'European Academic Collaboration & MoU Signing',
      sub: 'Fostering International Medical Exchange & Surgery Pedagogy',
    },
    {
      src: '/images/resource/image4.webp',
      title: 'National Healthcare Excellence & Leadership Award',
      sub: 'Honoring Pioneering Contributions in Quaternary Medicine & Medical Pedagogy',
    },
  ];

  return (
    <main className="min-h-screen bg-[#fdfbf7] font-sans overflow-x-hidden text-slate-800">
      <NewsTicker />
      <TopBar />
      <NavigationBar />

      {/* COMPACT NIMS-STYLE PAGE BANNER WITH BUILDING BACKGROUND */}
      <section 
        className="relative text-white py-8 sm:py-10 md:py-12 border-b-4 border-[#c83220] bg-cover bg-center flex items-center overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(90deg, rgba(23, 42, 52, 0.94) 0%, rgba(15, 35, 46, 0.88) 45%, rgba(158, 36, 23, 0.78) 100%), url('/images/bst-hero-building.png')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center md:text-left w-full">
          <nav aria-label="breadcrumb" className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">
            <a href="/" className="hover:text-white transition">HOME</a>
            <span className="text-[#c83220]">/</span>
            <span className="text-amber-400">ABOUT US</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3 leading-tight max-w-4xl">
            About Dr. BST Hospital, Jagatpura Jaipur
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-3xl font-medium leading-relaxed">
            Dr. B.S. Tomar Institute of Medical Sciences, Research & Hospital — delivering compassionate quaternary care, 1000+ beds, 24/7 Level-1 trauma response, and medical education in Jagatpura, Jaipur.
          </p>

          {/* Interactive Navigation Pills */}
          <div className="flex gap-2 sm:gap-3 mt-8 flex-wrap justify-center md:justify-start">
            <button
              onClick={() => handleTabClick('overview')}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#c83220] text-white shadow-lg'
                  : 'bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm'
              }`}
            >
              About Hospital
            </button>
            <button
              onClick={() => handleTabClick('founder')}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'founder'
                  ? 'bg-[#c83220] text-white shadow-lg'
                  : 'bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm'
              }`}
            >
              Founder & Chairman
            </button>
            <button
              onClick={() => handleTabClick('purpose')}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'purpose'
                  ? 'bg-[#c83220] text-white shadow-lg'
                  : 'bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm'
              }`}
            >
              Vision & Mission
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 1: OVERVIEW & ABOUT HOSPITAL
          ======================================================== */}
      <section id="overview-section" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Text & Features */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-[#c83220] text-xs font-black uppercase tracking-widest block">
                ABOUT DR. BST HOSPITAL
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#172a34] leading-tight">
                Advanced care, delivered with compassion.
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                Dr. BST Hospital was built on a simple belief — that care should be advanced enough to treat the most complex conditions, affordable enough for every family, and compassionate enough that every patient feels cared for from the moment they arrive.
              </p>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Situated in Jagatpura, Jaipur, the institute bridges a crucial need for quaternary healthcare in South Jaipur, connecting Sitapura industrial zone, Tonk Road, and Kota highway corridor with direct access to advanced medical technology, 1000+ beds, and a dedicated team of specialist clinicians.
              </p>
              
              <div className="text-xs font-bold text-slate-800 pt-1">
                Pioneering medical education, certified super-specialist doctors & modern healthcare technology.
              </div>

              {/* 3 Accreditation & Quality Badges (STRICTLY NO NABH / NABL) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/80 shadow-sm flex items-start gap-2.5">
                  <span className="text-xl">🏆</span>
                  <div>
                    <span className="text-[10px] uppercase font-black text-[#c83220] block">Apex Standards</span>
                    <strong className="text-xs font-black text-[#172a34] block">High Clinical Safety</strong>
                    <span className="text-[11px] text-slate-500">Patient-First Protocols</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/80 shadow-sm flex items-start gap-2.5">
                  <span className="text-xl">🔬</span>
                  <div>
                    <span className="text-[10px] uppercase font-black text-[#c83220] block">High-Tech Labs</span>
                    <strong className="text-xs font-black text-[#172a34] block">Modern Diagnostics</strong>
                    <span className="text-[11px] text-slate-500">Automated Pathology</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/80 shadow-sm flex items-start gap-2.5">
                  <span className="text-xl">🚑</span>
                  <div>
                    <span className="text-[10px] uppercase font-black text-[#c83220] block">Level-1 Facility</span>
                    <strong className="text-xs font-black text-[#172a34] block">24/7 Trauma Care</strong>
                    <span className="text-[11px] text-slate-500">Critical Care & Surgery</span>
                  </div>
                </div>
              </div>

              {/* Red Contact / OPD Button */}
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href="tel:+917412077125"
                  className="inline-flex items-center gap-2 bg-[#c83220] hover:bg-[#a82415] text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md transition-all hover:scale-105"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  <span>🚨 24×7 Emergency: +91 74120 77125</span>
                </a>
                <a
                  href="https://wa.me/917412077125?text=Hello%20Dr.%20BST%20Hospital%20Jagatpura%2C%20I%20would%20like%20to%20book%20a%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2.5 rounded-full border border-slate-300 transition-all"
                >
                  <span>💬 Book Consultation</span>
                </a>
              </div>
            </div>

            {/* Right Column: Visual Photos Grid */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
                <img
                  src="/images/bst-hero-building.png"
                  alt="Dr. BST Hospital Building, Jagatpura Jaipur"
                  className="w-full h-64 sm:h-72 object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="rounded-xl overflow-hidden shadow-md border-2 border-white bg-slate-100">
                  <img
                    src="/images/gallery/gallery27.png"
                    alt="Hospital Hallway & Modern Facilities"
                    className="w-full h-36 object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-md border-2 border-white bg-slate-100">
                  <img
                    src="/images/gallery/gallery21.png"
                    alt="Specialist Consultation & Clinical Care"
                    className="w-full h-36 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: GUIDING PHILOSOPHY — VISION & MISSION
          ======================================================== */}
      <section id="vision-mission-section" className="py-16 sm:py-20 bg-[#f7f4ee] border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left: Infrastructure Image */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
                <img
                  src="/images/gallery/gallery04.png"
                  alt="Dr. BST Hospital Campus Infrastructure"
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>
            </div>

            {/* Right: Vision & Mission Content */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-[#c83220] text-xs font-black uppercase tracking-widest block">
                OUR GUIDING PHILOSOPHY
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#172a34] leading-tight">
                Inspirational Health: Our Vision and Mission
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                Why Dr. B.S. Tomar opened Dr. BST Hospital in Jagatpura, Jaipur:
                To bring world-class super-specialty healthcare and critical emergency medicine right to the doorstep of South Jaipur, ensuring that every citizen has rapid access to medical care and emergency intervention.
              </p>

              {/* Toggleable / Interactive Tabs */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setActivePurpose('mission')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activePurpose === 'mission'
                      ? 'bg-[#c83220] text-white shadow-md'
                      : 'bg-white text-slate-700 border border-slate-300'
                  }`}
                >
                  🎯 Mission
                </button>
                <button
                  onClick={() => setActivePurpose('vision')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activePurpose === 'vision'
                      ? 'bg-[#c83220] text-white shadow-md'
                      : 'bg-white text-slate-700 border border-slate-300'
                  }`}
                >
                  👁️ Vision
                </button>
              </div>

              {/* Purpose Box */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
                {activePurpose === 'mission' ? (
                  <>
                    <h3 className="text-base font-black text-[#172a34] flex items-center gap-2">
                      <span className="text-xl text-[#c83220]">🎯</span>
                      <span>Our Mission</span>
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      To enhance the health and well-being of our community by providing compassionate, high-quality healthcare services through dedicated medical professionals and advanced clinical protocols. We are devoted to ensuring that advanced quaternary care remains accessible, ethical, and transparent for every individual.
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-base font-black text-[#172a34] flex items-center gap-2">
                      <span className="text-xl text-[#c83220]">👁️</span>
                      <span>Our Vision</span>
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      To be recognized as a premier global institution of healthcare excellence, medical education, and biomedical innovation. We strive to set new benchmarks in multi-speciality patient outcomes, community outreach, and clinical pedagogy across India and beyond.
                    </p>
                  </>
                )}
              </div>

              {/* 3 Core Values */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="bg-white/80 p-3 rounded-xl border border-slate-200">
                  <strong className="text-[#172a34] block font-black">❤️ Compassion First</strong>
                  <span className="text-slate-500 text-[11px]">Dignified care for every patient</span>
                </div>
                <div className="bg-white/80 p-3 rounded-xl border border-slate-200">
                  <strong className="text-[#172a34] block font-black">⚡ 24×7 Readiness</strong>
                  <span className="text-slate-500 text-[11px]">Instant trauma & critical care</span>
                </div>
                <div className="bg-white/80 p-3 rounded-xl border border-slate-200">
                  <strong className="text-[#172a34] block font-black">🎓 Medical Pedagogy</strong>
                  <span className="text-slate-500 text-[11px]">150 MBBS seats / year</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3: FOUNDER & CHAIRMAN DETAILS (AS ON NIMS)
          ======================================================== */}
      <section id="founder-section" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          {/* Header Story */}
          <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-start">
            {/* Photo Column */}
            <div className="lg:col-span-4 text-center">
              <div className="relative inline-block max-w-[280px] sm:max-w-xs mx-auto">
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#172a34] via-[#c83220] to-[#e5b64a] rounded-3xl opacity-90"></div>
                <img
                  src="/images/resource/Balvir.webp"
                  alt="Prof. (Dr.) Balvir S. Tomar - Founder & Chairman"
                  className="relative rounded-2xl shadow-2xl object-cover w-full z-10 border-4 border-white bg-slate-100"
                  onError={(e) => {
                    e.currentTarget.src = '/images/BST-Chairman.png';
                  }}
                />
                <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 z-20 bg-[#172a34] text-[#e5b64a] border-2 border-[#e5b64a] text-[10px] font-black uppercase px-4 py-1 rounded-full whitespace-nowrap shadow-lg">
                  👑 FOUNDER & CHAIRMAN
                </div>
              </div>

              <div className="pt-5 text-center">
                <h3 className="text-xl sm:text-2xl font-black text-[#172a34]">
                  Prof. (Dr.) Balvir S. Tomar
                </h3>
                <p className="text-xs font-black text-[#c83220] uppercase tracking-wider mt-1">
                  Founder & Hon&apos;ble Chairman
                </p>
                <p className="text-xs text-slate-600 font-semibold mt-0.5">
                  Dr. BST Hospital & NIMS University
                </p>
              </div>
            </div>

            {/* Biography Column */}
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[#c83220] text-xs font-black uppercase tracking-widest block">
                VISIONARY LEADERSHIP
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#172a34] leading-tight">
                The Leading Voice in Unlocking Potential, and Changing Lives.
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                A rare precedent of exceptional talent, hard work and acute insight with an immense zeal to serve society, Dr. Tomar was born to a noble family of educationists and doctors in Varanasi. A bright student all through his academic career, he followed the wishes of his parents and decided to become a doctor early on for which he took admission in the Gajra Raja Medical College in Gwalior. A true achiever he passed his MBBS with a Gold Medal and claimed the top spot in his University.
              </p>
              <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                With a steadfast vision to elevate healthcare to global standards in India, he established NIMS Hospital and University, and has now founded <strong className="text-slate-800">Dr. BST Hospital in Jagatpura, Jaipur</strong>—combining world-class quaternary clinical infrastructure, affordable community healthcare, and groundbreaking pedagogical research.
              </p>

              {/* Red Contact Button */}
              <div className="pt-2">
                <a
                  href="https://wa.me/917412077125?text=Hello%20Dr.%20BST%20Hospital%20Jagatpura%2C%20I%20would%20like%20to%20connect%20with%20the%20hospital."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#c83220] hover:bg-[#a82415] text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md transition-all hover:scale-105"
                >
                  <span>💬 Connect With Dr. BST Hospital</span>
                </a>
              </div>
            </div>
          </div>

          {/* Distinguished Credentials & Engagements Grid */}
          <div className="bg-[#fdfbf7] p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-[#c83220] text-xs font-black uppercase tracking-widest block">
                ACADEMIC EXCELLENCE & GLOBAL HONORS
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#172a34]">
                Distinguished Credentials & Global Engagements
              </h3>
            </div>

            {/* Academic Degrees */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-500/10 via-amber-100/40 to-white rounded-2xl border border-amber-300/60">
              <div className="text-xs font-black uppercase text-amber-950 tracking-wider mb-2 flex items-center gap-1.5">
                <span>🎓</span>
                <span>Academic Affiliations & Fellowships</span>
              </div>
              <div className="font-mono text-xs sm:text-sm font-black text-slate-900 bg-white/90 p-3 rounded-xl border border-amber-200 space-y-1">
                <div>M.B.B.S., M.D., M.C.H. (USA) — M.I.A.P., M.A.H.T. (ENGLAND)</div>
                <div>F.I.A.P., F.A.A.P. (USA) – F.I.C.A. (USA) — F.A.C.U. (LONDON)</div>
              </div>
            </div>

            {/* Clinical & International Fellowships */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 bg-white rounded-xl border border-red-200 shadow-sm">
                <span className="text-[#c83220] font-black text-xs block mb-1">Pediatric Hepatology</span>
                <span className="text-slate-600 font-medium">Kings College Hospital, London (UK)</span>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-red-200 shadow-sm">
                <span className="text-[#c83220] font-black text-xs block mb-1">Pediatric Gastroenterology</span>
                <span className="text-slate-600 font-medium">Harvard University (USA)</span>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-red-200 shadow-sm">
                <span className="text-[#c83220] font-black text-xs block mb-1">W.H.O. Fellow</span>
                <span className="text-slate-600 font-medium">Child Health in USA</span>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-red-200 shadow-sm">
                <span className="text-[#c83220] font-black text-xs block mb-1">Commonwealth Medical Fellow</span>
                <span className="text-slate-600 font-medium">London, United Kingdom</span>
              </div>
            </div>

            {/* Global & Academic Leadership Roles */}
            <div className="grid sm:grid-cols-2 gap-4 text-xs pt-2">
              <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200 space-y-2">
                <h5 className="font-black text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🌐</span> Global Leadership Roles
                </h5>
                <ul className="space-y-1.5 text-slate-700 font-semibold text-[11px]">
                  <li className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-black">•</span> International President, World Health Summit – 2025
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-black">•</span> Board of Trustees – Virchow Foundation
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-black">•</span> Vice President – Strategic Council of GUNI
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-black">•</span> Goodwill Ambassador – AUAP
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-2">
                <h5 className="font-black text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🔬</span> Academic & Clinical Roles
                </h5>
                <ul className="space-y-1.5 text-slate-700 font-semibold text-[11px]">
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-black">•</span> President – Int. Soc. Pediatric Gastroenterology & Transplant
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-black">•</span> Chairman Panel on Healthcare – CII Rajasthan
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-black">•</span> Director: Institute of Nutrition & Public Health
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-black">•</span> Director: Stem Cell & Regenerative Medicine
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Photo Gallery (As on NIMS Website) */}
          <div className="space-y-4 pt-2">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-[#c83220] text-xs font-black uppercase tracking-widest block">
                GLOBAL PHOTO HIGHLIGHTS
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#172a34]">
                Moments of International Medical Distinction
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {chairmanGallery.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 transition-all duration-300 flex flex-col group"
                >
                  <div className="h-44 overflow-hidden bg-slate-100 relative">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2 left-2 right-2 text-white text-[11px] font-bold line-clamp-1 drop-shadow">
                      {item.title}
                    </div>
                  </div>
                  <div className="p-3.5 flex flex-col flex-grow bg-white">
                    <h4 className="font-black text-xs text-[#172a34] mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-normal flex-grow">
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
