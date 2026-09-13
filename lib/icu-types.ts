export type RequestStatus =
  | 'submitted'
  | 'under_review'
  | 'more_info_required'
  | 'waiting_list'
  | 'approved'
  | 'bed_reserved'
  | 'admitted'
  | 'rejected'
  | 'cancelled'
  | 'reservation_expired';

export type IcuType =
  | 'medical_icu'
  | 'surgical_icu'
  | 'cardiac_icu'
  | 'neuro_icu'
  | 'pediatric_icu'
  | 'neonatal_icu'
  | 'isolation_icu'
  | 'ventilator_bed';

export type PriorityLevel = 'critical' | 'high' | 'medium' | 'low';

export type UserRole =
  | 'super_admin'
  | 'icu_admin'
  | 'doctor_reviewer'
  | 'admission_desk'
  | 'bed_manager'
  | 'viewer';

export type IdProofType = 'aadhaar' | 'bhamashah';

export type DepartmentType = 'ortho' | 'gyne' | 'medicine' | 'other';

export interface PaymentInfo {
  orderId: string;
  paymentId: string;
  signature?: string;
  amountPaid: number; // in INR (e.g. 5000)
  paymentStatus: 'paid' | 'pending' | 'failed';
  paidAt?: string;
}

export interface PatientDetails {
  fullName: string;
  age: number;
  dob?: string;
  gender: 'male' | 'female' | 'other';
  mobile: string;
  alternateMobile?: string;
  address: {
    street?: string;
    city: string;
    state: string;
    pinCode: string;
  };
  idProofType?: IdProofType;
  idProofNumber?: string;
  aadhaarOrId?: string;
  patientUhid?: string;
}

export interface AttendantDetails {
  fullName: string;
  relationship: string;
  mobile: string;
  alternateMobile?: string;
  email?: string;
  idProofType?: IdProofType;
  idProofNumber?: string;
  sameAddressAsPatient: boolean;
}

export interface MedicalDetails {
  admissionType: 'emergency' | 'planned' | 'transfer';
  requiredIcuType: IcuType;
  department?: DepartmentType;
  departmentOther?: string;
  currentMedicalCondition: string;
  diagnosis: string;
  symptomsCriticality: string;
  oxygenRequired: boolean;
  ventilatorRequired: boolean;
  treatingDoctorName?: string;
  referringHospital?: string;
  currentHospitalLocation?: string;
  expectedAdmissionTime?: string;
  ambulanceRequired: boolean;
  infectionIsolationRequired: boolean;
  additionalRemarks?: string;
}

export interface DocumentAttachment {
  id: string;
  type: 'doctor_referral' | 'medical_report' | 'prescription' | 'discharge_summary' | 'patient_id' | 'attendant_id';
  fileName: string;
  fileSize: number;
  fileType: string;
  url: string;
  uploadedAt: string;
}

export interface AdminNote {
  id: string;
  adminId: string;
  adminName: string;
  note: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  action: string;
  performedBy: string;
  userRole?: string;
  details?: string;
  previousStatus?: RequestStatus;
  newStatus?: RequestStatus;
  timestamp: string;
}

export interface ReservationInfo {
  bedId: string | null;
  bedNumber?: string;
  unitName?: string;
  reservedAt: string | null;
  expiresAt: string | null;
  extensionMinutes?: number;
}

export interface IcuRequest {
  id: string;
  requestId: string; // e.g. NIMS-ICU-20260912-0001
  submittedBy: 'patient' | 'attendant';
  patient: PatientDetails;
  attendant?: AttendantDetails;
  medical: MedicalDetails;
  documents: DocumentAttachment[];
  status: RequestStatus;
  priority: PriorityLevel;
  payment?: PaymentInfo;
  assignedTo?: {
    id: string;
    name: string;
    role: string;
  } | null;
  rejectionReason?: string;
  requestedInfoDescription?: string;
  patientResponseNotes?: string;
  reservation?: ReservationInfo;
  consentAccepted: boolean;
  adminNotes: AdminNote[];
  auditLogs: AuditLog[];
  createdAt: string;
  updatedAt: string;
}

export type BedStatus = 'available' | 'reserved' | 'occupied' | 'maintenance';

export interface IcuBed {
  id: string;
  bedNumber: string; // e.g. MICU-01
  icuType: IcuType;
  unitName: string; // e.g. Medical ICU Unit 1
  floor: string;
  status: BedStatus;
  currentRequestId?: string | null;
  currentPatientName?: string | null;
  reservedUntil?: string | null;
  hasVentilator: boolean;
  hasOxygen: boolean;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
