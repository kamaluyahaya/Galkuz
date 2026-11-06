'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Lock, User, Eye, EyeOff, AlertCircle, ArrowRight,
  Shield, Bike, Users, TrendingUp
} from 'lucide-react';
import '../globals.css';

const FEATURES = [
  { icon: Shield,     text: 'Secure Operations Center' },
  { icon: Bike,       text: 'Fleet & Rider Management' },
  { icon: Users,      text: 'Multi-Branch Staff Access' },
  { icon: TrendingUp, text: 'Real-Time Financial Reports' },
];

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername]         = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]               = useState('');
  const [loading, setLoading]           = useState(false);
  const [mounted, setMounted]           = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if ((saved || 'light') === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    try {
      const res  = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        if (data.role === 'Client') {
          setError('Clients must sign in through the Client Portal.');
          return;
        }
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(data));
        router.push('/');
      } else {
        setError(data.message || 'Authentication failed. Please verify credentials.');
      }
    } catch {
      setError('Connection unreachable. Check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: "'Outfit', sans-serif", overflow: 'hidden' }}>

      {/* ── LEFT PANEL ── */}
      <div
        className="hidden-mobile"
        style={{
          flex: '0 0 46%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: '48px 56px',
          background: 'linear-gradient(145deg, #020c1b 0%, #0a1628 50%, #071020 100%)',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Grid overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(196,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(196,168,76,0.04) 1px, transparent 1px)', backgroundSize: '52px 52px', pointerEvents: 'none' }} />
        {/* Glow blobs */}
        <div style={{ position: 'absolute', top: '15%', left: '10%', width: 320, height: 320, background: 'rgba(29,78,216,0.12)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '5%', width: 260, height: 260, background: 'rgba(196,168,76,0.07)', borderRadius: '50%', filter: 'blur(70px)', pointerEvents: 'none' }} />
        {/* Gold top accent */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, transparent, #c9a84c, #f5d07a, #c9a84c, transparent)' }} />

        {/* Logo + brand */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 56 }}>
            <div style={{ width: 50, height: 50, borderRadius: 14, overflow: 'hidden', border: '2px solid rgba(196,168,76,0.5)', flexShrink: 0 }}>
              <img src="/logo.jpeg" alt="Galkuz RentalHub"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerHTML =
                    '<div style="width:100%;height:100%;background:#1a3a7c;display:flex;align-items:center;justify-content:center;font-weight:900;color:#c9a84c;font-size:16px">GR</div>';
                }}
              />
            </div>
            <div>
              <div style={{ fontWeight: 900, color: '#ffffff', fontSize: 15, letterSpacing: -0.3 }}>Galkuz RentalHub</div>
              <div style={{ fontSize: 9, color: '#c9a84c', fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', marginTop: 1 }}>Global Enterprise</div>
            </div>
          </div>

          <h1 style={{ fontSize: 42, fontWeight: 900, color: '#ffffff', lineHeight: 1.1, marginBottom: 16, letterSpacing: -1.2 }}>
            Operations<br />
            <span style={{ background: 'linear-gradient(135deg, #c9a84c, #f5d07a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Control Center
            </span>
          </h1>
          <p style={{ color: '#64748b', fontSize: 15, lineHeight: 1.75, marginBottom: 48, maxWidth: 340 }}>
            Secure access for authorized staff, branch managers, and administrators of the Galkuz RentalHub management platform.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {FEATURES.map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(196,168,76,0.1)', border: '1px solid rgba(196,168,76,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={16} color="#c9a84c" />
                </div>
                <span style={{ color: '#94a3b8', fontSize: 14, fontWeight: 600 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom testimonial card */}
        <div style={{ position: 'relative', zIndex: 2, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '20px 24px' }}>
          <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.75, fontStyle: 'italic', marginBottom: 14 }}>
            &quot;Galkuz RentalHub has transformed how we manage our fleet. The transparency and accountability in every transaction is unmatched.&quot;
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #1a3a7c, #c9a84c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#fff', flexShrink: 0 }}>M</div>
            <div>
              <div style={{ color: '#ffffff', fontWeight: 700, fontSize: 13 }}>Musa Ibrahim</div>
              <div style={{ color: '#64748b', fontSize: 11 }}>Fleet Investor, Kaduna North</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '48px 40px', background: '#f8fafc', position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: 300, height: 300, background: 'rgba(29,78,216,0.04)', borderRadius: '0 0 0 300px', pointerEvents: 'none' }} />

        <div style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 1 }}>

          {/* Mobile logo */}
          <div className="mobile-only" style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, overflow: 'hidden', border: '2px solid rgba(26,58,124,0.3)' }}>
                <img src="/logo.jpeg" alt="GR" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <div>
                <div style={{ fontWeight: 900, color: '#0a1628', fontSize: 15 }}>Galkuz RentalHub</div>
                <div style={{ fontSize: 9, color: '#1a3a7c', fontWeight: 700, letterSpacing: 2 }}>GLOBAL ENTERPRISE</div>
              </div>
            </div>
          </div>

          {/* Header */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(26,58,124,0.08)', border: '1px solid rgba(26,58,124,0.15)', color: '#1a3a7c', fontSize: 10, fontWeight: 700, padding: '5px 12px', borderRadius: 99, marginBottom: 16, textTransform: 'uppercase' as const, letterSpacing: 2 }}>
              <Shield size={10} /> Secure Access
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', letterSpacing: -0.8, marginBottom: 6 }}>Staff Sign In</h2>
            <p style={{ color: '#64748b', fontSize: 14 }}>Enter your credentials to access the operations dashboard</p>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12, padding: '12px 16px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
              <AlertCircle size={15} color="#ef4444" style={{ flexShrink: 0 }} />
              <span style={{ color: '#dc2626', fontSize: 13, fontWeight: 600 }}>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Username */}
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase' as const, letterSpacing: 1.5, marginBottom: 8 }}>Username</label>
              <div style={{ position: 'relative' }}>
                <User size={15} color="#94a3b8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type="text" placeholder="Enter system username" value={username}
                  onChange={e => setUsername(e.target.value)} required
                  style={{ width: '100%', background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '13px 14px 13px 40px', fontSize: 14, color: '#0f172a', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box' as const }}
                  onFocus={e => { e.target.style.borderColor = '#1a3a7c'; e.target.style.boxShadow = '0 0 0 3px rgba(26,58,124,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase' as const, letterSpacing: 1.5, marginBottom: 8 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} color="#94a3b8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type={showPassword ? 'text' : 'password'} placeholder="Enter account password" value={password}
                  onChange={e => setPassword(e.target.value)} required
                  style={{ width: '100%', background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '13px 44px 13px 40px', fontSize: 14, color: '#0f172a', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box' as const }}
                  onFocus={e => { e.target.style.borderColor = '#1a3a7c'; e.target.style.boxShadow = '0 0 0 3px rgba(26,58,124,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0, display: 'flex' }}>
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading}
              style={{
                width: '100%', background: loading ? '#94a3b8' : 'linear-gradient(135deg, #1a3a7c 0%, #1e40af 100%)',
                color: '#ffffff', fontWeight: 800, fontSize: 15, padding: '15px', borderRadius: 12,
                border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : '0 8px 25px rgba(26,58,124,0.35)',
                transition: 'all 0.25s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 4,
              }}
              onMouseEnter={e => { if (!loading) { (e.currentTarget).style.transform = 'translateY(-1px)'; (e.currentTarget).style.boxShadow = '0 12px 30px rgba(26,58,124,0.45)'; } }}
              onMouseLeave={e => { (e.currentTarget).style.transform = 'translateY(0)'; (e.currentTarget).style.boxShadow = loading ? 'none' : '0 8px 25px rgba(26,58,124,0.35)'; }}
            >
              {loading ? (
                <><span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />Authenticating...</>
              ) : (
                <>Secure Sign In <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          {/* Trust badges */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, margin: '28px 0', flexWrap: 'wrap' }}>
            {[['🔐', '256-bit Encrypted'], ['✅', 'Role-Based Access'], ['🏢', 'Enterprise Grade']].map(([icon, label]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>
                <span>{icon}</span> {label}
              </div>
            ))}
          </div>

          {/* Client portal link */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 24, textAlign: 'center' }}>
            <Link href="/client-login"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#1a3a7c', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'underline'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'none'}
            >
              Are you a client? Sign in to the Client Portal <ArrowRight size={13} />
            </Link>
          </div>

          <p style={{ textAlign: 'center', color: '#cbd5e1', fontSize: 11, marginTop: 32 }}>
            © {new Date().getFullYear()} Galkuz RentalHub Global Enterprise · RC 7121543
          </p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}

