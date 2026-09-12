import {
  IcuRequest,
  IcuBed,
  RequestStatus,
  IcuType,
  PriorityLevel,
  UserRole,
  AuditLog,
  AdminNote,
  User,
} from './icu-types';

// Seed Initial Beds
const initialBeds: IcuBed[] = [
  { id: 'bed-1', bedNumber: 'MICU-01', icuType: 'medical_icu', unitName: 'Medical ICU - Block A', floor: '3rd Floor', status: 'available', hasVentilator: true, hasOxygen: true, updatedAt: new Date().toISOString() },
  { id: 'bed-2', bedNumber: 'MICU-02', icuType: 'medical_icu', unitName: 'Medical ICU - Block A', floor: '3rd Floor', status: 'occupied', currentRequestId: 'req-101', currentPatientName: 'Rajesh Sharma', hasVentilator: true, hasOxygen: true, updatedAt: new Date().toISOString() },
  { id: 'bed-3', bedNumber: 'MICU-03', icuType: 'medical_icu', unitName: 'Medical ICU - Block A', floor: '3rd Floor', status: 'available', hasVentilator: false, hasOxygen: true, updatedAt: new Date().toISOString() },
  { id: 'bed-4', bedNumber: 'SICU-01', icuType: 'surgical_icu', unitName: 'Surgical ICU - Block B', floor: '4th Floor', status: 'available', hasVentilator: true, hasOxygen: true, updatedAt: new Date().toISOString() },
  { id: 'bed-5', bedNumber: 'SICU-02', icuType: 'surgical_icu', unitName: 'Surgical ICU - Block B', floor: '4th Floor', status: 'maintenance', hasVentilator: true, hasOxygen: true, updatedAt: new Date().toISOString() },
  { id: 'bed-6', bedNumber: 'CICU-01', icuType: 'cardiac_icu', unitName: 'Cardiac ICU - Block C', floor: '2nd Floor', status: 'available', hasVentilator: true, hasOxygen: true, updatedAt: new Date().toISOString() },
  { id: 'bed-7', bedNumber: 'CICU-02', icuType: 'cardiac_icu', unitName: 'Cardiac ICU - Block C', floor: '2nd Floor', status: 'reserved', currentRequestId: 'req-102', currentPatientName: 'Sita Devi', reservedUntil: new Date(Date.now() + 7200000).toISOString(), hasVentilator: true, hasOxygen: true, updatedAt: new Date().toISOString() },
  { id: 'bed-8', bedNumber: 'NICU-01', icuType: 'neuro_icu', unitName: 'Neuro ICU - Block D', floor: '5th Floor', status: 'available', hasVentilator: true, hasOxygen: true, updatedAt: new Date().toISOString() },
  { id: 'bed-9', bedNumber: 'PICU-01', icuType: 'pediatric_icu', unitName: 'Pediatric ICU - Block E', floor: '3rd Floor', status: 'available', hasVentilator: true, hasOxygen: true, updatedAt: new Date().toISOString() },
  { id: 'bed-10', bedNumber: 'ISOU-01', icuType: 'isolation_icu', unitName: 'Isolation ICU - Block F', floor: '1st Floor', status: 'available', hasVentilator: true, hasOxygen: true, updatedAt: new Date().toISOString() },
];

