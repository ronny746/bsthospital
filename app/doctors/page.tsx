'use client';

import { useState } from 'react';
import NewsTicker from '@/components/NewsTicker';
import TopBar from '@/components/TopBar';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import FadeIn from '@/components/FadeIn';
import IcuBookingModal from '@/components/IcuBookingModal';

export default function DoctorsPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [appointmentForm, setAppointmentForm] = useState({
    patientName: '',
    mobile: '',
    preferredDate: '',
    preferredTime: 'Morning (10:00 AM - 1:00 PM)',
    reason: '',
  });

  const doctorsList = [
    {
      name: 'Dr. Sunita Verma',
      specialty: 'Critical Care & ICU Specialist',
      category: 'Critical Care / ICU',
      department: 'Critical Care Medicine',
      qualification: 'MBBS, MD (Anaesthesia), Fellowship Critical Care',
      experience: '14+ Years',
      opdTimings: 'Mon - Sat: 9:00 AM - 4:00 PM',
      image: '/doctors/doctor-womens-health.png',
    },
    {
      name: 'Dr. Anita Sharma',
      specialty: 'Women’s Health & Gynaecology',
      category: 'Gynaecology',
      department: 'Obstetrics & Gynaecology',
      qualification: 'MBBS, MS (Obs & Gynae), DNB',
      experience: '16+ Years',
      opdTimings: 'Mon - Sat: 10:00 AM - 2:00 PM',
      image: '/doctors/doctor-womens-health.png',
    },
    {
      name: 'Dr. Rajiv Mathur',
      specialty: 'Bone & Joint Specialist',
      category: 'Orthopedics',
      department: 'Orthopaedics & Joint Replacement',
      qualification: 'MBBS, MS (Orthopaedics), M.Ch (UK)',
      experience: '18+ Years',
      opdTimings: 'Mon - Sat: 10:30 AM - 4:30 PM',
      image: '/doctors/doctor-orthopaedics.png',
    },
    {
      name: 'Dr. S. K. Gupta',
      specialty: 'Senior Pediatrician',
      category: 'Pediatrics',
      department: 'Paediatrics & Neonatology',
      qualification: 'MBBS, MD (Pediatrics)',
      experience: '12+ Years',
      opdTimings: 'Mon - Sat: 9:00 AM - 1:00 PM',
      image: '/doctors/doctor-paediatrics.png',
    },
    {
      name: 'Dr. Neha Singh',
      specialty: 'Internal Medicine Specialist',
      category: 'Internal Medicine',
      department: 'General & Internal Medicine',
      qualification: 'MBBS, MD (Medicine)',
      experience: '10+ Years',
      opdTimings: 'Mon - Sat: 11:00 AM - 5:00 PM',
      image: '/doctors/doctor-womens-health.png',
    },
    {
      name: 'Dr. Vikramaditya Rathore',
      specialty: 'Chief Interventional Cardiologist',
      category: 'Cardiology',
      department: 'Cardiology & Cath Lab',
      qualification: 'MBBS, MD, DM (Cardiology), FACC',
      experience: '20+ Years',
      opdTimings: 'Mon - Fri: 10:00 AM - 3:00 PM',
      image: '/doctors/doctor-orthopaedics.png',
    },
    {
      name: 'Dr. Meenakshi Sundaram',
      specialty: 'Senior Neurosurgeon',
      category: 'Neurology',
      department: 'Neurosurgery & Spine',
      qualification: 'MBBS, MS, M.Ch (Neurosurgery)',
      experience: '15+ Years',
      opdTimings: 'Mon - Sat: 12:00 PM - 5:00 PM',
      image: '/doctors/doctor-womens-health.png',
    },
    {
      name: 'Dr. Arvind Chawla',
      specialty: 'Pulmonologist & Respiratory Care',
      category: 'Critical Care / ICU',
      department: 'Pulmonology & Respiratory Medicine',
      qualification: 'MBBS, MD (Chest & Respiratory)',
      experience: '13+ Years',
      opdTimings: 'Mon - Sat: 10:00 AM - 3:00 PM',
      image: '/doctors/doctor-orthopaedics.png',
    },
  ];

  const categories = ['All', 'Critical Care / ICU', 'Cardiology', 'Orthopedics', 'Pediatrics', 'Gynaecology', 'Neurology', 'Internal Medicine'];

  const filteredDoctors = doctorsList.filter((doc) => {
    const matchesCategory = activeCategory === 'All' || doc.category === activeCategory;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.qualification.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedDoctor(null);
      setAppointmentForm({
        patientName: '',
        mobile: '',
        preferredDate: '',
        preferredTime: 'Morning (10:00 AM - 1:00 PM)',
        reason: '',
      });
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-cream font-sans overflow-x-hidden text-slate-800">
      <NewsTicker />
      <TopBar />
      <NavigationBar />

      {/* HERO BANNER */}
      <section className="relative bg-gradient-to-r from-[#172a34] via-[#0f232e] to-[#791017] text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-[#e5b64a]/20 text-[#e5b64a] border border-[#e5b64a]/40 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <span>👨‍⚕️ Medical Leadership & Clinical Experts</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight max-w-4xl">
            Meet Our Specialist Doctors
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-3xl font-medium leading-relaxed">
            Consult with top super-specialist doctors, surgeons, and critical care experts at BST Hospital.
          </p>
        </div>
      </section>

      {/* FILTER & SEARCH CONTROLS */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            {/* Search Input */}
            <div className="w-full md:w-96 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search doctor by name, specialty, or department..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#bd171c] font-medium"
              />
              <span className="absolute left-3.5 top-3.5 text-slate-400 text-sm">🔍</span>
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#172a34] text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DOCTORS GRID */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="text-xl font-bold text-[#172a34] mb-2">No Doctors Found</h3>
              <p className="text-xs text-slate-500">Try adjusting your search filter or selecting 'All' category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredDoctors.map((doc, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-200 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-64 bg-slate-100 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                        <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="absolute inset-0 w-full h-full object-cover object-top z-10 opacity-95 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 z-20 bg-[#172a34] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
                        {doc.experience} Exp.
                      </div>
                    </div>

                    <div className="p-6">
                      <span className="text-[#bd171c] text-[11px] font-black uppercase tracking-wider mb-1 block">
                        {doc.specialty}
                      </span>
                      <h3 className="text-lg font-black text-[#172a34] mb-1">{doc.name}</h3>
                      <p className="text-slate-600 text-xs font-semibold mb-2">{doc.qualification}</p>
                      <p className="text-slate-500 text-[11px] mb-4">{doc.department}</p>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[11px] text-slate-700 font-medium mb-4">
                        🕒 {doc.opdTimings}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      type="button"
                      onClick={() => setSelectedDoctor(doc)}
                      className="w-full py-3 rounded-xl bg-[#172a34] hover:bg-[#bd171c] text-white font-black text-xs transition-colors shadow-md cursor-pointer"
                    >
                      Book OPD Consultation ➔
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* APPOINTMENT MODAL */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative border-4 border-[#172a34]">
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 font-bold text-xl"
            >
              ✕
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-[#172a34] mb-2">Appointment Request Received!</h3>
                <p className="text-slate-600 text-sm font-medium">
                  Your appointment with <span className="font-bold text-[#bd171c]">{selectedDoctor.name}</span> has been scheduled. Our OPD coordinator will confirm your slot via SMS/Call.
                </p>
              </div>
            ) : (
              <div>
                <div className="text-xs font-black text-[#bd171c] uppercase tracking-wider mb-1">Book Consultation</div>
                <h3 className="text-xl font-black text-[#172a34] mb-1">{selectedDoctor.name}</h3>
                <p className="text-xs text-slate-500 mb-4">{selectedDoctor.specialty} • {selectedDoctor.department}</p>

                <form onSubmit={handleBookSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Patient Full Name *</label>
                    <input
                      type="text"
                      required
                      value={appointmentForm.patientName}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, patientName: e.target.value })}
                      placeholder="Enter patient full name"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#bd171c]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={appointmentForm.mobile}
                        onChange={(e) => setAppointmentForm({ ...appointmentForm, mobile: e.target.value })}
                        placeholder="+91 9876543210"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#bd171c]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Date *</label>
                      <input
                        type="date"
                        required
                        value={appointmentForm.preferredDate}
                        onChange={(e) => setAppointmentForm({ ...appointmentForm, preferredDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#bd171c]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Time Slot *</label>
                    <select
                      value={appointmentForm.preferredTime}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, preferredTime: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#bd171c]"
                    >
                      <option>Morning (10:00 AM - 1:00 PM)</option>
                      <option>Afternoon (1:00 PM - 4:00 PM)</option>
                      <option>Evening (4:00 PM - 7:00 PM)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Reason for Visit / Symptoms</label>
                    <textarea
                      rows={2}
                      value={appointmentForm.reason}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, reason: e.target.value })}
                      placeholder="Briefly describe health concern..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#bd171c]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#bd171c] hover:bg-[#791017] text-white font-black py-3 rounded-xl shadow-lg transition text-xs cursor-pointer"
                  >
                    Confirm Consultation Appointment ➔
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />

      {/* Floating Action Button */}
      <button
        onClick={() => setIsBookingModalOpen(true)}
        className="fixed bottom-5 right-5 z-40 bg-[#bd171c] hover:bg-[#791017] text-white px-4 py-3 rounded-full shadow-2xl transition-all hover:scale-105 flex items-center gap-2 border-2 border-white/30 text-xs font-black cursor-pointer"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
        <span>🚨 Nims Tatkaal Seva (ICU Booking)</span>
      </button>

      <IcuBookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </main>
  );
}
