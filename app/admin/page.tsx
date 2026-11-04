'use client';

import React, { useState, useEffect } from 'react';
import { API_URL, DoctorData, PackageInquiryData, ContactMessageData, CareerApplicationData, JobOpeningData, slugifyJobTitle } from '@/lib/api';

export default function AdminPortal() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Sidebar & Navigation state
  const [activeTab, setActiveTab] = useState<'doctors' | 'enquiries' | 'contacts' | 'careers'>('doctors');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Data states
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [enquiries, setEnquiries] = useState<PackageInquiryData[]>([]);
  const [contacts, setContacts] = useState<ContactMessageData[]>([]);
  const [applications, setApplications] = useState<CareerApplicationData[]>([]);
  const [jobs, setJobs] = useState<JobOpeningData[]>([]);
  const [loading, setLoading] = useState(false);

  // Careers Sub-tab & Job Management State
  const [careersSubTab, setCareersSubTab] = useState<'jobs' | 'applicants'>('jobs');
  const [selectedJobForFilter, setSelectedJobForFilter] = useState<string>('All');
  const [isEditingJob, setIsEditingJob] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [jobSaving, setJobSaving] = useState(false);

  const [jobForm, setJobForm] = useState({
    title: '',
    department: 'Critical Care Medicine',
    location: 'Jagatpura, Jaipur',
    experience: '3+ Years',
    type: 'Full-time',
    vacancies: 1,
    salaryRange: 'Best in Industry',
    description: '',
    requirements: '',
    isActive: true,
  });

  // Search & Filter state for Doctors Table
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [activeActionMenuId, setActiveActionMenuId] = useState<string | null>(null);

  // Career Applications Filter & Detail State
  const [careerSearchQuery, setCareerSearchQuery] = useState('');
  const [careerStatusFilter, setCareerStatusFilter] = useState('All');
  const [selectedApplication, setSelectedApplication] = useState<CareerApplicationData | null>(null);
  const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null);
  const [previewingResume, setPreviewingResume] = useState<{ url: string; candidateName: string; position: string } | null>(null);

  // Full-Page Doctor Editor State (Replaces Cramped Modal)
  const [isEditingDoctor, setIsEditingDoctor] = useState(false);
  const [editingDoctorId, setEditingDoctorId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [saveLoading, setSaveLoading] = useState(false);

  const [doctorForm, setDoctorForm] = useState({
    name: '',
    specialty: '',
    department: 'General & Laparoscopic Surgery',
    category: 'General Surgery',
    designation: 'Senior Consultant & Specialist',
    qualification: '',
    experience: '10+ Years',
    opdTimings: 'Mon - Sat: 9:00 AM - 4:00 PM',
    consultationFee: '₹500',
    phone: '+91 74120 77125',
    email: '',
    about: '',
    specializations: '',
    image: '',
    isFeatured: false,
    isAvailable: true,
  });

  const categories = [
    'General Surgery',
    'Internal Medicine',
    'Orthopedics',
    'Gynaecology',
    'Pediatrics',
    'Critical Care / ICU',
    'ENT & Ophthalmology',
    'Dermatology',
    'Radiodiagnosis',
    'Pathology',
  ];

  // Check existing token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('bst_admin_token');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Fetch Doctors
      const resDocs = await fetch(`${API_URL}/doctors`);
      const dataDocs = (await resDocs.json()) as any;
      if (dataDocs.success) setDoctors(dataDocs.data);

      // Fetch Enquiries
      const resEnq = await fetch(`${API_URL}/packages/inquiries`);
      const dataEnq = (await resEnq.json()) as any;
      if (dataEnq.success) setEnquiries(dataEnq.data);

      // Fetch Contact Messages
      const resCont = await fetch(`${API_URL}/contact`);
      const dataCont = (await resCont.json()) as any;
      if (dataCont.success) setContacts(dataCont.data);

      // Fetch Career Applications & Job Openings (Protected)
      const currentToken = token || localStorage.getItem('bst_admin_token');
      if (currentToken) {
        const [resApps, resJobs] = await Promise.all([
          fetch(`${API_URL}/careers/applications`, {
            headers: { Authorization: `Bearer ${currentToken}` },
          }),
          fetch(`${API_URL}/careers/admin/jobs`, {
            headers: { Authorization: `Bearer ${currentToken}` },
          }),
        ]);

        const dataApps = (await resApps.json()) as any;
        if (dataApps.success) setApplications(dataApps.data);

        const dataJobs = (await resJobs.json()) as any;
        if (dataJobs.success) setJobs(dataJobs.data);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Job Opening Handlers
  const handleOpenNewJob = () => {
    setEditingJobId(null);
    setJobForm({
      title: '',
      department: 'Critical Care Medicine',
      location: 'Jagatpura, Jaipur',
      experience: '2+ Years',
      type: 'Full-time',
      vacancies: 1,
      salaryRange: 'Best in Healthcare Industry',
      description: '',
      requirements: '',
      isActive: true,
    });
    setIsEditingJob(true);
  };

  const handleOpenEditJob = (job: JobOpeningData) => {
    setEditingJobId(job._id || null);
    setJobForm({
      title: job.title,
      department: job.department,
      location: job.location || 'Jagatpura, Jaipur',
      experience: job.experience,
      type: job.type || 'Full-time',
      vacancies: job.vacancies || 1,
      salaryRange: job.salaryRange || 'Best in Healthcare Industry',
      description: job.description,
      requirements: job.requirements || '',
      isActive: job.isActive !== undefined ? job.isActive : true,
    });
    setIsEditingJob(true);
  };

  const handleSaveJob = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!jobForm.title || !jobForm.department || !jobForm.experience || !jobForm.description) {
      alert('Please fill Title, Department, Experience, and Description');
      return;
    }

    setJobSaving(true);
    try {
      const currentToken = token || localStorage.getItem('bst_admin_token');
      const url = editingJobId
        ? `${API_URL}/careers/jobs/${editingJobId}`
        : `${API_URL}/careers/jobs`;
      const method = editingJobId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentToken}`,
        },
        body: JSON.stringify(jobForm),
      });

      const data = (await res.json()) as any;
      if (data.success) {
        setIsEditingJob(false);
        fetchAllData();
      } else {
        alert(data.message || 'Failed to save job opening');
      }
    } catch (err) {
      console.error('Save job error:', err);
      alert('Error saving job opening');
    } finally {
      setJobSaving(false);
    }
  };

  const handleToggleJob = async (id?: string) => {
    if (!id) return;
    try {
      const currentToken = token || localStorage.getItem('bst_admin_token');
      const res = await fetch(`${API_URL}/careers/jobs/${id}/toggle`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      const data = (await res.json()) as any;
      if (data.success) {
        setJobs((prev) =>
          prev.map((j) => (j._id === id ? { ...j, isActive: !j.isActive } : j))
        );
      }
    } catch (err) {
      console.error('Toggle job error:', err);
    }
  };

  const handleDeleteJob = async (id?: string) => {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this job vacancy?')) return;
    try {
      const currentToken = token || localStorage.getItem('bst_admin_token');
      const res = await fetch(`${API_URL}/careers/jobs/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      const data = (await res.json()) as any;
      if (data.success) {
        setJobs((prev) => prev.filter((j) => j._id !== id));
      }
    } catch (err) {
      console.error('Delete job error:', err);
    }
  };

  // Update Career Application Status
  const handleUpdateApplicationStatus = async (id: string, newStatus: string) => {
    setStatusUpdatingId(id);
    try {
      const currentToken = token || localStorage.getItem('bst_admin_token');
      const res = await fetch(`${API_URL}/careers/applications/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentToken}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = (await res.json()) as any;
      if (data.success) {
        setApplications((prev) =>
          prev.map((app) => (app._id === id ? { ...app, status: newStatus as any } : app))
        );
        if (selectedApplication && selectedApplication._id === id) {
          setSelectedApplication((prev) => (prev ? { ...prev, status: newStatus as any } : null));
        }
      } else {
        alert(data.message || 'Failed to update application status');
      }
    } catch (err) {
      console.error('Status update error:', err);
      alert('Error updating status');
    } finally {
      setStatusUpdatingId(null);
    }
  };

  // Delete Career Application
  const handleDeleteApplication = async (id?: string) => {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this job application?')) return;
    try {
      const currentToken = token || localStorage.getItem('bst_admin_token');
      const res = await fetch(`${API_URL}/careers/applications/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      const data = (await res.json()) as any;
      if (data.success) {
        setApplications((prev) => prev.filter((app) => app._id !== id));
        if (selectedApplication && selectedApplication._id === id) {
          setSelectedApplication(null);
        }
      } else {
        alert(data.message || 'Failed to delete application');
      }
    } catch (err) {
      console.error('Delete application error:', err);
      alert('Error deleting application');
    }
  };

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = (await res.json()) as any;

      if (data.success && data.token) {
        localStorage.setItem('bst_admin_token', data.token);
        setToken(data.token);
        setIsAuthenticated(true);
      } else {
        setLoginError(data.message || 'Invalid username or password');
      }
    } catch (err) {
      setLoginError('Cannot connect to backend server. Ensure backend is running.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('bst_admin_token');
    setToken(null);
    setIsAuthenticated(false);
    setPassword('');
  };

  // Handle Image Upload to S3
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show temporary local preview
    setImagePreview(URL.createObjectURL(file));
    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('folder', 'bst/doctors');

      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = (await res.json()) as any;
      if (data.success && data.url) {
        setDoctorForm((prev) => ({ ...prev, image: data.url }));
        setImagePreview(data.url);
      } else {
        alert(data.message || 'Failed to upload image to S3');
      }
    } catch (err) {
      console.error('Image upload error:', err);
      alert('Error uploading image to AWS S3. Check backend logs.');
    } finally {
      setUploadingImage(false);
    }
  };

  // Open Full Page for New Doctor
  const handleOpenNewDoctor = () => {
    setEditingDoctorId(null);
    setImagePreview('/doctors/doctor-orthopaedics.png');
    setDoctorForm({
      name: '',
      specialty: '',
      department: 'General & Laparoscopic Surgery',
      category: 'General Surgery',
      designation: 'Senior Consultant & Specialist',
      qualification: '',
      experience: '10+ Years',
      opdTimings: 'Mon - Sat: 9:00 AM - 4:00 PM',
      consultationFee: '₹500',
      phone: '+91 74120 77125',
      email: '',
      about: '',
      specializations: '',
      image: '/doctors/doctor-orthopaedics.png',
      isFeatured: false,
      isAvailable: true,
    });
    setIsEditingDoctor(true);
  };

  // Open Full Page for Edit Doctor
  const handleOpenEditDoctor = (doc: DoctorData) => {
    setEditingDoctorId(doc._id || null);
    setImagePreview(doc.image || '/doctors/doctor-orthopaedics.png');
    setDoctorForm({
      name: doc.name,
      specialty: doc.specialty,
      department: doc.department,
      category: doc.category || 'General Surgery',
      designation: doc.designation || 'Senior Consultant & Specialist',
      qualification: doc.qualification,
      experience: doc.experience || '10+ Years',
      opdTimings: doc.opdTimings || 'Mon - Sat: 9:00 AM - 4:00 PM',
      consultationFee: doc.consultationFee || '₹500',
      phone: doc.phone || '+91 74120 77125',
      email: doc.email || '',
      about: doc.about || '',
      specializations: Array.isArray(doc.specializations) ? doc.specializations.join(', ') : '',
      image: doc.image || '/doctors/doctor-orthopaedics.png',
      isFeatured: Boolean(doc.isFeatured),
      isAvailable: doc.isAvailable !== undefined ? doc.isAvailable : true,
    });
    setIsEditingDoctor(true);
  };

  // Submit Doctor Form (Create or Update)
  const handleDoctorSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!doctorForm.name || !doctorForm.specialty || !doctorForm.qualification) {
      alert('Please fill Doctor Name, Specialty, and Qualification');
      return;
    }

    setSaveLoading(true);
    try {
      const payload = {
        ...doctorForm,
        specializations: doctorForm.specializations
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      };

      const url = editingDoctorId
        ? `${API_URL}/doctors/${editingDoctorId}`
        : `${API_URL}/doctors`;

      const method = editingDoctorId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as any;
      if (data.success) {
        setIsEditingDoctor(false);
        fetchAllData();
      } else {
        alert(data.message || 'Operation failed');
      }
    } catch (err) {
      console.error('Save doctor error:', err);
      alert('Failed to save doctor to database.');
    } finally {
      setSaveLoading(false);
    }
  };

  // Delete Doctor
  const handleDeleteDoctor = async (id?: string) => {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this doctor from database?')) return;

    try {
      const res = await fetch(`${API_URL}/doctors/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = (await res.json()) as any;
      if (data.success) {
        fetchAllData();
      } else {
        alert(data.message || 'Failed to delete doctor');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error deleting doctor');
    }
  };

  // Filtered doctors list for table search
  const filteredDoctors = doctors.filter((doc) => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      doc.name.toLowerCase().includes(q) ||
      doc.specialty.toLowerCase().includes(q) ||
      doc.department.toLowerCase().includes(q) ||
      (doc.qualification && doc.qualification.toLowerCase().includes(q));
    const matchCat =
      selectedCategoryFilter === 'All' || doc.category === selectedCategoryFilter;
    return matchSearch && matchCat;
  });

  // Filtered career applications list
  const filteredApplications = applications.filter((app) => {
    const q = careerSearchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      app.fullName.toLowerCase().includes(q) ||
      app.position.toLowerCase().includes(q) ||
      app.email.toLowerCase().includes(q) ||
      app.phone.toLowerCase().includes(q) ||
      app.qualification.toLowerCase().includes(q) ||
      (app.department && app.department.toLowerCase().includes(q));
    const matchStatus =
      careerStatusFilter === 'All' || app.status === careerStatusFilter;
    const matchJob =
      selectedJobForFilter === 'All' ||
      app.position === selectedJobForFilter ||
      app.jobId === selectedJobForFilter;
    return matchSearch && matchStatus && matchJob;
  });

  // ========================================================
  // RENDER: LOGIN VIEW (IF NOT AUTHENTICATED)
  // ========================================================
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#172a34] via-[#0f232e] to-[#2b100d] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
          <div className="bg-[#172a34] p-8 text-center text-white border-b-4 border-[#c83220]">
            <img
              src="/bst-nav-logo.jpg"
              alt="Dr. BST Hospital"
              className="h-12 mx-auto mb-3 object-contain bg-white/95 rounded-lg p-1.5"
            />
            <h1 className="text-xl font-black tracking-tight">Admin Management Portal</h1>
            <p className="text-xs text-slate-300 mt-1">Sign in to manage Doctors, Enquiries &amp; S3 Media</p>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-5">
            {loginError && (
              <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-semibold rounded">
                ⚠️ {loginError}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#c83220]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#c83220]"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-[#c83220] hover:bg-[#a82415] text-white font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              {loginLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>🔐 Access Admin Dashboard</span>
                  <span>➔</span>
                </>
              )}
            </button>
          </form>

          <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
            <a href="/" className="text-xs font-bold text-[#172a34] hover:text-[#c83220]">
              ← Return to BST Hospital Website
            </a>
          </div>
        </div>
      </main>
    );
  }

  // ========================================================
  // RENDER: AUTHENTICATED ADMIN SIDEBAR DASHBOARD
  // ========================================================
  return (
    <div className="h-screen overflow-hidden bg-slate-100 flex font-sans">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* ========================================================
          LEFT SIDEBAR (Fixed Height, Independent Scroll)
          ======================================================== */}
      <aside
        className={`fixed lg:sticky top-0 h-screen w-64 sm:w-72 bg-[#172a34] text-white flex flex-col justify-between shrink-0 border-r-4 border-[#c83220] shadow-2xl z-40 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Scrollable Navigation Section */}
        <div className="flex-1 overflow-y-auto">
          {/* Sidebar Brand Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <a href="/" target="_blank" rel="noopener noreferrer" className="block">
              <img
                src="/bst-nav-logo.jpg"
                alt="BST Hospital"
                className="h-10 bg-white/95 rounded-lg p-1 object-contain"
              />
            </a>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white text-lg p-1"
            >
              ✕
            </button>
          </div>

          {/* Admin Title Tag */}
          <div className="px-5 py-3 bg-[#0e191f] border-b border-white/5 flex items-center justify-between">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#c83220]">
              ADMIN DASHBOARD
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live
            </span>
          </div>

          {/* Navigation Menu / Tabs */}
          <nav className="p-4 space-y-2">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider px-3 mb-2">
              Management Modules
            </p>

            {/* Tab 1: Doctors */}
            <button
              onClick={() => {
                setActiveTab('doctors');
                setIsEditingDoctor(false);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'doctors' && !isEditingDoctor
                  ? 'bg-[#c83220] text-white shadow-lg shadow-red-900/30 font-black'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">👨‍⚕️</span>
                <span>Doctors Directory</span>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                  activeTab === 'doctors' && !isEditingDoctor
                    ? 'bg-white text-[#c83220]'
                    : 'bg-white/15 text-slate-300'
                }`}
              >
                {doctors.length}
              </span>
            </button>

            {/* Tab 2: Package Enquiries */}
            <button
              onClick={() => {
                setActiveTab('enquiries');
                setIsEditingDoctor(false);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'enquiries'
                  ? 'bg-[#c83220] text-white shadow-lg shadow-red-900/30 font-black'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">📋</span>
                <span>Package Enquiries</span>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                  activeTab === 'enquiries'
                    ? 'bg-white text-[#c83220]'
                    : 'bg-white/15 text-slate-300'
                }`}
              >
                {enquiries.length}
              </span>
            </button>

            {/* Tab 3: Contact Messages */}
            <button
              onClick={() => {
                setActiveTab('contacts');
                setIsEditingDoctor(false);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'contacts'
                  ? 'bg-[#c83220] text-white shadow-lg shadow-red-900/30 font-black'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">✉️</span>
                <span>Contact Inquiries</span>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                  activeTab === 'contacts'
                    ? 'bg-white text-[#c83220]'
                    : 'bg-white/15 text-slate-300'
                }`}
              >
                {contacts.length}
              </span>
            </button>

            {/* Tab 4: Job Applications (Careers) */}
            <button
              onClick={() => {
                setActiveTab('careers');
                setIsEditingDoctor(false);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'careers'
                  ? 'bg-[#c83220] text-white shadow-lg shadow-red-900/30 font-black'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">💼</span>
                <span>Job Applications</span>
              </div>
              <div className="flex items-center gap-1.5">
                {applications.filter((a) => a.status === 'New').length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" title="New applications waiting" />
                )}
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                    activeTab === 'careers'
                      ? 'bg-white text-[#c83220]'
                      : 'bg-white/15 text-slate-300'
                  }`}
                >
                  {applications.length}
                </span>
              </div>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer: Pinned at bottom, NEVER scrolls */}
        <div className="shrink-0 p-4 border-t border-white/10 bg-[#0e191f]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#c83220] text-white font-black text-xs flex items-center justify-center shadow-md shrink-0">
                A
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">Administrator</p>
                <p className="text-[10px] text-slate-400 truncate">admin@bsthospital</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white transition cursor-pointer text-xs font-bold shrink-0 flex items-center gap-1"
            >
              <span>🚪</span>
              <span>Exit</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ========================================================
          RIGHT MAIN CONTENT AREA (Independent Scroll Container)
          ======================================================== */}
      <div className="flex-1 h-screen overflow-y-auto flex flex-col min-w-0 bg-slate-100">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
          <div className="px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
                aria-label="Open sidebar"
              >
                ☰
              </button>

              <div>
                <h2 className="text-base sm:text-lg font-black text-[#172a34]">
                  {isEditingDoctor
                    ? editingDoctorId
                      ? `✏️ Edit Specialist: ${doctorForm.name}`
                      : '➕ Add New Medical Specialist'
                    : activeTab === 'doctors'
                    ? '👨‍⚕️ Doctors Directory & Profiles (48 Specialists)'
                    : activeTab === 'enquiries'
                    ? '📋 Preventive Health Package Enquiries'
                    : activeTab === 'contacts'
                    ? '✉️ Patient Contact Inquiries'
                    : '💼 Hospital Job Applications & CV Submissions'}
                </h2>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  Dr. B. S. Tomar Hospital Management Console
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {isEditingDoctor ? (
                <button
                  onClick={() => setIsEditingDoctor(false)}
                  className="px-3.5 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
                >
                  ← Back to List
                </button>
              ) : (
                activeTab === 'doctors' ? (
                  <button
                    onClick={handleOpenNewDoctor}
                    className="bg-[#c83220] hover:bg-[#a82415] text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-md flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>➕ Add Doctor</span>
                  </button>
                ) : activeTab === 'careers' ? (
                  <button
                    onClick={handleOpenNewJob}
                    className="bg-[#c83220] hover:bg-[#a82415] text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-md flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>➕ Post Job</span>
                  </button>
                ) : null
              )}

              <button
                onClick={fetchAllData}
                title="Refresh Data"
                className="p-2 text-xs font-bold text-slate-600 hover:text-[#c83220] bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
              >
                🔄
              </button>

              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-white bg-slate-100 hover:bg-[#172a34] px-3 py-2 rounded-xl transition whitespace-nowrap"
              >
                <span>🌐 Website</span>
                <span>➔</span>
              </a>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-4 sm:p-8 flex-1">
          {/* ========================================================
              FULL PAGE VIEW: DOCTOR ADD / EDIT FORM
              ======================================================== */}
          {isEditingDoctor ? (
            <div className="max-w-5xl mx-auto space-y-6">
              {/* Back breadcrumb and Actions Banner */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsEditingDoctor(false)}
                    className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#172a34] flex items-center justify-center font-black transition cursor-pointer"
                    title="Return to Doctors list"
                  >
                    ←
                  </button>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      DOCTOR PROFILE EDITOR
                    </span>
                    <h3 className="text-lg font-black text-[#172a34]">
                      {editingDoctorId ? doctorForm.name : 'New Medical Specialist Profile'}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsEditingDoctor(false)}
                    className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl border border-slate-200 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDoctorSubmit()}
                    disabled={saveLoading}
                    className="bg-[#c83220] hover:bg-[#a82415] text-white font-bold text-xs px-6 py-2.5 rounded-xl transition shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <span>{saveLoading ? 'Saving...' : '💾 Save & Publish Specialist'}</span>
                  </button>
                </div>
              </div>

              {/* Form Cards */}
              <form onSubmit={handleDoctorSubmit} className="space-y-6">
                {/* CARD 1: S3 IMAGE UPLOADER */}
                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">📸</span>
                      <h4 className="font-black text-sm text-[#172a34]">
                        Doctor Profile Photo (AWS S3 Upload)
                      </h4>
                    </div>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
                      Bucket: lms-media-storage-2026/bst/doctors
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-6 pt-1">
                    <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-2 border-slate-200 bg-slate-50 shrink-0 shadow-inner flex items-center justify-center group">
                      <img
                        src={imagePreview || '/doctors/doctor-orthopaedics.png'}
                        alt="Doctor Preview"
                        className="w-full h-full object-cover object-top"
                      />
                      {uploadingImage && (
                        <div className="absolute inset-0 bg-black/60 text-white text-[11px] font-bold flex flex-col items-center justify-center p-2 text-center">
                          <span className="animate-spin mb-1">⏳</span>
                          <span>Uploading to S3...</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 flex-1 w-full text-center sm:text-left">
                      <label className="block text-xs font-bold text-slate-800">
                        Upload New Photo to S3
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="block w-full text-xs text-slate-500 file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#172a34] file:text-white hover:file:bg-[#c83220] file:cursor-pointer cursor-pointer border border-slate-200 rounded-2xl p-1 bg-slate-50/50"
                      />
                      <p className="text-[11px] text-slate-400">
                        Choose a clear, professional portrait photo (JPG, PNG, WEBP). It will be stored in S3 and live updated on website.
                      </p>
                      {doctorForm.image && (
                        <div className="text-[11px] text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 font-mono truncate max-w-xl">
                          ✓ S3 Path: {doctorForm.image}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* CARD 2: BASIC & SPECIALTY INFORMATION */}
                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                    <span className="text-xl">🩺</span>
                    <h4 className="font-black text-sm text-[#172a34]">
                      Personal &amp; Department Identity
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Doctor Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={doctorForm.name}
                        onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
                        placeholder="e.g. Dr. Dhirendra Godara"
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#c83220] focus:outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Primary Specialty / Sub-specialty *
                      </label>
                      <input
                        type="text"
                        required
                        value={doctorForm.specialty}
                        onChange={(e) => setDoctorForm({ ...doctorForm, specialty: e.target.value })}
                        placeholder="e.g. General and Laparoscopic Surgeon"
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#c83220] focus:outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Department Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={doctorForm.department}
                        onChange={(e) => setDoctorForm({ ...doctorForm, department: e.target.value })}
                        placeholder="e.g. General & Laparoscopic Surgery"
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#c83220] focus:outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Department Category (Filter Tag) *
                      </label>
                      <select
                        value={doctorForm.category}
                        onChange={(e) => setDoctorForm({ ...doctorForm, category: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#c83220] focus:outline-none bg-white font-medium"
                      >
                        {categories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Designation / Position
                      </label>
                      <input
                        type="text"
                        value={doctorForm.designation}
                        onChange={(e) => setDoctorForm({ ...doctorForm, designation: e.target.value })}
                        placeholder="e.g. Senior Consultant & Specialist"
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#c83220] focus:outline-none font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* CARD 3: QUALIFICATIONS & PRICING */}
                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                    <span className="text-xl">🎓</span>
                    <h4 className="font-black text-sm text-[#172a34]">
                      Qualifications, Experience &amp; OPD Pricing
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Qualifications &amp; Degrees *
                      </label>
                      <input
                        type="text"
                        required
                        value={doctorForm.qualification}
                        onChange={(e) => setDoctorForm({ ...doctorForm, qualification: e.target.value })}
                        placeholder="e.g. MBBS, MS, FMAS, Fellow in Laparoscopy"
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#c83220] focus:outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Clinical Experience
                      </label>
                      <input
                        type="text"
                        value={doctorForm.experience}
                        onChange={(e) => setDoctorForm({ ...doctorForm, experience: e.target.value })}
                        placeholder="e.g. 15+ Years"
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#c83220] focus:outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        OPD Consultation Fee
                      </label>
                      <input
                        type="text"
                        value={doctorForm.consultationFee}
                        onChange={(e) => setDoctorForm({ ...doctorForm, consultationFee: e.target.value })}
                        placeholder="₹500"
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#c83220] focus:outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Contact Helpline / Phone
                      </label>
                      <input
                        type="text"
                        value={doctorForm.phone}
                        onChange={(e) => setDoctorForm({ ...doctorForm, phone: e.target.value })}
                        placeholder="+91 74120 77125"
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#c83220] focus:outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Official Email (Optional)
                      </label>
                      <input
                        type="email"
                        value={doctorForm.email}
                        onChange={(e) => setDoctorForm({ ...doctorForm, email: e.target.value })}
                        placeholder="doctor@bsthospital.com"
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#c83220] focus:outline-none font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* CARD 4: SCHEDULE & AVAILABILITY */}
                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                    <span className="text-xl">📅</span>
                    <h4 className="font-black text-sm text-[#172a34]">
                      OPD Schedule &amp; Online Status
                    </h4>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      OPD Timings
                    </label>
                    <input
                      type="text"
                      value={doctorForm.opdTimings}
                      onChange={(e) => setDoctorForm({ ...doctorForm, opdTimings: e.target.value })}
                      placeholder="Mon - Sat: 9:00 AM - 4:00 PM"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#c83220] focus:outline-none font-medium"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      <input
                        type="checkbox"
                        checked={doctorForm.isAvailable}
                        onChange={(e) => setDoctorForm({ ...doctorForm, isAvailable: e.target.checked })}
                        className="w-4 h-4 rounded text-[#c83220] focus:ring-[#c83220]"
                      />
                      <span>✓ Available for OPD Consultation</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      <input
                        type="checkbox"
                        checked={doctorForm.isFeatured}
                        onChange={(e) => setDoctorForm({ ...doctorForm, isFeatured: e.target.checked })}
                        className="w-4 h-4 rounded text-[#c83220] focus:ring-[#c83220]"
                      />
                      <span>🌟 Feature on Website Home Page</span>
                    </label>
                  </div>
                </div>

                {/* CARD 5: ABOUT BIOGRAPHY */}
                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                    <span className="text-xl">📝</span>
                    <h4 className="font-black text-sm text-[#172a34]">
                      About Doctor &amp; Clinical Biography (Appears on Detail Page)
                    </h4>
                  </div>

                  <div>
                    <textarea
                      rows={5}
                      value={doctorForm.about}
                      onChange={(e) => setDoctorForm({ ...doctorForm, about: e.target.value })}
                      placeholder="Provide comprehensive details about clinical expertise, past experience, achievements, and patient care philosophy..."
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-2xl border border-slate-300 focus:ring-2 focus:ring-[#c83220] focus:outline-none leading-relaxed font-medium"
                    />
                  </div>
                </div>

                {/* CARD 6: SPECIALIZATIONS */}
                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                    <span className="text-xl">⭐</span>
                    <h4 className="font-black text-sm text-[#172a34]">
                      Key Clinical Specializations &amp; Procedures (Comma separated)
                    </h4>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={doctorForm.specializations}
                      onChange={(e) => setDoctorForm({ ...doctorForm, specializations: e.target.value })}
                      placeholder="e.g. Laparoscopic Cholecystectomy, Hernia Repair, Gastro Endoscopy, Trauma Surgery"
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#c83220] focus:outline-none font-medium"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Separate each specialty or procedure with a comma. They will be displayed as verified checkmark badges on the doctor&apos;s detail page.
                    </p>
                  </div>
                </div>

                {/* BOTTOM STICKY ACTION BAR */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center justify-end gap-3 sticky bottom-4 shadow-xl z-20">
                  <button
                    type="button"
                    onClick={() => setIsEditingDoctor(false)}
                    className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saveLoading}
                    className="bg-[#c83220] hover:bg-[#a82415] text-white font-bold text-xs px-8 py-3 rounded-xl transition shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <span>{saveLoading ? 'Saving...' : '💾 Save & Publish Specialist'}</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* ========================================================
                NORMAL VIEW: DOCTORS DIRECTORY TABLE
                ======================================================== */
            activeTab === 'doctors' && (
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-black text-[#172a34]">
                      Hospital Medical Specialists ({doctors.length})
                    </h3>
                    <p className="text-xs text-slate-500">
                      Doctors shown here are dynamically rendered on the website and each doctor has a dedicated public profile page.
                    </p>
                  </div>
                  <button
                    onClick={handleOpenNewDoctor}
                    className="bg-[#172a34] hover:bg-[#c83220] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm w-fit cursor-pointer"
                  >
                    ➕ Upload New Specialist
                  </button>
                </div>

                {/* Instant Search & Category Filter Toolbar */}
                <div className="p-4 bg-slate-50/80 border-b border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative flex-1 w-full">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search doctor by name, specialty, degree, department..."
                      className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#c83220] bg-white font-medium"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <select
                      value={selectedCategoryFilter}
                      onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                      className="w-full sm:w-auto px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#c83220] bg-white font-medium text-slate-700"
                    >
                      <option value="All">All Categories ({doctors.length})</option>
                      {categories.map((cat) => {
                        const count = doctors.filter((d) => d.category === cat).length;
                        return (
                          <option key={cat} value={cat}>
                            {cat} ({count})
                          </option>
                        );
                      })}
                    </select>

                    <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap hidden md:inline">
                      Showing {filteredDoctors.length} of {doctors.length}
                    </span>
                  </div>
                </div>

                {loading ? (
                  <div className="p-12 text-center text-slate-400 text-sm">
                    Loading specialists from database...
                  </div>
                ) : doctors.length === 0 ? (
                  <div className="p-12 text-center text-slate-400 text-sm">
                    No doctors found in database. Click &quot;Add Doctor&quot; to upload the first specialist!
                  </div>
                ) : filteredDoctors.length === 0 ? (
                  <div className="p-12 text-center text-slate-500 text-sm space-y-2">
                    <p>No specialists match &quot;{searchQuery}&quot;.</p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategoryFilter('All');
                      }}
                      className="text-xs font-bold text-[#c83220] hover:underline"
                    >
                      Clear Search &amp; Filters
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto pb-28">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                      <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
                        <tr>
                          <th className="py-3.5 px-5 font-bold">Doctor</th>
                          <th className="py-3.5 px-4 font-bold">Specialty &amp; Category</th>
                          <th className="py-3.5 px-4 font-bold">Qualification &amp; Exp</th>
                          <th className="py-3.5 px-4 font-bold">OPD Timings</th>
                          <th className="py-3.5 px-4 font-bold">Fee</th>
                          <th className="py-3.5 px-4 font-bold text-center w-16">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredDoctors.map((doc, idx) => {
                          const isNearBottom = idx >= filteredDoctors.length - 2 && filteredDoctors.length > 2;
                          return (
                            <tr
                              key={doc._id}
                              className="hover:bg-slate-50/80 transition group"
                            >
                              {/* DOCTOR IDENTITY */}
                              <td className="py-3.5 px-5 min-w-[270px]">
                                <div className="flex items-center gap-3.5">
                                  <img
                                    src={doc.image || '/doctors/doctor-womens-health.png'}
                                    alt={doc.name}
                                    className="w-12 h-12 rounded-2xl object-cover object-top border-2 border-slate-200 shadow-xs shrink-0 bg-slate-100"
                                  />
                                  <div className="min-w-0 flex-1">
                                    <button
                                      type="button"
                                      onClick={() => handleOpenEditDoctor(doc)}
                                      className="font-extrabold text-[#172a34] text-sm hover:text-[#c83220] transition text-left block whitespace-nowrap cursor-pointer"
                                      title={`Click to edit ${doc.name}`}
                                    >
                                      {doc.name}
                                    </button>
                                    <p className="text-[11px] text-slate-500 truncate max-w-[200px]" title={doc.designation}>
                                      {doc.designation || 'Medical Specialist'}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              {/* SPECIALTY & CATEGORY */}
                              <td className="py-3.5 px-4 min-w-[210px]">
                                <p className="font-bold text-slate-800 text-xs sm:text-sm line-clamp-1">{doc.specialty}</p>
                                <span className="inline-block bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 border border-blue-200/60">
                                  {doc.category || doc.department}
                                </span>
                              </td>

                              {/* QUALIFICATION & EXP */}
                              <td className="py-3.5 px-4 min-w-[230px]">
                                <p className="text-slate-700 font-medium text-xs line-clamp-1" title={doc.qualification}>
                                  {doc.qualification}
                                </p>
                                <span className="inline-block text-[11px] text-[#c83220] font-bold mt-0.5 bg-red-50 px-2 py-0.5 rounded-full border border-red-100/80">
                                  {doc.experience || '10+ Years'}
                                </span>
                              </td>

                              {/* OPD TIMINGS */}
                              <td className="py-3.5 px-4 min-w-[160px] text-slate-600 font-medium text-xs">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-slate-400">🕒</span>
                                  <span>{doc.opdTimings || 'Mon - Sat: 9am - 4pm'}</span>
                                </div>
                              </td>

                              {/* CONSULTATION FEE */}
                              <td className="py-3.5 px-4 min-w-[100px]">
                                <span className="font-black text-emerald-700 text-xs sm:text-sm bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200/80 inline-block">
                                  {doc.consultationFee || '₹500'}
                                </span>
                              </td>

                              {/* 3-DOTS VERTICAL ACTION BUTTON */}
                              <td className="py-3.5 px-4 text-center relative w-16">
                                <div
                                  className="relative inline-block text-left"
                                  onMouseEnter={() => setActiveActionMenuId(doc._id || null)}
                                  onMouseLeave={() => setActiveActionMenuId(null)}
                                >
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveActionMenuId(activeActionMenuId === doc._id ? null : (doc._id || null));
                                    }}
                                    aria-label="Actions"
                                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition cursor-pointer ${
                                      activeActionMenuId === doc._id
                                        ? 'bg-[#172a34] text-white shadow-md'
                                        : 'bg-slate-100 hover:bg-[#172a34] hover:text-white text-slate-600'
                                    }`}
                                  >
                                    <span className="text-lg font-black leading-none select-none">⋮</span>
                                  </button>

                                  {/* Popover Dropdown on Hover/Click */}
                                  {activeActionMenuId === doc._id && (
                                    <div
                                      className={`absolute right-0 w-36 bg-white rounded-2xl shadow-2xl border border-slate-200 py-1.5 z-50 text-left ${
                                        isNearBottom ? 'bottom-full mb-1' : 'top-full mt-1'
                                      }`}
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <a
                                        href={`/doctors/${doc._id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition"
                                      >
                                        <span>👁️</span>
                                        <span>View Profile</span>
                                      </a>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setActiveActionMenuId(null);
                                          handleOpenEditDoctor(doc);
                                        }}
                                        className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition cursor-pointer text-left"
                                      >
                                        <span>✏️</span>
                                        <span>Edit Details</span>
                                      </button>
                                      <div className="my-1 border-t border-slate-100" />
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setActiveActionMenuId(null);
                                          handleDeleteDoctor(doc._id);
                                        }}
                                        className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition cursor-pointer text-left"
                                      >
                                        <span>🗑️</span>
                                        <span>Delete Doctor</span>
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )
          )}

          {/* ========================================================
              TAB 2: PACKAGE ENQUIRIES
              ======================================================== */}
          {activeTab === 'enquiries' && (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-6">
              <h3 className="text-base font-black text-[#172a34] mb-1">
                Preventive Health Package Booking Enquiries
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Patients who expressed interest or booked packages through the website.
              </p>

              {enquiries.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-sm">
                  No package inquiries yet. Inquiries submitted on the website will appear here in real-time.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-100">
                      <tr>
                        <th className="py-3 px-4">Package</th>
                        <th className="py-3 px-4">Customer Name</th>
                        <th className="py-3 px-4">Phone</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {enquiries.map((enq) => (
                        <tr key={enq._id} className="hover:bg-slate-50 transition">
                          <td className="py-3 px-4 font-bold text-[#c83220]">
                            {enq.packageName}
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-800">
                            {enq.customerName}
                          </td>
                          <td className="py-3 px-4 font-mono font-medium">
                            <a href={`tel:${enq.phone}`} className="hover:underline text-blue-600">
                              {enq.phone}
                            </a>
                          </td>
                          <td className="py-3 px-4">
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                              {enq.status || 'new'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-500 text-xs">
                            {enq.createdAt ? new Date(enq.createdAt).toLocaleDateString() : 'Recent'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              TAB 3: CONTACT FORM SUBMISSIONS
              ======================================================== */}
          {activeTab === 'contacts' && (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-6">
              <h3 className="text-base font-black text-[#172a34] mb-1">
                Website Contact Inquiries &amp; Messages
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Messages submitted by patients through the /contact page form.
              </p>

              {contacts.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-sm">
                  No contact messages yet. Inquiries submitted via Contact Us form will appear here.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contacts.map((msg) => (
                    <div
                      key={msg._id}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:shadow-md transition"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-black text-slate-800 text-sm">{msg.name}</h4>
                        <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                          {msg.department || 'General'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-600">
                        <a href={`tel:${msg.phone}`} className="font-bold text-[#c83220] hover:underline">
                          📞 {msg.phone}
                        </a>
                        {msg.email && <span>✉️ {msg.email}</span>}
                      </div>
                      <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200/60 leading-relaxed">
                        &quot;{msg.message}&quot;
                      </p>
                      <p className="text-[10px] text-slate-400 text-right">
                        {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ''}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              TAB 4: JOB OPENINGS & APPLICATIONS (CAREERS RECRUITMENT)
              ======================================================== */}
          {activeTab === 'careers' && (
            <div className="space-y-6">
              {/* TOP METRIC SUMMARY CARDS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Active Job Openings
                  </span>
                  <div className="text-2xl font-black text-[#172a34] mt-1">
                    {jobs.filter((j) => j.isActive).length} / {jobs.length}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Live on website /careers</p>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Total Applicants
                  </span>
                  <div className="text-2xl font-black text-[#172a34] mt-1">{applications.length}</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">All applications received</p>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-amber-200 shadow-xs bg-amber-50/30">
                  <span className="text-[10px] uppercase font-bold text-amber-700 block tracking-wider">
                    New / Unreviewed
                  </span>
                  <div className="text-2xl font-black text-amber-600 mt-1">
                    {applications.filter((a) => a.status === 'New').length}
                  </div>
                  <p className="text-[11px] text-amber-700/80 mt-0.5">Awaiting initial review</p>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-blue-200 shadow-xs bg-blue-50/30">
                  <span className="text-[10px] uppercase font-bold text-blue-700 block tracking-wider">
                    Shortlisted
                  </span>
                  <div className="text-2xl font-black text-blue-600 mt-1">
                    {applications.filter((a) => a.status === 'Shortlisted').length}
                  </div>
                  <p className="text-[11px] text-blue-700/80 mt-0.5">Selected for interview</p>
                </div>
              </div>

              {/* CAREERS SUB-TABS: JOBS VS APPLICANTS */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-1 gap-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCareersSubTab('jobs')}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      careersSubTab === 'jobs'
                        ? 'bg-[#172a34] text-white shadow-md font-black'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <span>📋 Job Openings &amp; Counts</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                        careersSubTab === 'jobs' ? 'bg-[#c83220] text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {jobs.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCareersSubTab('applicants');
                      setSelectedJobForFilter('All');
                    }}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      careersSubTab === 'applicants'
                        ? 'bg-[#172a34] text-white shadow-md font-black'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <span>👥 Candidate Applications</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                        careersSubTab === 'applicants' ? 'bg-[#c83220] text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {applications.length}
                    </span>
                  </button>
                </div>

                {careersSubTab === 'jobs' ? (
                  <button
                    type="button"
                    onClick={handleOpenNewJob}
                    className="bg-[#c83220] hover:bg-[#a82415] text-white font-bold text-xs px-4 py-2.5 rounded-2xl transition shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>➕ Post New Job Vacancy</span>
                  </button>
                ) : (
                  <a
                    href="/careers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-slate-600 hover:text-[#c83220] flex items-center gap-1"
                  >
                    <span>🌐 Website Careers</span>
                    <span>➔</span>
                  </a>
                )}
              </div>

              {/* ========================================================
                  SUB-TAB 1: JOB VACANCIES LIST & APPLICANT COUNTS
                  ======================================================== */}
              {careersSubTab === 'jobs' && (
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-black text-[#172a34]">
                        Hospital Career Openings ({jobs.length})
                      </h3>
                      <p className="text-xs text-slate-500">
                        Manage active clinical and administrative job vacancies published on the website.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleOpenNewJob}
                      className="bg-[#172a34] hover:bg-[#c83220] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm w-fit cursor-pointer"
                    >
                      ➕ Add Job Opening
                    </button>
                  </div>

                  {jobs.length === 0 ? (
                    <div className="p-12 text-center text-slate-400 text-sm space-y-2">
                      <p className="text-3xl">📋</p>
                      <p className="font-bold text-slate-700">No job openings created yet.</p>
                      <p className="text-xs text-slate-500">
                        Click &quot;Post New Job Vacancy&quot; above to create your first opening.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto pb-8">
                      <table className="w-full text-left text-xs sm:text-sm border-collapse">
                        <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
                          <tr>
                            <th className="py-3.5 px-5 font-bold">Job Title &amp; Department</th>
                            <th className="py-3.5 px-4 font-bold">Type &amp; Positions</th>
                            <th className="py-3.5 px-4 font-bold">Experience Required</th>
                            <th className="py-3.5 px-4 font-bold">Applicants Count</th>
                            <th className="py-3.5 px-4 font-bold">Status</th>
                            <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {jobs.map((job) => (
                            <tr key={job._id} className="hover:bg-slate-50/80 transition">
                              {/* TITLE & DEPARTMENT & SLUG */}
                              <td className="py-3.5 px-5 min-w-[280px]">
                                <div className="space-y-1">
                                  <a
                                    href={`/careers/${job.slug || slugifyJobTitle(job.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-black text-[#172a34] text-sm hover:text-[#c83220] transition inline-flex items-center gap-1 group"
                                  >
                                    <span>{job.title}</span>
                                    <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                                  </a>
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    <span className="text-[10px] font-bold text-[#c83220] bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                                      {job.department}
                                    </span>
                                    <span className="text-[11px] text-slate-400">
                                      📍 {job.location || 'Jagatpura, Jaipur'}
                                    </span>
                                  </div>
                                  <a
                                    href={`/careers/${job.slug || slugifyJobTitle(job.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 font-mono"
                                  >
                                    <span>🔗</span>
                                    <span>/careers/{job.slug || slugifyJobTitle(job.title)}</span>
                                  </a>
                                </div>
                              </td>

                              {/* TYPE & VACANCIES */}
                              <td className="py-3.5 px-4 min-w-[150px]">
                                <p className="font-bold text-slate-700 text-xs">{job.type || 'Full-time'}</p>
                                <span className="text-[11px] text-emerald-700 font-bold">
                                  👥 {job.vacancies || 1} {job.vacancies === 1 ? 'Vacancy' : 'Vacancies'}
                                </span>
                              </td>

                              {/* EXPERIENCE */}
                              <td className="py-3.5 px-4 min-w-[160px] text-slate-700 font-medium text-xs">
                                <span>⏳ {job.experience}</span>
                              </td>

                              {/* APPLICANT COUNT WITH DIRECT DRILL-DOWN */}
                              <td className="py-3.5 px-4 min-w-[170px]">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedJobForFilter(job.title);
                                    setCareersSubTab('applicants');
                                  }}
                                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer border ${
                                    (job.applicantCount || 0) > 0
                                      ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                                      : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                                  }`}
                                  title="Click to view applicants for this job"
                                >
                                  <span>👥</span>
                                  <span>{job.applicantCount || 0} Applied</span>
                                  <span className="text-[10px]">➔</span>
                                </button>
                              </td>

                              {/* STATUS TOGGLE */}
                              <td className="py-3.5 px-4 min-w-[120px]">
                                <button
                                  type="button"
                                  onClick={() => handleToggleJob(job._id)}
                                  className={`px-3 py-1 rounded-xl text-xs font-black transition cursor-pointer border ${
                                    job.isActive
                                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                                      : 'bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200'
                                  }`}
                                >
                                  {job.isActive ? '✓ Active' : '✕ Closed'}
                                </button>
                              </td>

                              {/* ACTIONS */}
                              <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                                <a
                                  href={`/careers/${job.slug || slugifyJobTitle(job.title)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-2.5 py-1 rounded-lg transition inline-flex items-center gap-1"
                                >
                                  <span>👁</span>
                                  <span>View</span>
                                </a>
                                <button
                                  type="button"
                                  onClick={() => handleOpenEditJob(job)}
                                  className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs px-2.5 py-1 rounded-lg transition cursor-pointer"
                                >
                                  ✏️ Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteJob(job._id)}
                                  className="bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs px-2.5 py-1 rounded-lg transition cursor-pointer"
                                >
                                  🗑 Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================
                  SUB-TAB 2: CANDIDATE APPLICATIONS LIST
                  ======================================================== */}
              {careersSubTab === 'applicants' && (
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-black text-[#172a34]">
                        Hospital Job Applicants &amp; Resumes ({applications.length})
                      </h3>
                      <p className="text-xs text-slate-500">
                        Candidates who submitted applications on the website /careers page.
                      </p>
                    </div>

                    {selectedJobForFilter !== 'All' && (
                      <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl text-xs">
                        <span className="text-blue-800 font-medium">
                          Showing applicants for: <strong className="font-bold">{selectedJobForFilter}</strong>
                        </span>
                        <button
                          onClick={() => setSelectedJobForFilter('All')}
                          className="font-bold text-blue-600 hover:text-blue-900 ml-1 text-xs"
                        >
                          ✕ Clear
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Instant Search & Status Filter Toolbar */}
                  <div className="p-4 bg-slate-50/80 border-b border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                    <div className="relative flex-1 w-full">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
                      <input
                        type="text"
                        value={careerSearchQuery}
                        onChange={(e) => setCareerSearchQuery(e.target.value)}
                        placeholder="Search applicant by name, role, degree, phone, email..."
                        className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#c83220] bg-white font-medium"
                      />
                      {careerSearchQuery && (
                        <button
                          onClick={() => setCareerSearchQuery('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <select
                        value={selectedJobForFilter}
                        onChange={(e) => setSelectedJobForFilter(e.target.value)}
                        className="w-full sm:w-auto px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#c83220] bg-white font-medium text-slate-700"
                      >
                        <option value="All">All Positions ({applications.length})</option>
                        {jobs.map((j) => (
                          <option key={j._id} value={j.title}>
                            {j.title} ({j.applicantCount || 0})
                          </option>
                        ))}
                      </select>

                      <select
                        value={careerStatusFilter}
                        onChange={(e) => setCareerStatusFilter(e.target.value)}
                        className="w-full sm:w-auto px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#c83220] bg-white font-medium text-slate-700"
                      >
                        <option value="All">All Statuses ({applications.length})</option>
                        <option value="New">New ({applications.filter((a) => a.status === 'New').length})</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                        <option value="Hired">Hired</option>
                        <option value="Rejected">Rejected</option>
                      </select>

                      <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap hidden md:inline">
                        Showing {filteredApplications.length} of {applications.length}
                      </span>
                    </div>
                  </div>

                  {loading ? (
                    <div className="p-12 text-center text-slate-400 text-sm">
                      Loading applications from database...
                    </div>
                  ) : applications.length === 0 ? (
                    <div className="p-12 text-center text-slate-400 text-sm space-y-2">
                      <p className="text-3xl">💼</p>
                      <p className="font-bold text-slate-700">No career applications received yet.</p>
                      <p className="text-xs text-slate-500">
                        When candidates submit applications on the website Careers page, their complete profiles will appear here instantly.
                      </p>
                    </div>
                  ) : filteredApplications.length === 0 ? (
                    <div className="p-12 text-center text-slate-500 text-sm space-y-2">
                      <p>No applicants match your current search/filters.</p>
                      <button
                        onClick={() => {
                          setCareerSearchQuery('');
                          setCareerStatusFilter('All');
                          setSelectedJobForFilter('All');
                        }}
                        className="text-xs font-bold text-[#c83220] hover:underline"
                      >
                        Clear Search &amp; Filters
                      </button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto pb-8">
                      <table className="w-full text-left text-xs sm:text-sm border-collapse">
                        <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
                          <tr>
                            <th className="py-3.5 px-5 font-bold">Candidate</th>
                            <th className="py-3.5 px-4 font-bold">Position &amp; Department</th>
                            <th className="py-3.5 px-4 font-bold">Contact Info</th>
                            <th className="py-3.5 px-4 font-bold">Qualification &amp; Exp</th>
                            <th className="py-3.5 px-4 font-bold">Resume / CV</th>
                            <th className="py-3.5 px-4 font-bold">Status</th>
                            <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredApplications.map((app) => (
                            <tr key={app._id} className="hover:bg-slate-50/80 transition">
                              {/* CANDIDATE NAME & APPLIED TIME */}
                              <td className="py-3.5 px-5 min-w-[200px]">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#172a34] to-[#c83220] text-white font-black text-xs flex items-center justify-center shadow-xs shrink-0">
                                    {app.fullName.charAt(0).toUpperCase()}
                                  </div>
                                  <div className="min-w-0">
                                    <p className="font-extrabold text-[#172a34] text-sm whitespace-nowrap">
                                      {app.fullName}
                                    </p>
                                    <p className="text-[11px] text-slate-400">
                                      {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'Recent'}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              {/* POSITION & DEPT */}
                              <td className="py-3.5 px-4 min-w-[210px]">
                                <p className="font-bold text-slate-800 text-xs sm:text-sm line-clamp-1">
                                  {app.position}
                                </p>
                                <span className="inline-block bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 border border-slate-200">
                                  {app.department || 'Healthcare Services'}
                                </span>
                              </td>

                              {/* CONTACT INFO */}
                              <td className="py-3.5 px-4 min-w-[190px]">
                                <a
                                  href={`tel:${app.phone}`}
                                  className="font-bold text-[#c83220] hover:underline block text-xs"
                                >
                                  📞 {app.phone}
                                </a>
                                <a
                                  href={`mailto:${app.email}`}
                                  className="text-[11px] text-slate-500 hover:text-slate-800 truncate block max-w-[170px]"
                                  title={app.email}
                                >
                                  ✉️ {app.email}
                                </a>
                              </td>

                              {/* QUALIFICATION & EXP */}
                              <td className="py-3.5 px-4 min-w-[180px]">
                                <p className="text-slate-800 font-semibold text-xs line-clamp-1" title={app.qualification}>
                                  {app.qualification}
                                </p>
                                <span className="inline-block text-[11px] text-slate-500 font-bold">
                                  ⏳ {app.experience}
                                </span>
                              </td>

                              {/* RESUME / CV */}
                              <td className="py-3.5 px-4 min-w-[160px]">
                                {app.resumeUrl ? (
                                  <div className="flex items-center gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setPreviewingResume({
                                          url: app.resumeUrl!,
                                          candidateName: app.fullName,
                                          position: app.position,
                                        })
                                      }
                                      className="inline-flex items-center gap-1.5 bg-red-50 hover:bg-[#c83220] text-[#c83220] hover:text-white font-bold text-xs px-3 py-1.5 rounded-xl border border-red-200 transition cursor-pointer shadow-xs"
                                      title="Preview CV directly inside Admin app"
                                    >
                                      <span>👁️</span>
                                      <span>Preview CV</span>
                                    </button>
                                    <a
                                      href={app.resumeUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-xs transition"
                                      title="Open in new tab"
                                    >
                                      ↗
                                    </a>
                                  </div>
                                ) : (
                                  <span className="text-[11px] text-slate-400 italic">No CV attached</span>
                                )}
                              </td>

                              {/* STATUS SELECT DROPDOWN */}
                              <td className="py-3.5 px-4 min-w-[150px]">
                                <select
                                  value={app.status}
                                  disabled={statusUpdatingId === app._id}
                                  onChange={(e) => handleUpdateApplicationStatus(app._id!, e.target.value)}
                                  className={`text-xs font-bold px-2.5 py-1 rounded-xl border cursor-pointer focus:outline-none transition ${
                                    app.status === 'New'
                                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                                      : app.status === 'Shortlisted'
                                      ? 'bg-blue-50 text-blue-800 border-blue-300'
                                      : app.status === 'Interview Scheduled'
                                      ? 'bg-purple-50 text-purple-800 border-purple-300'
                                      : app.status === 'Hired'
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                      : app.status === 'Rejected'
                                      ? 'bg-red-50 text-red-700 border-red-200'
                                      : 'bg-slate-100 text-slate-700 border-slate-300'
                                  }`}
                                >
                                  <option value="New">● New</option>
                                  <option value="Reviewed">Reviewed</option>
                                  <option value="Shortlisted">★ Shortlisted</option>
                                  <option value="Interview Scheduled">📅 Interview</option>
                                  <option value="Hired">✓ Hired</option>
                                  <option value="Rejected">✕ Rejected</option>
                                </select>
                              </td>

                              {/* ACTIONS */}
                              <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                                <button
                                  type="button"
                                  onClick={() => setSelectedApplication(app)}
                                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3 py-1.5 rounded-xl transition cursor-pointer"
                                >
                                  👁 Details
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteApplication(app._id)}
                                  className="bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs px-2.5 py-1.5 rounded-xl transition cursor-pointer"
                                  title="Delete application"
                                >
                                  🗑
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              MODAL 1: JOB OPENING CREATE / EDIT DIALOG
              ======================================================== */}
          {isEditingJob && (
            <div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
              onClick={() => setIsEditingJob(false)}
            >
              <div
                className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 my-8 space-y-5"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#c83220] block tracking-wider">
                      HOSPITAL VACANCY MANAGEMENT
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-[#172a34]">
                      {editingJobId ? `✏️ Edit Vacancy: ${jobForm.title}` : '➕ Post New Job Opening'}
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsEditingJob(false)}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-black text-sm flex items-center justify-center transition"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSaveJob} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={jobForm.title}
                        onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                        placeholder="e.g. Consultant - Nephrology"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#c83220] font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Hospital Department *
                      </label>
                      <input
                        type="text"
                        required
                        value={jobForm.department}
                        onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                        placeholder="e.g. Nephrology & Dialysis"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#c83220] font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Employment Type
                      </label>
                      <select
                        value={jobForm.type}
                        onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#c83220] font-medium bg-white"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Shift Rotational">Shift Rotational</option>
                        <option value="Visiting Consultant">Visiting Consultant</option>
                        <option value="Contractual">Contractual</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Experience Required *
                      </label>
                      <input
                        type="text"
                        required
                        value={jobForm.experience}
                        onChange={(e) => setJobForm({ ...jobForm, experience: e.target.value })}
                        placeholder="e.g. 3+ Years Post DM"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#c83220] font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Number of Vacancies
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={jobForm.vacancies}
                        onChange={(e) => setJobForm({ ...jobForm, vacancies: Number(e.target.value) || 1 })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#c83220] font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={jobForm.location}
                        onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                        placeholder="Jagatpura, Jaipur"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#c83220] font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Salary / Compensation Range
                      </label>
                      <input
                        type="text"
                        value={jobForm.salaryRange}
                        onChange={(e) => setJobForm({ ...jobForm, salaryRange: e.target.value })}
                        placeholder="e.g. Best in Healthcare Industry"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#c83220] font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Job Description &amp; Clinical Responsibilities *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={jobForm.description}
                      onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                      placeholder="Describe primary patient care duties, OT/ICU procedures, and ward responsibilities..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#c83220] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Qualifications &amp; Eligibility Requirements
                    </label>
                    <textarea
                      rows={2}
                      value={jobForm.requirements}
                      onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                      placeholder="e.g. DM / DNB in Nephrology, valid state medical council registration..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#c83220] font-medium"
                    />
                  </div>

                  <div className="pt-1">
                    <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      <input
                        type="checkbox"
                        checked={jobForm.isActive}
                        onChange={(e) => setJobForm({ ...jobForm, isActive: e.target.checked })}
                        className="w-4 h-4 rounded text-[#c83220] focus:ring-[#c83220]"
                      />
                      <span>✓ Active and Open for Applications on Website</span>
                    </label>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setIsEditingJob(false)}
                      className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={jobSaving}
                      className="bg-[#c83220] hover:bg-[#a82415] text-white font-bold text-xs px-6 py-2.5 rounded-xl transition shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <span>{jobSaving ? 'Publishing...' : '💾 Save & Publish Job Opening'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ========================================================
              CANDIDATE DETAIL MODAL
              ======================================================== */}
          {selectedApplication && (
            <div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
              onClick={() => setSelectedApplication(null)}
            >
              <div
                className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 my-8 space-y-5"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#172a34] to-[#c83220] text-white font-black text-lg flex items-center justify-center shadow-md">
                      {selectedApplication.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#c83220] block tracking-wider">
                        JOB APPLICANT PROFILE
                      </span>
                      <h3 className="text-xl font-black text-[#172a34]">{selectedApplication.fullName}</h3>
                      <p className="text-xs text-slate-500">
                        Applied for: <span className="font-bold text-slate-800">{selectedApplication.position}</span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedApplication(null)}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-black text-sm flex items-center justify-center transition"
                  >
                    ✕
                  </button>
                </div>

                {/* DETAILS GRID */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 font-bold block text-[10px] uppercase">Phone Number</span>
                    <a href={`tel:${selectedApplication.phone}`} className="font-black text-[#c83220] text-sm mt-0.5 block hover:underline">
                      📞 {selectedApplication.phone}
                    </a>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 font-bold block text-[10px] uppercase">Email Address</span>
                    <a href={`mailto:${selectedApplication.email}`} className="font-bold text-blue-600 truncate block mt-0.5 hover:underline">
                      ✉️ {selectedApplication.email}
                    </a>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 font-bold block text-[10px] uppercase">Qualifications</span>
                    <p className="font-bold text-slate-800 mt-0.5">{selectedApplication.qualification}</p>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 font-bold block text-[10px] uppercase">Total Experience</span>
                    <p className="font-bold text-[#c83220] mt-0.5">{selectedApplication.experience}</p>
                  </div>
                </div>

                {/* COVER NOTE */}
                {selectedApplication.coverNote && (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Applicant Cover Note / Statement
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      &quot;{selectedApplication.coverNote}&quot;
                    </p>
                  </div>
                )}

                {/* RESUME LINK / DOWNLOAD */}
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Candidate CV / Resume</span>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">
                      {selectedApplication.resumeUrl ? 'Document attached' : 'No document uploaded'}
                    </p>
                  </div>
                  {selectedApplication.resumeUrl && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setPreviewingResume({
                            url: selectedApplication.resumeUrl!,
                            candidateName: selectedApplication.fullName,
                            position: selectedApplication.position,
                          })
                        }
                        className="bg-[#c83220] hover:bg-[#a82415] text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>👁️ Preview In-App</span>
                      </button>
                      <a
                        href={selectedApplication.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3 py-2 rounded-xl transition border border-slate-200"
                        title="Open in new tab"
                      >
                        <span>↗</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* STATUS & ACTIONS BAR */}
                <div className="pt-2 flex items-center justify-between gap-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700">Status:</span>
                    <select
                      value={selectedApplication.status}
                      onChange={(e) => handleUpdateApplicationStatus(selectedApplication._id!, e.target.value)}
                      className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-300 bg-white"
                    >
                      <option value="New">New</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Interview Scheduled">Interview Scheduled</option>
                      <option value="Hired">Hired</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setSelectedApplication(null)}
                    className="px-5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              IN-APP RESUME / CV PREVIEW MODAL
              ======================================================== */}
          {previewingResume && (
            <div
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6"
              onClick={() => setPreviewingResume(null)}
            >
              <div
                className="bg-white rounded-3xl w-full max-w-5xl h-[92vh] max-h-[950px] shadow-2xl relative border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                {/* MODAL HEADER */}
                <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/90 flex items-center justify-between gap-3 shrink-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#c83220] text-white font-black flex items-center justify-center text-lg shrink-0 shadow-sm">
                      📄
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] uppercase font-black tracking-wider text-[#c83220] bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                          IN-APP CV PREVIEW
                        </span>
                        <span className="text-xs text-slate-500 font-medium truncate">
                          Applied: <strong className="font-bold text-slate-800">{previewingResume.position}</strong>
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-[#172a34] truncate mt-0.5">
                        {previewingResume.candidateName}’s Resume
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={previewingResume.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs px-3.5 py-2 rounded-xl transition border border-slate-300 shadow-xs inline-flex items-center gap-1.5"
                    >
                      <span>Open in New Tab</span>
                      <span className="text-xs">↗</span>
                    </a>
                    <a
                      href={previewingResume.url}
                      download
                      className="hidden sm:inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition shadow-xs"
                    >
                      <span>⬇ Download</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setPreviewingResume(null)}
                      className="w-9 h-9 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-slate-700 font-black text-sm flex items-center justify-center transition cursor-pointer"
                      aria-label="Close Preview"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* MODAL DOCUMENT VIEWER (MAIN BODY) */}
                <div className="flex-1 min-h-0 bg-slate-900/5 relative overflow-hidden flex flex-col">
                  {previewingResume.url.toLowerCase().endsWith('.doc') || previewingResume.url.toLowerCase().endsWith('.docx') ? (
                    <iframe
                      src={`https://docs.google.com/viewer?url=${encodeURIComponent(previewingResume.url)}&embedded=true`}
                      className="w-full h-full border-0 bg-white"
                      title={`${previewingResume.candidateName} Resume Document`}
                    />
                  ) : previewingResume.url.includes('drive.google.com') ? (
                    <iframe
                      src={previewingResume.url.replace('/view', '/preview')}
                      className="w-full h-full border-0 bg-white"
                      title={`${previewingResume.candidateName} Google Drive CV`}
                    />
                  ) : (
                    <iframe
                      src={`${previewingResume.url}#toolbar=1&navpanes=0`}
                      className="w-full h-full border-0 bg-slate-100"
                      title={`${previewingResume.candidateName} PDF Resume`}
                    />
                  )}
                </div>

                {/* FOOTER BAR WITH HELPER */}
                <div className="p-3 sm:p-3.5 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs shrink-0">
                  <p className="text-[11px] text-slate-500 text-center sm:text-left">
                    Document previewed directly in BST Hospital HR console. If file doesn&apos;t load in browser,{' '}
                    <a
                      href={previewingResume.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#c83220] hover:underline"
                    >
                      click here to open directly
                    </a>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setPreviewingResume(null)}
                    className="w-full sm:w-auto px-5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
                  >
                    Done Reading (Close)
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
