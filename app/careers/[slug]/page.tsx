'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import NewsTicker from '@/components/NewsTicker';
import TopBar from '@/components/TopBar';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import { API_URL, fetchJobBySlugOrId, JobOpeningData, slugifyJobTitle } from '@/lib/api';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function JobDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [job, setJob] = useState<JobOpeningData | null>(null);
  const [relatedJobs, setRelatedJobs] = useState<JobOpeningData[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Application form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [qualification, setQualification] = useState('');
  const [resumeLink, setResumeLink] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverNote, setCoverNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    async function loadJobData() {
      setLoading(true);
      const res = await fetchJobBySlugOrId(slug);
      if (res.job) {
        setJob(res.job);
        setRelatedJobs(res.relatedJobs);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }
    loadJobData();
  }, [slug]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    if (typeof window !== 'undefined' && job) {
      const text = encodeURIComponent(
        `Job Opening at Dr. B. S. Tomar Institute of Medical Sciences, Research & Hospital, Jagatpura, Jaipur:\n*${job.title}*\nDepartment: ${job.department}\nExperience: ${job.experience}\nApply here: ${window.location.href}`
      );
      window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    }
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;

    if (!resumeFile && !resumeLink) {
      setErrorMessage('Please upload your Resume (PDF/DOC) or provide a Google Drive / LinkedIn link.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('phone', mobile);
      formData.append('position', job.title);
      formData.append('department', job.department);
      formData.append('qualification', qualification);
      formData.append('experience', experienceYears);
      if (job._id) formData.append('jobId', job._id);
      if (coverNote) formData.append('coverNote', coverNote);
      if (resumeLink) formData.append('resumeUrl', resumeLink);
      if (resumeFile) formData.append('resume', resumeFile);

      const res = await fetch(`${API_URL}/careers/apply`, {
        method: 'POST',
        body: formData,
      });

      const data = (await res.json()) as { success: boolean; message?: string };

      if (data.success) {
        setSubmittedName(fullName);
        setApplySuccess(true);
        setFullName('');
        setEmail('');
        setMobile('');
        setExperienceYears('');
        setQualification('');
        setResumeLink('');
        setResumeFile(null);
        setCoverNote('');
      } else {
        setErrorMessage(data.message || 'Could not submit application. Please check your inputs.');
      }
    } catch (err) {
      console.error('Job application error:', err);
      setErrorMessage('Failed to connect to hospital server. Please try again or call HR.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fdfbf7] font-sans text-slate-800">
        <NewsTicker />
        <TopBar />
        <NavigationBar />
        <div className="py-24 text-center max-w-md mx-auto px-4">
          <div className="w-12 h-12 border-4 border-[#c83220] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[#172a34]">Loading Job Opening...</h2>
          <p className="text-xs text-slate-500 mt-1">Fetching role details and clinical requirements from Dr. B. S. Tomar Hospital.</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (notFound || !job) {
    return (
      <main className="min-h-screen bg-[#fdfbf7] font-sans text-slate-800">
        <NewsTicker />
        <TopBar />
        <NavigationBar />
        <div className="py-20 text-center max-w-lg mx-auto px-4">
          <span className="text-5xl block mb-3">🔍</span>
          <h1 className="text-2xl font-black text-[#172a34] mb-2">Job Opening Not Found</h1>
          <p className="text-sm text-slate-600 mb-6">
            This job vacancy may have been filled, updated, or is no longer accepting new applications.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/careers"
              className="bg-[#c83220] hover:bg-[#a82415] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow"
            >
              Browse All Vacancies ➔
            </Link>
            <Link
              href="/"
              className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs px-5 py-2.5 rounded-xl transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fdfbf7] font-sans text-slate-800">
      <NewsTicker />
      <TopBar />
      <NavigationBar />

      {/* HEADER BANNER */}
      <section
        className="relative text-white py-8 sm:py-12 border-b-4 border-[#c83220] bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(23, 42, 52, 0.96) 0%, rgba(15, 35, 46, 0.90) 50%, rgba(158, 36, 23, 0.85) 100%), url('/images/bst-hospital-exterior.jpg')",
        }}
      >
        <div className="w-full max-w-7xl 2xl:max-w-[1600px] min-[1900px]:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-widest mb-3 flex-wrap">
            <Link href="/" className="hover:text-white transition">
              HOME
            </Link>
            <span className="text-[#c83220]">/</span>
            <Link href="/careers" className="hover:text-white transition">
              CAREERS
            </Link>
            <span className="text-[#c83220]">/</span>
            <span className="text-amber-400 truncate max-w-xs sm:max-w-md">{job.title}</span>
          </nav>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-[#c83220] text-white text-[11px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              {job.department}
            </span>
            <span className="bg-white/15 text-slate-200 text-[11px] font-bold px-3 py-0.5 rounded-full border border-white/20">
              📍 {job.location || 'Jagatpura, Jaipur'}
            </span>
            <span className="bg-white/15 text-slate-200 text-[11px] font-bold px-3 py-0.5 rounded-full border border-white/20">
              ⏳ {job.type || 'Full-time'}
            </span>
            {job.vacancies && job.vacancies > 0 && (
              <span className="bg-emerald-500/90 text-white text-[11px] font-black px-3 py-0.5 rounded-full border border-emerald-400">
                👥 {job.vacancies} {job.vacancies === 1 ? 'Open Position' : 'Open Positions'}
              </span>
            )}
            <span className="bg-amber-400/90 text-slate-900 text-[11px] font-black px-3 py-0.5 rounded-full">
              💰 {job.salaryRange || 'Best in Industry'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3 leading-tight max-w-4xl">
            {job.title}
          </h1>

          <p className="text-slate-200 text-xs sm:text-sm max-w-3xl font-medium leading-relaxed mb-4">
            Join Dr. B. S. Tomar Institute of Medical Sciences & Hospital, Jagatpura, Jaipur. We provide tertiary care infrastructure, continuous learning, and a supportive clinical environment.
          </p>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#apply-form"
              className="bg-[#c83220] hover:bg-[#a82415] text-white font-black text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-lg transition hover:scale-105"
            >
              Apply For This Position ➔
            </a>
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow"
            >
              <span>💬</span>
              <span>Share on WhatsApp</span>
            </button>
            <button
              type="button"
              onClick={handleCopyLink}
              className="bg-white/15 hover:bg-white/25 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 border border-white/20"
            >
              <span>🔗</span>
              <span>{copiedLink ? 'Link Copied!' : 'Copy Job Link'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT + APPLICATION FORM */}
      <section className="py-10 sm:py-14 w-full max-w-7xl 2xl:max-w-[1600px] min-[1900px]:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 7 COLS: JOB DETAILS */}
          <div className="lg:col-span-7 space-y-8">
            {/* QUICK STATS CARD */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Department</span>
                <p className="text-xs sm:text-sm font-black text-[#172a34] mt-0.5">{job.department}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Experience Required</span>
                <p className="text-xs sm:text-sm font-black text-[#172a34] mt-0.5">{job.experience}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Job Schedule</span>
                <p className="text-xs sm:text-sm font-black text-[#172a34] mt-0.5">{job.type || 'Full-time'}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Openings</span>
                <p className="text-xs sm:text-sm font-black text-emerald-700 mt-0.5">{job.vacancies || 1} Vacancy</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Remuneration</span>
                <p className="text-xs sm:text-sm font-black text-[#c83220] mt-0.5">{job.salaryRange || 'Competitive'}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Location</span>
                <p className="text-xs sm:text-sm font-black text-[#172a34] mt-0.5">Jagatpura, Jaipur</p>
              </div>
            </div>

            {/* ROLE OVERVIEW & DESCRIPTION */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="text-xl">📋</span>
                <h2 className="text-lg sm:text-xl font-black text-[#172a34]">Role Overview & Purpose</h2>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line font-medium">
                {job.description}
              </p>
            </div>

            {/* REQUIREMENTS & ELIGIBILITY */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="text-xl">🎓</span>
                <h2 className="text-lg sm:text-xl font-black text-[#172a34]">Candidate Eligibility & Credentials</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-emerald-600 font-black mt-0.5">✓</span>
                  <div>
                    <strong className="text-xs sm:text-sm text-[#172a34] block">Experience Required:</strong>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">{job.experience}</p>
                  </div>
                </div>

                {job.requirements && (
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-600 font-black mt-0.5">✓</span>
                    <div>
                      <strong className="text-xs sm:text-sm text-[#172a34] block">Degree & Qualifications:</strong>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium">{job.requirements}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <span className="text-emerald-600 font-black mt-0.5">✓</span>
                  <div>
                    <strong className="text-xs sm:text-sm text-[#172a34] block">Regulatory & Registration:</strong>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">
                      Active registration with Rajasthan Medical Council (RMC) / Rajasthan Nursing Council (RNC) / National Medical Commission (NMC).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-emerald-600 font-black mt-0.5">✓</span>
                  <div>
                    <strong className="text-xs sm:text-sm text-[#172a34] block">Clinical Competencies:</strong>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">
                      High patient empathy, protocol adherence for ICU/OT sterile environments, and team-based multidisciplinary care coordination.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* WHY CHOOSE DR. B. S. TOMAR HOSPITAL */}
            <div className="bg-gradient-to-br from-[#172a34] to-[#203a48] text-white rounded-2xl p-6 sm:p-8 shadow-md space-y-4">
              <span className="text-amber-400 font-black text-xs uppercase tracking-widest block">
                LIFE AT DR. B. S. TOMAR HOSPITAL
              </span>
              <h2 className="text-lg sm:text-xl font-black">Why Work With Us?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-200 pt-2">
                <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                  <span className="text-lg block mb-1">🏥</span>
                  <strong className="text-white block text-xs">1000+ Bed Hospital</strong>
                  <p className="text-[11px] text-slate-300 mt-0.5">Expansive tertiary healthcare ecosystem with high patient footfall and clinical diversity.</p>
                </div>
                <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                  <span className="text-lg block mb-1">⚡</span>
                  <strong className="text-white block text-xs">Modern Diagnostic Labs</strong>
                  <p className="text-[11px] text-slate-300 mt-0.5">Multi-slice CT, modern digital OTs, high-frequency ventilators, and cath lab support.</p>
                </div>
                <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                  <span className="text-lg block mb-1">💼</span>
                  <strong className="text-white block text-xs">Timely Remuneration</strong>
                  <p className="text-[11px] text-slate-300 mt-0.5">Competitive hospital grade compensation, medical coverage for staff, and annual increments.</p>
                </div>
                <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                  <span className="text-lg block mb-1">📚</span>
                  <strong className="text-white block text-xs">Academic & CME Growth</strong>
                  <p className="text-[11px] text-slate-300 mt-0.5">Active conferences, clinical case presentations, and mentorship from senior medical faculty.</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 5 COLS: STICKY APPLICATION FORM */}
          <div className="lg:col-span-5" id="apply-form">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200/90 shadow-xl sticky top-24">
              <div className="border-b border-slate-100 pb-4 mb-5">
                <span className="text-[10px] font-black text-[#c83220] uppercase tracking-wider block mb-1">
                  OFFICIAL RECRUITMENT PORTAL
                </span>
                <h3 className="text-xl font-black text-[#172a34]">Apply for This Position</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your details and attach your CV. Our Human Resources team reviews applications promptly.
                </p>
              </div>

              {applySuccess ? (
                <div className="bg-gradient-to-b from-emerald-50 to-emerald-100/60 border-2 border-emerald-300 text-emerald-950 p-6 sm:p-7 rounded-3xl text-center space-y-4 shadow-sm animate-in fade-in duration-300">
                  <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto shadow-md">
                    ✓
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-200/60 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                      Application Verified &amp; Logged
                    </span>
                    <h4 className="text-xl font-black text-emerald-950">Application Received!</h4>
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed max-w-sm mx-auto">
                    Thank you{submittedName ? `, ${submittedName}` : ''}. Your application for <strong className="font-black text-emerald-950">{job.title}</strong> has been successfully registered in Dr. B. S. Tomar Hospital’s recruitment system.
                  </p>

                  <div className="bg-white/90 p-4 rounded-2xl border border-emerald-200 text-left text-xs space-y-2 shadow-xs">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-500 font-bold">Role:</span>
                      <span className="font-black text-[#172a34]">{job.title}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-500 font-bold">Department:</span>
                      <span className="font-bold text-slate-700">{job.department}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-500 font-bold">Location:</span>
                      <span className="font-bold text-slate-700">Jagatpura, Jaipur</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] pt-1.5 border-t border-emerald-100">
                      <span className="text-slate-500 font-bold">Status:</span>
                      <span className="font-black text-emerald-700 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Under Active HR Review
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-emerald-800 font-medium">
                    Our Hospital HR desk will review your qualifications and reach out directly via mobile or email for the interview schedule.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApplicationSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 text-[#c83220] text-xs font-bold rounded-xl flex items-center gap-2">
                      <span>⚠️</span>
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Job Badge Readonly */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block">Applying For</span>
                      <strong className="text-[#172a34] font-black text-xs block">{job.title}</strong>
                    </div>
                    <span className="bg-[#c83220]/10 text-[#c83220] font-black text-[10px] px-2 py-0.5 rounded">
                      {job.department}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Ramesh Sharma / Sister Sunita"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#c83220]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#c83220]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="doctor@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#c83220]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1">
                        Highest Qualification <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. MD, DNB, B.Sc Nursing"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#c83220]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1">
                        Total Experience <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 3 Years / Fresh Graduate"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#c83220]"
                      />
                    </div>
                  </div>

                  {/* RESUME UPLOAD SECTION */}
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-dashed border-slate-300 space-y-2">
                    <label className="block text-xs font-black text-slate-800">
                      Upload Resume / CV File (PDF / DOC) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setResumeFile(e.target.files[0]);
                          setResumeLink('');
                        }
                      }}
                      className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-[#172a34] file:text-white hover:file:bg-[#203a48] cursor-pointer"
                    />

                    <div className="flex items-center gap-2 pt-1">
                      <div className="h-px bg-slate-200 flex-1" />
                      <span className="text-[10px] text-slate-400 font-bold uppercase">or provide link</span>
                      <div className="h-px bg-slate-200 flex-1" />
                    </div>

                    <input
                      type="url"
                      placeholder="Google Drive / Dropbox / LinkedIn URL"
                      value={resumeLink}
                      onChange={(e) => {
                        setResumeLink(e.target.value);
                        if (e.target.value) setResumeFile(null);
                      }}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#c83220]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1">
                      Short Note / Clinical Experience Highlights
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Mention your special clinical interests, current hospital, notice period, or registration details..."
                      value={coverNote}
                      onChange={(e) => setCoverNote(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#c83220]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#c83220] hover:bg-[#a82415] disabled:bg-slate-400 text-white font-black text-sm py-3 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <span>Submit Application Now ➔</span>
                    )}
                  </button>

                  <p className="text-[10px] text-slate-400 text-center">
                    Your personal information and credentials are encrypted and accessed strictly by Dr. B. S. Tomar Hospital recruitment panel.
                  </p>
                </form>
              )}

              {/* DIRECT HR CONTACT */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">Hospital HR Desk</span>
                  <a href="tel:+917412077125" className="text-[#172a34] font-black hover:text-[#c83220] transition">
                    📞 +91 74120 77125
                  </a>
                </div>
                <a
                  href={`https://wa.me/917412077125?text=Hello%20Dr.%20B.%20S.%20Tomar%20Hospital%20HR%2C%20I%20am%20inquiring%20about%20the%20${encodeURIComponent(
                    job.title
                  )}%20opening.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-bold text-[11px] px-3 py-1.5 rounded-lg transition"
                >
                  💬 Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OTHER OPEN POSITIONS */}
      {relatedJobs.length > 0 && (
        <section className="py-12 bg-white border-t border-slate-200/80">
          <div className="w-full max-w-7xl 2xl:max-w-[1600px] min-[1900px]:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-2">
              <div>
                <span className="text-[#c83220] font-black text-xs uppercase tracking-widest block mb-1">
                  MORE OPPORTUNITIES
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#172a34]">Other Open Positions at Dr. B. S. Tomar Hospital</h3>
              </div>
              <Link
                href="/careers"
                className="text-xs font-black text-[#c83220] hover:underline flex items-center gap-1"
              >
                <span>View All Openings</span>
                <span>➔</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedJobs.map((item) => {
                const relSlug = item.slug || slugifyJobTitle(item.title);
                return (
                  <div
                    key={item._id || item.title}
                    className="bg-[#fdfbf7] p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-red-50 text-[#c83220] text-[10px] font-black px-2 py-0.5 rounded-full uppercase border border-red-200">
                          {item.department}
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold">
                          ⏳ {item.type || 'Full-time'}
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-[#172a34] mb-1.5 line-clamp-1">{item.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">{item.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200/70">
                      <span className="text-[11px] font-bold text-slate-500">Exp: {item.experience}</span>
                      <Link
                        href={`/careers/${relSlug}`}
                        className="text-xs font-black text-[#c83220] hover:text-[#a82415] transition"
                      >
                        View & Apply ➔
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}

