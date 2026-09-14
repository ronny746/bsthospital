'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import TopBar from '@/components/TopBar';
import NewsTicker from '@/components/NewsTicker';
import DocumentViewerModal from '@/components/DocumentViewerModal';
import LiveCountdownTimer from '@/components/LiveCountdownTimer';
import { IcuRequest, RequestStatus } from '@/lib/icu-types';

function IcuStatusContent() {
  const searchParams = useSearchParams();
  const [requestId, setRequestId] = useState(searchParams.get('requestId') || '');
  const [mobile, setMobile] = useState(searchParams.get('mobile') || '');

  const [request, setRequest] = useState<IcuRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [patientNotes, setPatientNotes] = useState('');
  const [isSubmittingInfo, setIsSubmittingInfo] = useState(false);
  const [infoSuccess, setInfoSuccess] = useState('');

  // Lightbox Modal state
  const [previewDoc, setPreviewDoc] = useState<any | null>(null);

  const fetchStatus = async (idToFetch: string, mobileToFetch?: string) => {
    if (!idToFetch) return;
    setLoading(true);
    setError('');
    setInfoSuccess('');

    try {
      let url = `/api/icu-requests/status?requestId=${encodeURIComponent(idToFetch)}`;
      if (mobileToFetch) url += `&mobile=${encodeURIComponent(mobileToFetch)}`;

      const res = await fetch(url);
      const data: any = await res.json();
      setLoading(false);

      if (res.ok && data.request) {
        setRequest(data.request);
      } else {
        setRequest(null);
        setError(data.error || 'Request ID not found');
      }
    } catch (err) {
      setLoading(false);
      setError('Error fetching request status');
    }
  };

  useEffect(() => {
    const initialId = searchParams.get('requestId');
    if (initialId) {
      void fetchStatus(initialId, searchParams.get('mobile') || undefined);
    }
  }, [searchParams]);

  const handleSearchSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!requestId) return;
    void fetchStatus(requestId, mobile);
  };

  const handlePatientResponseSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!request) return;

    setIsSubmittingInfo(true);
    try {
      const res = await fetch(`/api/icu-requests/${request.id}/patient-response`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientNotes }),
      });
      const data: any = await res.json();
      setIsSubmittingInfo(false);

      if (res.ok && data.request) {
        setRequest(data.request);
        setPatientNotes('');
        setInfoSuccess('Additional medical details submitted successfully. Doctors re-evaluating.');
      } else {
        setError(data.error || 'Failed to submit response');
      }
    } catch (err) {
      setIsSubmittingInfo(false);
      setError('Error updating response');
    }
  };

  const statusSteps: Array<{ key: RequestStatus; title: string; desc: string }> = [
    { key: 'submitted', title: 'Submitted', desc: 'Request registered in system' },
    { key: 'under_review', title: 'Under Review', desc: 'Medical team evaluating reports' },
    { key: 'approved', title: 'Approved', desc: 'ICU Medical eligibility cleared' },
    { key: 'bed_reserved', title: 'Bed Reserved', desc: 'ICU bed temporarily locked' },
    { key: 'admitted', title: 'Admitted', desc: 'Patient admitted & bed occupied' },
  ];

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'submitted':
        return <span className="bg-blue-100 text-blue-800 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-bold">Submitted</span>;
      case 'under_review':
        return <span className="bg-amber-100 text-amber-800 border border-amber-200 px-3.5 py-1 rounded-full text-xs font-bold">Under Review</span>;
      case 'more_info_required':
        return <span className="bg-purple-100 text-purple-800 border border-purple-200 px-3.5 py-1 rounded-full text-xs font-bold">More Info Required</span>;
      case 'waiting_list':
        return <span className="bg-orange-100 text-orange-800 border border-orange-200 px-3.5 py-1 rounded-full text-xs font-bold">Waiting List</span>;
      case 'approved':
        return <span className="bg-teal-100 text-teal-800 border border-teal-200 px-3.5 py-1 rounded-full text-xs font-bold">Approved</span>;
      case 'bed_reserved':
        return <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold">Bed Temporarily Reserved</span>;
      case 'admitted':
        return <span className="bg-[#172a34] text-white px-3.5 py-1 rounded-full text-xs font-black">Admission Completed</span>;
      case 'rejected':
        return <span className="bg-red-100 text-red-800 border border-red-200 px-3.5 py-1 rounded-full text-xs font-bold">Request Rejected</span>;
      default:
        return <span className="bg-slate-200 text-slate-800 px-3.5 py-1 rounded-full text-xs font-bold">{status}</span>;
    }
  };

  const getStepStatusIndex = (status: RequestStatus) => {
    switch (status) {
      case 'submitted': return 0;
      case 'under_review':
      case 'more_info_required':
      case 'waiting_list': return 1;
      case 'approved': return 2;
      case 'bed_reserved': return 3;
      case 'admitted': return 4;
      default: return 1;
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f4ed] text-[#172a34] font-sans">
      <NewsTicker />
      <TopBar />
      <NavigationBar />

      {/* HEADER BANNER */}
      <section className="bg-gradient-to-r from-[#172a34] via-[#0e191f] to-[#bd171c] py-12 px-6 text-white border-b-4 border-[#bd171c]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black mb-2">Track ICU Bed Booking & Admission Status</h1>
          <p className="text-slate-200 text-xs md:text-sm font-medium">
            Enter your Unique Request ID (e.g. NIMS-ICU-20260912-0001) to check real-time admission progress and bed allocation details.
          </p>
        </div>
      </section>

      <section className="py-10 px-4 max-w-4xl mx-auto space-y-8">
        {/* HOSPITAL CAPACITY BANNER */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-md grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-[10px] font-black uppercase text-slate-500">Total ICU Beds</div>
            <div className="text-xl font-black text-[#172a34]">2500+ Beds</div>
          </div>
          <div>
            <div className="text-[10px] font-black uppercase text-emerald-700">Specialized Depts</div>
            <div className="text-xl font-black text-emerald-700">20 Departments</div>
          </div>
          <div>
            <div className="text-[10px] font-black uppercase text-blue-700">MBBS Seats / Year</div>
            <div className="text-xl font-black text-blue-700">150 Seats</div>
          </div>
          <div>
            <div className="text-[10px] font-black uppercase text-[#bd171c]">Expert Faculties</div>
            <div className="text-xl font-black text-[#bd171c]">250+ Doctors</div>
          </div>
        </div>

        {/* SEARCH BAR */}
        <form onSubmit={handleSearchSubmit} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-xs font-bold text-[#172a34] mb-1">Unique Request ID *</label>
              <input
                type="text"
                value={requestId}
                onChange={(e) => setRequestId(e.target.value)}
                placeholder="e.g. NIMS-ICU-20260912-0001"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-[#172a34] font-mono uppercase focus:outline-none focus:ring-2 focus:ring-secondary/50 font-bold"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#172a34] mb-1">Registered Mobile Number</label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="10-digit mobile number"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-[#172a34] focus:outline-none focus:ring-2 focus:ring-secondary/50 font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#172a34] hover:bg-[#0e191f] text-white font-extrabold py-3 px-6 rounded-xl transition shadow-lg text-sm"
            >
              {loading ? 'Searching...' : 'Check Live Status ➔'}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-2xl text-center text-red-800 text-sm font-bold">
            {error}
          </div>
        )}

        {/* DETAILS & TIMELINE */}
        {request && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="text-xs text-slate-400 font-mono font-bold">REQUEST ID</div>
                <div className="text-2xl font-mono font-black text-[#172a34] tracking-wider flex items-center gap-3">
                  <span>{request.requestId}</span>
                  {getStatusBadge(request.status)}
                </div>
                <div className="text-xs text-slate-600 mt-2 font-medium">
                  Patient: <span className="font-bold text-[#172a34]">{request.patient.fullName}</span> ({request.patient.age}y / {request.patient.gender}) • Mobile: +91 {request.patient.mobile}
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-400 font-bold">Required ICU</div>
                <div className="text-sm font-black text-[#bd171c] uppercase tracking-wide">
                  {request.medical.requiredIcuType.replace('_', ' ')}
                </div>
                <div className="text-xs text-slate-400 mt-1">Submitted: {new Date(request.createdAt).toLocaleString()}</div>
              </div>
            </div>

            {/* STATUS JOURNEY */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xl">
              <h3 className="text-lg font-black text-[#172a34] mb-8">Status Journey</h3>

              <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                {statusSteps.map((step, idx) => {
                  const currentIdx = getStepStatusIndex(request.status);
                  const isAdmitted = request.status === 'admitted';
                  const isCompleted = isAdmitted ? idx <= currentIdx : idx < currentIdx;
                  const isCurrent = isAdmitted ? false : idx === currentIdx;

                  return (
                    <div key={step.key} className="flex-1 flex flex-row md:flex-col items-center gap-3 relative z-10 w-full">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-sm border-4 transition-all ${
                          isCompleted
                            ? 'bg-[#172a34] text-white border-[#172a34]'
                            : isCurrent
                            ? 'bg-[#bd171c] text-white border-red-200 animate-pulse scale-110 shadow-lg'
                            : 'bg-slate-100 text-slate-400 border-slate-200'
                        }`}
                      >
                        {isCompleted ? '✓' : idx + 1}
                      </div>
                      <div className="text-left md:text-center">
                        <div className={`text-xs font-black ${isCurrent ? 'text-[#bd171c]' : isCompleted ? 'text-[#172a34]' : 'text-slate-400'}`}>
                          {step.title}
                        </div>
                        <div className="text-[11px] text-slate-500 max-w-[130px] font-medium">{step.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RESERVED BED / ADMITTED BED CARD */}
            {(request.status === 'bed_reserved' || request.status === 'admitted' || request.reservation?.bedNumber) && (
              <div className="bg-gradient-to-r from-[#172a34] via-[#0f232e] to-[#791017] text-white border-2 border-[#bd171c] p-8 rounded-3xl shadow-2xl space-y-4">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-500/30 text-emerald-300 rounded-full text-xs font-extrabold mb-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                      {request.status === 'admitted' ? 'Active ICU Bed Admission' : 'ICU Bed Temporarily Reserved'}
                    </div>
                    <h4 className="text-3xl font-mono font-black text-amber-400">
                      Bed Code: {request.reservation?.bedNumber || 'MICU-02'}
                    </h4>
                    <p className="text-xs text-slate-200 mt-1 font-medium">
                      Location: <span className="font-bold text-white">{request.reservation?.unitName || 'Medical ICU - Block A'}</span>
                    </p>
                  </div>
                  {request.status === 'bed_reserved' ? (
                    <div className="bg-white/10 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-white/20">
                      <LiveCountdownTimer
                        targetDate={request.reservation?.expiresAt}
                        label="Bed Hold Window Remaining"
                      />
                    </div>
                  ) : (
                    <div className="bg-emerald-950/60 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-emerald-500/40 flex flex-col items-end">
                      <span className="text-[10px] text-emerald-300 uppercase font-extrabold tracking-wider">Admission Status</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                        <span className="text-lg md:text-xl font-mono font-black text-emerald-300">
                          ADMITTED & OCCUPIED ✓
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-300 font-medium">Bed Allocated to Patient</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-2">
                  <div className="bg-white/10 p-3 rounded-xl">
                    <span className="text-slate-300 block text-[10px]">VENTILATOR</span>
                    <span className="font-black text-white">{request.medical.ventilatorRequired ? 'EQUIPPED 🫁' : 'NOT REQUIRED'}</span>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl">
                    <span className="text-slate-300 block text-[10px]">OXYGEN SUPPLY</span>
                    <span className="font-black text-white">{request.medical.oxygenRequired ? 'HIGH FLOW 🩸' : 'STANDARD'}</span>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl col-span-2 sm:col-span-1">
                    <span className="text-slate-300 block text-[10px]">TREATING DOCTOR</span>
                    <span className="font-black text-amber-300">{request.assignedTo?.name || request.medical.treatingDoctorName || 'Dr. Sunita Verma'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* MEDICAL & PAYMENT DETAILS SUMMARY */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-[#172a34] uppercase tracking-wider">Patient Medical & Payment Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div><span className="text-slate-500">Diagnosis:</span> <span className="text-[#172a34] font-black">{request.medical.diagnosis}</span></div>
                <div><span className="text-slate-500">Condition:</span> <span className="text-[#172a34] font-bold">{request.medical.currentMedicalCondition}</span></div>
                <div><span className="text-slate-500">Criticality:</span> <span className="text-[#bd171c] font-black">{request.medical.symptomsCriticality}</span></div>
                <div><span className="text-slate-500">ID Proof:</span> <span className="text-[#172a34] font-mono font-bold uppercase">{request.patient.idProofType || 'Aadhaar'} ({request.patient.idProofNumber || request.patient.aadhaarOrId || 'N/A'})</span></div>
                <div><span className="text-slate-500">Billing Category:</span> <span className="text-[#bd171c] font-black uppercase">{request.payment?.paymentCategory?.replace('_', ' ') || 'Cash'}</span></div>
                <div>
                  <span className="text-slate-500">Payment Status:</span>{' '}
                  <span className="text-emerald-700 font-black uppercase">
                    {request.payment?.paymentStatus === 'paid' ? '₹5,000 Fee Paid ✓' : request.payment?.paymentStatus === 'verified_scheme' ? 'Scheme Verified ✓' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>

            {/* UPLOADED DOCUMENTS WITH LIGHTBOX PREVIEW */}
            {request.documents && request.documents.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-[#172a34] uppercase tracking-wider">Uploaded Documents ({request.documents.length})</h4>
                  <span className="text-xs text-slate-400 font-bold">Click any document image to enlarge</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {request.documents.map((doc: any) => {
                    const docUrl = doc.url || doc.fileUrl || '';
                    const isImg =
                      docUrl.startsWith('data:image/') ||
                      docUrl.match(/\.(jpg|jpeg|png|webp|gif)$/i) ||
                      doc.fileType?.startsWith('image/');

                    return (
                      <div
                        key={doc.id || Math.random().toString()}
                        onClick={() => setPreviewDoc(doc)}
                        className="p-3 bg-slate-50 hover:bg-red-50/60 border border-slate-200 hover:border-[#bd171c] rounded-2xl cursor-pointer transition shadow-sm hover:shadow-md group flex flex-col justify-between"
                      >
                        {isImg ? (
                          <div className="w-full h-28 bg-slate-200 rounded-xl overflow-hidden mb-2 relative flex items-center justify-center border border-slate-300">
                            <img src={docUrl} alt={doc.fileName} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                            <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] font-black px-2 py-0.5 rounded-md backdrop-blur-sm">
                              👁️ View Full
                            </span>
                          </div>
                        ) : (
                          <div className="w-full h-24 bg-slate-100 rounded-xl mb-2 flex flex-col items-center justify-center border border-slate-200 text-slate-500">
                            <span className="text-3xl mb-1">📄</span>
                            <span className="text-[10px] font-black uppercase text-slate-400">PDF Document</span>
                          </div>
                        )}
                        <div className="truncate">
                          <div className="uppercase font-black text-[9px] text-slate-400 truncate">{doc.type ? doc.type.replace(/_/g, ' ') : 'DOCUMENT'}</div>
                          <div className="truncate text-xs font-black text-[#bd171c]">{doc.fileName || 'Attachment'}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ACTION NEEDED CARD */}
            {request.status === 'more_info_required' && (
              <div className="bg-purple-50 border border-purple-200 p-6 rounded-3xl shadow-xl space-y-4">
                <div>
                  <h4 className="text-lg font-black text-purple-900">Action Needed: Additional Information Requested</h4>
                  <p className="text-xs text-slate-700 mt-1">
                    Doctor Note: <span className="text-purple-900 font-bold">{request.requestedInfoDescription || 'Please upload recent medical report or referral note.'}</span>
                  </p>
                </div>

                {infoSuccess && (
                  <div className="p-3 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold">
                    {infoSuccess}
                  </div>
                )}

                <form onSubmit={handlePatientResponseSubmit} className="space-y-3">
                  <textarea
                    value={patientNotes}
                    onChange={(e) => setPatientNotes(e.target.value)}
                    placeholder="Enter additional details / SpO2 / Doctor update here..."
                    rows={3}
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-[#172a34] focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingInfo}
                    className="bg-purple-700 hover:bg-purple-800 text-white font-extrabold px-6 py-3 rounded-xl text-xs transition shadow-lg"
                  >
                    {isSubmittingInfo ? 'Submitting...' : 'Submit Additional Info ➔'}
                  </button>
                </form>
              </div>
            )}

            {/* REJECTION CARD */}
            {request.status === 'rejected' && (
              <div className="bg-red-50 border border-red-200 p-6 rounded-3xl shadow-xl">
                <h4 className="text-lg font-black text-red-900">Request Declined / Rejected</h4>
                <p className="text-xs text-slate-700 mt-1">
                  Reason: <span className="text-red-900 font-bold">{request.rejectionReason || 'ICU criteria not met / No suitable bed available.'}</span>
                </p>
                <div className="mt-4 text-xs text-slate-600 font-medium">
                  For emergency support, contact NIMS Emergency Desk directly at <span className="text-[#172a34] font-black">0141-2700000</span>.
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* DOCUMENT PREVIEW LIGHTBOX MODAL */}
      <DocumentViewerModal
        isOpen={!!previewDoc}
        onClose={() => setPreviewDoc(null)}
        document={previewDoc}
      />

      <Footer />
    </main>
  );
}

export default function IcuStatusPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f7f4ed] text-[#172a34] p-10">Loading status page...</div>}>
      <IcuStatusContent />
    </Suspense>
  );
}
