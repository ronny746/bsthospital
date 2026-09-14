import mongoose, { Schema, Document } from 'mongoose';

export interface IIcuRequestDocument extends Document {
  id: string;
  requestId: string;
  submittedBy: 'patient' | 'attendant';
  patient: {
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
    idProofType?: 'aadhaar' | 'bhamashah';
    idProofNumber?: string;
    aadhaarOrId?: string;
    patientUhid?: string;
  };
  attendant?: {
    fullName: string;
    relationship: string;
    mobile: string;
    alternateMobile?: string;
    email?: string;
    idProofType?: 'aadhaar' | 'bhamashah';
    idProofNumber?: string;
    sameAddressAsPatient: boolean;
  };
  medical: {
    admissionType: 'emergency' | 'planned' | 'transfer';
    requiredIcuType: string;
    department?: 'ortho' | 'gyne' | 'medicine' | 'other';
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
  };
  documents: Array<{
    id: string;
    type: string;
    fileName: string;
    fileSize: number;
    fileType: string;
    url: string;
    uploadedAt: string;
  }>;
  status: string;
  priority: string;
  payment?: {
    orderId: string;
    paymentId: string;
    signature?: string;
    amountPaid: number;
    paymentStatus: string;
    paidAt?: string;
  };
  assignedTo?: {
    id: string;
    name: string;
    role: string;
  };
  rejectionReason?: string;
  requestedInfoDescription?: string;
  patientResponseNotes?: string;
  reservation?: {
    bedId: string | null;
    bedNumber?: string;
    unitName?: string;
    reservedAt: string | null;
    expiresAt: string | null;
    extensionMinutes?: number;
  };
  consentAccepted: boolean;
  adminNotes: Array<{
    id: string;
    adminId: string;
    adminName: string;
    note: string;
    createdAt: string;
  }>;
  auditLogs: Array<{
    id: string;
    action: string;
    performedBy: string;
    userRole?: string;
    details?: string;
    previousStatus?: string;
    newStatus?: string;
    timestamp: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

const IcuRequestSchema = new Schema<IIcuRequestDocument>(
  {
    id: { type: String, required: true, unique: true },
    requestId: { type: String, required: true, unique: true, index: true },
    submittedBy: { type: String, enum: ['patient', 'attendant'], required: true },
    patient: {
      fullName: { type: String, required: true },
      age: { type: Number, required: true },
      dob: String,
      gender: { type: String, enum: ['male', 'female', 'other'], required: true },
      mobile: { type: String, required: true, index: true },
      alternateMobile: String,
      address: {
        street: String,
        city: { type: String, required: true },
        state: { type: String, required: true },
        pinCode: { type: String, required: true },
      },
      idProofType: { type: String, enum: ['aadhaar', 'bhamashah'] },
      idProofNumber: String,
      aadhaarOrId: String,
      patientUhid: String,
    },
    attendant: {
      fullName: String,
      relationship: String,
      mobile: String,
      alternateMobile: String,
      email: String,
      idProofType: { type: String, enum: ['aadhaar', 'bhamashah'] },
      idProofNumber: String,
      sameAddressAsPatient: Boolean,
    },
    medical: {
      admissionType: { type: String, required: true },
      requiredIcuType: { type: String, required: true },
      department: { type: String, enum: ['ortho', 'gyne', 'medicine', 'cardio', 'neuro', 'other'] },
      departmentOther: String,
      currentMedicalCondition: { type: String, required: true },
      diagnosis: { type: String, required: true },
      symptomsCriticality: { type: String, required: true },
      oxygenRequired: { type: Boolean, default: false },
      ventilatorRequired: { type: Boolean, default: false },
      treatingDoctorName: String,
      referringHospital: String,
      currentHospitalLocation: String,
      expectedAdmissionTime: String,
      ambulanceRequired: { type: Boolean, default: false },
      infectionIsolationRequired: { type: Boolean, default: false },
      additionalRemarks: String,
    },
    documents: [Schema.Types.Mixed],
    status: { type: String, required: true, default: 'submitted', index: true },
    priority: { type: String, required: true, default: 'high' },
    payment: {
      type: Schema.Types.Mixed,
      default: {
        paymentCategory: 'cash',
        amountPaid: 5000,
        paymentStatus: 'paid',
      },
    },
    assignedTo: {
      type: Schema.Types.Mixed,
    },
    rejectionReason: String,
    requestedInfoDescription: String,
    patientResponseNotes: String,
    reservation: {
      type: Schema.Types.Mixed,
    },
    consentAccepted: { type: Boolean, default: true },
    adminNotes: [Schema.Types.Mixed],
    auditLogs: [Schema.Types.Mixed],
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  { timestamps: true, strict: false }
);

export function getIcuRequestModel() {
  if (mongoose.models && mongoose.models.IcuRequest) {
    return mongoose.models.IcuRequest;
  }
  return mongoose.model<IIcuRequestDocument>('IcuRequest', IcuRequestSchema);
}

export const IcuRequestModel = new Proxy({} as any, {
  get(_target, prop) {
    const model = getIcuRequestModel();
    const value = (model as any)[prop];
    return typeof value === 'function' ? value.bind(model) : value;
  },
});

