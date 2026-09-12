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
    patientAltMobile: '',
    street: '',
    city: 'Jaipur',
    state: 'Rajasthan',
    pinCode: '',
    aadhaarOrId: '',
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
    currentMedicalCondition: '',
    diagnosis: '',
    symptomsCriticality: '',
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
    consentAccuracy: false,
    consentVerification: false,
    consentBedReservationPolicy: false,
    consentPrivacy: false,
    consentEmergencyDisclaimer: false,
    consentTerms: false,
  });

  // Validation errors
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [stepError, setStepError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

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
      return `w-full bg-red-50/80 border-2 border-red-500 rounded-xl px-4 py-2.5 text-xs text-red-950 font-bold focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200 transition ${extraClasses}`;
    }
    return `w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#172a34] font-bold focus:outline-none focus:border-[#bd171c] transition ${extraClasses}`;
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
      setFieldErrors({});
      setStepError(null);
      return true;
    }

    if (step === 2) {
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
      if (!formData.city.trim()) {
        newErrors.city = 'City is required';
      }
      if (!formData.pinCode.trim()) {
        newErrors.pinCode = 'PIN Code is required';
      } else if (!/^\d{6}$/.test(formData.pinCode.trim())) {
        newErrors.pinCode = 'Enter a valid 6-digit PIN code';
      }

      if (Object.keys(newErrors).length > 0) {
        mainError = 'Please fill in all mandatory patient details highlighted in red.';
      }
    }

    if (step === 3 && submittedBy === 'attendant') {
      if (!formData.attendantFullName.trim()) {
        newErrors.attendantFullName = 'Attendant Full Name is required';
      }
      if (!formData.relationship.trim()) {
        newErrors.relationship = 'Relationship with patient is required';
      }
      if (!formData.attendantMobile.trim()) {
        newErrors.attendantMobile = 'Attendant mobile number is required';
      } else if (!/^\d{10}$/.test(formData.attendantMobile.trim())) {
        newErrors.attendantMobile = 'Enter a valid 10-digit mobile number';
      }

      if (Object.keys(newErrors).length > 0) {
        mainError = 'Please fill in mandatory attendant details highlighted in red.';
      }
    }

    if (step === 4) {
      if (!formData.currentMedicalCondition.trim()) {
        newErrors.currentMedicalCondition = 'Current medical condition is required';
      }
      if (!formData.diagnosis.trim()) {
        newErrors.diagnosis = 'Medical diagnosis is required';
      }
      if (!formData.symptomsCriticality.trim()) {
        newErrors.symptomsCriticality = 'Criticality notes / Vitals are required';
      }

      if (Object.keys(newErrors).length > 0) {
        mainError = 'Please fill in mandatory medical condition & diagnosis details.';
      }
    }

    if (step === 6) {
      if (
        !formData.consentAccuracy ||
        !formData.consentVerification ||
        !formData.consentBedReservationPolicy ||
        !formData.consentPrivacy ||
        !formData.consentEmergencyDisclaimer ||
        !formData.consentTerms
      ) {
        newErrors.consents = 'All declarations and consents must be accepted';
        mainError = 'Please accept all required declarations and consents to proceed.';
      }
    }

    setFieldErrors(newErrors);
    setStepError(mainError);

    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (!validateCurrentStep()) return;
    setStepError(null);
    if (step === 2 && submittedBy === 'patient') {
      setStep(4);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setStepError(null);
    setFieldErrors({});
    if (step === 4 && submittedBy === 'patient') {
      setStep(2);
    } else {
      setStep((prev) => prev - 1);
    }
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
            aadhaarOrId: formData.aadhaarOrId || undefined,
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
                  idProofNumber: formData.attendantIdProofNumber || undefined,
                  sameAddressAsPatient: formData.sameAddressAsPatient,
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
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full my-auto overflow-hidden relative border-t-8 border-t-[#bd171c] max-h-[92vh] flex flex-col">
        {/* MODAL HEADER */}
        <div className="bg-gradient-to-r from-[#172a34] via-[#0f232e] to-[#791017] p-5 sm:p-6 text-white flex justify-between items-center shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
              <span className="text-[11px] font-mono font-black text-amber-400 uppercase tracking-widest">NIMS Critical Care Portal</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">24/7 ICU Bed Booking Dialog</h2>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl font-black transition border border-white/20"
            title="Close Dialog"
          >
            ✕
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-white">
          {createdRequestId ? (
            /* SUCCESS CONFIRMATION */
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-inner border-2 border-emerald-300">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#172a34] mb-2">Request Generated Successfully!</h3>
              <p className="text-slate-600 text-xs sm:text-sm mb-6 max-w-md mx-auto font-medium">
                Your request has been submitted to the BST Hospital Critical Care Operations Desk.
              </p>

              <div className="bg-[#172a34] text-white p-6 rounded-3xl max-w-sm mx-auto mb-8 shadow-xl border-2 border-[#e5b64a]">
                <div className="text-[10px] font-black text-[#e5b64a] uppercase tracking-widest mb-1">Unique Request ID</div>
                <div className="text-2xl font-mono font-black tracking-widest text-white flex items-center justify-center gap-3 my-1">
                  <span>{createdRequestId}</span>
                  <button
                    type="button"
                    onClick={() => {
                      void navigator.clipboard.writeText(createdRequestId);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className={`text-[11px] px-3 py-1 rounded-lg font-extrabold transition shadow ${
                      copied ? 'bg-emerald-600 text-white' : 'bg-[#bd171c] hover:bg-[#791017] text-white'
                    }`}
                  >
                    {copied ? '✓ Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`/icu-status?requestId=${createdRequestId}&mobile=${submittedBy === 'attendant' ? formData.attendantMobile : formData.patientMobile}`}
                  className="bg-[#bd171c] hover:bg-[#791017] text-white font-black px-8 py-3.5 rounded-xl shadow-lg transition text-xs"
                >
                  Track Status Live ➔
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-slate-100 hover:bg-slate-200 text-[#172a34] font-bold px-6 py-3.5 rounded-xl transition text-xs border border-slate-300"
                >
                  Close Dialog
                </button>
              </div>
            </div>
          ) : showOtpScreen ? (
            /* OTP VERIFICATION SCREEN */
            <div className="max-w-md mx-auto text-center py-4">
              <h3 className="text-2xl font-black text-[#172a34] mb-2">Mobile OTP Verification</h3>
              <p className="text-xs text-slate-600 mb-4 font-medium">
                Enter 6-digit OTP code sent to +91{' '}
                <span className="font-black text-[#bd171c]">
                  {submittedBy === 'attendant' ? formData.attendantMobile : formData.patientMobile}
                </span>
              </p>

              <div className="p-3 bg-amber-50 border-2 border-amber-200 rounded-2xl text-xs text-amber-900 font-extrabold mb-4">
                Demo Verification Code: <span className="font-mono text-base font-black text-[#172a34]">123456</span>
              </div>

              <input
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="123456"
                maxLength={6}
                className="w-full bg-slate-50 border-2 border-slate-300 rounded-2xl py-3 px-4 text-center font-mono text-3xl font-black tracking-widest text-[#172a34] mb-4 focus:outline-none focus:border-[#bd171c]"
              />

              {otpError && <div className="text-xs text-red-600 font-bold mb-4 p-2.5 bg-red-50 border border-red-200 rounded-xl">⚠️ {otpError}</div>}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowOtpScreen(false)}
                  className="w-1/2 bg-slate-100 hover:bg-slate-200 text-[#172a34] py-3 rounded-xl font-bold text-xs"
                >
                  Back to Form
                </button>
                <button
                  type="button"
                  onClick={handleVerifyAndSubmit}
                  disabled={otpLoading || isSubmitting}
                  className="w-1/2 bg-[#bd171c] hover:bg-[#791017] text-white py-3 rounded-xl font-black text-xs shadow-lg"
                >
                  {isSubmitting ? 'Submitting...' : 'Verify & Submit'}
                </button>
              </div>
            </div>
          ) : (
            /* WIZARD STEPS */
            <div className="space-y-6">
              {/* STEP TRACKER */}
              <div>
                <div className="flex justify-between items-center text-xs font-black uppercase text-[#172a34] mb-2">
                  <span className="bg-[#172a34] text-white px-3 py-1 rounded-lg">Step {step} of 6</span>
                  <span className="text-[#bd171c] font-black">
                    {step === 1 && 'Section A: Request Type'}
                    {step === 2 && 'Section B: Patient Details'}
                    {step === 3 && 'Section C: Attendant Details'}
                    {step === 4 && 'Section D: Medical Information'}
                    {step === 5 && 'Section E: Document Uploads'}
                    {step === 6 && 'Section F: Declarations'}
                  </span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-[#172a34] via-[#bd171c] to-[#e5b64a] transition-all duration-300 rounded-full"
                    style={{ width: `${(step / 6) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* TOP IN-FORM ERROR BANNER */}
              {stepError && (
                <div className="p-3.5 bg-red-50 border-2 border-red-500 rounded-2xl text-xs font-black text-red-800 flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping shrink-0"></span>
                    <span>{stepError}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStepError(null)}
                    className="text-red-500 hover:text-red-900 font-black text-sm px-1.5"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label
                      onClick={() => setSubmittedBy('patient')}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition flex items-start gap-3 ${
                        submittedBy === 'patient'
                          ? 'border-[#bd171c] bg-red-50/70 shadow-md'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="submittedBy"
                        checked={submittedBy === 'patient'}
                        onChange={() => setSubmittedBy('patient')}
                        className="mt-1 accent-[#bd171c]"
                      />
                      <div>
                        <div className="font-extrabold text-[#172a34] text-sm">Booking by Patient</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">Patient or direct family member</div>
                      </div>
                    </label>

                    <label
                      onClick={() => setSubmittedBy('attendant')}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition flex items-start gap-3 ${
                        submittedBy === 'attendant'
                          ? 'border-[#bd171c] bg-red-50/70 shadow-md'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="submittedBy"
                        checked={submittedBy === 'attendant'}
                        onChange={() => setSubmittedBy('attendant')}
                        className="mt-1 accent-[#bd171c]"
                      />
                      <div>
                        <div className="font-extrabold text-[#172a34] text-sm">Booking by Attendant</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">Guardian, caretaker or referring doctor</div>
                      </div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-[#172a34] mb-2">Nature of Admission</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'emergency', label: 'Emergency', desc: 'Immediate critical care' },
                        { id: 'planned', label: 'Planned Stay', desc: 'Scheduled procedure' },
                        { id: 'transfer', label: 'Hospital Transfer', desc: 'Outside clinic transfer' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFormData((p) => ({ ...p, admissionType: item.id as any }))}
                          className={`p-4 rounded-xl text-left border-2 transition ${
                            formData.admissionType === item.id
                              ? 'border-[#172a34] bg-[#172a34] text-white shadow-md font-bold'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white'
                          }`}
                        >
                          <div className="font-extrabold text-xs">{item.label}</div>
                          <div className={`text-[10px] mt-0.5 ${formData.admissionType === item.id ? 'text-slate-200' : 'text-slate-500'}`}>{item.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: PATIENT DETAILS */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#172a34] mb-1">Patient Full Name *</label>
                      <input
                        type="text"
                        name="patientFullName"
                        value={formData.patientFullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Ramesh Sharma"
                        className={getInputClass('patientFullName')}
                      />
                      {fieldErrors.patientFullName && (
                        <p className="text-[11px] text-red-600 font-extrabold mt-1">⚠️ {fieldErrors.patientFullName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#172a34] mb-1">Age *</label>
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleInputChange}
                          placeholder="58"
                          className={getInputClass('age', 'px-3')}
                        />
                        {fieldErrors.age && (
                          <p className="text-[11px] text-red-600 font-extrabold mt-1">⚠️ {fieldErrors.age}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#172a34] mb-1">Gender *</label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className={getInputClass('gender', 'px-2')}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#172a34] mb-1">Mobile Number *</label>
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
                        <p className="text-[11px] text-red-600 font-extrabold mt-1">⚠️ {fieldErrors.patientMobile}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#172a34] mb-1">Alternate Mobile</label>
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

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#172a34] mb-1">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={getInputClass('city', 'px-3')}
                      />
                      {fieldErrors.city && (
                        <p className="text-[11px] text-red-600 font-extrabold mt-1">⚠️ {fieldErrors.city}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#172a34] mb-1">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={getInputClass('state', 'px-3')}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#172a34] mb-1">PIN Code *</label>
                      <input
                        type="text"
                        name="pinCode"
                        value={formData.pinCode}
                        onChange={handleInputChange}
                        placeholder="302017"
                        maxLength={6}
                        className={getInputClass('pinCode', 'px-3')}
                      />
                      {fieldErrors.pinCode && (
                        <p className="text-[11px] text-red-600 font-extrabold mt-1">⚠️ {fieldErrors.pinCode}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: ATTENDANT DETAILS */}
              {step === 3 && submittedBy === 'attendant' && (
                <div className="space-y-4">
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 font-bold">
                    ⚠️ यह section attendant द्वारा form भरने पर mandatory होगा।
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#172a34] mb-1">Attendant Full Name *</label>
                      <input
                        type="text"
                        name="attendantFullName"
                        value={formData.attendantFullName}
                        onChange={handleInputChange}
                        placeholder="Amit Sharma"
                        className={getInputClass('attendantFullName')}
                      />
                      {fieldErrors.attendantFullName && (
                        <p className="text-[11px] text-red-600 font-extrabold mt-1">⚠️ {fieldErrors.attendantFullName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#172a34] mb-1">Relationship with Patient *</label>
                      <input
                        type="text"
                        name="relationship"
                        value={formData.relationship}
                        onChange={handleInputChange}
                        placeholder="Son / Spouse / Guardian"
                        className={getInputClass('relationship')}
                      />
                      {fieldErrors.relationship && (
                        <p className="text-[11px] text-red-600 font-extrabold mt-1">⚠️ {fieldErrors.relationship}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#172a34] mb-1">Attendant Mobile *</label>
                      <input
                        type="tel"
                        name="attendantMobile"
                        value={formData.attendantMobile}
                        onChange={handleInputChange}
                        placeholder="10-digit mobile"
                        maxLength={10}
                        className={getInputClass('attendantMobile')}
                      />
                      {fieldErrors.attendantMobile && (
                        <p className="text-[11px] text-red-600 font-extrabold mt-1">⚠️ {fieldErrors.attendantMobile}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#172a34] mb-1">Email Address</label>
                      <input
                        type="email"
                        name="attendantEmail"
                        value={formData.attendantEmail}
                        onChange={handleInputChange}
                        placeholder="attendant@gmail.com"
                        className={getInputClass('attendantEmail')}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: MEDICAL INFO */}
              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-[#172a34] mb-2 uppercase">Required ICU Category *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {icuTypeOptions.map((opt) => (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => setFormData((p) => ({ ...p, requiredIcuType: opt.key }))}
                          className={`p-3 rounded-2xl border-2 text-left transition ${
                            formData.requiredIcuType === opt.key
                              ? 'border-[#bd171c] bg-red-50 text-[#172a34] font-bold shadow-md'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white'
                          }`}
                        >
                          <div className="text-lg">{opt.icon}</div>
                          <div className="font-extrabold text-[11px] text-[#172a34]">{opt.title}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#172a34] mb-1">Current Condition *</label>
                      <textarea
                        name="currentMedicalCondition"
                        value={formData.currentMedicalCondition}
                        onChange={handleInputChange}
                        rows={2}
                        placeholder="e.g. Breathlessness, chest pain, low SpO2"
                        className={getInputClass('currentMedicalCondition', 'p-3')}
                      />
                      {fieldErrors.currentMedicalCondition && (
                        <p className="text-[11px] text-red-600 font-extrabold mt-1">⚠️ {fieldErrors.currentMedicalCondition}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#172a34] mb-1">Medical Diagnosis *</label>
                      <textarea
                        name="diagnosis"
                        value={formData.diagnosis}
                        onChange={handleInputChange}
                        rows={2}
                        placeholder="e.g. Acute Respiratory Distress / Cardiac Trauma"
                        className={getInputClass('diagnosis', 'p-3')}
                      />
                      {fieldErrors.diagnosis && (
                        <p className="text-[11px] text-red-600 font-extrabold mt-1">⚠️ {fieldErrors.diagnosis}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#172a34] mb-1">Criticality Notes *</label>
                    <input
                      type="text"
                      name="symptomsCriticality"
                      value={formData.symptomsCriticality}
                      onChange={handleInputChange}
                      placeholder="e.g. SpO2 84%, BP 90/60"
                      className={getInputClass('symptomsCriticality')}
                    />
                    {fieldErrors.symptomsCriticality && (
                      <p className="text-[11px] text-red-600 font-extrabold mt-1">⚠️ {fieldErrors.symptomsCriticality}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="oxygenRequired"
                        checked={formData.oxygenRequired}
                        onChange={handleInputChange}
                        className="accent-[#bd171c]"
                      />
                      <span className="text-xs font-bold text-[#172a34]">Oxygen Needed</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="ventilatorRequired"
                        checked={formData.ventilatorRequired}
                        onChange={handleInputChange}
                        className="accent-[#bd171c]"
                      />
                      <span className="text-xs font-bold text-[#172a34]">Ventilator Bed</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="ambulanceRequired"
                        checked={formData.ambulanceRequired}
                        onChange={handleInputChange}
                        className="accent-[#bd171c]"
                      />
                      <span className="text-xs font-bold text-[#172a34]">Ambulance</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="infectionIsolationRequired"
                        checked={formData.infectionIsolationRequired}
                        onChange={handleInputChange}
                        className="accent-[#bd171c]"
                      />
                      <span className="text-xs font-bold text-[#172a34]">Isolation Care</span>
                    </label>
                  </div>
                </div>
              )}

              {/* STEP 5: DOCUMENTS */}
              {step === 5 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: 'doctor_referral', title: 'Doctor Referral Letter' },
                      { id: 'medical_report', title: 'Medical Report (CT / Blood Test)' },
                      { id: 'prescription', title: 'Prescription Summary' },
                      { id: 'patient_id', title: 'Patient ID Proof' },
                    ].map((docType) => {
                      const existing = documents.find((d) => d.type === docType.id);
                      return (
                        <div key={docType.id} className="p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 flex justify-between items-center">
                          <div>
                            <div className="font-extrabold text-xs text-[#172a34]">{docType.title}</div>
                            {existing ? (
                              <div className="text-[11px] text-emerald-700 font-bold truncate">✓ {existing.fileName}</div>
                            ) : (
                              <div className="text-[10px] text-slate-400">No file chosen</div>
                            )}
                          </div>
                          <label className="text-xs font-black text-[#bd171c] cursor-pointer hover:underline">
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
              )}

              {/* STEP 6: DECLARATIONS */}
              {step === 6 && (
                <div className="space-y-3">
                  {fieldErrors.consents && (
                    <div className="p-3 bg-red-100 border-2 border-red-400 text-red-900 rounded-2xl text-xs font-black">
                      ⚠️ {fieldErrors.consents}
                    </div>
                  )}
                  <div className={`space-y-3 p-5 rounded-2xl border text-xs font-bold text-[#172a34] transition ${
                    fieldErrors.consents ? 'bg-red-50/60 border-2 border-red-500' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        name="consentAccuracy"
                        checked={formData.consentAccuracy}
                        onChange={handleInputChange}
                        className="mt-0.5 accent-[#bd171c]"
                      />
                      <span>दी गई जानकारी सही होने की सहमति (Information accuracy consent)</span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        name="consentVerification"
                        checked={formData.consentVerification}
                        onChange={handleInputChange}
                        className="mt-0.5 accent-[#bd171c]"
                      />
                      <span>Hospital verification और doctor audit की सहमति</span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        name="consentBedReservationPolicy"
                        checked={formData.consentBedReservationPolicy}
                        onChange={handleInputChange}
                        className="mt-0.5 accent-[#bd171c]"
                      />
                      <span>ICU bed केवल admin/doctor confirmation के बाद reserved होने की स्वीकृति</span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        name="consentPrivacy"
                        checked={formData.consentPrivacy}
                        onChange={handleInputChange}
                        className="mt-0.5 accent-[#bd171c]"
                      />
                      <span>Privacy and medical data processing consent</span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        name="consentEmergencyDisclaimer"
                        checked={formData.consentEmergencyDisclaimer}
                        onChange={handleInputChange}
                        className="mt-0.5 accent-[#bd171c]"
                      />
                      <span>Emergency disclaimer: Critical cases call NIMS Emergency (0141-2700000)</span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        name="consentTerms"
                        checked={formData.consentTerms}
                        onChange={handleInputChange}
                        className="mt-0.5 accent-[#bd171c]"
                      />
                      <span>Terms and conditions acceptance</span>
                    </label>
                  </div>
                </div>
              )}

              {/* FOOTER BUTTONS */}
              <div className="flex justify-between items-center pt-5 border-t border-slate-200 mt-6">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="bg-slate-100 hover:bg-slate-200 text-[#172a34] font-extrabold text-xs px-5 py-2.5 rounded-xl transition"
                  >
                    ← Back
                  </button>
                ) : <div></div>}

                {step < 6 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-[#172a34] hover:bg-[#0e191f] text-white font-black text-xs px-7 py-3 rounded-xl shadow-lg transition"
                  >
                    Next Step →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={triggerSendOtp}
                    disabled={otpLoading}
                    className="bg-[#bd171c] hover:bg-[#791017] text-white font-black text-xs px-7 py-3 rounded-xl shadow-xl transition"
                  >
                    {otpLoading ? 'Sending OTP...' : 'Verify OTP & Submit ➔'}
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
