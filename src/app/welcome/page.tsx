'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeft, ChevronRight, Menu, X, ArrowRight, Phone, Mail,
  MapPin, Bike, Users, TrendingUp, Shield, Star, CheckCircle,
  Award, Clock, Handshake, Building2, Facebook, Twitter,
  Instagram, Linkedin, ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';

/* ─────────────────────────── DATA ─────────────────────────── */

const SLIDES = [
  {
    bg: 'from-slate-900 via-blue-950 to-slate-900',
    badge: 'Empowering Riders Across Kaduna State',
    title: 'Your Trusted\nMotorcycle Finance\nPartner',
    sub: 'We provide accessible motorcycle financing solutions to riders, enabling livelihoods and building lasting financial success across Northern Nigeria.',
    cta: 'Get Started Today',
    img: '🏍️',
  },
  {
    bg: 'from-amber-900 via-orange-950 to-slate-900',
    badge: 'Transparent & Reliable Operations',
    title: 'Empowering\nCommunities Through\nFleet Management',
    sub: 'From disbursements to returns, our system ensures every rider and partner is tracked with full accountability and precision.',
    cta: 'Learn About Us',
    img: '🤝',
  },
  {
    bg: 'from-emerald-900 via-teal-950 to-slate-900',
    badge: 'Proven Track Record Since 2019',
    title: 'Thousands of\nRiders. One System.\nUnlimited Growth.',
    sub: 'Our operations and management platform connects clients, riders, MD leaders and branches in one seamless ecosystem.',
    cta: 'View Our Services',
    img: '📈',
  },
];

const SERVICES = [
  { num: '01', title: 'Transportation Asset Management', desc: 'Professional management of transportation assets on behalf of vehicle and tricycle owners including driver recruitment, daily supervision, remittance monitoring, tracking, documentation, and asset inspection.' },
  { num: '02', title: 'Balance Bases Transportation Management', desc: 'A structured model connecting asset owners, management, and operators. The owner provides the asset, company provides professional management, and operator runs the asset with transparent returns.' },
  { num: '03', title: 'Tricycle (Keke) Acquisition & Ownership', desc: 'Assisting individuals and investors to enter commercial tricycle transportation through complete ownership or structured shared arrangements covering acquisition, deployment, and management.' },
  { num: '04', title: 'Shared Tricycle Ownership / Share Investment', desc: 'Innovative shared transportation asset ownership model allowing multiple investors to collectively purchase units/shares of commercial tricycles with clear management and financial distribution.' },
  { num: '05', title: 'Vehicle Importation & Acquisition', desc: 'Facilitating local and international vehicle procurement, importation, logistics coordination, documentation, and vehicle inspection for personal, commercial, or fleet expansion use.' },
  { num: '06', title: 'Vehicle Sales', desc: 'Connecting clients with suitable vehicles for commercial transportation, private use, business operations, corporate fleets, and transportation investments without acquisition complications.' },
  { num: '07', title: 'Commercial Vehicle Deployment', desc: 'Transitioning owned vehicles into structured, revenue-generating commercial operations through registration, operator placement, route assessment, supervision, and performance monitoring.' },
  { num: '08', title: 'Driver & Operator Management', desc: 'Comprehensive recruitment, supervision, performance evaluation, and accountability systems for operators to ensure asset protection, vehicle longevity, and sustainable returns.' },
  { num: '09', title: 'Vehicle Tracking & Monitoring', desc: 'Installation and active monitoring of GPS vehicle tracking systems for real-time location monitoring, operational supervision, driver accountability, and recovery support.' },
  { num: '10', title: 'Maintenance & Asset Preservation', desc: 'Coordinated routine servicing, preventive maintenance, repairs, tyre & engine monitoring, and technical inspections to protect asset value and prolong operational lifespan.' },
  { num: '11', title: 'Transportation Investment Opportunities', desc: 'Structured investment arrangements (complete ownership, shared ownership, tricycle & vehicle investments) with clear financial terms, distributions, and exit strategies.' },
  { num: '12', title: 'Asset Exit & Resale Management', desc: 'Clear exit pathways and resale structures when owners wish to sell, replace, or exit an asset investment, ensuring transparent distribution of sale proceeds.' },
  { num: '13', title: 'Fleet Management', desc: 'Coordinated management for multi-vehicle owners and corporate clients covering deployment, tracking, driver supervision, maintenance, documentation, and reporting.' },
  { num: '14', title: 'Transportation Business Consultancy', desc: 'Professional guidance for prospective owners and investors on vehicle selection, acquisition costs, driver management, operational risks, investment structures, and exit planning.' },
];

