'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Bike,
  ClipboardList,
  Briefcase,
  ShieldAlert,
  Sun,
  Moon,
  Zap,
  Calendar,
  LogOut,
  Menu,
  X,
  User,
  UserCog,
  Building2,
  Wallet,
  MessageSquare,
  Newspaper,
  Search,
  ChevronRight,
  FileText
} from 'lucide-react';
import ModalPortal from '@/components/ModalPortal';
import './globals.css';

function PremiumLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl transition-all duration-300">
      <div className="relative flex items-center justify-center">
        {/* Outer Rotating Gradient Ring */}
        <div className="absolute w-24 h-24 rounded-full border-4 border-transparent border-t-violet-600 border-r-cyan-500 animate-spin" />

        {/* Inner Pulsing Pulse Ring */}
        <div className="absolute w-28 h-28 rounded-full bg-violet-500/10 dark:bg-violet-500/5 animate-ping duration-1000" />

        {/* Logo container */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900 flex items-center justify-center animate-pulse">
          <img src="/logo.jpeg" alt="Galkuz RentalHub Global Enterprise" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Status indicator */}
      <div className="mt-8 flex flex-col items-center gap-1">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-200">Galkuz RentalHub</span>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [pageLoading, setPageLoading] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Global Sidebar Search State
  const [sidebarSearchQuery, setSidebarSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ vehicles: any[]; riders: any[]; clients: any[] } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState<{ type: 'vehicle' | 'rider' | 'client'; data: any } | null>(null);

  useEffect(() => {
    if (!sidebarSearchQuery.trim()) {
      setSearchResults(null);
      setIsSearching(false);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/raiders/search-all?query=${encodeURIComponent(sidebarSearchQuery)}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data);
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsSearching(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [sidebarSearchQuery]);

  // Load theme and auth from localStorage
  useEffect(() => {
    // Theme Setup
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const defaultTheme = savedTheme || 'light';
    setTheme(defaultTheme);
    if (defaultTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Auth Guard Setup
    const authStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(authStatus);

    let parsedUser = null;
    if (authStatus) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      }
    }

    if (!authStatus && pathname !== '/login' && pathname !== '/client-login' && pathname !== '/' && pathname !== '/welcome' && pathname !== '/history' && pathname !== '/ceo-achievements' && !pathname.startsWith('/blog')) {
      router.push('/');
    } else if (authStatus && parsedUser?.role === 'Manager') {
      const restrictedRoutes = ['/clients', '/md-leaders', '/staff', '/compliance', '/accounts', '/raiders', '/branches', '/my-vehicles', '/assets'];
      if (restrictedRoutes.some(route => pathname.startsWith(route))) {
        router.push('/');
      }
    } else if (authStatus && parsedUser?.role === 'Client') {
      const restrictedRoutes = ['/clients', '/md-leaders', '/staff', '/compliance', '/accounts', '/raiders', '/branches', '/my-riders'];
      if (restrictedRoutes.some(route => pathname.startsWith(route))) {
        router.push('/');
      }
    } else if (authStatus && parsedUser?.role === 'Accountant') {
      const restrictedRoutes = ['/clients', '/md-leaders', '/staff', '/compliance', '/raiders', '/branches'];
      if (restrictedRoutes.some(route => pathname.startsWith(route))) {
        router.push('/');
      }
    } else if (authStatus && parsedUser?.role === 'Staff') {
      const restrictedRoutes = ['/accounts', '/staff', '/branches'];
      if (restrictedRoutes.some(route => pathname.startsWith(route))) {
        router.push('/');
      }
    }
  }, [pathname]);

  // Auto-close sidebar on page navigation (mobile view)
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Page Transition Loader
  useEffect(() => {
    setPageLoading(true);
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 450); // Keep it brief and snappy
    return () => clearTimeout(timer);
  }, [pathname]);

  // Keep track of search params to highlight active subItem
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentQuery(window.location.search);
    }
  }, [pathname]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    const wasClient = currentUser?.role === 'Client';
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setCurrentUser(null);
    setShowLogoutConfirm(false);
    if (wasClient) {
      router.push('/client-login');
    } else {
      router.push('/login');
    }
  };

  interface SubItem {
    name: string;
    path: string;
  }

  interface NavItem {
    name: string;
    path: string;
    icon: React.ReactNode;
    subItems?: SubItem[];
  }

  const isClient = currentUser?.role === 'Client';
  const isManager = currentUser?.role === 'Manager';
  const isAccountant = currentUser?.role === 'Accountant';

  const navItems: NavItem[] = isManager ? [
    {
      name: 'Dashboard',
      path: '/',
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      name: 'My Squad Riders',
      path: '/my-riders',
      icon: <Users className="w-5 h-5" />
    },
    {
      name: 'Profile & Settings',
      path: '/profile',
      icon: <User className="w-5 h-5" />
    }
  ] : isClient ? [
    {
      name: 'Dashboard',
      path: '/',
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      name: 'My Vehicles',
      path: '/my-vehicles',
      icon: <Bike className="w-5 h-5" />
    },
    {
      name: 'Assets & Financial',
      path: '/assets',
      icon: <Wallet className="w-5 h-5" />
    },
    {
      name: 'Profile & Settings',
      path: '/profile',
      icon: <User className="w-5 h-5" />
    }
  ] : isAccountant ? [
    {
      name: 'Dashboard',
      path: '/',
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      name: 'Accounts Office',
      path: '/accounts',
      icon: <Briefcase className="w-5 h-5" />,
      subItems: [
        { name: 'Log Payment / Return', path: '/accounts?tab=returns' },
        { name: 'Log Expense', path: '/accounts?tab=expenses' },
        { name: 'Generate Financial Report', path: '/accounts?tab=reports' }
      ]
    },
    {
      name: 'Profile & Settings',
      path: '/profile',
      icon: <User className="w-5 h-5" />
    }
  ] : [
    {
      name: 'Dashboard',
      path: '/',
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      name: 'Clients Admin',
      path: '/clients',
      icon: <Users className="w-5 h-5" />,
      subItems: [
        { name: 'All Clients', path: '/clients' },
        { name: 'Vehicles Breakdown', path: '/my-vehicles' },
        { name: 'Register New Client', path: '/clients?action=add' }
      ]
    },
    {
      name: 'Raiders Manager',
      path: '/raiders',
      icon: <Bike className="w-5 h-5" />,
      subItems: [
        { name: 'Deploy New Raider', path: '/raiders?action=add' }
      ]
    },
    {
      name: 'Managers',
      path: '/md-leaders',
      icon: <ClipboardList className="w-5 h-5" />,
      subItems: [
        { name: 'Add Manager', path: '/md-leaders?action=add' }
      ]
    },
    ...(currentUser?.role === 'Admin' ? [
      {
        name: 'Accounts Office',
        path: '/accounts',
        icon: <Briefcase className="w-5 h-5" />,
        subItems: [
          { name: 'Log Payment / Return', path: '/accounts?tab=returns' },
          { name: 'Log Expense', path: '/accounts?tab=expenses' },
          { name: 'Generate Financial Report', path: '/accounts?tab=reports' }
        ]
      }
    ] : []),
    {
      name: 'Compliance Logs',
      path: '/compliance',
      icon: <ShieldAlert className="w-5 h-5" />,
      subItems: [
        { name: 'Log Query / Action', path: '/compliance?action=add' }
      ]
    },
    ...(currentUser?.role === 'Admin' ? [
      {
        name: 'Staff Manager',
        path: '/staff',
        icon: <UserCog className="w-5 h-5" />
      },
      {
        name: 'Branches',
        path: '/branches',
        icon: <Building2 className="w-5 h-5" />
      },
      {
        name: 'Messages',
        path: '/messages',
        icon: <MessageSquare className="w-5 h-5" />
      },
      {
        name: 'Blog News',
        path: '/admin/blog',
        icon: <Newspaper className="w-5 h-5" />
      }
    ] : []),
    {
      name: 'Profile & Settings',
      path: '/profile',
      icon: <User className="w-5 h-5" />
    }
  ];

  // Bypass Sidebar and Headers for Login / Landing views
  if (pathname === '/login' || pathname === '/client-login' || pathname === '/welcome' || pathname === '/history' || pathname === '/ceo-achievements' || pathname.startsWith('/blog') || (pathname === '/' && !isLoggedIn)) {
    return (
      <html lang="en">
        <head>
          <title>{pathname === '/client-login' ? 'Galkuz RentalHub Global Enterprise - Client Portal' : 'Galkuz RentalHub Global Enterprise - Operations & Management System'}</title>
          <meta name="description" content="Company Operations and Fleet Management Dashboard" />
          <link rel="icon" href="/logo.jpeg" />
        </head>
        <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-955 dark:text-slate-100 flex font-sans transition-colors duration-300">
          <main className="flex-1 w-full">
            {children}
          </main>
        </body>
      </html>
    );
  }

  // Prevent flash layout before redirect triggers
  if (isLoggedIn === null) {
    return (
      <html lang="en">
        <head>
          <title>Galkuz RentalHub Global Enterprise - Loading...</title>
          <link rel="icon" href="/logo.jpeg" />
        </head>
        <body className="min-h-screen bg-slate-50 dark:bg-slate-955 flex items-center justify-center">
          <PremiumLoader />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <title>Galkuz RentalHub Global Enterprise - Operations & Management System</title>
        <meta name="description" content="Company Operations and Fleet Management Dashboard" />
        <link rel="icon" href="/logo.jpeg" />
      </head>
      <body className="h-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-300 relative">
        {pageLoading && <PremiumLoader />}
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-955/80 backdrop-blur-sm z-[99999] flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-sm rounded-2xl shadow-2xl p-6 text-center space-y-4 transition-all">
              <div className="mx-auto w-12 h-12 bg-rose-500/10 dark:bg-rose-500/5 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center">
                <LogOut className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Sign Out Command Center?</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">You will need to verify your credentials to log back into the operations system.</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 font-semibold py-2.5 rounded-xl text-xs transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmLogout}
                  className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-semibold py-2.5 rounded-xl text-xs transition-all shadow-md shadow-rose-500/10"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex w-full h-full relative">

          {/* Mobile Backdrop Overlay */}
          {isMobileOpen && (
            <div
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
            />
          )}

          {/* Sidebar */}
          <aside className={`bg-white/80 border-slate-200 dark:bg-slate-900/60 dark:border-slate-800/80 backdrop-blur-xl border-r p-6 flex flex-col h-screen transition-colors duration-300 fixed inset-y-0 left-0 transform md:translate-x-0 md:sticky transition-transform duration-300 ease-in-out w-72 md:w-72 ${isMobileOpen ? 'translate-x-0 z-50 shadow-2xl' : '-translate-x-full'
            }`}>
            <div className="mb-6 flex justify-between items-center">
              <div>
                <div className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-violet-400 bg-clip-text text-transparent flex items-center gap-2.5">
                  <img src="/logo.jpeg" alt="Galkuz RentalHub Logo" className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-800/80 shadow-sm" />
                  <span>Galkuz RentalHub</span>
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-1">Company Operations</div>
              </div>

              {/* Sidebar Mobile Close Toggle */}
              <button
                onClick={() => setIsMobileOpen(false)}
                className="md:hidden p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sidebar Global Search Field */}
            <div className="mb-4 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search Vehicle, Rider, Client..."
                value={sidebarSearchQuery}
                onChange={(e) => setSidebarSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-8 py-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              />
              {sidebarSearchQuery && (
                <button
                  onClick={() => { setSidebarSearchQuery(''); setSearchResults(null); }}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Live Search Dropdown */}
              {sidebarSearchQuery.trim() && (
                <div className="absolute top-11 left-0 right-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl max-h-80 overflow-y-auto z-50 p-2 space-y-3 text-xs">
                  {isSearching ? (
                    <div className="p-3 text-center text-slate-400 animate-pulse">Searching assets...</div>
                  ) : searchResults && (searchResults.vehicles.length > 0 || searchResults.riders.length > 0 || searchResults.clients.length > 0) ? (
                    <>
                      {searchResults.vehicles.length > 0 && (
                        <div>
                          <div className="px-2 py-1 font-bold text-[10px] text-violet-500 uppercase tracking-wider">Vehicles ({searchResults.vehicles.length})</div>
                          {searchResults.vehicles.map((v) => (
                            <button
                              key={`v-${v.id}`}
                              onClick={() => {
                                setSelectedResult({ type: 'vehicle', data: v });
                                setShowSearchModal(true);
                              }}
                              className="w-full text-left p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex flex-col gap-0.5"
                            >
                              <div className="font-bold text-slate-800 dark:text-white truncate">{v.vehicle_type_chassis || 'Vehicle'}</div>
                              <div className="text-[10px] text-slate-400">Chassis: {v.chassis_no || 'N/A'} &bull; File: {v.file_no || 'N/A'}</div>
                              <div className="text-[10px] text-emerald-500 font-semibold">Owner: {v.client_name || 'Unassigned'} | Rider: {v.raider_name || 'Unassigned'}</div>
                            </button>
                          ))}
                        </div>
                      )}

                      {searchResults.riders.length > 0 && (
                        <div>
                          <div className="px-2 py-1 font-bold text-[10px] text-cyan-500 uppercase tracking-wider">Riders ({searchResults.riders.length})</div>
                          {searchResults.riders.map((r) => (
                            <button
                              key={`r-${r.id}`}
                              onClick={() => {
                                setSelectedResult({ type: 'rider', data: r });
                                setShowSearchModal(true);
                              }}
                              className="w-full text-left p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex flex-col gap-0.5"
                            >
                              <div className="font-bold text-slate-800 dark:text-white truncate">{r.name}</div>
                              <div className="text-[10px] text-slate-400">Plate: {r.plate_no || 'N/A'} &bull; Tempo: {r.tempo_reg_no || 'N/A'}</div>
                            </button>
                          ))}
                        </div>
                      )}

                      {searchResults.clients.length > 0 && (
                        <div>
                          <div className="px-2 py-1 font-bold text-[10px] text-indigo-500 uppercase tracking-wider">Clients ({searchResults.clients.length})</div>
                          {searchResults.clients.map((c) => (
                            <button
                              key={`c-${c.id}`}
                              onClick={() => {
                                setSelectedResult({ type: 'client', data: c });
                                setShowSearchModal(true);
                              }}
                              className="w-full text-left p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex flex-col gap-0.5"
                            >
                              <div className="font-bold text-slate-800 dark:text-white truncate">{c.name}</div>
                              <div className="text-[10px] text-slate-400">Phone: {c.phone || 'N/A'}</div>
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="p-3 text-center text-slate-400">No matching records found.</div>
                  )}
                </div>
              )}
            </div>

            <nav className="flex flex-col gap-2 flex-grow overflow-y-auto pr-1">
              {navItems.map((item) => {
                const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path + '/'));
                const showSubItems = isActive || (item.subItems && item.subItems.some(sub => pathname === sub.path.split('?')[0]));
                return (
                  <div key={item.path} className="flex flex-col gap-1">
                    <Link
                      href={item.path}
                      className={`flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 border ${isActive
                        ? 'bg-violet-600/10 dark:bg-violet-600/20 border-violet-500/40 text-violet-600 dark:text-white shadow-lg'
                        : 'border-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-100 hover:border-slate-200 dark:hover:bg-slate-800/50 dark:hover:border-slate-800 hover:text-slate-900 dark:hover:text-white'
                        }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>

                    {item.subItems && showSubItems && (
                      <div className="pl-6 pr-2 py-1 flex flex-col gap-1.5 border-l-2 border-violet-500/30 dark:border-slate-800 ml-6 mt-0.5 mb-2">
                        {item.subItems.map((sub) => {
                          const isSubActive = (pathname === sub.path.split('?')[0] &&
                            (sub.path.includes('?')
                              ? currentQuery.includes(sub.path.split('?')[1])
                              : true)) || (sub.path === '/clients?action=add' && pathname === '/clients/new');
                          return (
                            <Link
                              key={sub.path}
                              href={sub.path}
                              onClick={() => {
                                setTimeout(() => {
                                  if (typeof window !== 'undefined') {
                                    setCurrentQuery(window.location.search);
                                  }
                                }, 50);
                              }}
                              className={`text-xs py-1 px-2 rounded-lg transition-all ${isSubActive
                                ? 'text-violet-600 dark:text-white font-semibold bg-violet-600/5 dark:bg-violet-600/10'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/30 font-medium'
                                }`}
                            >
                              {sub.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-800/80 text-xs text-slate-400 dark:text-slate-500 space-y-4">
              {currentUser && (
                <div className="flex items-center gap-2.5 p-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800/80 rounded-xl mb-3 text-left">
                  <div className="w-8 h-8 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center font-bold text-xs text-violet-500 shrink-0">
                    {currentUser.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
                  </div>
                  <div className="overflow-hidden">
                    <div className="font-bold text-slate-700 dark:text-slate-200 truncate leading-none text-xs">{currentUser.name}</div>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-1 inline-block">{currentUser.role} Account</span>
                  </div>
                </div>
              )}

              {/* Theme Switcher Button */}
              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-xs border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-850 transition-all active:scale-[0.98]"
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-500 animate-pulse" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-violet-500" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-xs border border-transparent text-rose-500 hover:bg-rose-500/10 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out System</span>
              </button>

              <div>
                <div className="font-semibold text-slate-600 dark:text-slate-400">RC No: 7121543</div>
                <div className="mt-1">CEO: Galkuz RentalHub Global Enterprise</div>
              </div>
            </div>
          </aside>

          {/* Main Workspace Wrapper */}
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Header stays completely static at the top and will never shake or lag */}
            <header className="pt-6 pb-4 px-4 md:px-8 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/80 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 shrink-0">
              <div className="flex items-start gap-2">
                {/* Mobile Menu Hamburger Toggle */}
                <button
                  onClick={() => setIsMobileOpen(true)}
                  className="md:hidden p-1 bg-transparent text-slate-700 dark:text-slate-200 transition-all active:scale-95 hover:text-slate-900 dark:hover:text-white"
                >
                  <Menu className="w-6 h-6" />
                </button>

                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Galkuz RentalHub Global Enterprise Operations System</h1>
                  <div className="md:hidden text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <span>{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
                <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 shadow-sm transition-colors flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span>{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            </header>

            {/* Scrollable main panel container */}
            <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-full">
              {children}
            </main>
          </div>
        </div>

        {/* Global Vehicle & Search Detail Modal */}
        {showSearchModal && selectedResult && (
          <ModalPortal>
            <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-955/80 backdrop-blur-sm z-[99999] flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto relative animate-fadeIn">
                <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Bike className="w-5 h-5 text-violet-500" />
                      <span>Search Result Details</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Complete vehicle, rider, squad manager, and client records</p>
                  </div>
                  <button
                    onClick={() => setShowSearchModal(false)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {selectedResult.type === 'vehicle' && (
                  <div className="space-y-6">
                    {/* Vehicle Primary Info */}
                    <div className="bg-violet-500/10 border border-violet-500/20 p-4 rounded-xl space-y-2">
                      <div className="text-xs font-bold text-violet-600 uppercase tracking-wider">Vehicle Details</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <p><strong>Vehicle Name/Type:</strong> {selectedResult.data.vehicle_type_chassis || 'N/A'}</p>
                        <p><strong>Chassis Number:</strong> {selectedResult.data.chassis_no || 'N/A'}</p>
                        <p><strong>File Number:</strong> {selectedResult.data.file_no || 'N/A'}</p>
                        <p><strong>Daily Return:</strong> ₦{parseFloat(selectedResult.data.daily_return || 0).toLocaleString()}</p>
                        <p><strong>Disbursed Amount:</strong> ₦{parseFloat(selectedResult.data.total_disbursed_amount || 0).toLocaleString()}</p>
                        <p><strong>Utility Charges:</strong> ₦{parseFloat(selectedResult.data.utility_charges || 0).toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Associated Client */}
                    <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl space-y-2">
                      <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Client Owner Information</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <p><strong>Client Name:</strong> {selectedResult.data.client_name || 'Not Linked'}</p>
                        <p><strong>Phone:</strong> {selectedResult.data.client_phone || 'N/A'}</p>
                        <p><strong>Email:</strong> {selectedResult.data.client_email || 'N/A'}</p>
                      </div>
                    </div>

                    {/* Associated Rider & Manager */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-xl space-y-2">
                        <div className="text-xs font-bold text-cyan-600 uppercase tracking-wider">Assigned Rider</div>
                        <div className="text-xs space-y-1">
                          <p><strong>Rider Name:</strong> {selectedResult.data.raider_name || 'None Assigned'}</p>
                          <p><strong>Plate No:</strong> {selectedResult.data.raider_plate_no || 'N/A'}</p>
                          <p><strong>Tempo Reg No:</strong> {selectedResult.data.raider_tempo_no || 'N/A'}</p>
                          <p><strong>Phone:</strong> {selectedResult.data.raider_phone || 'N/A'}</p>
                        </div>
                      </div>

                      <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl space-y-2">
                        <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Squad Manager</div>
                        <div className="text-xs space-y-1">
                          <p><strong>Manager Name:</strong> {selectedResult.data.manager_name || 'None Assigned'}</p>
                          <p><strong>Manager Phone:</strong> {selectedResult.data.manager_phone || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedResult.type === 'rider' && (
                  <div className="space-y-4">
                    <div className="bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-xl space-y-2">
                      <div className="text-xs font-bold text-cyan-600 uppercase tracking-wider">Rider Profile</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <p><strong>Rider Name:</strong> {selectedResult.data.name}</p>
                        <p><strong>Plate No:</strong> {selectedResult.data.plate_no || 'N/A'}</p>
                        <p><strong>Tempo Reg No:</strong> {selectedResult.data.tempo_reg_no || 'N/A'}</p>
                        <p><strong>Phone:</strong> {selectedResult.data.phone || 'N/A'}</p>
                        <p><strong>Appointment Date:</strong> {selectedResult.data.date_of_appointment || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl">
                        <span className="font-bold text-slate-500 block mb-1">Assigned Vehicle</span>
                        <p className="font-bold text-slate-800 dark:text-white">{selectedResult.data.vehicle_type_chassis || 'N/A'}</p>
                        <p className="text-[10px] text-slate-400">Chassis: {selectedResult.data.motorcycle_chassis || 'N/A'}</p>
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl">
                        <span className="font-bold text-slate-500 block mb-1">Client Owner</span>
                        <p className="font-bold text-slate-800 dark:text-white">{selectedResult.data.client_name || 'N/A'}</p>
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl">
                        <span className="font-bold text-slate-500 block mb-1">Squad Manager</span>
                        <p className="font-bold text-slate-800 dark:text-white">{selectedResult.data.manager_name || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedResult.type === 'client' && (
                  <div className="space-y-4">
                    <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl space-y-2">
                      <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Client Profile</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <p><strong>Client Name:</strong> {selectedResult.data.name}</p>
                        <p><strong>Phone:</strong> {selectedResult.data.phone || 'N/A'}</p>
                        <p><strong>Branch:</strong> {selectedResult.data.branch_name || 'N/A'}</p>
                        <p><strong>File No:</strong> {selectedResult.data.file_no || 'N/A'}</p>
                        <p><strong>Address:</strong> {selectedResult.data.residential_address || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => setShowSearchModal(false)}
                    className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold px-5 py-2.5 rounded-xl transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </ModalPortal>
        )}
      </body>
    </html>
  );
}
