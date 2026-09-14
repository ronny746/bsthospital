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
  { id: 'bed-4', bedNumber: 'SICU-01', icuType: 'surgical_icu', unitName: 'Surgical ICU - Block B', floor: '4th Floor', status: 'reserved', currentRequestId: 'req-1006', currentPatientName: 'maan ashiwal', reservedUntil: new Date(Date.now() + 7200000).toISOString(), hasVentilator: true, hasOxygen: true, updatedAt: new Date().toISOString() },
  { id: 'bed-5', bedNumber: 'SICU-02', icuType: 'surgical_icu', unitName: 'Surgical ICU - Block B', floor: '4th Floor', status: 'maintenance', hasVentilator: true, hasOxygen: true, updatedAt: new Date().toISOString() },
  { id: 'bed-6', bedNumber: 'CICU-01', icuType: 'cardiac_icu', unitName: 'Cardiac ICU - Block C', floor: '2nd Floor', status: 'available', hasVentilator: true, hasOxygen: true, updatedAt: new Date().toISOString() },
  { id: 'bed-7', bedNumber: 'CICU-02', icuType: 'cardiac_icu', unitName: 'Cardiac ICU - Block C', floor: '2nd Floor', status: 'reserved', currentRequestId: 'req-102', currentPatientName: 'Sita Devi', reservedUntil: new Date(Date.now() + 7200000).toISOString(), hasVentilator: true, hasOxygen: true, updatedAt: new Date().toISOString() },
  { id: 'bed-8', bedNumber: 'NICU-01', icuType: 'neuro_icu', unitName: 'Neuro ICU - Block D', floor: '5th Floor', status: 'available', hasVentilator: true, hasOxygen: true, updatedAt: new Date().toISOString() },
  { id: 'bed-9', bedNumber: 'PICU-01', icuType: 'pediatric_icu', unitName: 'Pediatric ICU - Block E', floor: '3rd Floor', status: 'available', hasVentilator: true, hasOxygen: true, updatedAt: new Date().toISOString() },
  { id: 'bed-10', bedNumber: 'ISOU-01', icuType: 'isolation_icu', unitName: 'Isolation ICU - Block F', floor: '1st Floor', status: 'available', hasVentilator: true, hasOxygen: true, updatedAt: new Date().toISOString() },
];