const TEAM = [
  {
    name: 'Alhaji Kabiru Musa Galkuz',
    role: 'Chief Executive Officer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    emoji: '👔',
    desc: 'Visionary entrepreneur with 15+ years in transportation investment. Leads Galkuz RentalHub with a mission to empower rental asset owners and operators through structured management across Northern Nigeria.',
  },
  {
    name: 'Ibrahim Sani Abdullahi',
    role: 'Director-General of Operations',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    emoji: '⚙️',
    desc: 'Oversees company-wide branch operations, rider deployment, compliance monitoring, and fleet management. Ensures seamless coordination across all three regional branches.',
  },
  {
    name: 'Sadiya Sulaiman Ahuoiza',
    role: 'Head Accountant',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face',
    emoji: '💼',
    desc: 'CPA-certified accountant managing financial records, bookkeeping, disbursement audits, and monthly reporting across all company operations and investor accounts.',
  },
  {
    name: 'Jawahir Imaam Isa',
    role: 'Admin & HR Officer',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face',
    emoji: '📋',
    desc: 'Coordinates office administration, documentation, HR processes, and stakeholder communication. Ensures smooth day-to-day operations and regulatory compliance.',
  },
  {
    name: 'Usman Danladi Yaro',
    role: 'Fleet Operations Manager',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    emoji: '🚐',
    desc: 'Manages day-to-day fleet deployment, GPS tracking, driver supervision, and maintenance scheduling. Ensures all tricycles and vehicles are operating at peak efficiency.',
  },
  {
    name: 'Maryam Bello Wakili',
    role: 'Client Relations Officer',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face',
    emoji: '🤝',
    desc: 'Manages client onboarding, remittance tracking, investor relations, and satisfaction follow-ups. Serves as the primary liaison between clients and the management team.',
  },
];

const BLOG_POSTS = [
  {
    id: 1,
    slug: 'galkuz-expands-kaduna-fleet-2025',
    title: 'Galkuz RentalHub Expands Kaduna Fleet by 150 Tricycles in 2025',
    summary: 'We are proud to announce the deployment of 150 new TVS King Deluxe tricycles across our three Kaduna branches, bringing our total managed fleet to over 1,000 operational units.',
    category: 'Company News',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=350&fit=crop',
    date: 'October 15, 2025',
    author: 'Galkuz RentalHub Media',
  },
  {
    id: 2,
    slug: 'investment-guide-tricycle-ownership',
    title: 'Your Complete Guide to Tricycle Investment with Galkuz RentalHub',
    summary: 'Thinking of investing in commercial transportation? Learn how our Balance Bases Transportation Model works, what returns to expect, and how we protect your investment through professional management.',
    category: 'Investment Guide',
    image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=350&fit=crop',
    date: 'September 28, 2025',
    author: 'Investment Team',
  },
  {
    id: 3,
    slug: 'kaduna-rider-success-stories-q3',
    title: '500+ Active Riders: How Galkuz RentalHub is Transforming Livelihoods',
    summary: 'From zero to motorcycle owners — read the inspiring stories of riders who completed their contracts with us and are now building sustainable income and financial independence across Kaduna State.',
    category: 'Success Stories',
    image_url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=350&fit=crop',
    date: 'September 10, 2025',
    author: 'Client Relations Team',
  },
];

const STATS = [
  { value: '10+', label: 'Years in Operation', icon: <Clock className="w-7 h-7" /> },
  { value: '500+', label: 'Active Clients Served', icon: <Users className="w-7 h-7" /> },
  { value: '₦50M+', label: 'Total Disbursed', icon: <TrendingUp className="w-7 h-7" /> },
  { value: '3', label: 'Branch Offices', icon: <Building2 className="w-7 h-7" /> },
  { value: '1000+', label: 'Tricycles Financed', icon: <Bike className="w-7 h-7" /> },
  { value: '98%', label: 'Client Satisfaction', icon: <Star className="w-7 h-7" /> },
];

const STORIES = [
  { name: 'Musa Garba', location: 'Kaduna North', quote: 'Galkuz RentalHub changed my life. I now own my motorcycle and my income has tripled since joining their program.', stars: 5, role: 'Motorcycle Rider' },
  { name: 'Aisha Mohammed', location: 'Kaduna Central', quote: 'The process was simple and the team was very supportive. I completed my contract on time and my business is growing.', stars: 5, role: 'Fleet Operator' },
  { name: 'Ibrahim Yusuf', location: 'Kaduna South', quote: 'Professional service and transparent processes. Galkuz RentalHub truly cares about empowering riders like me.', stars: 5, role: 'MD Leader' },
];

const NAV_LINKS = ['Services', 'About', 'History', 'Blog', 'Team', 'Success Stories', 'Contact'];

/* ─────────────────────────── COMPONENT ─────────────────────────── */