// Seed Initial Requests
const initialRequests: IcuRequest[] = [
  {
    id: 'req-101',
    requestId: 'NIMS-ICU-20260912-0001',
    submittedBy: 'attendant',
    patient: {
      fullName: 'Rajesh Sharma',
      age: 58,
      gender: 'male',
      mobile: '9829012345',
      alternateMobile: '9414098765',
      address: { city: 'Jaipur', state: 'Rajasthan', pinCode: '302017' },
      aadhaarOrId: '1234-5678-9012',
      patientUhid: 'NIMS-P-9921',
    },
    attendant: {
      fullName: 'Amit Sharma',
      relationship: 'Son',
      mobile: '9829012345',
      email: 'amit.sharma@example.com',
      sameAddressAsPatient: true,
    },
    medical: {
      admissionType: 'emergency',
      requiredIcuType: 'medical_icu',
      currentMedicalCondition: 'Severe respiratory distress with SpO2 dropping to 84%.',
      diagnosis: 'Acute Respiratory Distress Syndrome (ARDS)',
      symptomsCriticality: 'High priority emergency. Immediate Mechanical Ventilation needed.',
      oxygenRequired: true,
      ventilatorRequired: true,
      treatingDoctorName: 'Dr. V. K. Gupta',
      referringHospital: 'City General Hospital Jaipur',
      currentHospitalLocation: 'Emergency Ward, City General',
      ambulanceRequired: true,
      infectionIsolationRequired: false,
    },
    documents: [
      {
        id: 'doc-1',
        type: 'doctor_referral',
        fileName: 'Referral_Letter_DrGupta.pdf',
        fileSize: 450000,
        fileType: 'application/pdf',
        url: '#',
        uploadedAt: new Date(Date.now() - 7200000).toISOString(),
      },
      {
        id: 'doc-2',
        type: 'medical_report',
        fileName: 'Chest_CT_Scan_Report.pdf',
        fileSize: 1200000,
        fileType: 'application/pdf',
        url: '#',
        uploadedAt: new Date(Date.now() - 7200000).toISOString(),
      },
    ],
    status: 'admitted',
    priority: 'critical',
    assignedTo: { id: 'usr-2', name: 'Dr. Sunita Verma', role: 'Doctor/Medical Reviewer' },
    reservation: {
      bedId: 'bed-2',
      bedNumber: 'MICU-02',
      unitName: 'Medical ICU - Block A',
      reservedAt: new Date(Date.now() - 7200000).toISOString(),
      expiresAt: new Date(Date.now() - 3600000).toISOString(),
    },
    consentAccepted: true,
    adminNotes: [
      {
        id: 'note-1',
        adminId: 'usr-2',
        adminName: 'Dr. Sunita Verma',
        note: 'Patient SpO2 unstable. Approved for immediate MICU-02 bed admission.',
        createdAt: new Date(Date.now() - 5400000).toISOString(),
      },
    ],
    auditLogs: [
      {
        id: 'log-1',
        action: 'Request Submitted',
        performedBy: 'Amit Sharma (Attendant)',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
      },
      {
        id: 'log-2',
        action: 'Assigned Reviewer',
        performedBy: 'ICU Admin',
        details: 'Assigned to Dr. Sunita Verma',
        timestamp: new Date(Date.now() - 6000000).toISOString(),
      },
      {
        id: 'log-3',
        action: 'Bed Reserved',
        performedBy: 'Dr. Sunita Verma',
        details: 'Bed MICU-02 reserved for 2 hours',
        previousStatus: 'under_review',
        newStatus: 'bed_reserved',
        timestamp: new Date(Date.now() - 5400000).toISOString(),
      },
      {
        id: 'log-4',
        action: 'Admission Completed',
        performedBy: 'Admission Desk',
        details: 'Patient arrived and admitted to MICU-02',
        previousStatus: 'bed_reserved',
        newStatus: 'admitted',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'req-102',
    requestId: 'NIMS-ICU-20260912-0002',
    submittedBy: 'patient',
    patient: {
      fullName: 'Sita Devi',
      age: 64,
      gender: 'female',
      mobile: '9828888777',
      address: { city: 'Kota', state: 'Rajasthan', pinCode: '324005' },
    },
    medical: {
      admissionType: 'planned',
      requiredIcuType: 'cardiac_icu',
      currentMedicalCondition: 'Post Coronary Angioplasty observation required.',
      diagnosis: 'Triple Vessel Disease - Post Angioplasty',
      symptomsCriticality: 'Stable post-op. Needs 24hr Cardiac ICU telemetry monitor.',
      oxygenRequired: true,
      ventilatorRequired: false,
      treatingDoctorName: 'Dr. R. K. Saxena',
      ambulanceRequired: false,
      infectionIsolationRequired: false,
    },
    documents: [],
    status: 'bed_reserved',
    priority: 'high',
    assignedTo: { id: 'usr-1', name: 'ICU Administrator', role: 'ICU Admin' },
    reservation: {
      bedId: 'bed-7',
      bedNumber: 'CICU-02',
      unitName: 'Cardiac ICU - Block C',
      reservedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7200000).toISOString(),
    },
    consentAccepted: true,
    adminNotes: [],
    auditLogs: [
      {
        id: 'log-10',
        action: 'Request Submitted',
        performedBy: 'Sita Devi (Patient)',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 'log-11',
        action: 'Bed Reserved',
        performedBy: 'ICU Administrator',
        details: 'Reserved bed CICU-02 until ' + new Date(Date.now() + 7200000).toLocaleTimeString(),
        previousStatus: 'submitted',
        newStatus: 'bed_reserved',
        timestamp: new Date().toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'req-103',
    requestId: 'NIMS-ICU-20260912-0003',
    submittedBy: 'attendant',
    patient: {
      fullName: 'Ramesh Choudhary',
      age: 45,
      gender: 'male',
      mobile: '9414112233',
      address: { city: 'Ajmer', state: 'Rajasthan', pinCode: '305001' },
    },
    attendant: {
      fullName: 'Pooja Choudhary',
      relationship: 'Wife',
      mobile: '9414112233',
      sameAddressAsPatient: true,
    },
    medical: {
      admissionType: 'emergency',
      requiredIcuType: 'neuro_icu',
      currentMedicalCondition: 'Acute Stroke with right-sided hemiplegia.',
      diagnosis: 'Ischemic Stroke - MCA Territory',
      symptomsCriticality: 'Critical neuro monitoring.',
      oxygenRequired: true,
      ventilatorRequired: false,
      referringHospital: 'JLN Hospital Ajmer',
      ambulanceRequired: true,
      infectionIsolationRequired: false,
    },
    documents: [],
    status: 'under_review',
    priority: 'critical',
    consentAccepted: true,
    adminNotes: [],
    auditLogs: [
      {
        id: 'log-20',
        action: 'Request Submitted',
        performedBy: 'Pooja Choudhary',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    updatedAt: new Date(Date.now() - 1800000).toISOString(),
  },
];

// Seed Admin Users
const adminUsers: User[] = [
  { id: 'usr-1', name: 'Super Admin', email: 'admin@nims.edu.in', role: 'super_admin' },
  { id: 'usr-2', name: 'Dr. Sunita Verma', email: 'dr.sunita@nims.edu.in', role: 'doctor_reviewer' },
  { id: 'usr-3', name: 'Rahul Meena (Bed Manager)', email: 'rahul.beds@nims.edu.in', role: 'bed_manager' },
  { id: 'usr-4', name: 'Admission Desk Officer', email: 'admission@nims.edu.in', role: 'admission_desk' },
];

// In-Memory Data Store (Global state)
declare global {
  var __icu_store__: {
    beds: IcuBed[];
    requests: IcuRequest[];
    otps: Record<string, string>;
    requestCounter: number;
  } | undefined;
}

if (!globalThis.__icu_store__) {
  globalThis.__icu_store__ = {
    beds: initialBeds,
    requests: initialRequests,
    otps: { '9829012345': '123456', '9828888777': '123456', '9414112233': '123456' },
    requestCounter: 4,
  };
}

export const icuStore = globalThis.__icu_store__;

// Utility functions for ICU Store operations
export function generateRequestId(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const seq = String(icuStore.requestCounter++).padStart(4, '0');
  return `NIMS-ICU-${dateStr}-${seq}`;
}

export function getAllBeds(): IcuBed[] {
  return icuStore.beds;
}

export function getAllRequests(): IcuRequest[] {
  return icuStore.requests;
}

export function getRequestByRequestId(requestId: string, mobileNumber?: string): IcuRequest | null {
  const cleanId = requestId.trim().toUpperCase();
  const found = icuStore.requests.find((r) => r.requestId.toUpperCase() === cleanId);
  if (!found) return null;
  if (mobileNumber) {
    const cleanMobile = mobileNumber.trim();
    if (found.patient.mobile !== cleanMobile && found.attendant?.mobile !== cleanMobile) {
      return null;
    }
  }
  return found;
}

export function createIcuRequest(data: Omit<IcuRequest, 'id' | 'requestId' | 'createdAt' | 'updatedAt' | 'auditLogs' | 'adminNotes'>): IcuRequest {
  const requestId = generateRequestId();
  const id = `req-${Date.now()}`;
  const now = new Date().toISOString();

  const newRequest: IcuRequest = {
    ...data,
    id,
    requestId,
    adminNotes: [],
    auditLogs: [
      {
        id: `log-${Date.now()}`,
        action: 'Request Submitted',
        performedBy: data.submittedBy === 'attendant' ? data.attendant?.fullName || 'Attendant' : data.patient.fullName,
        timestamp: now,
      },
    ],
    createdAt: now,
    updatedAt: now,
  };

  icuStore.requests.unshift(newRequest);
  return newRequest;
}

export function updateRequestStatus(
  requestId: string,
  newStatus: RequestStatus,
  performedBy: string,
  details?: string,
  extra?: { rejectionReason?: string; requestedInfoDescription?: string }
): IcuRequest | null {
  const req = icuStore.requests.find((r) => r.id === requestId || r.requestId === requestId);
  if (!req) return null;

  const previousStatus = req.status;
  req.status = newStatus;
  req.updatedAt = new Date().toISOString();

  if (extra?.rejectionReason) req.rejectionReason = extra.rejectionReason;
  if (extra?.requestedInfoDescription) req.requestedInfoDescription = extra.requestedInfoDescription;

  req.auditLogs.unshift({
    id: `log-${Date.now()}`,
    action: `Status changed to ${newStatus.replace(/_/g, ' ').toUpperCase()}`,
    performedBy,
    previousStatus,
    newStatus,
    details: details || extra?.rejectionReason || extra?.requestedInfoDescription,
    timestamp: req.updatedAt,
  });

  return req;
}

export function assignReviewer(requestId: string, reviewer: { id: string; name: string; role: string }, performedBy: string): IcuRequest | null {
  const req = icuStore.requests.find((r) => r.id === requestId || r.requestId === requestId);
  if (!req) return null;

  req.assignedTo = reviewer;
  req.updatedAt = new Date().toISOString();
  req.auditLogs.unshift({
    id: `log-${Date.now()}`,
    action: 'Assigned Reviewer',
    performedBy,
    details: `Assigned to ${reviewer.name} (${reviewer.role})`,
    timestamp: req.updatedAt,
  });

  return req;
}

export function addAdminNote(requestId: string, adminId: string, adminName: string, noteText: string): IcuRequest | null {
  const req = icuStore.requests.find((r) => r.id === requestId || r.requestId === requestId);
  if (!req) return null;

  const newNote: AdminNote = {
    id: `note-${Date.now()}`,
    adminId,
    adminName,
    note: noteText,
    createdAt: new Date().toISOString(),
  };

  req.adminNotes.unshift(newNote);
  req.updatedAt = newNote.createdAt;
  return req;
}

// Atomic Bed Reservation
export function reserveBedForRequest(requestId: string, bedId: string, durationMinutes: number = 120, performedBy: string): { success: boolean; message: string; request?: IcuRequest } {
  const req = icuStore.requests.find((r) => r.id === requestId || r.requestId === requestId);
  if (!req) return { success: false, message: 'Request not found' };

  const bed = icuStore.beds.find((b) => b.id === bedId);
  if (!bed) return { success: false, message: 'Bed not found' };

  if (bed.status !== 'available' && bed.currentRequestId !== req.id) {
    return { success: false, message: `Bed ${bed.bedNumber} is currently ${bed.status}` };
  }

  const now = new Date();
  const expiresAt = new Date(now.getTime() + durationMinutes * 60000).toISOString();

  // Atomic state updates
  bed.status = 'reserved';
  bed.currentRequestId = req.id;
  bed.currentPatientName = req.patient.fullName;
  bed.reservedUntil = expiresAt;
  bed.updatedAt = now.toISOString();

  req.reservation = {
    bedId: bed.id,
    bedNumber: bed.bedNumber,
    unitName: bed.unitName,
    reservedAt: now.toISOString(),
    expiresAt,
    extensionMinutes: 0,
  };

  const previousStatus = req.status;
  req.status = 'bed_reserved';
  req.updatedAt = now.toISOString();

  req.auditLogs.unshift({
    id: `log-${Date.now()}`,
    action: 'Bed Reserved',
    performedBy,
    details: `Reserved bed ${bed.bedNumber} (${bed.unitName}) for ${durationMinutes} minutes`,
    previousStatus,
    newStatus: 'bed_reserved',
    timestamp: now.toISOString(),
  });

  return { success: true, message: `Bed ${bed.bedNumber} reserved successfully`, request: req };
}

export function releaseBed(bedId: string, performedBy: string, reason?: string): boolean {
  const bed = icuStore.beds.find((b) => b.id === bedId);
  if (!bed) return false;

  if (bed.currentRequestId) {
    const req = icuStore.requests.find((r) => r.id === bed.currentRequestId);
    if (req && req.status === 'bed_reserved') {
      req.status = 'under_review';
      req.reservation = undefined;
      req.updatedAt = new Date().toISOString();
      req.auditLogs.unshift({
        id: `log-${Date.now()}`,
        action: 'Bed Reservation Released',
        performedBy,
        details: reason || `Reservation for bed ${bed.bedNumber} was released.`,
        timestamp: req.updatedAt,
      });
    }
  }

  bed.status = 'available';
  bed.currentRequestId = null;
  bed.currentPatientName = null;
  bed.reservedUntil = null;
  bed.updatedAt = new Date().toISOString();

  return true;
}

export function markBedOccupied(bedId: string, performedBy: string): boolean {
  const bed = icuStore.beds.find((b) => b.id === bedId);
  if (!bed) return false;

  bed.status = 'occupied';
  bed.reservedUntil = null;
  bed.updatedAt = new Date().toISOString();

  if (bed.currentRequestId) {
    const req = icuStore.requests.find((r) => r.id === bed.currentRequestId);
    if (req) {
      req.status = 'admitted';
      req.updatedAt = new Date().toISOString();
      req.auditLogs.unshift({
        id: `log-${Date.now()}`,
        action: 'Admission Completed',
        performedBy,
        details: `Patient admitted to bed ${bed.bedNumber}`,
        previousStatus: 'bed_reserved',
        newStatus: 'admitted',
        timestamp: req.updatedAt,
      });
    }
  }

  return true;
}

export function getDashboardMetrics() {
  const beds = icuStore.beds;
  const requests = icuStore.requests;
  const today = new Date().toISOString().slice(0, 10);

  return {
    totalIcuBeds: beds.length,
    availableBeds: beds.filter((b) => b.status === 'available').length,
    reservedBeds: beds.filter((b) => b.status === 'reserved').length,
    occupiedBeds: beds.filter((b) => b.status === 'occupied').length,
    maintenanceBeds: beds.filter((b) => b.status === 'maintenance').length,
    newRequests: requests.filter((r) => r.status === 'submitted').length,
    criticalRequests: requests.filter((r) => r.priority === 'critical' && r.status !== 'admitted' && r.status !== 'rejected').length,
    pendingReviews: requests.filter((r) => r.status === 'under_review').length,
    waitingListPatients: requests.filter((r) => r.status === 'waiting_list').length,
    todayConfirmedAdmissions: requests.filter((r) => r.status === 'admitted' && r.updatedAt.slice(0, 10) === today).length,
  };
}
