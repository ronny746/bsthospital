'use client';

import { useState, useEffect } from 'react';
import { IcuType } from '@/lib/icu-types';

interface IcuBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessTrack?: (requestId: string, mobile: string) => void;
}

export default function IcuBookingModal({ isOpen, onClose, onSuccessTrack }: IcuBookingModalProps) {
  const [submittedBy, setSubmittedBy] = useState<'patient' | 'attendant'>('patient');

  // Form state
  const [formData, setFormData] = useState({
    patientFullName: '',
    age: '',
    gender: 'male',
    patientMobile: '',
    patientAltMobile: '',
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

    // Medical Details
    admissionType: 'emergency' as 'emergency' | 'planned' | 'transfer',
    requiredIcuType: 'medical_icu' as IcuType,
    currentMedicalCondition: 'Breathlessness / SpO2 Drop / Respiratory Distress',
    diagnosis: 'Acute Respiratory Distress Syndrome (ARDS) / Pneumonia',
    symptomsCriticality: 'Critical (SpO2 < 88% / Immediate Support Needed)',
    oxygenRequired: true,
    ventilatorRequired: false,
    ambulanceRequired: true,
    infectionIsolationRequired: false,

    // Consents
    consentAccepted: false,
  });

  // Validation errors
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [stepError, setStepError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Options
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

  const idTypeLabels: Record<string, string> = {
    aadhaar: 'Aadhaar Card (12-digit)',
    voter_id: 'Voter ID Card',
    pan_card: 'PAN Card',
    driving_license: 'Driving License',
    passport: 'Passport',
  };

  // OTP screen
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState('');

  // Result state
  const [createdRequestId, setCreatedRequestId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset form state on close if needed
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

  const getInputClass = (fieldName: string) => {
    const hasError = !!fieldErrors[fieldName];
    if (hasError) {
      return 'w-full bg-[#fff5f5] border-2 border-[#bd171c] rounded-lg px-4 py-2.5 text-sm text-[#791017] font-medium focus:outline-none focus:ring-2 focus:ring-[#bd171c]/20 transition shadow-sm';
    }
    return 'w-full bg-white border border-slate-300/90 rounded-lg px-4 py-2.5 text-sm text-[#172a34] font-medium placeholder-slate-400 focus:outline-none focus:border-[#172a34] focus:ring-2 focus:ring-[#172a34]/10 transition shadow-sm';
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let mainError: string | null = null;

    if (!formData.patientFullName.trim()) {
      newErrors.patientFullName = 'Name is required';
    }
    if (!formData.age || Number(formData.age) <= 0) {
      newErrors.age = 'Enter valid age';
    }
    if (!formData.patientMobile.trim()) {
      newErrors.patientMobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.patientMobile.trim())) {
      newErrors.patientMobile = 'Enter valid 10-digit mobile number';
    }
    if (!formData.idProofNumber.trim()) {
      newErrors.idProofNumber = `${idTypeLabels[formData.idProofType] || 'ID'} number required`;
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.pinCode.trim()) {
      newErrors.pinCode = 'PIN Code is required';
    } else if (!/^\d{6}$/.test(formData.pinCode.trim())) {
      newErrors.pinCode = 'Enter 6-digit PIN code';
    }

    if (submittedBy === 'attendant') {
      if (!formData.attendantFullName.trim()) {
        newErrors.attendantFullName = 'Attendant Name is required';
      }
      if (!formData.attendantMobile.trim()) {
        newErrors.attendantMobile = 'Attendant Mobile is required';
      } else if (!/^\d{10}$/.test(formData.attendantMobile.trim())) {
        newErrors.attendantMobile = 'Enter valid 10-digit mobile number';
      }
    }

    if (!formData.consentAccepted) {
      newErrors.consentAccepted = 'Please accept declaration';
      mainError = 'Please accept the mandatory admission declaration to proceed.';
    }

    if (Object.keys(newErrors).length > 0 && !mainError) {
      mainError = 'Please fill in all required fields highlighted in red.';
    }

    setFieldErrors(newErrors);
    setStepError(mainError);

    return Object.keys(newErrors).length === 0;
  };

  const triggerSendOtp = async () => {
    if (!validateForm()) return;
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
            ambulanceRequired: formData.ambulanceRequired,
            infectionIsolationRequired: formData.infectionIsolationRequired,
          },
          documents: [],
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

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in">
      {/* FORM CARD MATCHING THE APPLICATION FORM REFERENCE SCREENSHOT WITH BST THEME */}
      <div className="bg-[#f8fafc] rounded-xl shadow-2xl max-w-lg w-full my-auto overflow-hidden relative border border-slate-200/80 max-h-[94vh] flex flex-col">
        {/* CARD HEADER WITH BRAND THEME (#172a34 and #bd171c border) */}
        <div className="bg-[#172a34] px-6 py-4 flex items-center justify-between border-b-2 border-[#bd171c] shrink-0 relative">
          <div className="w-full text-center">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
              <span className="text-[#e5b64a]">🚨</span> 24/7 ICU Bed Booking
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-bold transition absolute right-4 top-4"
            aria-label="Close form"
          >
            ✕
          </button>
        </div>

        {/* MODAL SCROLLABLE FORM BODY */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 bg-white">
          {createdRequestId ? (
            /* SUCCESS CONFIRMATION */
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#172a34] mb-1">Request Generated!</h3>
              <p className="text-slate-600 text-xs mb-4">Your ICU bed request has been logged successfully.</p>

              <div className="bg-[#172a34] text-white p-4 rounded-xl max-w-xs mx-auto mb-5 shadow-md border-t-2 border-[#bd171c]">
                <div className="text-[10px] text-[#e5b64a] font-bold uppercase tracking-wider mb-1">Request ID</div>
                <div className="text-xl font-mono font-bold tracking-widest text-white flex items-center justify-center gap-2">
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
                  className="bg-[#172a34] text-white font-bold px-6 py-2.5 rounded-lg text-xs shadow hover:bg-[#0e191f] border border-[#172a34]"
                >
                  Track Status Live ➔
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-slate-100 text-slate-700 font-bold px-5 py-2.5 rounded-lg text-xs border border-slate-300 hover:bg-slate-200"
                >
                  Close
                </button>
              </div>
            </div>
          ) : showOtpScreen ? (
            /* OTP SCREEN */
            <div className="max-w-xs mx-auto text-center py-2">
              <h3 className="text-lg font-bold text-[#172a34] mb-1">OTP Verification</h3>
              <p className="text-xs text-slate-600 mb-3">
                Enter code sent to +91 <span className="font-bold text-[#172a34]">{submittedBy === 'attendant' ? formData.attendantMobile : formData.patientMobile}</span>
              </p>

              <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 font-bold mb-3">
                Demo Code: <span className="font-mono font-bold text-slate-900">123456</span>
              </div>

              <input
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="Enter OTP *"
                maxLength={6}
                className="w-full bg-white border border-slate-300 rounded-lg py-3 px-4 text-center font-mono text-2xl font-bold tracking-widest text-slate-800 mb-3 focus:border-[#172a34] focus:outline-none"
              />

              {otpError && <div className="text-xs text-[#bd171c] font-bold mb-3 p-2 bg-red-50 border border-red-200 rounded-lg">⚠️ {otpError}</div>}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowOtpScreen(false)}
                  className="w-1/2 bg-slate-100 text-slate-700 py-2.5 rounded-lg font-bold text-xs border border-slate-300 hover:bg-slate-200"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleVerifyAndSubmit}
                  disabled={otpLoading || isSubmitting}
                  className="w-1/2 bg-[#172a34] hover:bg-[#0e191f] text-white py-2.5 rounded-lg font-bold text-xs shadow"
                >
                  {isSubmitting ? 'Submitting...' : 'Verify & Submit'}
                </button>
              </div>
            </div>
          ) : (
            /* CLEAN SINGLE-PAGE FORM MATCHING REFERENCE IMAGE WITH BST HOSPITAL THEME */
            <div className="space-y-3">
              {/* TOP ERROR BANNER */}
              {stepError && (
                <div className="p-3 bg-red-50 border border-[#bd171c]/40 rounded-lg text-xs font-bold text-[#791017] flex items-center justify-between">
                  <span>⚠️ {stepError}</span>
                  <button type="button" onClick={() => setStepError(null)} className="text-[#bd171c] font-bold">✕</button>
                </div>
              )}

              {/* BOOKING MODE SEGMENTED CONTROL */}
              <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200/80 mb-2">
                <button
                  type="button"
                  onClick={() => setSubmittedBy('patient')}
                  className={`py-2 px-3 rounded-md text-xs font-bold transition flex items-center justify-center gap-1.5 ${
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
                  className={`py-2 px-3 rounded-md text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    submittedBy === 'attendant'
                      ? 'bg-[#172a34] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>🤝</span> Attendant / Doctor
                </button>
              </div>

              {/* 1. PATIENT NAME */}
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

              {/* 2. AGE & GENDER */}
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

              {/* 3. MOBILE NUMBER WITH +91 PREFIX */}
              <div>
                <div className="flex border border-slate-300/90 rounded-lg overflow-hidden shadow-sm focus-within:border-[#172a34] focus-within:ring-2 focus-within:ring-[#172a34]/10 transition">
                  <span className="bg-slate-100 border-r border-slate-300/90 px-3.5 py-3 text-sm font-semibold text-[#172a34] flex items-center shrink-0">
                    +91 ▾
                  </span>
                  <input
                    type="tel"
                    name="patientMobile"
                    value={formData.patientMobile}
                    onChange={handleInputChange}
                    placeholder="Mobile Number *"
                    maxLength={10}
                    className="w-full bg-white px-3 py-3 text-sm text-slate-800 font-medium placeholder-slate-400 focus:outline-none"
                  />
                </div>
                {fieldErrors.patientMobile && (
                  <p className="text-[11px] text-[#bd171c] font-bold mt-0.5 px-1">⚠️ {fieldErrors.patientMobile}</p>
                )}
              </div>

              {/* 4. ID PROOF DROPDOWN & NUMBER */}
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

              {/* 5. CITY & PIN CODE */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Select City *"
                    className={getInputClass('city')}
                  />
                  {fieldErrors.city && (
                    <p className="text-[11px] text-red-600 font-bold mt-0.5 px-1">⚠️ {fieldErrors.city}</p>
                  )}
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

              {/* 6. ATTENDANT FIELDS (IF ATTENDANT SELECTED) */}
              {submittedBy === 'attendant' && (
                <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-lg space-y-2">
                  <div className="text-xs font-bold text-amber-900">👤 Attendant Info (Required)</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      name="attendantFullName"
                      value={formData.attendantFullName}
                      onChange={handleInputChange}
                      placeholder="Attendant Name *"
                      className={getInputClass('attendantFullName')}
                    />
                    <input
                      type="text"
                      name="relationship"
                      value={formData.relationship}
                      onChange={handleInputChange}
                      placeholder="Relationship *"
                      className={getInputClass('relationship')}
                    />
                    <input
                      type="tel"
                      name="attendantMobile"
                      value={formData.attendantMobile}
                      onChange={handleInputChange}
                      placeholder="Attendant Mobile *"
                      maxLength={10}
                      className={getInputClass('attendantMobile')}
                    />
                  </div>
                </div>
              )}

              {/* 7. REQUIRED ICU CATEGORY DROPDOWN */}
              <div>
                <select
                  name="requiredIcuType"
                  value={formData.requiredIcuType}
                  onChange={handleInputChange}
                  className={getInputClass('requiredIcuType')}
                >
                  {Object.entries(icuCategoryLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      Select ICU Bed Category: {label} *
                    </option>
                  ))}
                </select>
              </div>

              {/* 8. CURRENT MEDICAL CONDITION DROPDOWN */}
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

              {/* 9. MEDICAL DIAGNOSIS DROPDOWN */}
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

              {/* 10. CRITICALITY LEVEL DROPDOWN */}
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

              {/* 11. CARE REQUIREMENTS CHECKBOXES */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-xs">
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

              {/* 12. DECLARATION CHECKBOX */}
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
                    You confirm that all patient details provided above are accurate and accept BST Hospital ICU emergency admission policy. *
                  </span>
                </label>
                {fieldErrors.consentAccepted && (
                  <p className="text-[11px] text-[#bd171c] font-bold mt-1 px-1">⚠️ {fieldErrors.consentAccepted}</p>
                )}
              </div>

              {/* 13. PRIMARY SUBMIT BUTTON MATCHING BST HOSPITAL THEME */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={triggerSendOtp}
                  disabled={otpLoading}
                  className="w-full bg-[#172a34] hover:bg-[#0e191f] text-white font-bold text-sm py-3.5 px-4 rounded-lg shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer border-b-2 border-[#bd171c]"
                >
                  {otpLoading ? 'Sending Verification OTP...' : 'Verify OTP & Submit Booking ➔'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
