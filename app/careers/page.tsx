'use client';

import { useState } from 'react';
import NewsTicker from '@/components/NewsTicker';
import TopBar from '@/components/TopBar';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import FadeIn from '@/components/FadeIn';
import IcuBookingModal from '@/components/IcuBookingModal';

export default function CareersPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [applySuccess, setApplySuccess] = useState(false);

  const [applicantForm, setApplicantForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    experienceYears: '',
    qualification: '',
    resumeLink: '',
    coverNote: '',
  });

  const jobOpenings = [
    {
      id: 'job-1',
      title: 'Senior Consultant - Critical Care / ICU',
      department: 'Critical Care Medicine',
      location: 'Jaipur, Rajasthan',
      experience: '5+ Years Post MD/DNB',
      type: 'Full-time',
      description: 'Lead patient management across 2,500+ beds ICU facility. Handle complex ARDS, trauma, and multi-organ emergency cases.',
    },
    {
      id: 'job-2',
      title: 'Consultant - Cardiology',
      department: 'Cardiology (Cath Lab)',
      location: 'Jaipur, Rajasthan',
      experience: '3+ Years DM / DNB Cardiology',
      type: 'Full-time',
      description: 'Perform emergency angioplasties, cardiac catheterization, and post-op CICU monitoring.',
    },
    {
      id: 'job-3',
      title: 'Senior Resident - Emergency & Trauma Care',
      department: 'Emergency Medicine',
      location: 'Jaipur, Rajasthan',
      experience: '1-3 Years MBBS / MEM / MD',
      type: 'Full-time',
      description: 'Manage 24/7 Level-1 Trauma Triage, airway management, and acute stabilization.',
    },
    {
      id: 'job-4',
      title: 'ICU Nursing Officer (Staff Nurse)',
      department: 'Nursing & Critical Care',
      location: 'Jaipur, Rajasthan',
      experience: '1+ Year B.Sc Nursing / GNM',
      type: 'Shift Rotational',
      description: 'Monitor ventilator-dependent patients, administer critical drips, and maintain sterile bedside care.',
    },
    {
      id: 'job-5',
      title: 'Senior Radiographer & CT/MRI Technician',
      department: 'Radiology & Imaging',
      location: 'Jaipur, Rajasthan',
      experience: '2+ Years Diploma / B.Sc Radiology',
      type: 'Full-time',
      description: 'Operate 128-slice CT scanner, 3T MRI, and digital radiography units in emergency settings.',
    },
  ];

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplySuccess(true);
    setTimeout(() => {
      setApplySuccess(false);
      setSelectedJob(null);
      setApplicantForm({
        fullName: '',
        email: '',
        mobile: '',
        experienceYears: '',
        qualification: '',
        resumeLink: '',
        coverNote: '',
      });
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-cream font-sans overflow-x-hidden text-slate-800">
      <NewsTicker />
      <TopBar />
      <NavigationBar />

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-[#172a34] via-[#0f232e] to-[#791017] text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-[#e5b64a]/20 text-[#e5b64a] border border-[#e5b64a]/40 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <span>💼 Join Our Mission</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight max-w-4xl">
            Build Your Healthcare Career at BST Hospital
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-3xl font-medium leading-relaxed">
            Work with leading medical experts, state-of-the-art ICU infrastructure, and contribute to saving lives every day.
          </p>
        </div>
      </section>

      {/* WHY WORK WITH US */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#bd171c] font-black text-xs uppercase tracking-widest mb-2 block">
              Life at BST Hospital
            </span>
            <h2 className="text-3xl font-black text-[#172a34]">Why Choose BST Hospital?</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="text-3xl mb-3">🩺</div>
              <h3 className="font-black text-[#172a34] mb-2">Modern Technology</h3>
              <p className="text-xs text-slate-600">Access to 128-Slice CT, 3T MRI, advanced ventilators, and digital Cath Labs.</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="font-black text-[#172a34] mb-2">Career Growth</h3>
              <p className="text-xs text-slate-600">Continuous medical education (CME), research publication support, and promotion pathways.</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="text-3xl mb-3">💳</div>
              <h3 className="font-black text-[#172a34] mb-2">Competitive Pay</h3>
              <p className="text-xs text-slate-600">Industry-best compensation, medical insurance, housing support, and performance bonuses.</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="font-black text-[#172a34] mb-2">Collaborative Culture</h3>
              <p className="text-xs text-slate-600">Work in multi-disciplinary teams focused on excellence and supportive teamwork.</p>
            </div>
          </div>
        </div>
      </section>

      {/* JOB OPENINGS LIST */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <span className="text-[#bd171c] font-black text-xs uppercase tracking-widest mb-2 block">
                Current Opportunities
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#172a34]">Open Positions</h2>
            </div>
            <div className="mt-4 md:mt-0 text-xs text-slate-500 font-bold">
              Showing {jobOpenings.length} Active Vacancies
            </div>
          </div>

          <div className="space-y-6">
            {jobOpenings.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl transition flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div className="max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-100 text-[#bd171c] text-[11px] font-black px-3 py-1 rounded-full uppercase">
                      {job.department}
                    </span>
                    <span className="bg-slate-100 text-slate-700 text-[11px] font-bold px-3 py-1 rounded-full">
                      📍 {job.location}
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full">
                      ⏳ {job.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-[#172a34] mb-2">{job.title}</h3>
                  <p className="text-slate-600 text-xs md:text-sm mb-3">{job.description}</p>
                  <div className="text-xs font-bold text-slate-500">Requirements: {job.experience}</div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedJob(job.title)}
                  className="bg-[#172a34] hover:bg-[#bd171c] text-white font-black text-xs px-6 py-3 rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
                >
                  Apply Now ➔
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOB APPLICATION MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative border-4 border-[#172a34]">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 font-bold text-xl"
            >
              ✕
            </button>

            {applySuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-[#172a34] mb-2">Application Submitted!</h3>
                <p className="text-slate-600 text-sm font-medium">
                  Thank you for applying for <span className="font-bold text-[#bd171c]">{selectedJob}</span>. Our HR team will reach out to you shortly.
                </p>
              </div>
            ) : (
              <div>
                <div className="text-xs font-black text-[#bd171c] uppercase tracking-wider mb-1">Application Form</div>
                <h3 className="text-xl font-black text-[#172a34] mb-4">Apply for {selectedJob}</h3>

                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={applicantForm.fullName}
                      onChange={(e) => setApplicantForm({ ...applicantForm, fullName: e.target.value })}
                      placeholder="Dr. / Mr. / Ms. Full Name"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#bd171c]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={applicantForm.email}
                        onChange={(e) => setApplicantForm({ ...applicantForm, email: e.target.value })}
                        placeholder="doctor@example.com"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#bd171c]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={applicantForm.mobile}
                        onChange={(e) => setApplicantForm({ ...applicantForm, mobile: e.target.value })}
                        placeholder="+91 9876543210"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#bd171c]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Qualification *</label>
                      <input
                        type="text"
                        required
                        value={applicantForm.qualification}
                        onChange={(e) => setApplicantForm({ ...applicantForm, qualification: e.target.value })}
                        placeholder="MBBS, MD, B.Sc Nursing"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#bd171c]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Experience (Years) *</label>
                      <input
                        type="text"
                        required
                        value={applicantForm.experienceYears}
                        onChange={(e) => setApplicantForm({ ...applicantForm, experienceYears: e.target.value })}
                        placeholder="e.g. 4 Years"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#bd171c]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Resume / Portfolio Link</label>
                    <input
                      type="url"
                      value={applicantForm.resumeLink}
                      onChange={(e) => setApplicantForm({ ...applicantForm, resumeLink: e.target.value })}
                      placeholder="https://drive.google.com/..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#bd171c]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#bd171c] hover:bg-[#791017] text-white font-black py-3 rounded-xl shadow-lg transition text-xs cursor-pointer"
                  >
                    Submit Job Application ➔
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