export default function WelcomePage() {
  const [current, setCurrent] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [blogLoading, setBlogLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; text: string }>({ type: null, text: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBlogLoading(true);
    fetch('/api/blog/public')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setBlogPosts(data);
      })
      .catch(err => console.error('Failed to fetch blog posts:', err))
      .finally(() => setBlogLoading(false));
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactMessage.trim()) {
      setSubmitStatus({ type: 'error', text: 'Name and message are required fields.' });
      return;
    }
    setLoading(true);
    setSubmitStatus({ type: null, text: '' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          phone: contactPhone,
          email: contactEmail,
          message: contactMessage
        })
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitStatus({ type: 'success', text: 'Message sent successfully! We will get back to you shortly.' });
        setContactName('');
        setContactPhone('');
        setContactEmail('');
        setContactMessage('');
      } else {
        setSubmitStatus({ type: 'error', text: data.message || 'Something went wrong. Please try again.' });
      }
    } catch (err) {
      setSubmitStatus({ type: 'error', text: 'Failed to connect to the server. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const slideTo = (idx: number) => {
    if (animating || idx === current) return;
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => setAnimating(false), 700);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const slideNext = () => slideTo((current + 1) % SLIDES.length);
  const slidePrev = () => slideTo((current - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offsetTop = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const slide = SLIDES[current];

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif", background: 'var(--w-bg-base)', color: 'var(--w-text-primary)' }}>
      {/* NAVBAR */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, transition: 'all 0.4s', background: scrolled ? 'var(--w-nav-bg)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid var(--w-nav-border)' : 'none' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '14px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="gold-glow" style={{ width: 42, height: 42, borderRadius: 12, overflow: 'hidden', border: '2px solid rgba(196,168,76,0.6)', flexShrink: 0 }}>
              <img src="/logo.jpeg" alt="Galkuz RentalHub" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as any).parentElement.innerHTML = '<div style="width:100%;height:100%;background:#0a1628;display:flex;align-items:center;justify-content:center;font-weight:900;color:#c9a84c;font-size:14px">GR</div>'; }} />
            </div>
            <div>
              <div style={{ fontWeight: 900, color: scrolled ? 'var(--w-text-primary)' : '#ffffff', fontSize: 18, letterSpacing: -0.5 }}>Galkuz RentalHub</div>
              <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#c9a84c', marginTop: 1 }}>Operations & Management</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 28, alignItems: 'center' }} className="hidden-mobile">
            {NAV_LINKS.map(l => (
              l === 'History' ? (
                <Link key={l} href="/history" style={{ color: scrolled ? 'var(--w-text-secondary)' : '#ffffff', fontWeight: 600, fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = '#f59e0b')} onMouseLeave={e => (e.currentTarget.style.color = scrolled ? 'var(--w-text-secondary)' : '#ffffff')}>
                  {l}
                </Link>
              ) : (
                <button key={l} onClick={() => scrollTo(l.toLowerCase().replace(/\s+/g, '-'))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: scrolled ? 'var(--w-text-secondary)' : '#ffffff', fontWeight: 600, fontSize: 14, padding: 0, transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = '#f59e0b')} onMouseLeave={e => (e.currentTarget.style.color = scrolled ? 'var(--w-text-secondary)' : '#ffffff')}>
                  {l}
                </button>
              )
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div className="desktop-only" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <Link href="/client-login" style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#ffffff', fontWeight: 700, fontSize: 13, padding: '10px 18px', borderRadius: 12, textDecoration: 'none', transition: 'all 0.2s' }}>
                Client Login
              </Link>
              <Link href="/login" style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f59e0b', color: '#1a2332', fontWeight: 800, fontSize: 13, padding: '10px 18px', borderRadius: 12, textDecoration: 'none', transition: 'all 0.2s' }}>
                Staff Login <ArrowRight size={15} />
              </Link>
            </div>
            <button className="mobile-only" onClick={() => setMobileOpen(!mobileOpen)} style={{ background: 'var(--w-bg-card)', border: '1px solid var(--w-border)', color: 'var(--w-text-primary)', padding: 8, borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="mobile-only" style={{ background: 'var(--w-mobile-bg)', padding: '16px 24px 24px', borderTop: '1px solid var(--w-border)' }}>
            {NAV_LINKS.map(l => (
              l === 'History' ? (
                <Link key={l} href="/history" onClick={() => setMobileOpen(false)} style={{ display: 'block', width: '100%', textAlign: 'left', textDecoration: 'none', borderBottom: '1px solid var(--w-border)', color: 'var(--w-text-primary)', fontWeight: 600, fontSize: 15, padding: '14px 0' }}>
                  {l}
                </Link>
              ) : (
                <button key={l} onClick={() => { setMobileOpen(false); scrollTo(l.toLowerCase().replace(/\s+/g, '-')); }} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid var(--w-border)', color: 'var(--w-text-primary)', fontWeight: 600, fontSize: 15, padding: '14px 0', cursor: 'pointer' }}>
                  {l}
                </button>
              )
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
              <Link href="/client-login" onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--w-bg-card)', border: '1px solid var(--w-border)', color: 'var(--w-text-primary)', fontWeight: 700, fontSize: 13, padding: '12px 14px', borderRadius: 12, textDecoration: 'none' }}>
                Client Login
              </Link>
              <Link href="/login" onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, background: '#f59e0b', color: '#1a2332', fontWeight: 800, fontSize: 13, padding: '12px 14px', borderRadius: 12, textDecoration: 'none' }}>
                Staff Login <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        className="hero-section"
        style={{
          display: 'flex', alignItems: 'center',
          background: 'linear-gradient(135deg, #020c1b 0%, #0a1628 40%, #0d1f3c 70%, #071020 100%)',
          position: 'relative', overflow: 'hidden', paddingTop: 80, minHeight: '100vh'
        }}
      >
        {/* Background decorative elements */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(29,78,216,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(196,168,76,0.08) 0%, transparent 40%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(rgba(196,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(196,168,76,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* Gold arc bottom */}
        <div style={{ position: 'absolute', bottom: -2, left: 0, right: 0, height: 6, background: 'linear-gradient(90deg, transparent 0%, #c9a84c 30%, #f5d07a 50%, #c9a84c 70%, transparent 100%)', opacity: 0.6 }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto', padding: '80px 40px 100px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>

          {/* LEFT: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(196,168,76,0.12)', border: '1px solid rgba(196,168,76,0.3)', color: '#f5d07a', fontSize: 11, fontWeight: 700, padding: '7px 16px', borderRadius: 99, marginBottom: 28, textTransform: 'uppercase', letterSpacing: 2 }}>
              <Shield size={12} /> Nigeria's Premier Rental & Fleet Management
            </div>

            {/* Headline */}
            <h1 style={{ fontSize: 'clamp(36px, 5vw, 62px)', fontWeight: 900, color: '#ffffff', lineHeight: 1.08, marginBottom: 24, letterSpacing: -1.5 }}>
              Your Trusted<br />
              <span style={{ background: 'linear-gradient(135deg, #c9a84c, #f5d07a, #e8b84b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>RentalHub</span>
              <br />& Fleet Partner
            </h1>

            {/* Sub */}
            <p style={{ color: '#94a3b8', fontSize: 17, lineHeight: 1.75, marginBottom: 36, maxWidth: 480 }}>
              We provide structured transportation asset management, motorcycle financing, and rental solutions — empowering riders and investors across Northern Nigeria since 2019.
            </p>

            {/* Mini stats */}
            <div style={{ display: 'flex', gap: 28, marginBottom: 40, flexWrap: 'wrap' }}>
              {[['500+', 'Active Clients'], ['₦50M+', 'Disbursed'], ['3', 'Branches']].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: '#f5d07a', lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: 2, marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button onClick={() => scrollTo('services')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #c9a84c, #f5d07a)', color: '#0a1628', fontWeight: 800, fontSize: 15, padding: '15px 32px', borderRadius: 14, border: 'none', cursor: 'pointer', boxShadow: '0 12px 40px rgba(196,168,76,0.35)', transition: 'all 0.25s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 16px 50px rgba(196,168,76,0.5)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 40px rgba(196,168,76,0.35)'; }}
              >
                Our Services <ArrowRight size={17} />
              </button>
              <button onClick={() => scrollTo('contact')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.06)', color: '#ffffff', fontWeight: 700, fontSize: 15, padding: '15px 32px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', backdropFilter: 'blur(12px)', transition: 'all 0.25s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; }}
              >
                Contact Us <ChevronDown size={17} />
              </button>
            </div>
          </motion.div>

          {/* RIGHT: Image hero card */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{ position: 'relative' }}
          >
            {/* Main image */}
            <div style={{ borderRadius: 28, overflow: 'hidden', border: '1px solid rgba(196,168,76,0.25)', boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(196,168,76,0.1)', position: 'relative' }}>
              <img
                src="/background.png"
                alt="Galkuz RentalHub Fleet"
                style={{ width: '100%', height: 420, objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.style.background = 'linear-gradient(135deg, #0d1f3c, #1e3a5f)';
                  (e.target as HTMLImageElement).parentElement!.style.height = '420px';
                  (e.target as HTMLImageElement).parentElement!.style.display = 'flex';
                  (e.target as HTMLImageElement).parentElement!.style.alignItems = 'center';
                  (e.target as HTMLImageElement).parentElement!.style.justifyContent = 'center';
                  const ph = document.createElement('div');
                  ph.innerHTML = '<span style="font-size:72px">🚐</span>';
                  (e.target as HTMLImageElement).parentElement!.appendChild(ph);
                }}
              />
              {/* Image overlay gradient */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,22,40,0.5) 0%, transparent 50%)' }} />
            </div>

            {/* Floating badge: RC number */}
            <div style={{ position: 'absolute', top: -18, right: 24, background: 'rgba(10,22,40,0.95)', border: '1px solid rgba(196,168,76,0.4)', borderRadius: 14, padding: '10px 18px', backdropFilter: 'blur(20px)' }}>
              <div style={{ fontSize: 9, color: '#c9a84c', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>RC Number</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: '#ffffff' }}>7121543</div>
            </div>

            {/* Floating badge: since */}
            <div className="float" style={{ position: 'absolute', bottom: -18, left: 24, background: 'linear-gradient(135deg, #c9a84c, #f5d07a)', borderRadius: 14, padding: '12px 20px' }}>
              <div style={{ fontSize: 9, color: '#0a1628', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>Established</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#0a1628' }}>Since 2019</div>
            </div>

            {/* Decorative glow */}
            <div style={{ position: 'absolute', top: '30%', left: -40, width: 200, height: 200, background: 'rgba(196,168,76,0.08)', borderRadius: '50%', filter: 'blur(50px)', pointerEvents: 'none' }} />
          </motion.div>
        </div>

        {/* Mobile stacked layout override via CSS */}
        <style>{`
          @media (max-width: 768px) {
            .hero-grid { grid-template-columns: 1fr !important; padding: 60px 20px 80px !important; gap: 40px !important; }
            .hero-img-wrap { order: -1; }
          }
        `}</style>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.5 }}>
          <span style={{ fontSize: 9, color: '#94a3b8', letterSpacing: 4, textTransform: 'uppercase' }}>Scroll</span>
          <ChevronDown size={16} style={{ color: '#c9a84c', animation: 'bounce 1.5s infinite' }} />
        </div>
      </section>


      {/* STATS STRIP */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: 'var(--w-stats-bg)', borderTop: '1px solid var(--w-border)', borderBottom: '1px solid var(--w-border)', padding: '48px 40px' }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 32 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', padding: 12, background: 'var(--w-icon-bg)', color: '#f59e0b', borderRadius: 14, marginBottom: 12 }}>{s.icon}</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: 'var(--w-text-primary)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--w-text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </motion.section>


      {/* ABOUT */}
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: '96px 40px', background: 'var(--w-bg-base)' }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 64, alignItems: 'center', flexWrap: 'wrap' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ flex: '1 1 380px' }}
          >
            <div style={{ background: 'var(--w-card-bg)', border: '1px solid var(--w-border)', borderRadius: 24, padding: 40, boxShadow: '0 25px 60px rgba(0,0,0,0.12)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 20, right: 20, width: 80, height: 80, background: 'rgba(196,168,76,0.08)', borderRadius: '50%', filter: 'blur(20px)' }} />
              <div className="float" style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                <img src="/logo.jpeg" alt="Galkuz RentalHub Global Enterprise" style={{ width: 96, height: 96, borderRadius: 24, objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[['Founded', '2019'], ['Headquarters', 'Kaduna State'], ['RC Number', '7121543'], ['Branches', '3 Offices']].map(([l, v]) => (
                  <div key={l} style={{ background: 'var(--w-bg-card)', border: '1px solid var(--w-border)', borderRadius: 14, padding: '14px 16px' }}>
                    <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: 'var(--w-text-muted)', marginBottom: 4 }}>{l}</div>
                    <div style={{ fontWeight: 800, color: 'var(--w-text-primary)', fontSize: 14 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ flex: '1 1 420px' }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--w-badge-bg)', border: '1px solid var(--w-badge-border)', color: '#fbbf24', fontSize: 11, fontWeight: 700, padding: '6px 14px', borderRadius: 99, marginBottom: 20, textTransform: 'uppercase', letterSpacing: 2 }}>
              <Award size={14} /> About Galkuz RentalHub Global Enterprise
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 900, color: 'var(--w-text-primary)', lineHeight: 1.1, marginBottom: 24 }}>
              Building Financial <br /><span className="grad">Futures for Riders</span>
            </h2>
            <p style={{ color: 'var(--w-text-secondary)', fontSize: 17, lineHeight: 1.8, marginBottom: 20 }}>
              Galkuz RentalHub Global Enterprise Operations & Management System was established to bridge the financial gap for motorcycle riders in Kaduna State. We provide structured rental asset management and ownership solutions that empower riders to operate vehicles and grow their livelihoods.
            </p>
            <p style={{ color: 'var(--w-text-muted)', lineHeight: 1.8, marginBottom: 28 }}>
              With a robust digital management platform, we track every client, disbursement, return, and branch operation in real-time — ensuring transparency, accountability and growth for all stakeholders.
            </p>
            <ul style={{ listStyle: 'none', margin: '0 0 28px 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['100% transparent operations', 'Flexible contract terms tailored to riders', 'Multi-branch nationwide coverage', 'Dedicated client support teams'].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--w-text-primary)', fontWeight: 500 }}>
                  <CheckCircle size={18} style={{ color: '#34d399', flexShrink: 0 }} /> {item}
                </li>
              ))}
            </ul>
            <Link href="/history" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#f59e0b', fontWeight: 800, fontSize: 14, padding: '12px 24px', borderRadius: 14, textDecoration: 'none', transition: 'all 0.2s' }}>
              Read Our Full History <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* SERVICES */}
      <motion.section
        id="services"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: '96px 40px', background: '#020617' }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fbbf24', fontSize: 11, fontWeight: 700, padding: '6px 16px', borderRadius: 99, marginBottom: 16, textTransform: 'uppercase', letterSpacing: 2 }}>
              Our Services / What We Offer
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, color: '#ffffff', marginBottom: 14 }}>Driving Transportation, <span className="grad">Creating Ownership</span>, Building Opportunities</h2>
            <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 840, margin: '0 auto', lineHeight: 1.7 }}>
              At <strong>GALKUZ RENTALHUB GLOBAL ENTERPRISE</strong>, we are committed to transforming transportation from a daily means of mobility into a structured and sustainable business opportunity. Our company provides professional transportation management, vehicle acquisition, asset sales, investment opportunities, and shared-ownership solutions designed to make participation in the transportation sector easier, more accessible, and more profitable.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            {SERVICES.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="service-card"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '28px', transition: 'all 0.3s', cursor: 'default' }}
                onMouseEnter={e => { (e.currentTarget as any).style.border = '1px solid rgba(196,168,76,0.4)'; (e.currentTarget as any).style.transform = 'translateY(-4px)'; (e.currentTarget as any).style.boxShadow = '0 20px 50px rgba(0,0,0,0.3)'; }}
                onMouseLeave={e => { (e.currentTarget as any).style.border = '1px solid rgba(255,255,255,0.08)'; (e.currentTarget as any).style.transform = 'translateY(0)'; (e.currentTarget as any).style.boxShadow = 'none'; }}
              >
                <div style={{ display: 'inline-flex', padding: '6px 14px', background: 'rgba(196,168,76,0.15)', color: '#f59e0b', borderRadius: 12, fontWeight: 900, fontSize: 13, marginBottom: 18, border: '1px solid rgba(196,168,76,0.3)' }}>{s.num}</div>
                <h3 style={{ fontWeight: 800, color: '#ffffff', fontSize: 18, marginBottom: 12, lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SUCCESS STORIES */}
      <motion.section
        id="success-stories"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: '96px 40px', background: 'var(--w-bg-base)' }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--w-badge-bg)', border: '1px solid var(--w-badge-border)', color: '#fbbf24', fontSize: 11, fontWeight: 700, padding: '6px 16px', borderRadius: 99, marginBottom: 16, textTransform: 'uppercase', letterSpacing: 2 }}>
              <Star size={12} /> Testimonials
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, color: 'var(--w-text-primary)', marginBottom: 14 }}>Success <span className="grad">Stories</span></h2>
            <p style={{ color: 'var(--w-text-muted)', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>Real stories from riders and partners whose lives have been transformed through our programs.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {STORIES.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                style={{ background: 'var(--w-card-bg)', border: '1px solid var(--w-border)', borderRadius: 20, padding: 28, transition: 'all 0.3s' }}
                onMouseEnter={e => { (e.currentTarget as any).style.border = '1px solid var(--w-border-hover)'; (e.currentTarget as any).style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { (e.currentTarget as any).style.border = '1px solid var(--w-border)'; (e.currentTarget as any).style.transform = 'translateY(0)'; }}
              >
                <div style={{ display: 'flex', gap: 4, marginBottom: 18 }}>
                  {Array.from({ length: s.stars }).map((_, si) => <Star key={si} size={16} style={{ fill: '#f59e0b', color: '#f59e0b' }} />)}
                </div>
                <p style={{ color: 'var(--w-text-secondary)', fontSize: 15, lineHeight: 1.8, marginBottom: 24, fontStyle: 'italic' }}>"{s.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid var(--w-border)', paddingTop: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(196,168,76,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#f59e0b', fontSize: 18 }}>{s.name.charAt(0)}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--w-text-primary)', fontSize: 14 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--w-text-muted)' }}>{s.role} · {s.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* BLOG / NEWS SECTION */}
      <motion.section
        id="blog"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: '96px 40px', background: '#020617' }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fbbf24', fontSize: 11, fontWeight: 700, padding: '6px 16px', borderRadius: 99, marginBottom: 16, textTransform: 'uppercase', letterSpacing: 2 }}>
              Latest Updates & Insights
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, color: '#ffffff', marginBottom: 14 }}>
              Company <span className="grad">News & Blog</span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: 17, maxWidth: 540, margin: '0 auto' }}>
              Stay updated with our latest news, transportation investment insights, and company announcements.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {(blogPosts.length > 0 ? blogPosts : BLOG_POSTS).map((post: any, i: number) => (
              <motion.div
                key={post.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.3s', cursor: 'pointer' }}
                onMouseEnter={e => { (e.currentTarget as any).style.border = '1px solid rgba(196,168,76,0.4)'; (e.currentTarget as any).style.transform = 'translateY(-6px)'; (e.currentTarget as any).style.boxShadow = '0 20px 50px rgba(0,0,0,0.4)'; }}
                onMouseLeave={e => { (e.currentTarget as any).style.border = '1px solid rgba(255,255,255,0.08)'; (e.currentTarget as any).style.transform = 'translateY(0)'; (e.currentTarget as any).style.boxShadow = 'none'; }}
              >
                {/* Cover Image */}
                <div style={{ height: 200, overflow: 'hidden', position: 'relative', background: 'linear-gradient(135deg, #0d1f3c, #1e3a5f)' }}>
                  <img src={post.image_url} alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  {/* Category badge overlay */}
                  <div style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(10,22,40,0.85)', border: '1px solid rgba(196,168,76,0.4)', color: '#f5d07a', fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 99, textTransform: 'uppercase' as const, letterSpacing: 1.5, backdropFilter: 'blur(8px)' }}>
                    {post.category || 'News'}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '22px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ fontSize: 11, color: '#64748b', marginBottom: 10, fontWeight: 600 }}>
                    {post.date || 'Recent'} · {post.author || 'Galkuz RentalHub'}
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: '#ffffff', marginBottom: 12, lineHeight: 1.4, flex: 1 }}>
                    {post.title}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: 13.5, lineHeight: 1.65, marginBottom: 20, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {post.summary}
                  </p>
                  <Link href={`/blog/${post.slug || post.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#f5d07a', fontWeight: 800, fontSize: 13, textDecoration: 'none' }}>
                    Read Full Article <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* TEAM */}
      <motion.section
        id="team"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: '96px 40px', background: 'var(--w-bg-section1)' }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--w-badge-bg)', border: '1px solid var(--w-badge-border)', color: '#fbbf24', fontSize: 11, fontWeight: 700, padding: '6px 16px', borderRadius: 99, marginBottom: 16, textTransform: 'uppercase', letterSpacing: 2 }}>
              <Users size={12} /> Our People
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, color: 'var(--w-text-primary)', marginBottom: 14 }}>Meet the <span className="grad">Team</span></h2>
            <p style={{ color: 'var(--w-text-muted)', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>Dedicated professionals committed to empowering communities through accessible motorcycle finance.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {TEAM.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                style={{ background: 'var(--w-bg-card)', border: '1px solid var(--w-border)', borderRadius: 24, padding: '32px 24px 28px', textAlign: 'center', transition: 'all 0.3s', position: 'relative', overflow: 'hidden' }}
                onMouseEnter={e => { (e.currentTarget as any).style.border = '1px solid rgba(196,168,76,0.5)'; (e.currentTarget as any).style.transform = 'translateY(-8px)'; (e.currentTarget as any).style.boxShadow = '0 24px 60px rgba(0,0,0,0.18)'; }}
                onMouseLeave={e => { (e.currentTarget as any).style.border = '1px solid var(--w-border)'; (e.currentTarget as any).style.transform = 'translateY(0)'; (e.currentTarget as any).style.boxShadow = 'none'; }}
              >
                {/* Gold top bar on hover via CSS trick */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #c9a84c, #f5d07a, #c9a84c)', opacity: 0 }} className="team-gold-bar" />
                {/* Avatar */}
                <div style={{ width: 100, height: 100, margin: '0 auto 18px', borderRadius: '50%', overflow: 'hidden', border: '3px solid rgba(196,168,76,0.4)', boxShadow: '0 8px 24px rgba(196,168,76,0.15)', background: 'linear-gradient(135deg, #1a3a7c, #0a1628)' }}>
                  <img src={m.image} alt={m.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.innerHTML = `<div style="width:100%;height:100%;background:linear-gradient(135deg,#1a3a7c,#c9a84c);display:flex;align-items:center;justify-content:center;font-size:36px">${m.emoji}</div>`;
                    }}
                  />
                </div>
                {/* Info */}
                <div style={{ fontWeight: 800, color: 'var(--w-text-primary)', fontSize: 16, marginBottom: 4 }}>{m.name}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#c9a84c', textTransform: 'uppercase' as const, letterSpacing: 2, marginBottom: 14 }}>{m.role}</div>
                <div style={{ width: 36, height: 2, background: 'linear-gradient(90deg, #c9a84c, #f5d07a)', borderRadius: 2, margin: '0 auto 14px' }} />
                <p style={{ color: 'var(--w-text-muted)', fontSize: 13, lineHeight: 1.75 }}>{m.desc}</p>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/ceo-achievements" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#f59e0b', fontWeight: 800, fontSize: 14, padding: '14px 28px', borderRadius: 14, textDecoration: 'none', transition: 'all 0.2s' }}>
              View Achievements of the CEO <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* YEARS OF WORK MILESTONE BANNER */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: '80px 40px', background: 'linear-gradient(135deg, #d97706, #f59e0b, #d97706)', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.12) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 'clamp(70px, 12vw, 130px)', fontWeight: 900, color: 'rgba(0,0,0,0.1)', lineHeight: 1, marginBottom: -24, letterSpacing: -4 }}>5+ YEARS</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#1a0a00', position: 'relative', marginBottom: 16 }}>Of Trust & Excellence</h2>
          <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: 17, maxWidth: 560, margin: '0 auto 40px' }}>Since 2019, Galkuz RentalHub Global Enterprise has been transforming lives across Kaduna State through responsible motorcycle financing and unwavering commitment.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
            {['2019 — Founded in Kaduna', '2021 — Expanded to 3 Branches', '2023 — 500+ Active Clients', '2025 — ₦50M+ Disbursed'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,0.12)', border: '1px solid rgba(0,0,0,0.15)', color: '#1a0a00', fontWeight: 700, fontSize: 13, padding: '10px 20px', borderRadius: 12 }}>
                <CheckCircle size={16} /> {item}
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CONTACT */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: '96px 40px', background: 'var(--w-bg-section2)' }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'inline-flex', gap: 8, background: 'var(--w-badge-bg)', border: '1px solid var(--w-badge-border)', color: '#fbbf24', fontSize: 11, fontWeight: 700, padding: '6px 16px', borderRadius: 99, marginBottom: 16, textTransform: 'uppercase', letterSpacing: 2 }}>
              Get In Touch
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, color: 'var(--w-text-primary)', marginBottom: 14 }}>Contact <span className="grad">Us</span></h2>
            <p style={{ color: 'var(--w-text-muted)', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>Ready to get started? Reach out to our team and we'll guide you through our programs.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48, alignItems: 'start' }}>
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 style={{ fontWeight: 800, color: 'var(--w-text-primary)', fontSize: 22, marginBottom: 28 }}>We're here to help</h3>
              {[{ icon: <Phone size={18} />, label: 'Phone', val: '07066204483', sub: 'Mon–Fri, 8am to 5pm' }, { icon: <Mail size={18} />, label: 'Email', val: 'info@brahamsama.com', sub: 'We reply within 24 hours' }, { icon: <MapPin size={18} />, label: 'Address', val: 'H3 Mashi Road Badarawa Kaduna', sub: 'Head Office & Branch Offices' }].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, background: 'var(--w-bg-card)', border: '1px solid var(--w-border)', borderRadius: 16, padding: 18, marginBottom: 14 }}>
                  <div style={{ padding: 10, background: 'var(--w-icon-bg)', color: '#f59e0b', borderRadius: 12, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--w-text-muted)', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontWeight: 700, color: 'var(--w-text-primary)', fontSize: 14 }}>{item.val}</div>
                    <div style={{ fontSize: 12, color: 'var(--w-text-muted)', marginTop: 2 }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ background: 'var(--w-bg-card)', border: '1px solid var(--w-border)', borderRadius: 20, padding: 32 }}
            >
              <h3 style={{ fontWeight: 800, color: 'var(--w-text-primary)', fontSize: 20, marginBottom: 24 }}>Send us a message</h3>
              <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--w-text-muted)', marginBottom: 8 }}>Full Name</label>
                    <input type="text" required placeholder="Full Name" value={contactName} onChange={e => setContactName(e.target.value)} style={{ width: '100%', background: 'var(--w-bg-input)', border: '1px solid var(--w-border)', color: 'var(--w-text-primary)', fontSize: 14, padding: '12px 14px', borderRadius: 12, outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--w-text-muted)', marginBottom: 8 }}>Phone Number</label>
                    <input type="text" placeholder="Phone Number" value={contactPhone} onChange={e => setContactPhone(e.target.value)} style={{ width: '100%', background: 'var(--w-bg-input)', border: '1px solid var(--w-border)', color: 'var(--w-text-primary)', fontSize: 14, padding: '12px 14px', borderRadius: 12, outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box' }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--w-text-muted)', marginBottom: 8 }}>Email Address</label>
                  <input type="email" placeholder="your@email.com" value={contactEmail} onChange={e => setContactEmail(e.target.value)} style={{ width: '100%', background: 'var(--w-bg-input)', border: '1px solid var(--w-border)', color: 'var(--w-text-primary)', fontSize: 14, padding: '12px 14px', borderRadius: 12, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--w-text-muted)', marginBottom: 8 }}>Message</label>
                  <textarea rows={4} required placeholder="How can we help you?" value={contactMessage} onChange={e => setContactMessage(e.target.value)} style={{ width: '100%', background: 'var(--w-bg-input)', border: '1px solid var(--w-border)', color: 'var(--w-text-primary)', fontSize: 14, padding: '12px 14px', borderRadius: 12, outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                </div>

                {submitStatus.type && (
                  <div style={{ padding: '10px 14px', borderRadius: 10, fontSize: 13, background: submitStatus.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: submitStatus.type === 'success' ? '#10b981' : '#ef4444', border: `1px solid ${submitStatus.type === 'success' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}` }}>
                    {submitStatus.text}
                  </div>
                )}

                <button type="submit" disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#f59e0b', color: '#1a0a00', fontWeight: 800, fontSize: 15, padding: '14px', borderRadius: 12, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'all 0.2s' }}>
                  {loading ? 'Sending...' : 'Send Message'} <ArrowRight size={17} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--w-footer-bg)', borderTop: '1px solid var(--w-border)', padding: '40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(196,168,76,0.4)' }}>
              <img src="/logo.jpeg" alt="BS" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as any).parentElement.innerHTML = '<div style="width:100%;height:100%;background:#1a2332;display:flex;align-items:center;justify-content:center;font-weight:900;color:#c9a84c;font-size:12px">BS</div>'; }} />
            </div>
            <div>
              <div style={{ fontWeight: 900, color: '#f59e0b', fontSize: 14 }}>Galkuz RentalHub Global Enterprise</div>
              <div style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, color: '#94a3b8' }}>Operations & Management</div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center' }}>
            RC No. 7121543 · H3 Mashi Road Badarawa Kaduna · © {new Date().getFullYear()} Galkuz RentalHub Global Enterprise. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <button key={i} style={{ padding: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8', borderRadius: 10, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center' }} onMouseEnter={e => { (e.currentTarget as any).style.color = '#f59e0b'; (e.currentTarget as any).style.borderColor = 'rgba(196,168,76,0.4)'; }} onMouseLeave={e => { (e.currentTarget as any).style.color = '#94a3b8'; (e.currentTarget as any).style.borderColor = 'rgba(255,255,255,0.08)'; }}>
                <Icon size={16} />
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => scrollTo(l.toLowerCase().replace(/\s+/g, '-'))} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: 12, fontWeight: 500, cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = '#f59e0b')} onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
