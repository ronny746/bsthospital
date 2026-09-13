'use client';

import { useState, useEffect } from 'react';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import { IcuRequest, RequestStatus, IcuType, IcuBed } from '@/lib/icu-types';

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [requests, setRequests] = useState<IcuRequest[]>([]);
  const [beds, setBeds] = useState<IcuBed[]>([]);

  // Filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [icuTypeFilter, setIcuTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Drawer & modal
  const [selectedReq, setSelectedReq] = useState<IcuRequest | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [rejectionReason, setRejectionReason] = useState('No suitable ICU bed currently available');
  const [infoReqText, setInfoReqText] = useState('Please upload latest blood report and referral letter.');
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [selectedBedForReserve, setSelectedBedForReserve] = useState('');
  const [reserveDuration, setReserveDuration] = useState(120);

  const fetchDashboardData = async () => {
    try {
      const [mRes, rRes, bRes] = await Promise.all([
        fetch('/api/admin/dashboard'),
        fetch(`/api/admin/icu-requests?status=${statusFilter}&icuType=${icuTypeFilter}&priority=${priorityFilter}&search=${searchTerm}`),
        fetch('/api/admin/icu-beds'),
      ]);

      const mData: any = await mRes.json();
      const rData: any = await rRes.json();
      const bData: any = await bRes.json();

      setMetrics(mData.metrics);
      setRequests(rData.requests || []);
      setBeds(bData.beds || []);
    } catch (err) {
      // handled
    }
  };

  useEffect(() => {
    void fetchDashboardData();
  }, [statusFilter, icuTypeFilter, priorityFilter, searchTerm]);

  const handleUpdateStatus = async (reqId: string, newStatus: RequestStatus, extra?: any) => {
    try {
      const res = await fetch(`/api/admin/icu-requests/${reqId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          performedBy: 'ICU Admin',
          ...extra,
        }),
      });
      const data: any = await res.json();
      if (res.ok) {
        void fetchDashboardData();
        if (selectedReq?.id === reqId) setSelectedReq(data.request);
      } else {
        alert(data.error || 'Failed to update status');
      }
    } catch (err) {
      alert('Error updating request status');
    }
  };

  const handleAddNote = async (reqId: string) => {
    if (!newNoteText.trim()) return;
    try {
      const res = await fetch(`/api/admin/icu-requests/${reqId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminId: 'usr-1',
          adminName: 'Super Admin',
          note: newNoteText,
        }),
      });
      const data: any = await res.json();
      if (res.ok) {
        setNewNoteText('');
        void fetchDashboardData();
        if (selectedReq?.id === reqId) setSelectedReq(data.request);
      }
    } catch (err) {
      alert('Failed to add note');
    }
  };

  const handleAssignReviewer = async (reqId: string, doctorName: string) => {
    try {
      const res = await fetch(`/api/admin/icu-requests/${reqId}/assign`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewer: { id: 'usr-2', name: doctorName, role: 'Doctor/Medical Reviewer' },
          performedBy: 'ICU Admin',
        }),
      });
      const data: any = await res.json();
      if (res.ok) {
        void fetchDashboardData();
        if (selectedReq?.id === reqId) setSelectedReq(data.request);
      }
    } catch (err) {
      alert('Failed to assign reviewer');
    }
  };

  const handleReserveBedSubmit = async () => {
    if (!selectedReq || !selectedBedForReserve) {
      alert('Please select an available bed');
      return;
    }
    try {
      const res = await fetch(`/api/admin/icu-beds/${selectedBedForReserve}/reserve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId: selectedReq.id,
          durationMinutes: Number(reserveDuration),
          performedBy: 'ICU Bed Manager',
        }),
      });
      const data: any = await res.json();
      if (res.ok) {
        setShowReserveModal(false);
        void fetchDashboardData();
        if (selectedReq) setSelectedReq(data.request);
      } else {
        alert(data.error || 'Failed to reserve bed');
      }
    } catch (err) {
      alert('Error reserving bed');
    }
  };

  const availableBedsForUnit = (type: IcuType) => {
    return beds.filter((b) => b.icuType === type && b.status === 'available');
  };

  return (
    <main className="min-h-screen bg-[#f7f4ed] text-[#172a34] font-sans">
      <NavigationBar />

      {/* HEADER BANNER */}
      <section className="bg-gradient-to-r from-[#172a34] via-[#0f232e] to-[#791017] border-b-8 border-[#bd171c] px-6 py-6 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
              <span className="text-xs font-mono font-black text-amber-400 uppercase tracking-widest">Medical Operations Console</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black">ICU Bed Management & Admission Desk</h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/admin/beds"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded-xl text-xs font-extrabold transition backdrop-blur-md"
            >
              🛌 Visual Ward Grid
            </a>
            <button
              onClick={() => void fetchDashboardData()}
              className="bg-[#bd171c] hover:bg-[#791017] text-white px-5 py-2.5 rounded-xl text-xs font-black transition shadow-lg transform hover:-translate-y-0.5"
            >
              🔄 Refresh Analytics
            </button>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto space-y-8">
        {/* KPI CARDS */}
        {metrics && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { title: 'Total ICU Beds', val: metrics.totalIcuBeds, color: 'bg-white border-slate-200 text-[#172a34]', icon: '🛌' },
              { title: 'Available Beds', val: metrics.availableBeds, color: 'bg-emerald-50 border-emerald-300 text-emerald-900', icon: '✅' },
              { title: 'Reserved Beds', val: metrics.reservedBeds, color: 'bg-amber-50 border-amber-300 text-amber-900', icon: '🔒' },
              { title: 'Occupied Beds', val: metrics.occupiedBeds, color: 'bg-blue-50 border-blue-300 text-blue-900', icon: '👤' },
              { title: 'In Maintenance', val: metrics.maintenanceBeds, color: 'bg-slate-100 border-slate-300 text-slate-700', icon: '🛠️' },
              { title: 'New Requests', val: metrics.newRequests, color: 'bg-indigo-50 border-indigo-300 text-indigo-900', icon: '📥' },
              { title: 'Critical Requests', val: metrics.criticalRequests, color: 'bg-red-50 border-red-400 text-red-900 animate-pulse', icon: '🚨' },
              { title: 'Pending Reviews', val: metrics.pendingReviews, color: 'bg-purple-50 border-purple-300 text-purple-900', icon: '⏳' },
              { title: 'Waiting List', val: metrics.waitingListPatients, color: 'bg-orange-50 border-orange-300 text-orange-900', icon: '📋' },
              { title: "Today's Admissions", val: metrics.todayConfirmedAdmissions, color: 'bg-teal-50 border-teal-300 text-teal-900', icon: '🎯' },
            ].map((card, idx) => (
              <div key={idx} className={`p-4 rounded-3xl border-2 shadow-lg ${card.color} transition-all duration-300 hover:scale-105`}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-black uppercase tracking-wider opacity-90">{card.title}</span>
                  <span className="text-lg">{card.icon}</span>
                </div>
                <div className="text-3xl font-black font-mono mt-1">{card.val}</div>
              </div>
            ))}
          </div>
        )}

        {/* SEARCH & FILTERS */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search Request ID, Patient Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-3 text-xs text-[#172a34] focus:outline-none focus:border-[#bd171c] font-bold"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border-2 border-slate-200 rounded-2xl px-3 py-3 text-xs text-[#172a34] focus:outline-none focus:border-[#bd171c] font-bold"
            >
              <option value="all">All Request Statuses</option>
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="more_info_required">More Info Required</option>
              <option value="waiting_list">Waiting List</option>
              <option value="approved">Approved</option>
              <option value="bed_reserved">Bed Reserved</option>
              <option value="admitted">Admitted</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              value={icuTypeFilter}
              onChange={(e) => setIcuTypeFilter(e.target.value)}
              className="bg-slate-50 border-2 border-slate-200 rounded-2xl px-3 py-3 text-xs text-[#172a34] focus:outline-none focus:border-[#bd171c] font-bold"
            >
              <option value="all">All ICU Categories</option>
              <option value="medical_icu">Medical ICU</option>
              <option value="surgical_icu">Surgical ICU</option>
              <option value="cardiac_icu">Cardiac ICU</option>
              <option value="neuro_icu">Neuro ICU</option>
              <option value="pediatric_icu">Pediatric ICU</option>
              <option value="isolation_icu">Isolation ICU</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-slate-50 border-2 border-slate-200 rounded-2xl px-3 py-3 text-xs text-[#172a34] focus:outline-none focus:border-[#bd171c] font-bold"
            >
              <option value="all">All Priority Levels</option>
              <option value="critical">Critical Priority</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
        </div>

        {/* MASTER TABLE */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl">
          <div className="px-6 py-5 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <h2 className="text-lg font-black text-[#172a34]">ICU Patient Queue ({requests.length})</h2>
            <span className="text-xs text-slate-500 font-bold">Click any row to open action drawer</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#172a34] text-white font-black uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-5">Request ID</th>
                  <th className="py-4 px-5">Patient Details</th>
                  <th className="py-4 px-5">Required Unit & Diagnosis</th>
                  <th className="py-4 px-5">Priority</th>
                  <th className="py-4 px-5">Assigned Doctor</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5 text-right">Quick Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {requests.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => setSelectedReq(r)}
                    className="hover:bg-red-50/40 cursor-pointer transition font-medium"
                  >
                    <td className="py-4 px-5 font-mono font-black text-[#bd171c] text-sm">{r.requestId}</td>
                    <td className="py-4 px-5">
                      <div className="font-black text-[#172a34] text-sm">{r.patient.fullName}</div>
                      <div className="text-xs text-slate-500">
                        {r.patient.age}y / {r.patient.gender} • +91 {r.patient.mobile}
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="font-extrabold text-[#172a34] uppercase">{r.medical.requiredIcuType.replace('_', ' ')}</div>
                      <div className="text-xs text-slate-500 truncate max-w-[200px]">{r.medical.diagnosis}</div>
                    </td>
                    <td className="py-4 px-5">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          r.priority === 'critical'
                            ? 'bg-red-100 text-red-800 border-2 border-red-300'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}
                      >
                        {r.priority}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      {r.assignedTo ? (
                        <div className="text-[#172a34] font-black">{r.assignedTo.name}</div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            void handleAssignReviewer(r.id, 'Dr. Sunita Verma');
                          }}
                          className="text-[11px] bg-slate-100 hover:bg-slate-200 text-[#172a34] px-3 py-1.5 rounded-xl border border-slate-300 font-extrabold"
                        >
                          + Assign Doctor
                        </button>
                      )}
                    </td>
                    <td className="py-4 px-5">
                      <span className="capitalize font-black text-[#172a34] text-xs">
                        {r.status.replace(/_/g, ' ')}
                      </span>
                      {r.reservation?.bedNumber && (
                        <div className="text-xs text-emerald-700 font-mono font-black">
                          Bed: {r.reservation.bedNumber}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedReq(r);
                            setShowReserveModal(true);
                          }}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl text-xs font-black shadow"
                        >
                          Reserve Bed
                        </button>
                        <button
                          onClick={() => void handleUpdateStatus(r.id, 'approved')}
                          className="bg-[#172a34] hover:bg-[#0e191f] text-white px-3 py-1.5 rounded-xl text-xs font-black"
                        >
                          Approve
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* DRAWER MODAL */}
      {selectedReq && !showReserveModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-2xl h-full overflow-y-auto p-8 space-y-6 shadow-2xl border-l-8 border-[#172a34]">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-mono font-black text-[#bd171c]">{selectedReq.requestId}</span>
                <h3 className="text-2xl font-black text-[#172a34]">{selectedReq.patient.fullName}</h3>
              </div>
              <button
                onClick={() => setSelectedReq(null)}
                className="text-slate-400 hover:text-black text-2xl font-black p-2"
              >
                ✕
              </button>
            </div>

            {/* Quick Actions */}
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-3">
              <div className="text-xs font-black text-[#172a34] uppercase tracking-wider">UPDATE STATUS & ACTION</div>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => void handleUpdateStatus(selectedReq.id, 'under_review')}
                  className="bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 px-4 py-2 rounded-xl text-xs font-black"
                >
                  Under Review
                </button>
                <button
                  onClick={() => void handleUpdateStatus(selectedReq.id, 'approved')}
                  className="bg-teal-100 hover:bg-teal-200 text-teal-900 border border-teal-300 px-4 py-2 rounded-xl text-xs font-black"
                >
                  Approve Request
                </button>
                <button
                  onClick={() => setShowReserveModal(true)}
                  className="bg-[#bd171c] hover:bg-[#791017] text-white font-black px-4 py-2 rounded-xl text-xs shadow-lg"
                >
                  Reserve Bed 🛌
                </button>
                <button
                  onClick={() => void handleUpdateStatus(selectedReq.id, 'waiting_list')}
                  className="bg-orange-100 hover:bg-orange-200 text-orange-900 px-4 py-2 rounded-xl text-xs font-black"
                >
                  Add to Waiting List
                </button>
                <button
                  onClick={() => {
                    if (confirm('Mark admission completed and patient moved to bed?')) {
                      void handleUpdateStatus(selectedReq.id, 'admitted');
                    }
                  }}
                  className="bg-[#172a34] text-white font-black px-4 py-2 rounded-xl text-xs"
                >
                  Complete Admission
                </button>
                <button
                  onClick={() => {
                    const reason = prompt('Enter rejection reason:', rejectionReason);
                    if (reason) void handleUpdateStatus(selectedReq.id, 'rejected', { rejectionReason: reason });
                  }}
                  className="bg-red-100 hover:bg-red-200 text-red-900 border border-red-300 px-4 py-2 rounded-xl text-xs font-black"
                >
                  Reject Request
                </button>
              </div>
            </div>

            {/* Request Info Form */}
            <div className="p-5 bg-slate-50 rounded-3xl border border-slate-200 space-y-2">
              <div className="text-xs font-black text-[#172a34]">Request Additional Info From Patient</div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={infoReqText}
                  onChange={(e) => setInfoReqText(e.target.value)}
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-[#172a34] font-medium"
                />
                <button
                  onClick={() =>
                    void handleUpdateStatus(selectedReq.id, 'more_info_required', {
                      requestedInfoDescription: infoReqText,
                    })
                  }
                  className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-xl text-xs font-black"
                >
                  Send Request
                </button>
              </div>
            </div>

            {/* Medical Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-[#172a34] uppercase tracking-wider">Patient Medical Details</h4>
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-5 rounded-3xl border border-slate-200">
                <div><span className="text-slate-500">Condition:</span> <span className="text-[#172a34] font-extrabold">{selectedReq.medical.currentMedicalCondition}</span></div>
                <div><span className="text-slate-500">Diagnosis:</span> <span className="text-[#172a34] font-extrabold">{selectedReq.medical.diagnosis}</span></div>
                <div><span className="text-slate-500">Symptoms:</span> <span className="text-[#172a34] font-extrabold">{selectedReq.medical.symptomsCriticality}</span></div>
                <div><span className="text-slate-500">Ventilator Needed:</span> <span className="text-[#bd171c] font-black">{selectedReq.medical.ventilatorRequired ? 'YES' : 'NO'}</span></div>
                <div><span className="text-slate-500">Oxygen Needed:</span> <span className="text-[#bd171c] font-black">{selectedReq.medical.oxygenRequired ? 'YES' : 'NO'}</span></div>
                <div><span className="text-slate-500">Doctor:</span> <span className="text-[#172a34] font-bold">{selectedReq.medical.treatingDoctorName || 'N/A'}</span></div>
              </div>
            </div>

            {/* INTERNAL NOTES */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-[#172a34] uppercase tracking-wider">Internal Admin Notes</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedReq.adminNotes.length === 0 ? (
                  <div className="text-xs text-slate-400">No internal notes added yet.</div>
                ) : (
                  selectedReq.adminNotes.map((note) => (
                    <div key={note.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                      <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                        <span className="font-bold text-[#172a34]">{note.adminName}</span>
                        <span>{new Date(note.createdAt).toLocaleString()}</span>
                      </div>
                      <div className="text-slate-800 font-medium">{note.note}</div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Add internal note..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-[#172a34]"
                />
                <button
                  onClick={() => void handleAddNote(selectedReq.id)}
                  className="bg-[#172a34] hover:bg-[#0e191f] text-white font-bold px-4 py-2 rounded-xl text-xs"
                >
                  Add Note
                </button>
              </div>
            </div>

            {/* AUDIT HISTORY */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-[#172a34] uppercase tracking-wider">Audit History</h4>
              <div className="space-y-2 bg-slate-50 p-5 rounded-3xl border border-slate-200 text-xs">
                {selectedReq.auditLogs.map((log) => (
                  <div key={log.id} className="border-b border-slate-200 pb-2 last:border-none">
                    <div className="flex justify-between font-bold text-[#172a34]">
                      <span>{log.action}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{new Date(log.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">By: {log.performedBy} {log.details && `• ${log.details}`}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RESERVE BED MODAL */}
      {showReserveModal && selectedReq && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 p-8 rounded-3xl max-w-md w-full shadow-2xl space-y-5 border-t-8 border-t-[#bd171c]">
            <h3 className="text-xl font-black text-[#172a34]">Reserve ICU Bed for {selectedReq.patient.fullName}</h3>
            <p className="text-xs text-slate-500 font-medium">
              Required Category: <span className="text-[#bd171c] font-black uppercase">{selectedReq.medical.requiredIcuType.replace('_', ' ')}</span>
            </p>

            <div>
              <label className="block text-xs font-bold text-[#172a34] mb-1">Select Available Bed</label>
              <select
                value={selectedBedForReserve}
                onChange={(e) => setSelectedBedForReserve(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-xs text-[#172a34] font-bold"
              >
                <option value="">-- Choose Available Bed Unit --</option>
                {availableBedsForUnit(selectedReq.medical.requiredIcuType).map((bed) => (
                  <option key={bed.id} value={bed.id}>
                    {bed.bedNumber} ({bed.unitName}) - {bed.floor}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172a34] mb-1">Hold Window Duration</label>
              <select
                value={reserveDuration}
                onChange={(e) => setReserveDuration(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-xs text-[#172a34] font-bold"
              >
                <option value={60}>60 Minutes (1 Hour)</option>
                <option value={120}>120 Minutes (2 Hours - Standard)</option>
                <option value={240}>240 Minutes (4 Hours)</option>
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowReserveModal(false)}
                className="w-1/2 bg-slate-100 text-[#172a34] py-3.5 rounded-xl font-extrabold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleReserveBedSubmit}
                className="w-1/2 bg-[#bd171c] hover:bg-[#791017] text-white font-black py-3.5 rounded-xl text-xs shadow-xl"
              >
                Confirm Bed Lock 🔒
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
