'use client';

import { useState, useEffect } from 'react';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import { IcuBed, IcuType } from '@/lib/icu-types';

export default function AdminBedsPage() {
  const [beds, setBeds] = useState<IcuBed[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<string>('all');

  const [showAddModal, setShowAddModal] = useState(false);
  const [newBedData, setNewBedData] = useState({
    bedNumber: '',
    icuType: 'medical_icu' as IcuType,
    unitName: 'Medical ICU - Block A',
    floor: '3rd Floor',
    hasVentilator: true,
    hasOxygen: true,
  });

  const fetchBeds = async () => {
    try {
      const res = await fetch('/api/admin/icu-beds');
      const data: any = await res.json();
      if (res.ok) setBeds(data.beds || []);
    } catch (err) {
      // handled
    }
  };

  useEffect(() => {
    void fetchBeds();
  }, []);

  const handleReleaseBed = async (bedId: string) => {
    if (!confirm('Are you sure you want to release this reserved bed back to available pool?')) return;
    try {
      const res = await fetch(`/api/admin/icu-beds/${bedId}/release`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ performedBy: 'Bed Manager', reason: 'Admin manual bed release' }),
      });
      if (res.ok) void fetchBeds();
    } catch (err) {
      alert('Failed to release bed');
    }
  };

  const handleOccupyBed = async (bedId: string) => {
    if (!confirm('Mark this bed as occupied (Complete admission)?')) return;
    try {
      const res = await fetch(`/api/admin/icu-beds/${bedId}/occupy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ performedBy: 'Admission Desk' }),
      });
      if (res.ok) void fetchBeds();
    } catch (err) {
      alert('Failed to mark bed occupied');
    }
  };

  const handleAddBedSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!newBedData.bedNumber || !newBedData.unitName) return;

    try {
      const res = await fetch('/api/admin/icu-beds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBedData),
      });
      if (res.ok) {
        setShowAddModal(false);
        setNewBedData({
          bedNumber: '',
          icuType: 'medical_icu',
          unitName: 'Medical ICU - Block A',
          floor: '3rd Floor',
          hasVentilator: true,
          hasOxygen: true,
        });
        void fetchBeds();
      } else {
        alert('Failed to add bed');
      }
    } catch (err) {
      alert('Error creating bed');
    }
  };

  const filteredBeds = selectedUnit === 'all' ? beds : beds.filter((b) => b.icuType === selectedUnit);

  const getStatusCardStyle = (status: string) => {
    switch (status) {
      case 'available':
        return 'border-emerald-400 bg-[#f0fdf4] text-emerald-950 shadow-emerald-500/10';
      case 'reserved':
        return 'border-amber-400 bg-[#fffbeb] text-amber-950 shadow-amber-500/10';
      case 'occupied':
        return 'border-[#bd171c] bg-[#fef2f2] text-red-950 shadow-red-500/10';
      case 'maintenance':
        return 'border-slate-300 bg-slate-100 text-slate-700';
      default:
        return 'border-slate-200 bg-white text-[#172a34]';
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f4ed] text-[#172a34] font-sans">
      <NavigationBar />

      {/* HEADER BANNER */}
      <section className="bg-gradient-to-r from-[#172a34] via-[#0f232e] to-[#791017] border-b-8 border-[#bd171c] px-6 py-6 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs font-mono font-black text-amber-400 uppercase tracking-widest">Real-time Ward Monitoring</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black">ICU Bed Inventory Map</h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/admin/dashboard"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded-xl text-xs font-extrabold transition backdrop-blur-md"
            >
              ← Back to Requests
            </a>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#bd171c] hover:bg-[#791017] text-white font-black px-5 py-2.5 rounded-xl text-xs transition shadow-lg transform hover:-translate-y-0.5"
            >
              + Add New Bed Unit
            </button>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto space-y-8">
        {/* TABS */}
        <div className="flex overflow-x-auto gap-3 pb-2">
          {[
            { key: 'all', label: 'All ICU Wards' },
            { key: 'medical_icu', label: 'Medical ICU (MICU)' },
            { key: 'surgical_icu', label: 'Surgical ICU (SICU)' },
            { key: 'cardiac_icu', label: 'Cardiac ICU (CICU)' },
            { key: 'neuro_icu', label: 'Neuro ICU (NICU)' },
            { key: 'pediatric_icu', label: 'Pediatric ICU (PICU)' },
            { key: 'isolation_icu', label: 'Isolation ICU' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedUnit(tab.key)}
              className={`px-5 py-3 rounded-2xl text-xs font-black transition-all whitespace-nowrap shadow-sm ${
                selectedUnit === tab.key
                  ? 'bg-[#172a34] text-white shadow-xl scale-105'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* BED GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBeds.map((bed) => (
            <div
              key={bed.id}
              className={`p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-xl hover:scale-105 hover:shadow-2xl ${getStatusCardStyle(
                bed.status
              )}`}
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-2xl font-black text-[#172a34] tracking-widest">{bed.bedNumber}</span>
                  <span className="text-[10px] uppercase font-black px-3 py-1 rounded-full border-2 bg-white shadow-md">
                    {bed.status}
                  </span>
                </div>

                <div className="text-xs font-black text-[#172a34] mb-1">{bed.unitName}</div>
                <div className="text-[11px] text-slate-500 font-bold">{bed.floor}</div>

                {bed.currentPatientName && (
                  <div className="mt-3 p-3 bg-white rounded-2xl text-xs border border-slate-200 shadow-md">
                    <div className="text-[10px] text-slate-400 font-black uppercase">CURRENT PATIENT</div>
                    <div className="font-black text-[#172a34] text-sm mt-0.5">{bed.currentPatientName}</div>
                  </div>
                )}
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {bed.hasVentilator && (
                    <span className="text-[10px] bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-[#172a34] font-black shadow-sm">
                      🫁 Ventilator
                    </span>
                  )}
                  {bed.hasOxygen && (
                    <span className="text-[10px] bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-[#172a34] font-black shadow-sm">
                      🩸 Oxygen
                    </span>
                  )}
                </div>

                <div className="flex gap-2 pt-3 border-t border-slate-200/80">
                  {bed.status === 'reserved' && (
                    <>
                      <button
                        onClick={() => handleOccupyBed(bed.id)}
                        className="w-1/2 bg-[#172a34] hover:bg-[#0e191f] text-white font-black text-[11px] py-2.5 rounded-xl shadow-lg"
                      >
                        Admit
                      </button>
                      <button
                        onClick={() => handleReleaseBed(bed.id)}
                        className="w-1/2 bg-white hover:bg-slate-100 text-slate-800 font-extrabold text-[11px] py-2.5 rounded-xl border border-slate-300 shadow-sm"
                      >
                        Release
                      </button>
                    </>
                  )}
                  {bed.status === 'occupied' && (
                    <button
                      onClick={() => handleReleaseBed(bed.id)}
                      className="w-full bg-white hover:bg-slate-100 text-slate-800 font-black text-[11px] py-2.5 rounded-xl border border-slate-300 shadow-sm"
                    >
                      Discharge & Make Available
                    </button>
                  )}
                  {bed.status === 'available' && (
                    <div className="text-[11px] text-emerald-800 font-black text-center w-full py-1">
                      ✓ Ready for Bed Reservation
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ADD BED MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleAddBedSubmit} className="bg-white border border-slate-200 p-8 rounded-3xl max-w-md w-full shadow-2xl space-y-4 border-t-8 border-t-[#bd171c]">
            <h3 className="text-xl font-black text-[#172a34]">Add New ICU Bed Unit</h3>

            <div>
              <label className="block text-xs font-black text-[#172a34] mb-1">Bed Code *</label>
              <input
                type="text"
                placeholder="e.g. MICU-05"
                value={newBedData.bedNumber}
                onChange={(e) => setNewBedData({ ...newBedData, bedNumber: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-[#172a34] font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-black text-[#172a34] mb-1">ICU Category *</label>
              <select
                value={newBedData.icuType}
                onChange={(e) => setNewBedData({ ...newBedData, icuType: e.target.value as IcuType })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-[#172a34] font-bold"
              >
                <option value="medical_icu">Medical ICU</option>
                <option value="surgical_icu">Surgical ICU</option>
                <option value="cardiac_icu">Cardiac ICU</option>
                <option value="neuro_icu">Neuro ICU</option>
                <option value="pediatric_icu">Pediatric ICU</option>
                <option value="isolation_icu">Isolation ICU</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-[#172a34] mb-1">Unit Name / Location</label>
              <input
                type="text"
                placeholder="e.g. Medical ICU - Block A"
                value={newBedData.unitName}
                onChange={(e) => setNewBedData({ ...newBedData, unitName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-[#172a34] font-bold"
                required
              />
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-xs font-black text-[#172a34]">
                <input
                  type="checkbox"
                  checked={newBedData.hasVentilator}
                  onChange={(e) => setNewBedData({ ...newBedData, hasVentilator: e.target.checked })}
                  className="accent-[#bd171c]"
                />
                Ventilator Equipped
              </label>

              <label className="flex items-center gap-2 text-xs font-black text-[#172a34]">
                <input
                  type="checkbox"
                  checked={newBedData.hasOxygen}
                  onChange={(e) => setNewBedData({ ...newBedData, hasOxygen: e.target.checked })}
                  className="accent-[#bd171c]"
                />
                Oxygen Supply
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-1/2 bg-slate-100 text-[#172a34] py-3 rounded-xl font-black text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 bg-[#bd171c] hover:bg-[#791017] text-white font-black py-3 rounded-xl text-xs shadow-xl"
              >
                Add Bed Unit
              </button>
            </div>
          </form>
        </div>
      )}

      <Footer />
    </main>
  );
}
