'use client';

import React, { useEffect, useState, use } from 'react';
import NewsTicker from '@/components/NewsTicker';
import TopBar from '@/components/TopBar';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import { fetchDoctorById, DoctorData, API_URL } from '@/lib/api';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DoctorDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const doctorId = resolvedParams.id;

  const [doctor, setDoctor] = useState<DoctorData | null>(null);
  const [loading, setLoading] = useState(true);

  // Appointment Form state
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (10:00 AM - 1:00 PM)');
  const [patientMessage, setPatientMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    async function loadDoctor() {
      setLoading(true);
      const data = await fetchDoctorById(doctorId);
      setDoctor(data);
      setLoading(false);
    }
    loadDoctor();
  }, [doctorId]);

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctor) return;
    setSubmitting(true);

    try {
      // 1. Save to MongoDB backend
      await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: patientName,
          phone: patientPhone,
          email: patientEmail,
          department: doctor.department,
          doctor: doctor.name,
          preferredDate,
          preferredTime,
          message: patientMessage,
        }),
      });

      // 2. Open WhatsApp for instant confirmation
      const text = `Hello Dr. B. S. Tomar Hospital Jagatpura,%0A%0A*OPD Appointment Request:*%0A*Doctor:* ${doctor.name} (${doctor.specialty})%0A*Patient Name:* ${patientName}%0A*Phone:* ${patientPhone}%0A*Date:* ${preferredDate || 'Earliest Available'}%0A*Preferred Slot:* ${preferredTime}%0A*Notes:* ${patientMessage || 'Consultation'}`;
      window.open(`https://wa.me/917412077125?text=${text}`, '_blank');

      setBookingSuccess(true);
    } catch (err) {
      console.error('Appointment submit error:', err);
      // Still allow WhatsApp booking
      const text = `Hello Dr. B. S. Tomar Hospital Jagatpura,%0A%0A*OPD Appointment Request:*%0A*Doctor:* ${doctor.name}%0A*Patient:* ${patientName}%0A*Phone:* ${patientPhone}`;
      window.open(`https://wa.me/917412077125?text=${text}`, '_blank');
      setBookingSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <NewsTicker />
        <TopBar />
        <NavigationBar />
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 border-4 border-[#c83220] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm font-bold text-slate-600">Loading Doctor Profile...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!doctor) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <NewsTicker />
        <TopBar />
        <NavigationBar />
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div className="max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-lg space-y-4">
            <span className="text-5xl">👨‍⚕️</span>
            <h1 className="text-xl font-black text-[#172a34]">Specialist Not Found</h1>
            <p className="text-xs text-slate-500">
              The doctor profile you requested could not be located in our records.
            </p>
            <a
              href="/doctors"
              className="inline-block bg-[#c83220] text-white font-bold text-xs px-6 py-2.5 rounded-xl hover:bg-[#a82415] transition"
            >
              Browse All Doctors ➔
            </a>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const whatsappBookingUrl = `https://wa.me/917412077125?text=${encodeURIComponent(
    `Hello Dr. B. S. Tomar Hospital Jagatpura,\n\nI would like to book an OPD Consultation with ${doctor.name} (${doctor.specialty} - ${doctor.department}). Please share available slots.`
  )}`;

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <NewsTicker />
      <TopBar />
      <NavigationBar />

      {/* Breadcrumb Navigation */}
      <div className="bg-[#172a34] text-white py-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2 text-xs font-semibold text-slate-300">
          <a href="/" className="hover:text-white transition">Home</a>
          <span className="text-[#c83220]">/</span>
          <a href="/doctors" className="hover:text-white transition">Doctors</a>
          <span className="text-[#c83220]">/</span>
          <span className="text-amber-300 font-bold truncate">{doctor.name}</span>
        </div>
      </div>

      {/* Doctor Hero Card */}
      <section className="py-8 sm:py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12">
            {/* Doctor Image */}
            <div className="w-56 sm:w-64 lg:w-72 shrink-0">
              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-slate-100 aspect-square sm:aspect-[4/5]">
                <img
                  src={doctor.image || '/doctors/doctor-womens-health.png'}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-3 right-3 bg-[#172a34]/90 text-amber-300 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm border border-amber-300/30">
                  {doctor.experience} Exp
                </div>
                {doctor.isAvailable && (
                  <div className="absolute bottom-3 left-3 right-3 bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center justify-center gap-1.5 border border-emerald-500/30">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Available for OPD Today</span>
                  </div>
                )}
              </div>
            </div>

            {/* Doctor Details */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                  <span className="bg-[#c83220] text-white text-[10px] sm:text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
                    {doctor.specialty}
                  </span>
                  <span className="bg-slate-100 text-slate-700 text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full border border-slate-200">
                    {doctor.category || doctor.department}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#172a34] tracking-tight">
                  {doctor.name}
                </h1>
                <p className="text-sm sm:text-base font-bold text-slate-600 mt-1">
                  {doctor.designation} &bull; {doctor.department}
                </p>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Qualifications
                  </span>
                  <span className="text-xs font-extrabold text-[#172a34] leading-snug block mt-0.5">
                    {doctor.qualification}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    OPD Timings
                  </span>
                  <span className="text-xs font-extrabold text-[#172a34] block mt-0.5">
                    {doctor.opdTimings}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Consultation Fee
                  </span>
                  <span className="text-xs font-black text-emerald-700 block mt-0.5">
                    {doctor.consultationFee || '₹500'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
                <a
                  href={whatsappBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#c83220] hover:bg-[#a82415] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <span>💬 Instant WhatsApp Booking</span>
                  <span>➔</span>
                </a>
                <a
                  href="tel:+917412077125"
                  className="bg-[#172a34] hover:bg-[#0e191f] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition shadow flex items-center gap-2"
                >
                  <span>📞 Call Helpline: +91 74120 77125</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Appointment Form */}
      <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Doctor Bio & Specializations */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Doctor */}
            {doctor.about && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🩺</span>
                  <h2 className="text-lg font-black text-[#172a34]">
                    About &amp; Clinical Background
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {doctor.about}
                </p>
              </div>
            )}

            {/* Clinical Specializations */}
            {doctor.specializations && doctor.specializations.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⭐</span>
                  <h2 className="text-lg font-black text-[#172a34]">
                    Key Clinical Areas &amp; Procedures
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {doctor.specializations.map((spec, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700"
                    >
                      <span className="text-[#c83220] font-black shrink-0">✓</span>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* OPD Schedule & Days */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">📅</span>
                <h2 className="text-lg font-black text-[#172a34]">
                  Consultation Schedule
                </h2>
              </div>
              <p className="text-xs text-slate-600">
                Patients are advised to book OPD appointments in advance to minimize waiting time.
              </p>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <span className="text-xs font-bold text-slate-500 block">OPD Hours:</span>
                  <span className="text-sm font-black text-[#172a34]">{doctor.opdTimings}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 block">Location:</span>
                  <span className="text-xs font-bold text-slate-700">Dr. B. S. Tomar Institute of Medical Sciences, Research &amp; Hospital, Jagatpura, Jaipur</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Book OPD Consultation Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xl sticky top-24 space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[#c83220] text-[10px] font-black uppercase tracking-wider block">
                  APPOINTMENT BOOKING
                </span>
                <h3 className="text-lg font-black text-[#172a34]">
                  Book OPD Consultation
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Consult with {doctor.name} at Dr. B. S. Tomar Hospital
                </p>
              </div>

              {bookingSuccess ? (
                <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                  <span className="text-3xl">🎉</span>
                  <h4 className="font-black text-emerald-800 text-sm">Appointment Requested!</h4>
                  <p className="text-xs text-emerald-700">
                    Your request has been logged. Our OPD coordinator will confirm your exact slot shortly.
                  </p>
                  <button
                    onClick={() => setBookingSuccess(false)}
                    className="text-xs font-bold text-emerald-800 underline block mx-auto"
                  >
                    Book another slot
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAppointmentSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Patient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#c83220] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#c83220] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#c83220] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Time Slot
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#c83220] focus:outline-none bg-white"
                    >
                      <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                      <option value="Afternoon (12:00 PM - 3:00 PM)">Afternoon (12:00 PM - 3:00 PM)</option>
                      <option value="Evening (3:00 PM - 6:00 PM)">Evening (3:00 PM - 6:00 PM)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Health Concern / Symptoms (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={patientMessage}
                      onChange={(e) => setPatientMessage(e.target.value)}
                      placeholder="Briefly describe your symptoms or reason for visit..."
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#c83220] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#c83220] hover:bg-[#a82415] text-white font-bold text-xs py-3 rounded-xl transition shadow-md flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                  >
                    <span>{submitting ? 'Confirming...' : 'Request OPD Appointment ➔'}</span>
                  </button>

                  <p className="text-[10px] text-slate-400 text-center leading-tight">
                    🔒 Same-day appointments available. Emergency cases are attended 24/7 without appointment.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

