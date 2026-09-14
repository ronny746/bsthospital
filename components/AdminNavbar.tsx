'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import CustomModal from '@/components/CustomModal';

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const confirmLogout = () => {
    localStorage.removeItem('nims_admin_user');
    localStorage.removeItem('nims_admin_token');
    router.push('/admin/login');
  };

  const navItems = [
    { label: '📊 Requests & Dashboard', href: '/admin/dashboard' },
    { label: '🛌 Bed Inventory Grid', href: '/admin/beds' },
  ];

  return (
    <header className="bg-[#172a34] text-white border-b-4 border-[#bd171c] sticky top-0 z-40 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#bd171c] text-white font-black flex items-center justify-center text-lg shadow-lg border border-red-400">
            🏥
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-amber-400 uppercase tracking-widest">BSTIMS Jaipur</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
            <h1 className="text-base font-black text-white tracking-wide">
              ICU Medical Operations & Bed Control Console
            </h1>
          </div>
        </div>

        {/* Navigation Tabs & Actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#bd171c] text-white shadow-lg scale-105 border border-red-400'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10'
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="h-6 w-px bg-white/20 hidden sm:block"></div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] bg-slate-800 text-slate-300 font-extrabold px-3 py-1.5 rounded-xl border border-slate-700 hidden md:inline-block">
              👤 ICU Admin
            </span>

            <button
              onClick={() => setShowLogoutModal(true)}
              className="bg-red-950/80 hover:bg-red-900 text-red-200 hover:text-white border border-red-800/80 px-3.5 py-2 rounded-xl text-xs font-black transition-colors"
              title="Logout from Admin Console"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      {/* CUSTOM LOGOUT CONFIRMATION MODAL */}
      <CustomModal
        isOpen={showLogoutModal}
        title="Confirm Admin Logout"
        description="Are you sure you want to log out of the BSTIMS ICU Operations Console?"
        icon="🚪"
        confirmText="Confirm Logout"
        cancelText="Cancel"
        confirmVariant="danger"
        onConfirm={confirmLogout}
        onClose={() => setShowLogoutModal(false)}
      />
    </header>
  );
}
