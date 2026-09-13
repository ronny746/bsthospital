'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';

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
    <main className="min-h-screen bg-[#f7f4ed] text-[#172a34] font-sans flex flex-col justify-between">
      <NavigationBar />

      <section className="py-16 px-4 flex items-center justify-center">
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full border-t-8 border-t-[#172a34]">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 text-[#bd171c] border border-red-100 mb-3 shadow-inner">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-[#172a34] tracking-tight">ICU Admin Portal</h1>
            <p className="text-xs text-slate-500 mt-1 font-medium">Authorized Medical & Emergency Personnel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#172a34] mb-1">Username / Email</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-[#172a34] focus:outline-none focus:ring-2 focus:ring-secondary/50 font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172a34] mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-[#172a34] focus:outline-none focus:ring-2 focus:ring-secondary/50 font-medium"
                required
              />
            </div>

            {error && <div className="text-xs text-red-600 font-bold text-center">{error}</div>}



            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#172a34] hover:bg-[#0e191f] text-white font-extrabold py-3.5 rounded-xl shadow-lg transition text-sm"
            >
              {loading ? 'Authenticating...' : 'Sign In to ICU Dashboard ➔'}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
