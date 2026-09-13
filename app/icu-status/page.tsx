'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import TopBar from '@/components/TopBar';
import NewsTicker from '@/components/NewsTicker';
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
          <h1 className="text-3xl md:text-4xl font-black mb-2">Track ICU Request Status</h1>
          <p className="text-slate-200 text-xs md:text-sm font-medium">
            Enter your Unique Request ID (e.g. NIMS-ICU-20260912-0001) to check real-time admission progress.
          </p>
        </div>
      </section>

      <section className="py-10 px-4 max-w-4xl mx-auto space-y-8">
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
                  const isCompleted = idx < currentIdx;
                  const isCurrent = idx === currentIdx;

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

            {/* RESERVED BED BANNER */}
            {request.status === 'bed_reserved' && request.reservation && (
              <div className="bg-gradient-to-r from-emerald-900 to-[#172a34] text-white border-2 border-emerald-500 p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-500/30 text-emerald-300 rounded-full text-xs font-extrabold mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    ICU Bed Temporarily Reserved
                  </div>
                  <h4 className="text-2xl font-black text-white">
                    Bed {request.reservation.bedNumber} ({request.reservation.unitName})
                  </h4>
                  <p className="text-xs text-slate-200 mt-1 font-medium">
                    Please bring patient to NIMS Hospital ICU Emergency Admission Desk within hold window.
                  </p>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                  <div className="text-[10px] text-emerald-300 uppercase font-extrabold">Hold Window Expiry</div>
                  <div className="text-xl font-mono font-black text-emerald-400">
                    {request.reservation.expiresAt ? new Date(request.reservation.expiresAt).toLocaleTimeString() : '2 Hours'}
                  </div>
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
