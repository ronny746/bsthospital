'use client';

import { useState, useEffect } from 'react';
import { IcuType } from '@/lib/icu-types';

interface IcuBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessTrack?: (requestId: string, mobile: string) => void;
}

export default function IcuBookingModal({ isOpen, onClose, onSuccessTrack }: IcuBookingModalProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [submittedBy, setSubmittedBy] = useState<'patient' | 'attendant'>('patient');

  // Form state containing ALL fields from original form
  const [formData, setFormData] = useState({
    // Step 1: Patient Info
    patientFullName: '',
    age: '',
    dob: '',
    gender: 'male',
    patientMobile: '',
    patientAltMobile: '',
    idProofType: 'aadhaar' as 'aadhaar' | 'voter_id' | 'pan_card' | 'driving_license' | 'passport',
    idProofNumber: '',
    patientUhid: '',

    // Step 2: Address
    street: '',
    city: 'Jaipur',
    state: 'Rajasthan',
    pinCode: '',

    // Step 2: Attendant Details (if attendant selected)
    attendantFullName: '',
    relationship: 'Son',
    attendantMobile: '',
    attendantAltMobile: '',

    // Step 3: Medical Details
    admissionType: 'emergency' as 'emergency' | 'planned' | 'transfer',
    requiredIcuType: 'medical_icu' as IcuType,
    currentMedicalCondition: 'Breathlessness / SpO2 Drop / Respiratory Distress',
    diagnosis: 'Acute Respiratory Distress Syndrome (ARDS) / Pneumonia',
    symptomsCriticality: 'Critical (SpO2 < 88% / Immediate Support Needed)',
    treatingDoctorName: '',
    referringHospital: '',
    currentHospitalLocation: '',
    expectedAdmissionTime: '',

    // Step 4: Care Requirements
    oxygenRequired: true,
    ventilatorRequired: false,
    ambulanceRequired: true,
    infectionIsolationRequired: false,

    // Step 4: Consent
    consentAccepted: false,
  });

  // Validation errors
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [stepError, setStepError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Document Uploads State
  const [documents, setDocuments] = useState<
    Array<{
      id: string;
      type: 'doctor_referral' | 'medical_report' | 'prescription' | 'discharge_summary' | 'patient_id' | 'attendant_id';
      fileName: string;
      fileSize: number;
      fileType: string;
      url: string;
      uploadedAt: string;
    }>
  >([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, docType: 'medical_report' | 'doctor_referral' | 'patient_id' = 'medical_report') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const newDoc = {
        id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        type: docType,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type || 'application/pdf',
        url: URL.createObjectURL(file),
        uploadedAt: new Date().toISOString(),
      };
      setDocuments((prev) => [...prev, newDoc]);
    });
  };

  const removeDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  // Pre-populated options
  const conditionOptions = [
    'Breathlessness / SpO2 Drop / Respiratory Distress',
    'Chest Pain / Cardiac Emergency / Heart Attack',
    'Stroke / Unconscious / Neurological Emergency',
    'Severe Trauma / Accident / Heavy Bleeding',
    'High Fever / Severe Infection / Sepsis',
    'Post-Operative Surgery Care Recovery',
    'Kidney / Dialysis Emergency',
    'Other Critical Condition',
  ];

  const diagnosisOptions = [
    'Acute Respiratory Distress Syndrome (ARDS) / Pneumonia',
    'Acute Myocardial Infarction / Cardiac Shock',
    'Cerebrovascular Stroke / Head Injury',
    'Septic Shock / Multi-Organ Failure',
    'Post-Surgical Recovery Monitoring',
    'Severe Polytrauma / Fractures',
    'Acute Renal Failure',
    'Under Evaluation / Not Confirmed Yet',
  ];

  const criticalityOptions = [
    'Critical (SpO2 < 88% / Immediate Support Needed)',
    'High Priority (SpO2 88-92% / Unstable Vitals)',
    'Moderate (SpO2 > 92% on Oxygen Support)',
    'Stable Monitoring Required',
  ];

  const icuCategoryLabels: Record<IcuType, string> = {
    medical_icu: 'Medical ICU (MICU)',
    surgical_icu: 'Surgical ICU (SICU)',
    cardiac_icu: 'Cardiac ICU (CICU)',
    neuro_icu: 'Neuro ICU (NICU)',
    pediatric_icu: 'Pediatric ICU (PICU)',
    neonatal_icu: 'Neonatal ICU',
    isolation_icu: 'Isolation ICU',
    ventilator_bed: 'Ventilator Bed',
  };

  // OTP screen state
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState('');

  // Result state
  const [createdRequestId, setCreatedRequestId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
    if (stepError) setStepError(null);

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const getInputClass = (fieldName: string) => {
    const hasError = !!fieldErrors[fieldName];
    if (hasError) {
      return 'w-full bg-[#fff5f5] border-2 border-[#bd171c] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#791017] font-semibold focus:outline-none focus:ring-2 focus:ring-[#bd171c]/25 transition shadow-xs';
    }
    return 'w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-[#172a34] font-medium placeholder:text-slate-400 hover:border-slate-400 focus:outline-none focus:border-[#bd171c] focus:ring-2 focus:ring-[#bd171c]/20 transition shadow-xs';
  };

  // Step Validation
  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.patientFullName.trim()) newErrors.patientFullName = 'Patient full name is required';
      if (!formData.age || Number(formData.age) <= 0 || Number(formData.age) > 120) {
        newErrors.age = 'Enter valid age (1-120)';
      }
      if (!formData.patientMobile.trim()) {
        newErrors.patientMobile = 'Mobile number is required';
      } else if (!/^[6-9]\d{9}$/.test(formData.patientMobile.trim())) {
        newErrors.patientMobile = 'Enter valid 10-digit mobile number';
      }
      if (!formData.idProofNumber.trim()) newErrors.idProofNumber = 'ID proof number is required';
    }

    if (step === 2) {
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.pinCode.trim()) {
        newErrors.pinCode = 'PIN code is required';
      } else if (!/^\d{6}$/.test(formData.pinCode.trim())) {
        newErrors.pinCode = 'Enter 6-digit PIN code';
      }

      if (submittedBy === 'attendant') {
        if (!formData.attendantFullName.trim()) newErrors.attendantFullName = 'Attendant name is required';
        if (!formData.attendantMobile.trim()) {
          newErrors.attendantMobile = 'Attendant mobile is required';
        } else if (!/^[6-9]\d{9}$/.test(formData.attendantMobile.trim())) {
          newErrors.attendantMobile = 'Enter valid 10-digit mobile number';
        }
      }
    }

    if (step === 3) {
      if (!formData.requiredIcuType) newErrors.requiredIcuType = 'Select required ICU category';
    }

    if (step === 4) {
      if (!formData.consentAccepted) {
        newErrors.consentAccepted = 'Please accept ICU emergency admission policy to proceed';
      }
    }

    setFieldErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setStepError('Please correct highlighted fields');
      return false;
    }
    setStepError(null);
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
      } else {
        triggerSendOtp();
      }
    }
  };

  const handlePrevStep = () => {
    if (stepError) setStepError(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    }
  };

  const triggerSendOtp = async () => {
    if (!validateStep(4)) return;
    setOtpLoading(true);
    setOtpError('');
    setStepError(null);
    const targetMobile = submittedBy === 'attendant' ? formData.attendantMobile : formData.patientMobile;

    try {
      const res = await fetch('/api/icu-requests/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: targetMobile }),
      });
      const data = await res.json();
      setOtpLoading(false);
      if (res.ok) {
        setShowOtpScreen(true);
      } else {
        setStepError(data.error || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setOtpLoading(false);
      setStepError('Network error while sending OTP. Please check your connection.');
    }
  };

  const handleVerifyAndSubmit = async () => {
    if (!otpCode || otpCode.length < 6) {
      setOtpError('Please enter valid 6-digit OTP');
      return;
    }

    setOtpLoading(true);
    setOtpError('');
    const targetMobile = submittedBy === 'attendant' ? formData.attendantMobile : formData.patientMobile;

    try {
      const verifyRes = await fetch('/api/icu-requests/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: targetMobile, otp: otpCode }),
      });
      const verifyData = await verifyRes.json();

      if (!verifyRes.ok) {
        setOtpLoading(false);
        setOtpError(verifyData.error || 'Invalid OTP code');
        return;
      }

      setIsSubmitting(true);
      const formattedIdStr = `${formData.idProofType.toUpperCase()}: ${formData.idProofNumber}`;
      const submitRes = await fetch('/api/icu-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submittedBy,
          patient: {
            fullName: formData.patientFullName,
            age: Number(formData.age),
            dob: formData.dob || undefined,
            gender: formData.gender,
            mobile: formData.patientMobile,
            alternateMobile: formData.patientAltMobile || undefined,
            address: {
              street: formData.street || undefined,
              city: formData.city,
              state: formData.state,
              pinCode: formData.pinCode,
            },
            aadhaarOrId: formattedIdStr,
            patientUhid: formData.patientUhid || undefined,
          },
          attendant:
            submittedBy === 'attendant'
              ? {
                  fullName: formData.attendantFullName,
                  relationship: formData.relationship,
                  mobile: formData.attendantMobile,
                  alternateMobile: formData.attendantAltMobile || undefined,
                  sameAddressAsPatient: true,
                }
              : undefined,
          medical: {
            admissionType: formData.admissionType,
            requiredIcuType: formData.requiredIcuType,
            currentMedicalCondition: formData.currentMedicalCondition,
            diagnosis: formData.diagnosis,
            symptomsCriticality: formData.symptomsCriticality,
            treatingDoctorName: formData.treatingDoctorName || undefined,
            referringHospital: formData.referringHospital || undefined,
            currentHospitalLocation: formData.currentHospitalLocation || undefined,
            expectedAdmissionTime: formData.expectedAdmissionTime || undefined,
            oxygenRequired: formData.oxygenRequired,
            ventilatorRequired: formData.ventilatorRequired,
            ambulanceRequired: formData.ambulanceRequired,
            infectionIsolationRequired: formData.infectionIsolationRequired,
          },
          documents: documents,
          consentAccepted: true,
        }),
      });

      const submitData = await submitRes.json();
      setOtpLoading(false);
      setIsSubmitting(false);

      if (submitRes.ok && submitData.requestId) {
        setShowOtpScreen(false);
        setCreatedRequestId(submitData.requestId);
        if (onSuccessTrack) {
          onSuccessTrack(submitData.requestId, targetMobile);
        }
      } else {
        setShowOtpScreen(false);
        setStepError(submitData.error || 'Failed to submit request. Please try again.');
      }
    } catch (err) {
      setOtpLoading(false);
      setIsSubmitting(false);
      setOtpError('Network error during submission.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in">
      {/* FORM CARD MATCHING BST HOSPITAL MAIN THEME WITH STEP WIZARD */}
      <div className="bg-white rounded-xl shadow-2xl max-w-md md:max-w-xl lg:max-w-2xl w-full my-auto overflow-hidden relative border border-slate-300 max-h-[85vh] flex flex-col">
        {/* CARD HEADER WITH BST NAVY THEME */}
        <div className="bg-[#172a34] px-4 sm:px-6 py-3.5 flex items-center justify-between border-b-2 border-[#bd171c] shrink-0 relative">
          <div className="w-full text-center">
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center justify-center gap-2">
              <span className="text-[#e5b64a]">🚨</span> 24/7 ICU Bed Booking
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs font-bold transition absolute right-3 top-3 border border-white/20"
            aria-label="Close form"
          >
            ✕
          </button>
        </div>

        {/* STEP PROGRESS INDICATOR */}
        {!createdRequestId && !showOtpScreen && (
          <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between text-xs shrink-0">
            <div className="flex items-center gap-2 font-bold text-[#172a34]">
              <span className="w-5 h-5 rounded-full bg-[#172a34] text-white flex items-center justify-center text-[11px]">
                {currentStep}
              </span>
              <span>
                {currentStep === 1 && 'Patient & Contact Info'}
                {currentStep === 2 && 'Address & Attendant Info'}
                {currentStep === 3 && 'Medical & Doctor Details'}
                {currentStep === 4 && 'Care, Reports & Submit'}
              </span>
            </div>
            <span className="text-[11px] font-bold text-[#bd171c]">Step {currentStep} of 4</span>
          </div>
        )}

        {/* MODAL SCROLLABLE FORM BODY */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 bg-white">
          {createdRequestId ? (
            /* SUCCESS CONFIRMATION */
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#172a34] mb-1">Request Generated!</h3>
              <p className="text-slate-600 text-xs mb-3">Your ICU bed request has been logged successfully.</p>

              <div className="bg-[#172a34] text-white p-3.5 rounded-xl max-w-xs mx-auto mb-4 shadow-md border-t-2 border-[#bd171c]">
                <div className="text-[10px] text-[#e5b64a] font-bold uppercase tracking-wider mb-0.5">Request ID</div>
                <div className="text-lg font-mono font-bold tracking-widest text-white flex items-center justify-center gap-2">
                  <span>{createdRequestId}</span>
                  <button
                    type="button"
                    onClick={() => {
                      void navigator.clipboard.writeText(createdRequestId);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="text-[10px] px-2 py-0.5 rounded bg-[#bd171c] hover:bg-[#9e1216] text-white font-bold"
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="flex gap-2 justify-center">
                <a
                  href={`/icu-status?requestId=${createdRequestId}&mobile=${submittedBy === 'attendant' ? formData.attendantMobile : formData.patientMobile}`}
                  className="bg-[#bd171c] text-white font-bold px-5 py-2 rounded-lg text-xs shadow hover:bg-[#791017]"
                >
                  Track Status Live ➔
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-slate-100 text-slate-700 font-bold px-4 py-2 rounded-lg text-xs border border-slate-300 hover:bg-slate-200"
                >
                  Close
                </button>
              </div>
            </div>
          ) : showOtpScreen ? (
            /* OTP SCREEN */
            <div className="max-w-xs mx-auto text-center py-2">
              <h3 className="text-base font-bold text-[#172a34] mb-1">OTP Verification</h3>
              <p className="text-xs text-slate-600 mb-2.5">
                Enter code sent to +91 <span className="font-bold text-[#172a34]">{submittedBy === 'attendant' ? formData.attendantMobile : formData.patientMobile}</span>
              </p>

              <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 font-bold mb-2.5">
                Demo Code: <span className="font-mono font-bold text-slate-900">123456</span>
              </div>

              <input
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="Enter OTP *"
                maxLength={6}
                className="w-full bg-white border border-slate-300 rounded-lg py-2 px-3 text-center font-mono text-xl font-bold tracking-widest text-slate-800 mb-2.5 focus:border-[#bd171c] focus:outline-none"
              />

              {otpError && <div className="text-xs text-[#bd171c] font-bold mb-2.5 p-1.5 bg-red-50 border border-red-200 rounded-lg">⚠️ {otpError}</div>}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowOtpScreen(false)}
                  className="w-1/2 bg-slate-100 text-slate-700 py-2 rounded-lg font-bold text-xs border border-slate-300 hover:bg-slate-200"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleVerifyAndSubmit}
                  disabled={otpLoading || isSubmitting}
                  className="w-1/2 bg-[#bd171c] hover:bg-[#791017] text-white py-2 rounded-lg font-bold text-xs shadow"
                >
                  {isSubmitting ? 'Submitting...' : 'Verify & Submit'}
                </button>
              </div>
            </div>
          ) : (
            /* STEP WIZARD FORM CONTENT */
            <div className="space-y-3">
              {/* TOP ERROR BANNER */}
              {stepError && (
                <div className="p-2.5 bg-red-50 border border-[#bd171c]/40 rounded-lg text-xs font-bold text-[#791017] flex items-center justify-between">
                  <span>⚠️ {stepError}</span>
                  <button type="button" onClick={() => setStepError(null)} className="text-[#bd171c] font-bold">✕</button>
                </div>
              )}

              {/* STEP 1: PATIENT & ID DETAILS */}
              {currentStep === 1 && (
                <div className="space-y-2.5 animate-fade-in">
                  {/* BOOKING MODE SEGMENTED CONTROL */}
                  <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 mb-2">
                    <button
                      type="button"
                      onClick={() => setSubmittedBy('patient')}
                      className={`py-1.5 px-2 rounded-md text-xs font-bold transition flex items-center justify-center gap-1 ${
                        submittedBy === 'patient'
                          ? 'bg-[#172a34] text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span>👤</span> Patient / Self
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubmittedBy('attendant')}
                      className={`py-1.5 px-2 rounded-md text-xs font-bold transition flex items-center justify-center gap-1 ${
                        submittedBy === 'attendant'
                          ? 'bg-[#172a34] text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span>🤝</span> Attendant / Doctor
                    </button>
                  </div>

                  {/* PATIENT NAME */}
                  <div>
                    <input
                      type="text"
                      name="patientFullName"
                      value={formData.patientFullName}
                      onChange={handleInputChange}
                      placeholder="Patient Full Name *"
                      className={getInputClass('patientFullName')}
                    />
                    {fieldErrors.patientFullName && (
                      <p className="text-[11px] text-red-600 font-bold mt-0.5 px-1">⚠️ {fieldErrors.patientFullName}</p>
                    )}
                  </div>

                  {/* AGE & GENDER */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="Age *"
                        className={getInputClass('age')}
                      />
                      {fieldErrors.age && (
                        <p className="text-[11px] text-red-600 font-bold mt-0.5 px-1">⚠️ {fieldErrors.age}</p>
                      )}
                    </div>

                    <div>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className={getInputClass('gender')}
                      >
                        <option value="male">Gender: Male *</option>
                        <option value="female">Gender: Female *</option>
                        <option value="other">Gender: Other *</option>
                      </select>
                    </div>
                  </div>

                  {/* PATIENT MOBILE & ALT MOBILE */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <div className="flex border border-slate-300 rounded-lg overflow-hidden shadow-xs focus-within:border-[#bd171c] focus-within:ring-2 focus-within:ring-[#bd171c]/20 transition">
                        <span className="bg-slate-100 border-r border-slate-300 px-3 py-2 text-xs sm:text-sm font-semibold text-[#172a34] flex items-center shrink-0">
                          +91 ▾
                        </span>
                        <input
                          type="tel"
                          name="patientMobile"
                          value={formData.patientMobile}
                          onChange={handleInputChange}
                          placeholder="Mobile Number *"
                          maxLength={10}
                          className="w-full bg-white px-3 py-2 text-xs sm:text-sm text-slate-800 font-medium placeholder:text-slate-400 focus:outline-none"
                        />
                      </div>
                      {fieldErrors.patientMobile && (
                        <p className="text-[11px] text-[#bd171c] font-bold mt-0.5 px-1">⚠️ {fieldErrors.patientMobile}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="tel"
                        name="patientAltMobile"
                        value={formData.patientAltMobile}
                        onChange={handleInputChange}
                        placeholder="Alternate Mobile (Optional)"
                        maxLength={10}
                        className={getInputClass('patientAltMobile')}
                      />
                    </div>
                  </div>

                  {/* ID PROOF TYPE & NUMBER */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <select
                        name="idProofType"
                        value={formData.idProofType}
                        onChange={handleInputChange}
                        className={getInputClass('idProofType')}
                      >
                        <option value="aadhaar">ID Type: Aadhaar Card *</option>
                        <option value="voter_id">ID Type: Voter ID Card *</option>
                        <option value="pan_card">ID Type: PAN Card *</option>
                        <option value="driving_license">ID Type: Driving License *</option>
                        <option value="passport">ID Type: Passport *</option>
                      </select>
                    </div>

                    <div>
                      <input
                        type="text"
                        name="idProofNumber"
                        value={formData.idProofNumber}
                        onChange={handleInputChange}
                        placeholder={
                          formData.idProofType === 'aadhaar'
                            ? 'Aadhaar Number (12-digit) *'
                            : formData.idProofType === 'voter_id'
                            ? 'Voter ID Number *'
                            : 'ID Proof Number *'
                        }
                        className={getInputClass('idProofNumber')}
                      />
                      {fieldErrors.idProofNumber && (
                        <p className="text-[11px] text-red-600 font-bold mt-0.5 px-1">⚠️ {fieldErrors.idProofNumber}</p>
                      )}
                    </div>
                  </div>

                  {/* UHID NUMBER */}
                  <div>
                    <input
                      type="text"
                      name="patientUhid"
                      value={formData.patientUhid}
                      onChange={handleInputChange}
                      placeholder="Hospital UHID / Patient Reg No. (Optional)"
                      className={getInputClass('patientUhid')}
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: ADDRESS & ATTENDANT INFO */}
              {currentStep === 2 && (
                <div className="space-y-2.5 animate-fade-in">
                  {/* STREET ADDRESS */}
                  <div>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      placeholder="House / Street Address (Optional)"
                      className={getInputClass('street')}
                    />
                  </div>

                  {/* CITY, STATE & PIN CODE */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City *"
                        className={getInputClass('city')}
                      />
                      {fieldErrors.city && (
                        <p className="text-[11px] text-red-600 font-bold mt-0.5 px-1">⚠️ {fieldErrors.city}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State *"
                        className={getInputClass('state')}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="pinCode"
                        value={formData.pinCode}
                        onChange={handleInputChange}
                        placeholder="PIN Code *"
                        maxLength={6}
                        className={getInputClass('pinCode')}
                      />
                      {fieldErrors.pinCode && (
                        <p className="text-[11px] text-red-600 font-bold mt-0.5 px-1">⚠️ {fieldErrors.pinCode}</p>
                      )}
                    </div>
                  </div>

                  {/* ATTENDANT INFO SECTION */}
                  {submittedBy === 'attendant' && (
                    <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-lg space-y-2">
                      <div className="text-xs font-bold text-amber-900 flex items-center gap-1">
                        <span>🤝</span> Attendant / Contact Person Information *
                      </div>

                      <div>
                        <input
                          type="text"
                          name="attendantFullName"
                          value={formData.attendantFullName}
                          onChange={handleInputChange}
                          placeholder="Attendant Full Name *"
                          className={getInputClass('attendantFullName')}
                        />
                        {fieldErrors.attendantFullName && (
                          <p className="text-[11px] text-red-600 font-bold mt-0.5 px-1">⚠️ {fieldErrors.attendantFullName}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <div>
                          <input
                            type="text"
                            name="relationship"
                            value={formData.relationship}
                            onChange={handleInputChange}
                            placeholder="Relationship to Patient *"
                            className={getInputClass('relationship')}
                          />
                        </div>

                        <div>
                          <input
                            type="tel"
                            name="attendantMobile"
                            value={formData.attendantMobile}
                            onChange={handleInputChange}
                            placeholder="Attendant Mobile *"
                            maxLength={10}
                            className={getInputClass('attendantMobile')}
                          />
                          {fieldErrors.attendantMobile && (
                            <p className="text-[11px] text-red-600 font-bold mt-0.5 px-1">⚠️ {fieldErrors.attendantMobile}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: MEDICAL & DOCTOR DETAILS */}
              {currentStep === 3 && (
                <div className="space-y-2.5 animate-fade-in">
                  {/* ADMISSION TYPE & ICU BED TYPE */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <select
                        name="admissionType"
                        value={formData.admissionType}
                        onChange={handleInputChange}
                        className={getInputClass('admissionType')}
                      >
                        <option value="emergency">Admission: Emergency ICU *</option>
                        <option value="planned">Admission: Planned ICU *</option>
                        <option value="transfer">Admission: Hospital Transfer *</option>
                      </select>
                    </div>

                    <div>
                      <select
                        name="requiredIcuType"
                        value={formData.requiredIcuType}
                        onChange={handleInputChange}
                        className={getInputClass('requiredIcuType')}
                      >
                        {Object.entries(icuCategoryLabels).map(([key, label]) => (
                          <option key={key} value={key}>
                            ICU Bed: {label} *
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* MEDICAL CONDITION & DIAGNOSIS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <select
                        name="currentMedicalCondition"
                        value={formData.currentMedicalCondition}
                        onChange={handleInputChange}
                        className={getInputClass('currentMedicalCondition')}
                      >
                        {conditionOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            Condition: {opt} *
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <select
                        name="diagnosis"
                        value={formData.diagnosis}
                        onChange={handleInputChange}
                        className={getInputClass('diagnosis')}
                      >
                        {diagnosisOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            Diagnosis: {opt} *
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* CRITICALITY LEVEL */}
                  <div>
                    <select
                      name="symptomsCriticality"
                      value={formData.symptomsCriticality}
                      onChange={handleInputChange}
                      className={getInputClass('symptomsCriticality')}
                    >
                      {criticalityOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          Criticality Level: {opt} *
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* DOCTOR & REFERRING HOSPITAL DETAILS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <input
                        type="text"
                        name="treatingDoctorName"
                        value={formData.treatingDoctorName}
                        onChange={handleInputChange}
                        placeholder="Treating / Referring Doctor Name (Optional)"
                        className={getInputClass('treatingDoctorName')}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="referringHospital"
                        value={formData.referringHospital}
                        onChange={handleInputChange}
                        placeholder="Referring Hospital / Clinic (Optional)"
                        className={getInputClass('referringHospital')}
                      />
                    </div>
                  </div>

                  {/* CURRENT LOCATION & EXPECTED TIME */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <input
                        type="text"
                        name="currentHospitalLocation"
                        value={formData.currentHospitalLocation}
                        onChange={handleInputChange}
                        placeholder="Current Patient Location (Optional)"
                        className={getInputClass('currentHospitalLocation')}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="expectedAdmissionTime"
                        value={formData.expectedAdmissionTime}
                        onChange={handleInputChange}
                        placeholder="Expected Arrival Time (Optional)"
                        className={getInputClass('expectedAdmissionTime')}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: CARE REQUIREMENTS, DOCUMENTS & SUBMIT */}
              {currentStep === 4 && (
                <div className="space-y-2.5 animate-fade-in">
                  {/* CARE REQUIREMENTS CHECKBOXES */}
                  <div>
                    <span className="text-xs font-bold text-[#172a34] block mb-1">
                      🚑 Immediate Critical Support Needed:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                      <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700">
                        <input
                          type="checkbox"
                          name="oxygenRequired"
                          checked={formData.oxygenRequired}
                          onChange={handleInputChange}
                          className="accent-[#bd171c]"
                        />
                        <span>Oxygen</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700">
                        <input
                          type="checkbox"
                          name="ventilatorRequired"
                          checked={formData.ventilatorRequired}
                          onChange={handleInputChange}
                          className="accent-[#bd171c]"
                        />
                        <span>Ventilator</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700">
                        <input
                          type="checkbox"
                          name="ambulanceRequired"
                          checked={formData.ambulanceRequired}
                          onChange={handleInputChange}
                          className="accent-[#bd171c]"
                        />
                        <span>Ambulance</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700">
                        <input
                          type="checkbox"
                          name="infectionIsolationRequired"
                          checked={formData.infectionIsolationRequired}
                          onChange={handleInputChange}
                          className="accent-[#bd171c]"
                        />
                        <span>Isolation</span>
                      </label>
                    </div>
                  </div>

                  {/* DOCUMENT UPLOADS SECTION */}
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#172a34] flex items-center gap-1.5">
                        📎 Medical Reports & ID Copy <span className="text-[10px] text-slate-500 font-normal">(Optional)</span>
                      </span>
                      <label className="bg-[#172a34] hover:bg-[#0e191f] text-white text-[11px] font-bold py-1 px-3 rounded cursor-pointer transition shadow-xs flex items-center gap-1">
                        <span>+ Attach File</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*,application/pdf"
                          onChange={(e) => handleFileUpload(e, 'medical_report')}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="text-[10px] text-slate-500">
                      Upload Prescription, Doctor Referral Note, Discharge Summary, or ID Copy (PDF, PNG, JPG - Max 10MB)
                    </p>

                    {/* UPLOADED DOCUMENTS LIST */}
                    {documents.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        {documents.map((doc) => (
                          <div
                            key={doc.id}
                            className="flex items-center justify-between bg-white p-2 rounded border border-slate-200 text-xs text-slate-700 shadow-xs"
                          >
                            <div className="flex items-center gap-2 overflow-hidden">
                              <span className="text-base shrink-0">📄</span>
                              <div className="truncate">
                                <p className="font-semibold text-[#172a34] truncate">{doc.fileName}</p>
                                <p className="text-[10px] text-slate-400">{(doc.fileSize / 1024).toFixed(1)} KB</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeDocument(doc.id)}
                              className="text-[#bd171c] hover:text-red-700 font-bold px-2 py-0.5 text-xs rounded hover:bg-red-50"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* DECLARATION CHECKBOX */}
                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 font-normal leading-tight">
                      <input
                        type="checkbox"
                        name="consentAccepted"
                        checked={formData.consentAccepted}
                        onChange={handleInputChange}
                        className="mt-0.5 accent-[#bd171c] w-4 h-4 shrink-0"
                      />
                      <span>
                        You confirm that all patient & medical details provided above are accurate and accept BST Hospital ICU emergency admission policy. *
                      </span>
                    </label>
                    {fieldErrors.consentAccepted && (
                      <p className="text-[11px] text-[#bd171c] font-bold mt-1 px-1">⚠️ {fieldErrors.consentAccepted}</p>
                    )}
                  </div>
                </div>
              )}

              {/* WIZARD NAVIGATION BUTTONS (BACK / NEXT / VERIFY & SUBMIT) */}
              <div className="pt-2 flex gap-2">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="w-1/3 bg-slate-100 text-[#172a34] font-bold text-xs py-2.5 px-3 rounded-lg border border-slate-300 hover:bg-slate-200 transition"
                  >
                    ← Back
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={otpLoading}
                  className={`${
                    currentStep > 1 ? 'w-2/3' : 'w-full'
                  } bg-[#bd171c] hover:bg-[#791017] text-white font-extrabold text-xs sm:text-sm py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer border-b-2 border-[#791017]`}
                >
                  {currentStep < 4 ? 'Next Step ➔' : otpLoading ? 'Sending Verification OTP...' : 'Verify OTP & Submit Booking ➔'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
