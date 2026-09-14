'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data: any = await res.json();
      setLoading(false);

      if (res.ok && data.success) {
        localStorage.setItem('nims_admin_user', JSON.stringify(data.user));
        localStorage.setItem('nims_admin_token', data.token);
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setLoading(false);
      setError('Login failed');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f232e] via-[#172a34] to-[#791017] text-white font-sans flex flex-col justify-between items-center p-6">
      {/* Top Header Branding */}
      <div className="w-full max-w-5xl py-6 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#bd171c] text-white font-black flex items-center justify-center text-xl shadow-lg border border-red-400">
            🏥
          </div>
          <div>
            <div className="text-xs font-black text-amber-400 uppercase tracking-widest">BSTIMS Jaipur</div>
            <div className="text-base font-black text-white">ICU Operations Admin Console</div>
          </div>
        </div>
        <a
          href="/"
          className="text-xs font-black bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl transition border border-white/20"
        >
          ← Back to Main Website
        </a>
      </div>

      {/* Login Card */}
      <section className="my-auto py-12 px-4 flex items-center justify-center w-full">
        <div className="bg-white/95 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl max-w-md w-full border-t-8 border-t-[#bd171c] text-[#172a34]">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 text-[#bd171c] border border-red-100 mb-3 shadow-inner">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-[#172a34] tracking-tight">ICU Admin Authentication</h1>
            <p className="text-xs text-slate-500 mt-1 font-medium">Authorized Emergency & Bed Operations Personnel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#172a34] mb-1">Username / Access Email</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-sm text-[#172a34] focus:outline-none focus:ring-2 focus:ring-[#bd171c]/30 font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172a34] mb-1">Security Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-sm text-[#172a34] focus:outline-none focus:ring-2 focus:ring-[#bd171c]/30 font-bold"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 font-bold text-center rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#bd171c] hover:bg-[#791017] text-white font-black py-4 rounded-xl shadow-xl transition text-sm tracking-wide transform hover:-translate-y-0.5"
            >
              {loading ? 'Authenticating Personnel...' : 'Sign In to ICU Console ➔'}
            </button>

            <div className="text-[11px] text-slate-400 text-center font-medium pt-2">
              Default Demo Login: <span className="font-mono text-slate-700 font-bold">admin</span> / <span className="font-mono text-slate-700 font-bold">admin123</span>
            </div>
          </form>
        </div>
      </section>

      {/* Footer copyright */}
      <div className="w-full max-w-5xl py-4 text-center text-xs text-slate-400 font-medium">
        © 2026 Dr B S Tomar Institute of Medical Sciences & Research • Secured Medical Operations
      </div>
    </main>
  );
}
