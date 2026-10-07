'use client';

import { useState } from 'react';
import NewsTicker from '@/components/NewsTicker';
import TopBar from '@/components/TopBar';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    department: 'General Consultation',
    date: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Dr. BST Hospital Jagatpura,%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Email:* ${formData.email || 'N/A'}%0A*Department:* ${formData.department}%0A*Preferred Date:* ${formData.date || 'Earliest available'}%0A*Message/Concern:* ${formData.message}`;
    window.open(`https://wa.me/917412077125?text=${text}`, '_blank');
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <NewsTicker />
      <TopBar />
      <NavigationBar />

      {/* ========================================================
          HERO BANNER
          ======================================================== */}
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
            <span className="text-amber-400">CONTACT US</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3 leading-tight max-w-4xl">
            Contact Dr. BST Hospital, Jagatpura Jaipur
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm md:text-base max-w-3xl font-medium leading-relaxed">
            Dr. B.S. Tomar Institute of Medical Sciences &amp; Research — 24/7 Level-1 Emergency &amp; Trauma Care, Specialist OPD Appointments &amp; Medical Administration in Jagatpura, Jaipur.
          </p>
        </div>
      </section>

      {/* ========================================================
          4 QUICK ACTION HELPLINE CARDS
          ======================================================== */}
      <section className="py-8 sm:py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Card 1: 24/7 Emergency */}
            <div className="bg-gradient-to-br from-red-500/10 to-red-50 p-6 rounded-2xl border-2 border-red-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#c83220] text-white flex items-center justify-center text-2xl mb-4 shadow-md">
                  🚑
                </div>
                <span className="text-[#c83220] font-black text-[11px] uppercase tracking-wider block mb-1">
                  24/7 CRITICAL RESPONSE
                </span>
                <h3 className="text-lg font-black text-[#172a34] mb-1">
                  Emergency &amp; Trauma
                </h3>
                <p className="text-slate-600 text-xs mb-4">
                  Round-the-clock emergency team, ICU &amp; ambulance dispatch ready immediately.
                </p>
              </div>
              <a
                href="tel:+917412077125"
                className="inline-flex items-center justify-center gap-2 bg-[#c83220] hover:bg-[#a82415] text-white text-xs font-black py-2.5 px-4 rounded-xl transition-all shadow-md hover:scale-105"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                <span>+91 74120 77125</span>
              </a>
            </div>

            {/* Card 2: OPD & Appointments */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#172a34] text-white flex items-center justify-center text-2xl mb-4 shadow-md">
                  🩺
                </div>
                <span className="text-slate-500 font-black text-[11px] uppercase tracking-wider block mb-1">
                  DOCTOR CONSULTATION
                </span>
                <h3 className="text-lg font-black text-[#172a34] mb-1">
                  OPD &amp; Appointments
                </h3>
                <p className="text-slate-600 text-xs mb-4">
                  Mon – Sat: 9:00 AM – 5:00 PM for all 20+ clinical specialties.
                </p>
              </div>
              <a
                href="tel:+919116010407"
                className="inline-flex items-center justify-center gap-2 bg-[#172a34] hover:bg-[#0e191f] text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-sm"
              >
                <span>Call: +91 91160 10407</span>
              </a>
            </div>

            {/* Card 3: WhatsApp Desk */}
            <div className="bg-emerald-50/70 p-6 rounded-2xl border border-emerald-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-2xl mb-4 shadow-md">
                  💬
                </div>
                <span className="text-emerald-700 font-black text-[11px] uppercase tracking-wider block mb-1">
                  INSTANT MESSAGING
                </span>
                <h3 className="text-lg font-black text-[#172a34] mb-1">
                  WhatsApp Support
                </h3>
                <p className="text-slate-600 text-xs mb-4">
                  Direct message our patient care coordinator for assistance &amp; report queries.
                </p>
              </div>
              <a
                href="https://wa.me/917412077125?text=Hello%20Dr.%20BST%20Hospital%20Jagatpura%2C%20I%20would%20like%20to%20connect."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2.5 px-4 rounded-xl transition-all shadow-md hover:scale-105"
              >
                <span>Chat on WhatsApp ➔</span>
              </a>
            </div>

            {/* Card 4: Email & Administration */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-700 text-white flex items-center justify-center text-2xl mb-4 shadow-md">
                  ✉️
                </div>
                <span className="text-slate-500 font-black text-[11px] uppercase tracking-wider block mb-1">
                  OFFICIAL CORRESPONDENCE
                </span>
                <h3 className="text-lg font-black text-[#172a34] mb-1">
                  Email &amp; Administration
                </h3>
                <p className="text-slate-600 text-xs mb-4">
                  For administrative enquiries, medical pedogogy &amp; institutional collaboration.
                </p>
              </div>
              <a
                href="mailto:info@bstmedicalcollege.com"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-[#172a34] border border-slate-300 text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-sm"
              >
                <span>info@bstmedicalcollege.com</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          MAIN FORM & HOSPITAL INFO SECTION
          ======================================================== */}
      <section className="py-12 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Interactive Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
              <span className="text-[#c83220] font-black text-xs uppercase tracking-widest block mb-2">
                GET IN TOUCH
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#172a34] leading-tight mb-2">
                Send an Enquiry or Book an Appointment
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed">
                Fill out the form below and our hospital patient relations desk will assist you promptly. You can also connect directly via WhatsApp.
              </p>

              {submitted && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-3">
                  <span className="text-xl">✅</span>
                  <span>Thank you! Your enquiry has been initiated. Our patient team will respond shortly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Patient / Visitor Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#c83220] transition bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#c83220] transition bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#c83220] transition bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Specialty / Department
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#c83220] transition bg-slate-50/50"
                    >
                      <option value="Emergency & Trauma Care">🚨 24/7 Emergency &amp; Trauma</option>
                      <option value="General & Internal Medicine">General &amp; Internal Medicine</option>
                      <option value="Orthopaedics & Joint Replacement">Orthopaedics &amp; Joint Replacement</option>
                      <option value="Paediatrics & Neonatology">Paediatrics &amp; Neonatology</option>
                      <option value="Obstetrics & Gynaecology">Obstetrics &amp; Gynaecology</option>
                      <option value="ENT (Otorhinolaryngology)">ENT (Otorhinolaryngology)</option>
                      <option value="Radio-Diagnosis & Imaging">Radio-Diagnosis &amp; Imaging (CT/MRI/X-Ray)</option>
                      <option value="Pathology & Laboratory">Pathology &amp; Laboratory</option>
                      <option value="Psychiatry & Behavioral Health">Psychiatry &amp; Behavioral Health</option>
                      <option value="General Consultation">General Consultation / Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Preferred Visit Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#c83220] transition bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Describe Medical Concern / Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Please describe symptoms, doctor preference, or query..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#c83220] transition bg-slate-50/50 resize-none"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#c83220] hover:bg-[#a82415] text-white font-black text-xs sm:text-sm py-3.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Submit Enquiry &amp; Connect via WhatsApp</span>
                    <span>➔</span>
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    🔒 Your medical details and personal information remain completely confidential.
                  </p>
                </div>
              </form>
            </div>

            {/* Right Column: Real Hospital Photo, Campus Details & Timings (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Real Hospital Exterior Card */}
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl group">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src="/images/bst-hospital-exterior.jpg"
                    alt="Dr. BST Hospital Building Exterior, Jagatpura Jaipur"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#c83220] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                    🏛️ South Jaipur Campus
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-black text-[#172a34]">
                    Dr. BST Hospital, Jagatpura Jaipur
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dr. B.S. Tomar Institute of Medical Sciences &amp; Research is situated on the prominent growth corridor of Jagatpura, providing immediate access to residents of Sitapura, Malviya Nagar, Tonk Road, and Kota Highway.
                  </p>

                  <div className="space-y-3 pt-2 border-t border-slate-100 text-xs text-slate-700">
                    <div className="flex items-start gap-3">
                      <span className="text-base text-[#c83220] shrink-0 mt-0.5">📍</span>
                      <div>
                        <strong className="block text-slate-900 font-bold">Physical Address:</strong>
                        <span>Dr. BST Hospital, Jagatpura, Jaipur, Rajasthan 302012</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="text-base text-[#c83220] shrink-0 mt-0.5">🏥</span>
                      <div>
                        <strong className="block text-slate-900 font-bold">Campus Specifications:</strong>
                        <span>1000+ Beds Tertiary Hospital, Level-1 Trauma Critical Care, 150 MBBS Seats</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="text-base text-[#c83220] shrink-0 mt-0.5">🕒</span>
                      <div>
                        <strong className="block text-slate-900 font-bold">Operational Timings:</strong>
                        <div className="mt-1 space-y-1 text-[11px]">
                          <div className="flex justify-between border-b border-slate-100 pb-0.5">
                            <span className="text-red-700 font-bold">Emergency &amp; Trauma:</span>
                            <span className="font-bold text-red-700">24 Hours / 365 Days</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-100 pb-0.5">
                            <span>Outpatient OPD:</span>
                            <span className="font-semibold">Mon – Sat: 9:00 AM – 5:00 PM</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-100 pb-0.5">
                            <span>Diagnostic Pathology &amp; Imaging:</span>
                            <span className="font-semibold">24/7 Available</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Hospital Pharmacy:</span>
                            <span className="font-semibold">24/7 Open</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <a
                      href="https://maps.google.com/?q=Jagatpura,+Jaipur,+Rajasthan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-[#172a34] hover:bg-[#0e191f] text-white text-xs font-bold py-2.5 px-3 rounded-xl transition"
                    >
                      📍 Open Navigation
                    </a>
                    <a
                      href="tel:+917412077125"
                      className="flex-1 text-center bg-[#c83220] hover:bg-[#a82415] text-white text-xs font-black py-2.5 px-3 rounded-xl transition"
                    >
                      📞 Call Now
                    </a>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          EMBEDDED GOOGLE MAP SECTION
          ======================================================== */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
            <div>
              <span className="text-[#c83220] font-black text-xs uppercase tracking-widest block">
                LOCATION &amp; DIRECTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#172a34]">
                Reach Dr. BST Hospital in Jagatpura
              </h2>
            </div>
            <a
              href="https://maps.google.com/?q=Jagatpura,+Jaipur,+Rajasthan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#172a34] hover:bg-[#c83220] text-white text-xs font-bold py-2 px-4 rounded-xl transition shadow-sm"
            >
              <span>Get Driving Directions</span>
              <span>➔</span>
            </a>
          </div>

          <div className="w-full h-80 sm:h-96 rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100">
            <iframe
              title="Dr. BST Hospital Jagatpura Jaipur Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113940.94165565147!2d75.80786963442382!3d26.820257000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc9d846988899%3A0xe54e26ee824c9e47!2sJagatpura%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
