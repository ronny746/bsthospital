'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import NewsTicker from '@/components/NewsTicker';
import TopBar from '@/components/TopBar';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import { API_URL, JobOpeningData, slugifyJobTitle } from '@/lib/api';

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('General Healthcare');
  const [applySuccess, setApplySuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobs, setJobs] = useState<JobOpeningData[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);

  const [applicantForm, setApplicantForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    experienceYears: '',
    qualification: '',
    resumeLink: '',
    coverNote: '',
  });

  // Fetch live active jobs from database
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setJobsLoading(true);
    try {
      const res = await fetch(`${API_URL}/careers/jobs`, { cache: 'no-store' });
      const data = (await res.json()) as any;
      if (data.success && Array.isArray(data.data)) {
        setJobs(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    } finally {
      setJobsLoading(false);
    }
  };

  const handleOpenApplyModal = (title: string, dept: string, id?: string) => {
    setSelectedJob(title);
    setSelectedDepartment(dept);
    setSelectedJobId(id || null);
    setErrorMessage('');
    setApplySuccess(false);
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('fullName', applicantForm.fullName);
      formData.append('email', applicantForm.email);
      formData.append('phone', applicantForm.mobile);
      formData.append('position', selectedJob || 'General Application');
      formData.append('department', selectedDepartment || 'General Healthcare');
      formData.append('qualification', applicantForm.qualification);
      formData.append('experience', applicantForm.experienceYears);
      formData.append('coverNote', applicantForm.coverNote);

      if (selectedJobId) {
        formData.append('jobId', selectedJobId);
      }

      if (applicantForm.resumeLink) {
        formData.append('resumeUrl', applicantForm.resumeLink);
      }

      if (resumeFile) {
        formData.append('resume', resumeFile);
      }

      const res = await fetch(`${API_URL}/careers/apply`, {
        method: 'POST',
        body: formData,
      });

      const data = (await res.json()) as any;

      if (data.success) {
        setApplySuccess(true);
        setTimeout(() => {
          setApplicantForm({
            fullName: '',
            email: '',
            mobile: '',
            experienceYears: '',
            qualification: '',
            resumeLink: '',
            coverNote: '',
          });
          setResumeFile(null);
        }, 1000);
      } else {
        setErrorMessage(data.message || 'Failed to submit application. Please check your inputs.');
      }
    } catch (err) {
      console.error('Job application error:', err);
      setErrorMessage('Could not connect to hospital server. Please try again or call HR directly.');
    } finally {
      setIsSubmitting(false);
    }
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
          backgroundImage: "linear-gradient(90deg, rgba(23, 42, 52, 0.94) 0%, rgba(15, 35, 46, 0.88) 45%, rgba(158, 36, 23, 0.78) 100%), url('/images/bst-hospital-exterior.jpg')",
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
              Showing {jobs.length} Active Vacancies
            </div>
          </div>

          {jobsLoading ? (
            <div className="p-12 text-center text-slate-400 text-sm">
              Loading current openings...
            </div>
          ) : jobs.length === 0 ? (
            <div className="p-12 text-center text-slate-500 bg-white rounded-3xl border border-slate-200">
              <p className="font-bold text-base mb-1">No vacancies actively advertised at this moment.</p>
              <p className="text-xs text-slate-400">You can still drop your general CV below and our HR team will contact you!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => {
                const jobSlug = job.slug || slugifyJobTitle(job.title);
                return (
                  <div
                    key={job._id || job.title}
                    className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200/90 hover:shadow-lg transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-5 group"
                  >
                    <div className="max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="bg-red-50 text-[#c83220] text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase border border-red-200">
                          {job.department}
                        </span>
                        <span className="bg-slate-100 text-slate-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                          📍 {job.location || 'Jagatpura, Jaipur'}
                        </span>
                        <span className="bg-slate-100 text-slate-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                          ⏳ {job.type || 'Full-time'}
                        </span>
                        {job.vacancies && job.vacancies > 1 && (
                          <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                            👥 {job.vacancies} Positions
                          </span>
                        )}
                      </div>
                      <Link href={`/careers/${jobSlug}`} className="block group/link">
                        <h3 className="text-base sm:text-lg font-black text-[#172a34] group-hover/link:text-[#c83220] transition-colors mb-1 inline-flex items-center gap-1.5">
                          <span>{job.title}</span>
                          <span className="text-xs text-[#c83220] opacity-0 group-hover/link:opacity-100 transition-opacity">↗</span>
                        </h3>
                      </Link>
                      <p className="text-slate-600 text-xs mb-2 leading-relaxed">{job.description}</p>
                      <div className="text-[11px] font-bold text-slate-500">
                        Requirements: <span className="text-slate-700">{job.experience}</span>
                        {job.requirements && ` • ${job.requirements}`}
                      </div>
                    </div>

                    <div className="w-full md:w-auto shrink-0">
                      <Link
                        href={`/careers/${jobSlug}`}
                        className="w-full md:w-auto text-center bg-[#c83220] hover:bg-[#a82415] text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md shrink-0 inline-flex items-center justify-center gap-1.5"
                      >
                        <span>View Details</span>
                        <span>➔</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* GENERAL RESUME DROP BOX */}
          <div className="mt-8 bg-gradient-to-r from-[#172a34] to-[#2c1310] text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                GENERAL APPLICANTS WELCOME
              </span>
              <h3 className="text-xl sm:text-2xl font-black">Don&apos;t see your specialty listed?</h3>
              <p className="text-xs text-slate-300 max-w-xl">
                We are constantly expanding our clinical and administrative departments. Submit your CV and our HR team will contact you for matching openings.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleOpenApplyModal('General Healthcare Specialist', 'General Healthcare')}
              className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-xs px-6 py-3 rounded-xl transition shadow-md whitespace-nowrap cursor-pointer shrink-0"
            >
              Submit General Application ➔
            </button>
          </div>
        </div>
      </section>

      {/* JOB APPLICATION MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative border border-slate-200 my-8">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 font-bold text-lg p-1"
            >
              ✕
            </button>

            {applySuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-[#172a34] mb-2">Application Submitted!</h3>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed max-w-md mx-auto">
                  Thank you for applying for <span className="font-bold text-[#c83220]">{selectedJob}</span>. Your application has been directly forwarded to the Hospital HR department.
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="mt-6 bg-[#172a34] text-white font-bold text-xs px-6 py-2.5 rounded-xl hover:bg-[#c83220] transition"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <div className="text-[10px] font-black text-[#c83220] uppercase tracking-wider mb-0.5">
                  HR CANDIDATE PORTAL
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#172a34] mb-1">Apply for {selectedJob}</h3>
                <p className="text-[11px] text-slate-500 mb-4">
                  Department: <span className="font-bold text-slate-700">{selectedDepartment}</span>
                </p>

                {errorMessage && (
                  <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-semibold rounded mb-4">
                    ⚠️ {errorMessage}
                  </div>
                )}

                <form onSubmit={handleApplySubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={applicantForm.fullName}
                      onChange={(e) => setApplicantForm({ ...applicantForm, fullName: e.target.value })}
                      placeholder="Dr. / Mr. / Ms. Full Name"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#c83220] font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={applicantForm.email}
                        onChange={(e) => setApplicantForm({ ...applicantForm, email: e.target.value })}
                        placeholder="doctor@example.com"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#c83220] font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={applicantForm.mobile}
                        onChange={(e) => setApplicantForm({ ...applicantForm, mobile: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#c83220] font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Qualification &amp; Degrees *</label>
                      <input
                        type="text"
                        required
                        value={applicantForm.qualification}
                        onChange={(e) => setApplicantForm({ ...applicantForm, qualification: e.target.value })}
                        placeholder="MBBS, MD, B.Sc Nursing, GNM..."
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#c83220] font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Experience *</label>
                      <input
                        type="text"
                        required
                        value={applicantForm.experienceYears}
                        onChange={(e) => setApplicantForm({ ...applicantForm, experienceYears: e.target.value })}
                        placeholder="e.g. 5+ Years"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#c83220] font-medium"
                      />
                    </div>
                  </div>

                  {/* RESUME UPLOAD / FILE */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Attach Resume / CV Document (PDF, Word, or Image)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setResumeFile(file);
                      }}
                      className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#172a34] file:text-white hover:file:bg-[#c83220] file:cursor-pointer cursor-pointer border border-slate-200 rounded-xl p-1 bg-slate-50"
                    />
                    {resumeFile && (
                      <p className="text-[11px] text-emerald-700 font-bold mt-1">
                        ✓ Selected: {resumeFile.name} ({(resumeFile.size / 1024).toFixed(0)} KB)
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Or Paste Resume Link (Google Drive / LinkedIn / Portfolio)
                    </label>
                    <input
                      type="url"
                      value={applicantForm.resumeLink}
                      onChange={(e) => setApplicantForm({ ...applicantForm, resumeLink: e.target.value })}
                      placeholder="https://drive.google.com/..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#c83220] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Cover Note / Remarks (Optional)</label>
                    <textarea
                      rows={2}
                      value={applicantForm.coverNote}
                      onChange={(e) => setApplicantForm({ ...applicantForm, coverNote: e.target.value })}
                      placeholder="Brief note on your key clinical achievements or availability..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#c83220] font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#c83220] hover:bg-[#a82415] text-white font-bold py-3 rounded-xl shadow-md transition text-xs cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Submitting Application...</span>
                    ) : (
                      <>
                        <span>Submit Job Application to HR</span>
                        <span>➔</span>
                      </>
                    )}
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
