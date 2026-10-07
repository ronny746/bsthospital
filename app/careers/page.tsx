'use client';

import { useState } from 'react';
import NewsTicker from '@/components/NewsTicker';
import TopBar from '@/components/TopBar';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';

export default function CareersPage() {
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
      location: 'Jagatpura, Jaipur',
      experience: '5+ Years Post MD/DNB',
      type: 'Full-time',
      description: 'Lead patient management across 1000+ beds ICU facility. Handle complex ARDS, trauma, and multi-organ emergency cases.',
    },
    {
      id: 'job-2',
      title: 'Consultant - Cardiology',
      department: 'Cardiology (Cath Lab)',
      location: 'Jagatpura, Jaipur',
      experience: '3+ Years DM / DNB Cardiology',
      type: 'Full-time',
      description: 'Perform emergency angioplasties, cardiac catheterization, and post-op CICU monitoring.',
    },
    {
      id: 'job-3',
      title: 'Senior Resident - Emergency & Trauma Care',
      department: 'Emergency Medicine',
      location: 'Jagatpura, Jaipur',
      experience: '1-3 Years MBBS / MEM / MD',
      type: 'Full-time',
      description: 'Manage 24/7 Level-1 Trauma Triage, airway management, and acute stabilization.',
    },
    {
      id: 'job-4',
      title: 'ICU Nursing Officer (Staff Nurse)',
      department: 'Nursing & Critical Care',
      location: 'Jagatpura, Jaipur',
      experience: '1+ Year B.Sc Nursing / GNM',
      type: 'Shift Rotational',
      description: 'Monitor ventilator-dependent patients, administer critical drips, and maintain sterile bedside care.',
    },
    {
      id: 'job-5',
      title: 'Senior Radiographer & CT/MRI Technician',
      department: 'Radiology & Imaging',
      location: 'Jagatpura, Jaipur',
      experience: '2+ Years Diploma / B.Sc Radiology',
      type: 'Full-time',
      description: 'Operate multi-slice CT scanner, high-resolution ultrasound, and digital radiography units in emergency settings.',
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
    <main className="min-h-screen bg-[#fdfbf7] font-sans overflow-x-hidden text-slate-800">
      <NewsTicker />
      <TopBar />
      <NavigationBar />

      {/* COMPACT NIMS-STYLE PAGE BANNER WITH BACKGROUND IMAGE */}
      <section 
        className="relative text-white py-8 sm:py-10 md:py-12 border-b-4 border-[#c83220] bg-cover bg-center flex items-center overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(90deg, rgba(23, 42, 52, 0.94) 0%, rgba(15, 35, 46, 0.88) 45%, rgba(158, 36, 23, 0.78) 100%), url('/images/bst-hero-building.png')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
          <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">
            <a href="/" className="hover:text-white transition">HOME</a>
            <span className="text-[#c83220]">/</span>
            <span className="text-amber-400">CAREERS</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-[#c83220] text-white px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider mb-2 shadow-sm">
            <span>💼 Join Our Mission</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-2 leading-tight max-w-4xl text-white">
            Build Your Healthcare Career at BST Hospital
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm max-w-2xl font-medium leading-relaxed">
            Work with leading medical experts, state-of-the-art ICU infrastructure, and contribute to saving lives every day in Jagatpura, Jaipur.
          </p>
        </div>
      </section>

      {/* WHY WORK WITH US */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[#c83220] font-black text-xs uppercase tracking-widest mb-1.5 block">
              LIFE AT BST HOSPITAL
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#172a34]">Why Choose BST Hospital?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-[#fdfbf7] p-5 rounded-2xl border border-slate-200">
              <div className="text-2xl mb-2">🩺</div>
              <h3 className="font-black text-sm text-[#172a34] mb-1">Modern Infrastructure</h3>
              <p className="text-xs text-slate-600">Access to multi-slice CT, advanced ventilators, modular OTs, and digital emergency labs.</p>
            </div>

            <div className="bg-[#fdfbf7] p-5 rounded-2xl border border-slate-200">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="font-black text-sm text-[#172a34] mb-1">Career Growth</h3>
              <p className="text-xs text-slate-600">Continuous medical education (CME), research publication support, and promotion pathways.</p>
            </div>

            <div className="bg-[#fdfbf7] p-5 rounded-2xl border border-slate-200">
              <div className="text-2xl mb-2">💳</div>
              <h3 className="font-black text-sm text-[#172a34] mb-1">Competitive Pay</h3>
              <p className="text-xs text-slate-600">Industry-best compensation, medical benefits, and performance incentives.</p>
            </div>

            <div className="bg-[#fdfbf7] p-5 rounded-2xl border border-slate-200">
              <div className="text-2xl mb-2">🤝</div>
              <h3 className="font-black text-sm text-[#172a34] mb-1">Collaborative Culture</h3>
              <p className="text-xs text-slate-600">Work in multi-disciplinary clinical teams focused on patient safety and compassionate care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* JOB OPENINGS LIST */}
      <section className="py-12 sm:py-16 bg-[#fdfbf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-2">
            <div>
              <span className="text-[#c83220] font-black text-xs uppercase tracking-widest mb-1 block">
                CURRENT OPPORTUNITIES
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#172a34]">Open Positions</h2>
            </div>
            <div className="text-xs text-slate-500 font-bold bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
              Showing {jobOpenings.length} Active Vacancies
            </div>
          </div>

          <div className="space-y-4">
            {jobOpenings.map((job) => (
              <div
                key={job.id}
                className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200/90 hover:shadow-lg transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-5"
              >
                <div className="max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-50 text-[#c83220] text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase border border-red-200">
                      {job.department}
                    </span>
                    <span className="bg-slate-100 text-slate-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      📍 {job.location}
                    </span>
                    <span className="bg-slate-100 text-slate-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      ⏳ {job.type}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-[#172a34] mb-1">{job.title}</h3>
                  <p className="text-slate-600 text-xs mb-2 leading-relaxed">{job.description}</p>
                  <div className="text-[11px] font-bold text-slate-500">Requirements: {job.experience}</div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedJob(job.title)}
                  className="bg-[#c83220] hover:bg-[#a82415] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md shrink-0 cursor-pointer"
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
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border-2 border-slate-200">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 font-bold text-lg"
            >
              ✕
            </button>

            {applySuccess ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-red-100 text-[#c83220] rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-black text-[#172a34] mb-1">Application Submitted!</h3>
                <p className="text-slate-600 text-xs font-medium">
                  Thank you for applying for <span className="font-bold text-[#c83220]">{selectedJob}</span>. Our HR team will reach out to you shortly.
                </p>
              </div>
            ) : (
              <div>
                <div className="text-xs font-black text-[#c83220] uppercase tracking-wider mb-0.5">Application Form</div>
                <h3 className="text-lg font-black text-[#172a34] mb-4">Apply for {selectedJob}</h3>

                <form onSubmit={handleApplySubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={applicantForm.fullName}
                      onChange={(e) => setApplicantForm({ ...applicantForm, fullName: e.target.value })}
                      placeholder="Dr. / Mr. / Ms. Full Name"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#c83220]"
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
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#c83220]"
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
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#c83220]"
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
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#c83220]"
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
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#c83220]"
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
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#c83220]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#c83220] hover:bg-[#a82415] text-white font-bold py-2.5 rounded-xl shadow-md transition text-xs cursor-pointer"
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
    </main>
  );
}
