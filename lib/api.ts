export const API_URL =
  typeof window !== 'undefined'
    ? '/api'
    : 'http://srv2008573.hstgr.cloud:5432/api';

export interface DoctorData {
  _id?: string;
  name: string;
  specialty: string;
  department: string;
  category: string;
  designation?: string;
  qualification: string;
  experience: string;
  opdTimings: string;
  availableDays?: string[];
  image: string;
  about?: string;
  specializations?: string[];
  consultationFee?: string;
  phone?: string;
  email?: string;
  isAvailable?: boolean;
  isFeatured?: boolean;
  createdAt?: string;
}

export interface PackageInquiryData {
  _id?: string;
  packageName: string;
  packagePrice?: string;
  customerName: string;
  phone: string;
  email?: string;
  notes?: string;
  status: 'new' | 'contacted' | 'booked' | 'closed';
  createdAt?: string;
}

export interface ContactMessageData {
  _id?: string;
  name: string;
  phone: string;
  email?: string;
  department?: string;
  date?: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt?: string;
}

export interface AppointmentData {
  _id?: string;
  name: string;
  phone: string;
  email?: string;
  department: string;
  doctor?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt?: string;
}

export interface CareerApplicationData {
  _id?: string;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  department?: string;
  qualification: string;
  experience: string;
  resumeUrl?: string;
  coverNote?: string;
  jobId?: string;
  status: 'New' | 'Reviewed' | 'Shortlisted' | 'Interview Scheduled' | 'Rejected' | 'Hired';
  adminNotes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface JobOpeningData {
  _id?: string;
  title: string;
  slug?: string;
  department: string;
  location?: string;
  experience: string;
  type?: string;
  vacancies?: number;
  salaryRange?: string;
  description: string;
  requirements?: string;
  isActive?: boolean;
  applicantCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export function slugifyJobTitle(text: string): string {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper: Fetch all active jobs
export async function fetchPublicJobs(): Promise<JobOpeningData[]> {
  try {
    const res = await fetch(`${API_URL}/careers/jobs`, { cache: 'no-store' });
    const json = (await res.json()) as { success: boolean; data: JobOpeningData[] };
    return json.success ? json.data : [];
  } catch (err) {
    console.error('fetchPublicJobs error:', err);
    return [];
  }
}

// Helper: Fetch single job by slug or ID
export async function fetchJobBySlugOrId(identifier: string): Promise<{
  job: JobOpeningData | null;
  relatedJobs: JobOpeningData[];
}> {
  try {
    const res = await fetch(`${API_URL}/careers/jobs/${encodeURIComponent(identifier)}`, { cache: 'no-store' });
    const json = (await res.json()) as {
      success: boolean;
      data: JobOpeningData;
      relatedJobs: JobOpeningData[];
    };
    if (json.success && json.data) {
      return {
        job: json.data,
        relatedJobs: json.relatedJobs || [],
      };
    }
    return { job: null, relatedJobs: [] };
  } catch (err) {
    console.error('fetchJobBySlugOrId error:', err);
    return { job: null, relatedJobs: [] };
  }
}

// Helper: Fetch all doctors
export async function fetchDoctors(params?: { category?: string; search?: string }): Promise<DoctorData[]> {
  try {
    const url = new URL(typeof window !== 'undefined' ? `${window.location.origin}/api/doctors` : `${API_URL}/doctors`);
    if (params?.category && params.category !== 'All') {
      url.searchParams.append('category', params.category);
    }
    if (params?.search) {
      url.searchParams.append('search', params.search);
    }
    const res = await fetch(url.toString(), { cache: 'no-store' });
    const json = (await res.json()) as { success: boolean; data: DoctorData[] };
    return json.success ? json.data : [];
  } catch (err) {
    console.error('fetchDoctors error:', err);
    return [];
  }
}

// Helper: Fetch single doctor
export async function fetchDoctorById(id: string): Promise<DoctorData | null> {
  try {
    const res = await fetch(`${API_URL}/doctors/${id}`, { cache: 'no-store' });
    const json = (await res.json()) as { success: boolean; data: DoctorData };
    return json.success ? json.data : null;
  } catch (err) {
    console.error('fetchDoctorById error:', err);
    return null;
  }
}
