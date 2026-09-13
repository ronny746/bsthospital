'use client';

import { useState, useEffect } from 'react';
import { IcuType } from '@/lib/icu-types';

interface IcuBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessTrack?: (requestId: string, mobile: string) => void;
}

export default function IcuBookingModal({ isOpen, onClose, onSuccessTrack }: IcuBookingModalProps) {
  const [step, setStep] = useState(1);
  const [submittedBy, setSubmittedBy] = useState<'patient' | 'attendant'>('patient');

  // Form state
  const [formData, setFormData] = useState({
    patientFullName: '',
    age: '',
    dob: '',
    gender: 'male',
    patientMobile: '',
    patientAltMobile: '',    // ID proof & Address
    idProofType: 'aadhaar' as 'aadhaar' | 'voter_id' | 'pan_card' | 'driving_license' | 'passport',
    idProofNumber: '',
    street: '',
    city: 'Jaipur',
    state: 'Rajasthan',
    pinCode: '',
    patientUhid: '',

    // Attendant details
    attendantFullName: '',
    relationship: 'Son',
    attendantMobile: '',
    attendantAltMobile: '',
    attendantEmail: '',
    attendantIdProofNumber: '',
    sameAddressAsPatient: true,

    // Medical Details
    admissionType: 'emergency' as 'emergency' | 'planned' | 'transfer',
    requiredIcuType: 'medical_icu' as IcuType,
    currentMedicalCondition: 'Breathlessness / SpO2 Drop / Respiratory Distress',
    diagnosis: 'Acute Respiratory Distress Syndrome (ARDS) / Pneumonia',
    symptomsCriticality: 'Critical (SpO2 < 88% / Immediate Support Needed)',
    oxygenRequired: true,
    ventilatorRequired: false,
    treatingDoctorName: '',
    referringHospital: '',
    currentHospitalLocation: '',
    expectedAdmissionTime: '',
    ambulanceRequired: true,
    infectionIsolationRequired: false,
    additionalRemarks: '',

    // Consents
    consentAccepted: false,
  });

  // Validation errors
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [stepError, setStepError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Predefined Medical Dropdown Options
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

  const idTypeLabels: Record<string, string> = {
    aadhaar: 'Aadhaar Card (12-digit)',
    voter_id: 'Voter ID Card',
    pan_card: 'PAN Card',
    driving_license: 'Driving License',
    passport: 'Passport',
  };

  // Uploaded docs
  const [documents, setDocuments] = useState<
    Array<{ id: string; type: string; fileName: string; fileSize: number; url: string }>
  >([]);

  // OTP modal
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState('');

  // Result state
  const [createdRequestId, setCreatedRequestId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset form on close if needed
    }
  }, [isOpen]);

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

  const getInputClass = (fieldName: string, extraClasses: string = '') => {
    const hasError = !!fieldErrors[fieldName];
    if (hasError) {
      return `w-full bg-red-50 border-2 border-red-500 rounded-xl px-3 py-2 text-base sm:text-xs text-red-950 font-medium focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-200 transition ${extraClasses}`;
    }
    return `w-full bg-slate-50/90 border border-slate-300/80 rounded-xl px-3 py-2 text-base sm:text-xs text-slate-800 font-medium focus:bg-white focus:outline-none focus:border-[#bd171c] focus:ring-1 focus:ring-[#bd171c]/20 transition ${extraClasses}`;
  };

  const handleFileUpload = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newDoc = {
        id: `doc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        type,
        fileName: file.name,
        fileSize: file.size,
        url: URL.createObjectURL(file),
      };
      setDocuments((prev) => [...prev.filter((d) => d.type !== type), newDoc]);
    }
  };

  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {};
    let mainError: string | null = null;

    if (step === 1) {
      if (!formData.patientFullName.trim()) {
        newErrors.patientFullName = 'Patient Full Name is required';
      }
      if (!formData.age || Number(formData.age) <= 0) {
        newErrors.age = 'Enter a valid age';
      }
      if (!formData.patientMobile.trim()) {
        newErrors.patientMobile = 'Mobile number is required';
      } else if (!/^\d{10}$/.test(formData.patientMobile.trim())) {
        newErrors.patientMobile = 'Enter a valid 10-digit mobile number';
      }
      if (!formData.idProofNumber.trim()) {
        newErrors.idProofNumber = `${idTypeLabels[formData.idProofType] || 'ID Proof'} number is required`;
      }
      if (!formData.city.trim()) {
        newErrors.city = 'City is required';
      }
      if (!formData.pinCode.trim()) {
        newErrors.pinCode = 'PIN Code is required';
      } else if (!/^\d{6}$/.test(formData.pinCode.trim())) {
        newErrors.pinCode = 'Enter a valid 6-digit PIN code';
      }

      if (submittedBy === 'attendant') {
        if (!formData.attendantFullName.trim()) {
          newErrors.attendantFullName = 'Attendant Full Name is required';
        }
        if (!formData.attendantMobile.trim()) {
          newErrors.attendantMobile = 'Attendant Mobile is required';
        } else if (!/^\d{10}$/.test(formData.attendantMobile.trim())) {
          newErrors.attendantMobile = 'Enter a valid 10-digit mobile number';
        }
      }

      if (Object.keys(newErrors).length > 0) {
        mainError = 'Please complete all required identity and contact fields.';
      }
    }

    if (step === 2) {
      if (!formData.currentMedicalCondition.trim()) {
        newErrors.currentMedicalCondition = 'Current medical condition is required';
      }
      if (!formData.diagnosis.trim()) {
        newErrors.diagnosis = 'Medical diagnosis is required';
      }
      if (!formData.symptomsCriticality.trim()) {
        newErrors.symptomsCriticality = 'Criticality level is required';
      }

      if (Object.keys(newErrors).length > 0) {
        mainError = 'Please select mandatory medical condition & diagnosis details.';
      }
    }

    if (step === 3) {
      if (!formData.consentAccepted) {
        newErrors.consentAccepted = 'You must accept the admission terms declaration';
        mainError = 'Please accept the mandatory terms and policy declaration to proceed.';
      }
    }

    setFieldErrors(newErrors);
    setStepError(mainError);

    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (!validateCurrentStep()) return;
    setStepError(null);
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setStepError(null);
    setFieldErrors({});
    setStep((prev) => prev - 1);
  };

  const triggerSendOtp = async () => {
    if (!validateCurrentStep()) return;
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
              street: formData.street,
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
                  email: formData.attendantEmail || undefined,
                  idProofNumber: formattedIdStr,
                  sameAddressAsPatient: true,
                }
              : undefined,
          medical: {
            admissionType: formData.admissionType,
            requiredIcuType: formData.requiredIcuType,
            currentMedicalCondition: formData.currentMedicalCondition,
            diagnosis: formData.diagnosis,
            symptomsCriticality: formData.symptomsCriticality,
            oxygenRequired: formData.oxygenRequired,
            ventilatorRequired: formData.ventilatorRequired,
            treatingDoctorName: formData.treatingDoctorName || undefined,
            referringHospital: formData.referringHospital || undefined,
            currentHospitalLocation: formData.currentHospitalLocation || undefined,
            expectedAdmissionTime: formData.expectedAdmissionTime || undefined,
            ambulanceRequired: formData.ambulanceRequired,
            infectionIsolationRequired: formData.infectionIsolationRequired,
            additionalRemarks: formData.additionalRemarks || undefined,
          },
          documents: documents.map((d) => ({
            id: d.id,
            type: d.type,
            fileName: d.fileName,
            fileSize: d.fileSize,
            fileType: 'application/pdf',
            url: d.url,
            uploadedAt: new Date().toISOString(),
          })),
          consentAccepted: true,
        }),
      });

      const submitData = await submitRes.json();
      setOtpLoading(false);
      setIsSubmitting(false);

      if (submitRes.ok && submitData.requestId) {
        setShowOtpScreen(false);
        setCreatedRequestId(submitData.requestId);
      } else {
        setOtpError(submitData.error || 'Failed to submit booking request');
      }
    } catch (err) {
      setOtpLoading(false);
      setIsSubmitting(false);
      setOtpError('Error processing request. Please try again.');
    }
  };

  const icuTypeOptions: Array<{ key: IcuType; icon: string; title: string; desc: string }> = [
    { key: 'medical_icu', icon: '🩺', title: 'Medical ICU (MICU)', desc: 'Organ failure, sepsis & respiratory' },
    { key: 'surgical_icu', icon: '🏥', title: 'Surgical ICU (SICU)', desc: 'Post-operative major surgery' },
    { key: 'cardiac_icu', icon: '🫀', title: 'Cardiac ICU (CICU)', desc: 'Heart attack & cardiac care' },
    { key: 'neuro_icu', icon: '🧠', title: 'Neuro ICU (NICU)', desc: 'Stroke & brain trauma care' },
    { key: 'pediatric_icu', icon: '👶', title: 'Pediatric ICU (PICU)', desc: 'Child & infant intensive care' },
    { key: 'neonatal_icu', icon: '🍼', title: 'Neonatal ICU', desc: 'Premature & newborn care' },
    { key: 'isolation_icu', icon: '🛡️', title: 'Isolation ICU', desc: 'Contagious disease containment' },
    { key: 'ventilator_bed', icon: '🫁', title: 'Ventilator Bed', desc: 'Dedicated mechanical airway' },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-5 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full my-auto overflow-hidden relative border-t-4 border-t-[#bd171c] max-h-[94vh] flex flex-col">
        {/* MODAL HEADER */}
        <div className="bg-gradient-to-r from-[#172a34] via-[#0f232e] to-[#791017] px-4 py-3 sm:px-6 sm:py-3.5 text-white flex justify-between items-center shrink-0 border-b border-white/10">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">NIMS Critical Care</span>
            </div>
            <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight">24/7 ICU Bed Booking</h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-bold transition border border-white/20"
            title="Close Dialog"
          >
            ✕
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-white">
          {createdRequestId ? (
            /* SUCCESS CONFIRMATION */
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner border border-emerald-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#172a34] mb-1.5">Request Generated Successfully!</h3>
              <p className="text-slate-600 text-xs mb-5 max-w-xs mx-auto font-medium">
                Your request has been submitted to the BST Hospital Critical Care Desk.
              </p>

              <div className="bg-[#172a34] text-white p-5 rounded-2xl max-w-xs mx-auto mb-6 shadow-lg border border-[#e5b64a]/50">
                <div className="text-[10px] font-black text-[#e5b64a] uppercase tracking-widest mb-1">Unique Request ID</div>
                <div className="text-xl font-mono font-black tracking-widest text-white flex items-center justify-center gap-2.5 my-1">
                  <span>{createdRequestId}</span>
                  <button
                    type="button"
                    onClick={() => {
                      void navigator.clipboard.writeText(createdRequestId);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className={`text-[10px] px-2.5 py-1 rounded-md font-bold transition shadow ${
                      copied ? 'bg-emerald-600 text-white' : 'bg-[#bd171c] hover:bg-[#791017] text-white'
                    }`}
                  >
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                <a
                  href={`/icu-status?requestId=${createdRequestId}&mobile=${submittedBy === 'attendant' ? formData.attendantMobile : formData.patientMobile}`}
                  className="bg-[#bd171c] hover:bg-[#791017] text-white font-bold px-6 py-2.5 rounded-xl shadow transition text-xs text-center"
                >
                  Track Status Live ➔
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-slate-100 hover:bg-slate-200 text-[#172a34] font-semibold px-5 py-2.5 rounded-xl transition text-xs border border-slate-300"
                >
                  Close Dialog
                </button>
              </div>
            </div>
          ) : showOtpScreen ? (
            /* OTP VERIFICATION SCREEN */
            <div className="max-w-xs mx-auto text-center py-2">
              <h3 className="text-xl font-bold text-[#172a34] mb-1">Mobile OTP Verification</h3>
              <p className="text-xs text-slate-600 mb-3 font-medium">
                Enter 6-digit OTP code sent to +91{' '}
                <span className="font-bold text-[#bd171c]">
                  {submittedBy === 'attendant' ? formData.attendantMobile : formData.patientMobile}
                </span>
              </p>

              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 font-bold mb-3">
                Demo Code: <span className="font-mono text-sm font-black text-[#172a34]">123456</span>
              </div>

              <input
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="123456"
                maxLength={6}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 px-3 text-center font-mono text-2xl font-black tracking-widest text-[#172a34] mb-3 focus:outline-none focus:border-[#bd171c]"
              />

              {otpError && <div className="text-xs text-red-600 font-bold mb-3 p-2 bg-red-50 border border-red-200 rounded-lg">⚠️ {otpError}</div>}

              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowOtpScreen(false)}
                  className="w-1/2 bg-slate-100 hover:bg-slate-200 text-[#172a34] py-2.5 rounded-xl font-bold text-xs"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleVerifyAndSubmit}
                  disabled={otpLoading || isSubmitting}
                  className="w-1/2 bg-[#bd171c] hover:bg-[#791017] text-white py-2.5 rounded-xl font-bold text-xs shadow"
                >
                  {isSubmitting ? 'Submitting...' : 'Verify & Submit'}
                </button>
              </div>
            </div>
          ) : (
            /* 3-STEP EXPRESS WIZARD STEPS */
            <div className="space-y-4">
              {/* STEP TRACKER HEADER */}
              <div className="space-y-1.5 pb-1 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                    Step {step} of 3
                  </span>
                  <span className="text-xs font-bold text-[#bd171c]">
                    {step === 1 && 'Patient & Identity'}
                    {step === 2 && 'Medical Needs & ICU Type'}
                    {step === 3 && 'Uploads & Confirmation'}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                  <div
                    className="h-full bg-gradient-to-r from-[#172a34] via-[#bd171c] to-[#e5b64a] transition-all duration-300 rounded-full"
                    style={{ width: `${(step / 3) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* TOP IN-FORM ERROR BANNER */}
              {stepError && (
                <div className="p-2.5 bg-red-50 border border-red-400 rounded-xl text-xs font-bold text-red-900 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-ping shrink-0"></span>
                    <span>{stepError}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStepError(null)}
                    className="text-red-500 hover:text-red-900 font-bold text-xs px-1"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* STEP 1: PATIENT & IDENTITY DETAILS */}
              {step === 1 && (
                <div className="space-y-3">
                  {/* BOOKING MODE SEGMENTED PILL TAB */}
                  <div className="grid grid-cols-2 gap-1.5 bg-slate-100/90 p-1 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setSubmittedBy('patient')}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                        submittedBy === 'patient'
                          ? 'bg-white text-[#172a34] shadow-sm border border-slate-200'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <span>👤</span> Patient / Self
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubmittedBy('attendant')}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                        submittedBy === 'attendant'
                          ? 'bg-white text-[#172a34] shadow-sm border border-slate-200'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <span>🤝</span> Attendant / Doctor
                    </button>
                  </div>

                  {/* PATIENT DETAILS FIELDS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Patient Full Name *
                      </label>
                      <input
                        type="text"
                        name="patientFullName"
                        value={formData.patientFullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Ramesh Sharma"
                        className={getInputClass('patientFullName')}
                      />
                      {fieldErrors.patientFullName && (
                        <p className="text-[10px] text-red-600 font-bold mt-0.5">⚠️ {fieldErrors.patientFullName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Age *
                        </label>
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleInputChange}
                          placeholder="58"
                          className={getInputClass('age')}
                        />
                        {fieldErrors.age && (
                          <p className="text-[10px] text-red-600 font-bold mt-0.5">⚠️ {fieldErrors.age}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Gender *
                        </label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className={getInputClass('gender')}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        name="patientMobile"
                        value={formData.patientMobile}
                        onChange={handleInputChange}
                        placeholder="10-digit mobile"
                        maxLength={10}
                        className={getInputClass('patientMobile')}
                      />
                      {fieldErrors.patientMobile && (
                        <p className="text-[10px] text-red-600 font-bold mt-0.5">⚠️ {fieldErrors.patientMobile}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Alternate Mobile
                      </label>
                      <input
                        type="tel"
                        name="patientAltMobile"
                        value={formData.patientAltMobile}
                        onChange={handleInputChange}
                        placeholder="Optional alternate"
                        maxLength={10}
                        className={getInputClass('patientAltMobile')}
                      />
                    </div>
                  </div>

                  {/* ID PROOF CARD */}
                  <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-2">
                    <div className="text-[11px] font-extrabold text-[#172a34] uppercase tracking-wider flex items-center gap-1.5">
                      <span>🪪</span> Patient Identity Document *
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">ID Type *</label>
                        <select
                          name="idProofType"
                          value={formData.idProofType}
                          onChange={handleInputChange}
                          className={getInputClass('idProofType')}
                        >
                          <option value="aadhaar">Aadhaar Card</option>
                          <option value="voter_id">Voter ID Card</option>
                          <option value="pan_card">PAN Card</option>
                          <option value="driving_license">Driving License</option>
                          <option value="passport">Passport</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                          {idTypeLabels[formData.idProofType] || 'ID Number'} *
                        </label>
                        <input
                          type="text"
                          name="idProofNumber"
                          value={formData.idProofNumber}
                          onChange={handleInputChange}
                          placeholder={
                            formData.idProofType === 'aadhaar'
                              ? '12-digit number'
                              : formData.idProofType === 'voter_id'
                              ? 'e.g. ABC1234567'
                              : 'Enter ID number'
                          }
                          className={getInputClass('idProofNumber')}
                        />
                        {fieldErrors.idProofNumber && (
                          <p className="text-[10px] text-red-600 font-bold mt-0.5">⚠️ {fieldErrors.idProofNumber}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* LOCATION & ATTENDANT (IF ANY) */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={getInputClass('city')}
                      />
                      {fieldErrors.city && (
                        <p className="text-[10px] text-red-600 font-bold mt-0.5">⚠️ {fieldErrors.city}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        name="pinCode"
                        value={formData.pinCode}
                        onChange={handleInputChange}
                        placeholder="302017"
                        maxLength={6}
                        className={getInputClass('pinCode')}
                      />
                      {fieldErrors.pinCode && (
                        <p className="text-[10px] text-red-600 font-bold mt-0.5">⚠️ {fieldErrors.pinCode}</p>
                      )}
                    </div>
                  </div>

                  {submittedBy === 'attendant' && (
                    <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
                      <div className="text-[11px] font-bold text-amber-900 flex items-center gap-1.5">
                        <span>👤</span> Attendant Information (Required)
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">Name *</label>
                          <input
                            type="text"
                            name="attendantFullName"
                            value={formData.attendantFullName}
                            onChange={handleInputChange}
                            placeholder="Amit Sharma"
                            className={getInputClass('attendantFullName')}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">Relationship *</label>
                          <input
                            type="text"
                            name="relationship"
                            value={formData.relationship}
                            onChange={handleInputChange}
                            placeholder="Son / Spouse"
                            className={getInputClass('relationship')}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">Mobile *</label>
                          <input
                            type="tel"
                            name="attendantMobile"
                            value={formData.attendantMobile}
                            onChange={handleInputChange}
                            placeholder="10-digit mobile"
                            maxLength={10}
                            className={getInputClass('attendantMobile')}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: MEDICAL NEEDS & ICU TYPE */}
              {step === 2 && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Admission Urgency
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'emergency', label: 'Emergency', desc: 'Immediate bed' },
                        { id: 'planned', label: 'Planned Stay', desc: 'Scheduled' },
                        { id: 'transfer', label: 'Transfer', desc: 'Outside clinic' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFormData((p) => ({ ...p, admissionType: item.id as any }))}
                          className={`p-2.5 rounded-xl text-left border transition ${
                            formData.admissionType === item.id
                              ? 'border-[#172a34] bg-[#172a34] text-white shadow-sm font-semibold'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white'
                          }`}
                        >
                          <div className="font-bold text-xs">{item.label}</div>
                          <div className={`text-[10px] ${formData.admissionType === item.id ? 'text-slate-200' : 'text-slate-500'}`}>{item.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Required ICU Category *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {icuTypeOptions.map((opt) => (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => setFormData((p) => ({ ...p, requiredIcuType: opt.key }))}
                          className={`p-2.5 rounded-xl border text-left transition ${
                            formData.requiredIcuType === opt.key
                              ? 'border-[#bd171c] bg-red-50 text-[#172a34] font-semibold shadow-sm'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white'
                          }`}
                        >
                          <div className="text-base mb-0.5">{opt.icon}</div>
                          <div className="font-bold text-[11px] text-[#172a34]">{opt.title}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Current Medical Condition *
                      </label>
                      <select
                        name="currentMedicalCondition"
                        value={formData.currentMedicalCondition}
                        onChange={handleInputChange}
                        className={getInputClass('currentMedicalCondition')}
                      >
                        {conditionOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {fieldErrors.currentMedicalCondition && (
                        <p className="text-[10px] text-red-600 font-bold mt-0.5">⚠️ {fieldErrors.currentMedicalCondition}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Medical Diagnosis *
                      </label>
                      <select
                        name="diagnosis"
                        value={formData.diagnosis}
                        onChange={handleInputChange}
                        className={getInputClass('diagnosis')}
                      >
                        {diagnosisOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {fieldErrors.diagnosis && (
                        <p className="text-[10px] text-red-600 font-bold mt-0.5">⚠️ {fieldErrors.diagnosis}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Criticality Level *
                    </label>
                    <select
                      name="symptomsCriticality"
                      value={formData.symptomsCriticality}
                      onChange={handleInputChange}
                      className={getInputClass('symptomsCriticality')}
                    >
                      {criticalityOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.symptomsCriticality && (
                      <p className="text-[10px] text-red-600 font-bold mt-0.5">⚠️ {fieldErrors.symptomsCriticality}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="oxygenRequired"
                        checked={formData.oxygenRequired}
                        onChange={handleInputChange}
                        className="accent-[#bd171c]"
                      />
                      <span className="text-xs font-semibold text-slate-800">Oxygen</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="ventilatorRequired"
                        checked={formData.ventilatorRequired}
                        onChange={handleInputChange}
                        className="accent-[#bd171c]"
                      />
                      <span className="text-xs font-semibold text-slate-800">Ventilator</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="ambulanceRequired"
                        checked={formData.ambulanceRequired}
                        onChange={handleInputChange}
                        className="accent-[#bd171c]"
                      />
                      <span className="text-xs font-semibold text-slate-800">Ambulance</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="infectionIsolationRequired"
                        checked={formData.infectionIsolationRequired}
                        onChange={handleInputChange}
                        className="accent-[#bd171c]"
                      />
                      <span className="text-xs font-semibold text-slate-800">Isolation</span>
                    </label>
                  </div>
                </div>
              )}

              {/* STEP 3: UPLOADS & FINAL CONFIRMATION */}
              {step === 3 && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Optional Medical Attachments
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        { id: 'doctor_referral', title: 'Doctor Referral Letter' },
                        { id: 'medical_report', title: 'Medical Report / Blood Test' },
                      ].map((docType) => {
                        const existing = documents.find((d) => d.type === docType.id);
                        return (
                          <div key={docType.id} className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex justify-between items-center">
                            <div>
                              <div className="font-bold text-xs text-[#172a34]">{docType.title}</div>
                              {existing ? (
                                <div className="text-[10px] text-emerald-700 font-bold truncate">✓ {existing.fileName}</div>
                              ) : (
                                <div className="text-[10px] text-slate-400">Optional attachment</div>
                              )}
                            </div>
                            <label className="text-xs font-bold text-[#bd171c] cursor-pointer hover:underline">
                              <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => handleFileUpload(docType.id, e)}
                                className="hidden"
                              />
                              {existing ? 'Change' : '+ Upload'}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* SINGLE COMPACT DECLARATION CHECKBOX */}
                  <div className={`p-3.5 rounded-xl border text-xs transition ${
                    fieldErrors.consentAccepted ? 'bg-red-50 border-red-500 text-red-950' : 'bg-amber-50/60 border border-amber-200/80 text-slate-800'
                  }`}>
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        name="consentAccepted"
                        checked={formData.consentAccepted}
                        onChange={handleInputChange}
                        className="mt-0.5 accent-[#bd171c] w-3.5 h-3.5 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-slate-900 mb-0.5">Admission Declaration & Consent *</div>
                        <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                          I confirm that all patient details provided above are accurate and I accept NIMS ICU admission policies & emergency medical procedures.
                        </p>
                      </div>
                    </label>
                    {fieldErrors.consentAccepted && (
                      <p className="text-[10px] text-red-600 font-bold mt-1.5">⚠️ {fieldErrors.consentAccepted}</p>
                    )}
                  </div>
                </div>
              )}

              {/* FOOTER BUTTONS */}
              <div className="flex justify-between items-center pt-3 border-t border-slate-200 mt-4">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="bg-slate-100 hover:bg-slate-200 text-[#172a34] font-bold text-xs px-4 py-2.5 rounded-xl transition border border-slate-300/80"
                  >
                    ← Back
                  </button>
                ) : <div></div>}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-[#172a34] hover:bg-[#0e191f] text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow transition"
                  >
                    Next Step →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={triggerSendOtp}
                    disabled={otpLoading}
                    className="bg-[#bd171c] hover:bg-[#791017] text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow transition"
                  >
                    {otpLoading ? 'Sending OTP...' : 'Verify OTP & Submit Request ➔'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
