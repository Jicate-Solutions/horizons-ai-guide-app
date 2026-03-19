import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, Loader2, RefreshCw, UserCheck, Clock, Phone, Search, X, LogOut, Download, ChevronDown, ChevronRight, GraduationCap, MapPin, School, Briefcase, Calendar, User, Mail, Trash2, AlertTriangle, Filter, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

interface AppUser {
  id: string;
  email: string;
  phone: string;
  created_at: string;
  last_sign_in: string;
  provider: string;
  full_name: string;
  school_name: string;
  stream: string;
  district: string;
  pass_out_year: string;
  career_interest: string;
  source_table: string;
}

const ADMIN_PASS = 'vzk-admin-2026';

type TimeFilter = 'all' | 'today' | 'yesterday' | 'this_week' | 'last_week' | 'this_month' | 'last_month' | 'last_3_months' | 'this_year';

const SimpleAdmin = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [users, setUsers] = useState<AppUser[]>([]);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<AppUser | null>(null);
  const [filterStream, setFilterStream] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Time filter logic
  const getTimeRange = (filter: TimeFilter): { start: Date; end: Date } | null => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dayOfWeek = today.getDay() || 7; // Mon=1, Sun=7

    switch (filter) {
      case 'today':
        return { start: today, end: now };
      case 'yesterday': {
        const yd = new Date(today); yd.setDate(yd.getDate() - 1);
        return { start: yd, end: today };
      }
      case 'this_week': {
        const mon = new Date(today); mon.setDate(mon.getDate() - (dayOfWeek - 1));
        return { start: mon, end: now };
      }
      case 'last_week': {
        const thisMonday = new Date(today); thisMonday.setDate(thisMonday.getDate() - (dayOfWeek - 1));
        const lastMonday = new Date(thisMonday); lastMonday.setDate(lastMonday.getDate() - 7);
        return { start: lastMonday, end: thisMonday };
      }
      case 'this_month': {
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        return { start: firstDay, end: now };
      }
      case 'last_month': {
        const firstThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const firstLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        return { start: firstLastMonth, end: firstThisMonth };
      }
      case 'last_3_months': {
        const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        return { start: threeMonthsAgo, end: now };
      }
      case 'this_year': {
        const jan1 = new Date(now.getFullYear(), 0, 1);
        return { start: jan1, end: now };
      }
      default: return null;
    }
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    setError('');
    try {
      const { data: reg12th } = await supabase.from('registrations_12th_learners')
        .select('id, full_name, email, phone, school_name, board, stream, preferred_course, preferred_institution, career_interests, created_at')
        .order('created_at', { ascending: false });

      const { data: regLearner } = await supabase.from('registrations_learners')
        .select('id, full_name, email, phone, institution, degree, created_at')
        .order('created_at', { ascending: false });

      const { data: regEmployer } = await supabase.from('registrations_employers')
        .select('id, company_name, contact_name, contact_email, contact_phone, created_at')
        .order('created_at', { ascending: false });

      const { data: profiles } = await supabase.from('profiles').select('*')
        .order('created_at', { ascending: false });

      const allUsers: AppUser[] = [];
      const seen = new Set<string>();

      (reg12th || []).forEach(r => {
        const key = r.phone || r.email || r.id;
        if (!seen.has(key)) { seen.add(key); allUsers.push({
          id: r.id, email: r.email || '', phone: r.phone || '', created_at: r.created_at, last_sign_in: r.created_at,
          provider: '12th Learner', full_name: r.full_name || '', school_name: r.school_name || '',
          stream: r.stream || '', district: r.preferred_institution || '', pass_out_year: r.preferred_course || '',
          career_interest: Array.isArray(r.career_interests) ? r.career_interests.join(', ') : (r.career_interests || ''),
          source_table: 'registrations_12th_learners',
        }); }
      });

      (regLearner || []).forEach(r => {
        const key = r.phone || r.email || r.id;
        if (!seen.has(key)) { seen.add(key); allUsers.push({
          id: r.id, email: r.email || '', phone: r.phone || '', created_at: r.created_at, last_sign_in: r.created_at,
          provider: 'Learner', full_name: r.full_name || '', school_name: r.institution || '',
          stream: r.degree || '', district: '', pass_out_year: '', career_interest: '',
          source_table: 'registrations_learners',
        }); }
      });

      (regEmployer || []).forEach(r => {
        const key = r.contact_phone || r.contact_email || r.id;
        if (!seen.has(key)) { seen.add(key); allUsers.push({
          id: r.id, email: r.contact_email || '', phone: r.contact_phone || '', created_at: r.created_at, last_sign_in: r.created_at,
          provider: 'Employer', full_name: r.contact_name || '', school_name: r.company_name || '',
          stream: '', district: '', pass_out_year: '', career_interest: '',
          source_table: 'registrations_employers',
        }); }
      });

      (profiles || []).forEach((p: any) => {
        const key = p.bio || p.display_name || p.id;
        if (!seen.has(key)) { seen.add(key); allUsers.push({
          id: p.id, email: p.bio || '', phone: '', created_at: p.created_at || '', last_sign_in: p.updated_at || '',
          provider: 'App User', full_name: p.display_name || '', school_name: '', stream: '', district: '',
          pass_out_year: '', career_interest: '', source_table: 'profiles',
        }); }
      });

      allUsers.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setUsers(allUsers);

      if (allUsers.length === 0) setError('No registered users yet. Users will appear here after they register on the app.');
    } catch (err: any) {
      setError('Failed to load data. ' + (err?.message || ''));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (user: AppUser) => {
    setIsDeleting(true);
    try {
      const { error } = await supabase.from(user.source_table as any).delete().eq('id', user.id);
      if (error) throw error;
      setUsers(prev => prev.filter(u => u.id !== user.id));
      if (selectedUser?.id === user.id) setSelectedUser(null);
      setDeleteConfirm(null);
    } catch (err: any) {
      alert('Failed to delete: ' + (err?.message || 'Unknown error'));
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLogin = () => {
    if (password === ADMIN_PASS) { setIsLoggedIn(true); setError(''); fetchUsers(); }
    else setError('Wrong password');
  };

  const filtered = useMemo(() => {
    const range = getTimeRange(timeFilter);
    return users.filter(u => {
      if (filterStream && u.stream !== filterStream) return false;
      if (filterDistrict && u.district !== filterDistrict) return false;
      if (range) {
        const d = new Date(u.created_at);
        if (d < range.start || d >= range.end) return false;
      }
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return u.full_name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.phone.includes(q) || u.school_name.toLowerCase().includes(q) || u.stream.toLowerCase().includes(q) || u.district.toLowerCase().includes(q) || u.career_interest.toLowerCase().includes(q);
    });
  }, [users, filterStream, filterDistrict, timeFilter, search]);

  // Stats computed from ALL users (not filtered)
  const stats = useMemo(() => {
    const now = new Date();
    const todayStr = now.toDateString();
    const weekAgo = new Date(now); weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(now); monthAgo.setMonth(monthAgo.getMonth() - 1);
    return {
      total: users.length,
      today: users.filter(u => new Date(u.created_at).toDateString() === todayStr).length,
      week: users.filter(u => new Date(u.created_at) >= weekAgo).length,
      month: users.filter(u => new Date(u.created_at) >= monthAgo).length,
    };
  }, [users]);

  const uniqueStreams = useMemo(() => [...new Set(users.map(u => u.stream).filter(Boolean))].sort(), [users]);
  const uniqueDistricts = useMemo(() => [...new Set(users.map(u => u.district).filter(Boolean))].sort(), [users]);

  const formatDate = (d: string) => !d ? '—' : new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const formatDateTime = (d: string) => !d ? '—' : new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  const exportCSV = () => {
    const headers = ['S.No', 'Full Name', 'Mobile', 'Email', 'School Name', 'Stream', 'Pass-Out Year', 'District', 'Career Interest', 'Type', 'Registered On'];
    const rows = filtered.map((u, i) => [i + 1, u.full_name, u.phone, u.email, u.school_name, u.stream, u.pass_out_year, u.district, u.career_interest, u.provider, formatDate(u.created_at)]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = `vazhikatti-learners-${new Date().toISOString().split('T')[0]}.csv`; a.click();
  };

  const timeFilterLabels: Record<TimeFilter, string> = {
    all: 'All Time', today: 'Today', yesterday: 'Yesterday', this_week: 'This Week',
    last_week: 'Last Week', this_month: 'This Month', last_month: 'Last Month',
    last_3_months: 'Last 3 Months', this_year: 'This Year',
  };

  const activeFilters = [filterStream, filterDistrict, timeFilter !== 'all' ? timeFilter : ''].filter(Boolean).length;

  // LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-[#0f172a] p-8 text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl mx-auto mb-4 flex items-center justify-center border border-emerald-500/30">
              <Shield className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">VAZHIKATTI Admin</h1>
            <p className="text-xs text-gray-400 mt-2">Learner Management Console</p>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Password</label>
              <input type="password" placeholder="Enter admin password"
                value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-sm focus:border-[#0f172a] outline-none transition-colors" />
            </div>
            {error && <p className="text-xs text-red-500 font-medium bg-red-50 p-2 rounded-md">{error}</p>}
            <button onClick={handleLogin} className="w-full py-3 rounded-lg bg-[#0f172a] text-white text-sm font-bold hover:bg-[#1e293b] transition-colors">
              Access Dashboard
            </button>
            <button onClick={() => navigate('/')} className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors">← Back to App</button>
          </div>
        </div>
      </div>
    );
  }

  // ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      {/* Top Nav */}
      <div className="bg-[#0f172a] shadow-lg sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="text-sm font-bold text-white tracking-tight">VAZHIKATTI</span>
              <span className="text-[10px] text-gray-500 ml-2 hidden sm:inline">Admin Console</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={fetchUsers} disabled={isLoading}
              className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-white/5 text-gray-300 text-xs font-medium hover:bg-white/10 border border-white/10 transition-all">
              <RefreshCw className={cn("w-3.5 h-3.5", isLoading && "animate-spin")} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button onClick={exportCSV}
              className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-emerald-600/20 text-emerald-300 text-xs font-medium hover:bg-emerald-600/30 border border-emerald-600/30 transition-all">
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
            <button onClick={() => { setIsLoggedIn(false); setPassword(''); setUsers([]); setSelectedUser(null); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-red-500/10 text-red-300 text-xs font-medium hover:bg-red-500/20 border border-red-500/20 transition-all">
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-5 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Total Learners', value: stats.total, sub: 'All time', icon: Users, accent: '#3b82f6', bg: '#eff6ff' },
            { label: 'Today', value: stats.today, sub: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }), icon: UserCheck, accent: '#10b981', bg: '#ecfdf5' },
            { label: 'This Week', value: stats.week, sub: 'Last 7 days', icon: Clock, accent: '#8b5cf6', bg: '#f5f3ff' },
            { label: 'This Month', value: stats.month, sub: 'Last 30 days', icon: BarChart3, accent: '#f59e0b', bg: '#fffbeb' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{s.label}</p>
                  <p className="text-3xl font-black mt-1" style={{ color: s.accent }}>{s.value}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{s.sub}</p>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: s.bg }}>
                  <s.icon className="w-5 h-5" style={{ color: s.accent }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-4">
          {/* Time Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {(Object.entries(timeFilterLabels) as [TimeFilter, string][]).map(([key, label]) => (
              <button key={key} onClick={() => setTimeFilter(key)}
                className={cn("px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all border",
                  timeFilter === key
                    ? "bg-[#0f172a] text-white border-[#0f172a]"
                    : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100 hover:text-gray-700"
                )}>
                {label}
              </button>
            ))}
          </div>

          {/* Search + Dropdown Filters */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search name, phone, school, district, career interest..."
                value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-gray-200 text-sm bg-gray-50/50 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all" />
              {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-gray-400 hover:text-gray-600" /></button>}
            </div>
            <select value={filterStream} onChange={e => setFilterStream(e.target.value)}
              className="px-3 py-2.5 rounded-lg border border-gray-200 text-xs bg-gray-50/50 outline-none focus:border-blue-400 min-w-[140px] transition-all">
              <option value="">All Streams</option>
              {uniqueStreams.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={filterDistrict} onChange={e => setFilterDistrict(e.target.value)}
              className="px-3 py-2.5 rounded-lg border border-gray-200 text-xs bg-gray-50/50 outline-none focus:border-blue-400 min-w-[140px] transition-all">
              <option value="">All Districts</option>
              {uniqueDistricts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            {activeFilters > 0 && (
              <button onClick={() => { setFilterStream(''); setFilterDistrict(''); setTimeFilter('all'); setSearch(''); }}
                className="px-3 py-2.5 rounded-lg bg-red-50 text-red-600 text-xs font-semibold border border-red-200 hover:bg-red-100 transition-all flex items-center gap-1">
                <X className="w-3 h-3" /> Clear All
              </button>
            )}
          </div>

          <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Showing <strong className="text-gray-600">{filtered.length}</strong> of <strong className="text-gray-600">{users.length}</strong> learners
              {activeFilters > 0 && <span className="ml-1 text-blue-500">({activeFilters} filter{activeFilters > 1 ? 's' : ''} active)</span>}
            </p>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
            <Loader2 className="w-8 h-8 text-gray-300 mx-auto animate-spin" />
            <p className="text-sm text-gray-400 mt-3">Loading learner data...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" /> {error}
          </div>
        )}

        {/* Main Content */}
        {!isLoading && filtered.length > 0 && (
          <div className="flex flex-col lg:flex-row gap-4">
            {/* LEFT — Table */}
            <div className={cn("bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden", selectedUser ? "lg:w-[58%]" : "w-full")}>
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-1 px-4 py-3 bg-[#f8f9fb] border-b border-gray-200">
                <div className="col-span-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center">S.No</div>
                <div className="col-span-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center">Learner</div>
                <div className="col-span-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center">Mobile</div>
                <div className="col-span-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center">School</div>
                <div className="col-span-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center">District</div>
                <div className="col-span-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center">Registered</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-gray-50 max-h-[62vh] overflow-y-auto">
                {filtered.map((user, idx) => (
                  <div key={user.id}
                    onClick={() => setSelectedUser(selectedUser?.id === user.id ? null : user)}
                    className={cn(
                      "px-4 py-3 cursor-pointer transition-all group",
                      selectedUser?.id === user.id
                        ? "bg-blue-50/70 border-l-[3px] border-l-blue-500"
                        : "hover:bg-gray-50/80 border-l-[3px] border-l-transparent"
                    )}>
                    {/* Mobile */}
                    <div className="md:hidden">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0f172a] to-[#475569] flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold text-white">{(user.full_name || '?')[0].toUpperCase()}</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{user.full_name || '—'}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs text-gray-500">{user.phone || '—'}</span>
                              {user.district && <span className="text-[10px] text-gray-400">• {user.district}</span>}
                            </div>
                          </div>
                        </div>
                        {selectedUser?.id === user.id ? <ChevronDown className="w-4 h-4 text-blue-500" /> : <ChevronRight className="w-4 h-4 text-gray-300" />}
                      </div>
                      {selectedUser?.id === user.id && (
                        <div className="mt-3 ml-[52px] space-y-2 pb-1">
                          <MobileDetailRow icon={School} label="School" value={user.school_name} />
                          <MobileDetailRow icon={GraduationCap} label="Stream" value={user.stream} />
                          <MobileDetailRow icon={Calendar} label="Pass-Out" value={user.pass_out_year} />
                          <MobileDetailRow icon={MapPin} label="District" value={user.district} />
                          <MobileDetailRow icon={Briefcase} label="Career" value={user.career_interest} />
                          <MobileDetailRow icon={Mail} label="Email" value={user.email} />
                          <MobileDetailRow icon={Clock} label="Registered" value={formatDateTime(user.created_at)} />
                          <div className="pt-2">
                            {deleteConfirm === user.id ? (
                              <div className="flex items-center gap-2">
                                <button onClick={(e) => { e.stopPropagation(); handleDelete(user); }}
                                  className="px-3 py-1.5 rounded-md bg-red-500 text-white text-[11px] font-semibold">
                                  {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); setDeleteConfirm(null); }}
                                  className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-600 text-[11px] font-semibold">Cancel</button>
                              </div>
                            ) : (
                              <button onClick={(e) => { e.stopPropagation(); setDeleteConfirm(user.id); }}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-md text-red-400 text-[11px] font-medium hover:bg-red-50">
                                <Trash2 className="w-3 h-3" /> Delete Record
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Desktop */}
                    <div className="hidden md:grid grid-cols-12 gap-1 items-center">
                      <div className="col-span-1">
                        <span className="text-xs font-semibold text-gray-300">{idx + 1}</span>
                      </div>
                      <div className="col-span-3 flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0f172a] to-[#475569] flex items-center justify-center flex-shrink-0">
                          <span className="text-[10px] font-bold text-white">{(user.full_name || '?')[0].toUpperCase()}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-gray-900 truncate leading-tight">{user.full_name || '—'}</p>
                          {user.career_interest && <p className="text-[10px] text-blue-500 truncate mt-0.5">{user.career_interest}</p>}
                        </div>
                      </div>
                      <div className="col-span-2"><p className="text-xs text-gray-700 font-mono">{user.phone || '—'}</p></div>
                      <div className="col-span-2"><p className="text-xs text-gray-600 truncate">{user.school_name || '—'}</p></div>
                      <div className="col-span-2"><p className="text-xs text-gray-600">{user.district || '—'}</p></div>
                      <div className="col-span-2"><p className="text-[11px] text-gray-400">{formatDate(user.created_at)}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Detail Pane */}
            {selectedUser && (
              <div className="hidden lg:flex lg:flex-col lg:w-[42%] bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] p-6 flex-shrink-0">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{(selectedUser.full_name || '?')[0].toUpperCase()}</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white leading-tight">{selectedUser.full_name || 'Unknown'}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">{selectedUser.provider}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 overflow-y-auto p-5 space-y-5">
                  <DetailSection title="Contact Information">
                    <DetailField icon={Phone} label="Mobile Number" value={selectedUser.phone} highlight />
                    <DetailField icon={Mail} label="Email Address" value={selectedUser.email || 'Not provided'} muted={!selectedUser.email} />
                  </DetailSection>

                  <DetailSection title="Academic Details">
                    <DetailField icon={School} label="School Name" value={selectedUser.school_name} />
                    <DetailField icon={GraduationCap} label="Stream" value={selectedUser.stream} />
                    <DetailField icon={Calendar} label="Pass-Out Year" value={selectedUser.pass_out_year} />
                  </DetailSection>

                  <DetailSection title="Location & Career">
                    <DetailField icon={MapPin} label="District" value={selectedUser.district} />
                    <DetailField icon={Briefcase} label="Career Interest" value={selectedUser.career_interest} />
                  </DetailSection>

                  <DetailSection title="Registration Info">
                    <DetailField icon={Clock} label="Registered On" value={formatDateTime(selectedUser.created_at)} />
                  </DetailSection>

                  {/* Delete Button */}
                  <div className="pt-2 border-t border-gray-100">
                    {deleteConfirm === selectedUser.id ? (
                      <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                        <div className="flex items-center gap-2 mb-3">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <p className="text-sm font-semibold text-red-700">Delete this record?</p>
                        </div>
                        <p className="text-xs text-red-600 mb-3">This action cannot be undone. The learner's data will be permanently removed.</p>
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleDelete(selectedUser)} disabled={isDeleting}
                            className="px-4 py-2 rounded-lg bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition-colors">
                            {isDeleting ? 'Deleting...' : 'Yes, Delete Permanently'}
                          </button>
                          <button onClick={() => setDeleteConfirm(null)}
                            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-xs font-semibold hover:bg-gray-200 transition-colors">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirm(selectedUser.id)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-gray-400 text-xs font-medium hover:bg-red-50 hover:text-red-500 transition-all">
                        <Trash2 className="w-3.5 h-3.5" /> Delete this record
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {!isLoading && filtered.length === 0 && !error && (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <Users className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-sm font-semibold text-gray-500">No learners found</p>
            <p className="text-xs text-gray-400 mt-1">Try changing your search or filters</p>
          </div>
        )}

        {/* Footer note */}
        <div className="text-center pb-4">
          <p className="text-[10px] text-gray-300">Data is stored securely and will not be deleted unless you choose to delete it.</p>
        </div>
      </div>
    </div>
  );
};

// Section wrapper
const DetailSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] mb-2">{title}</h3>
    <div className="space-y-0.5">{children}</div>
  </div>
);

// Detail field for reading pane
const DetailField = ({ icon: Icon, label, value, muted = false, highlight = false }: { icon: any; label: string; value: string; muted?: boolean; highlight?: boolean }) => (
  <div className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-gray-50 transition-colors">
    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", highlight ? "bg-blue-50" : "bg-gray-50")}>
      <Icon className={cn("w-4 h-4", highlight ? "text-blue-500" : "text-gray-400")} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
      <p className={cn("text-sm font-medium truncate mt-0.5", muted ? "text-gray-300 italic" : "text-gray-800")}>{value || '—'}</p>
    </div>
  </div>
);

// Mobile detail row
const MobileDetailRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => {
  if (!value) return null;
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-5 h-5 rounded flex items-center justify-center bg-gray-100 flex-shrink-0">
        <Icon className="w-3 h-3 text-gray-400" />
      </div>
      <span className="text-[11px] text-gray-400 min-w-[70px]">{label}</span>
      <span className="text-[11px] font-semibold text-gray-700">{value}</span>
    </div>
  );
};

export default SimpleAdmin;