// Initial Requests array (Seeded with live MongoDB Atlas records for 100% instant local parity)
const initialRequests: IcuRequest[] = [
  {
    id: 'req-1006',
    requestId: 'NIMS-ICU-20260913-0006',
    submittedBy: 'patient',
    patient: {
      fullName: 'maan ashiwal',
      age: 27,
      gender: 'male',
      mobile: '9610730422',
      address: { city: 'Jaipur', state: 'Rajasthan', pinCode: '302001' },
      idProofType: 'aadhaar',
      idProofNumber: '9610730422',
    },
    medical: {
      admissionType: 'emergency',
      requiredIcuType: 'surgical_icu',
      department: 'medicine',
      currentMedicalCondition: 'Critical condition',
      diagnosis: 'Acute Respiratory Distress Syndrome (ARDS) / Pneumonia',
      symptomsCriticality: 'Urgent ICU Admission Required',
      oxygenRequired: true,
      ventilatorRequired: true,
      treatingDoctorName: 'Dr. Sunita Verma',
      ambulanceRequired: false,
      infectionIsolationRequired: false,
    },
    documents: [],
    status: 'bed_reserved',
    priority: 'critical',
    reservation: {
      bedId: 'bed-4',
      bedNumber: 'SICU-01',
      unitName: 'Surgical ICU - Block B',
      reservedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7200000).toISOString(),
    },
    assignedTo: { id: 'usr-2', name: 'Dr. Sunita Verma', role: 'Doctor/Medical Reviewer' },
    payment: { paymentCategory: 'cash', amountPaid: 5000, paymentStatus: 'paid', paidAt: new Date().toISOString() },
    consentAccepted: true,
    adminNotes: [],
    auditLogs: [
      { id: 'log-6', action: 'Bed SICU-01 Reserved', performedBy: 'ICU Admin', timestamp: new Date().toISOString() },
    ],
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'req-1005',
    requestId: 'NIMS-ICU-20260913-0005',
    submittedBy: 'patient',
    patient: {
      fullName: 'Ronny rana',
      age: 23,
      gender: 'male',
      mobile: '7380535912',
      address: { city: 'Jaipur', state: 'Rajasthan', pinCode: '302001' },
      idProofType: 'aadhaar',
      idProofNumber: '7380535912',
    },
    medical: {
      admissionType: 'emergency',
      requiredIcuType: 'medical_icu',
      department: 'medicine',
      currentMedicalCondition: 'Critical condition',
      diagnosis: 'Acute Respiratory Distress Syndrome (ARDS) / Pneumonia',
      symptomsCriticality: 'Urgent ICU Admission Required',
      oxygenRequired: true,
      ventilatorRequired: true,
      treatingDoctorName: 'Dr. Sunita Verma',
      ambulanceRequired: false,
      infectionIsolationRequired: false,
    },
    documents: [],
    status: 'approved',
    priority: 'critical',
    reservation: {
      bedId: 'bed-3',
      bedNumber: 'MICU-03',
      unitName: 'Medical ICU - Block A',
      reservedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7200000).toISOString(),
    },
    assignedTo: { id: 'usr-2', name: 'Dr. Sunita Verma', role: 'Doctor/Medical Reviewer' },
    payment: { paymentCategory: 'cash', amountPaid: 5000, paymentStatus: 'paid', paidAt: new Date().toISOString() },
    consentAccepted: true,
    adminNotes: [],
    auditLogs: [
      { id: 'log-5', action: 'Request Approved by Dr. Sunita Verma', performedBy: 'Dr. Sunita Verma', timestamp: new Date().toISOString() },
    ],
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'req-1004',
    requestId: 'NIMS-ICU-20260913-0004',
    submittedBy: 'patient',
    patient: {
      fullName: 'Rohit Rana',
      age: 26,
      gender: 'male',
      mobile: '7380535912',
      address: { city: 'Jaipur', state: 'Rajasthan', pinCode: '302001' },
      idProofType: 'aadhaar',
      idProofNumber: '7380535912',
    },
    medical: {
      admissionType: 'emergency',
      requiredIcuType: 'medical_icu',
      department: 'medicine',
      currentMedicalCondition: 'Cardiac emergency',
      diagnosis: 'Cardiac Arrest / Acute Coronary Syndrome',
      symptomsCriticality: 'Critical ICU Care Needed',
      oxygenRequired: true,
      ventilatorRequired: true,
      treatingDoctorName: 'Dr. Sunita Verma',
      ambulanceRequired: true,
      infectionIsolationRequired: false,
    },
    documents: [],
    status: 'approved',
    priority: 'critical',
    reservation: {
      bedId: 'bed-1',
      bedNumber: 'MICU-01',
      unitName: 'Medical ICU - Block A',
      reservedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7200000).toISOString(),
    },
    assignedTo: { id: 'usr-2', name: 'Dr. Sunita Verma', role: 'Doctor/Medical Reviewer' },
    payment: { paymentCategory: 'cash', amountPaid: 5000, paymentStatus: 'paid', paidAt: new Date().toISOString() },
    consentAccepted: true,
    adminNotes: [],
    auditLogs: [
      { id: 'log-4', action: 'Request Approved', performedBy: 'ICU Admin', timestamp: new Date().toISOString() },
    ],
    createdAt: new Date(Date.now() - 10800000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'req-1003',
    requestId: 'NIMS-ICU-20260913-TEST',
    submittedBy: 'patient',
    patient: {
      fullName: 'Garvita Singh',
      age: 25,
      gender: 'female',
      mobile: '9829012345',
      address: { city: 'Jaipur', state: 'Rajasthan', pinCode: '302001' },
      idProofType: 'aadhaar',
      idProofNumber: '9829012345',
    },
    medical: {
      admissionType: 'emergency',
      requiredIcuType: 'medical_icu',
      department: 'medicine',
      currentMedicalCondition: 'Sepsis',
      diagnosis: 'Sepsis with Septic Shock',
      symptomsCriticality: 'High Priority',
      oxygenRequired: true,
      ventilatorRequired: false,
      ambulanceRequired: false,
      infectionIsolationRequired: true,
    },
    documents: [],
    status: 'submitted',
    priority: 'high',
    payment: { paymentCategory: 'cash', amountPaid: 5000, paymentStatus: 'paid', paidAt: new Date().toISOString() },
    consentAccepted: true,
    adminNotes: [],
    auditLogs: [
      { id: 'log-3', action: 'Request Submitted', performedBy: 'Garvita Singh', timestamp: new Date().toISOString() },
    ],
    createdAt: new Date(Date.now() - 14400000).toISOString(),
    updatedAt: new Date().toISOString(),
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

export function createIcuRequest(
  data: Omit<IcuRequest, 'id' | 'requestId' | 'createdAt' | 'updatedAt' | 'auditLogs' | 'adminNotes'>,
  customRequestId?: string
): IcuRequest {
  const requestId = customRequestId || generateRequestId();
  const id = `req-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
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
