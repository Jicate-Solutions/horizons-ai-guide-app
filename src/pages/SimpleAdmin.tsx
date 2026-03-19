import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, Loader2, RefreshCw, UserCheck, Clock, Phone, Search, X, LogOut, Download, ChevronDown, ChevronRight, GraduationCap, MapPin, School, Briefcase, Calendar, Mail, Trash2, AlertTriangle, BarChart3, TrendingUp, PieChart, LayoutDashboard, Table2, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { PieChart as RePieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, Legend } from 'recharts';

interface AppUser {
  id: string; email: string; phone: string; created_at: string; last_sign_in: string;
  provider: string; full_name: string; school_name: string; stream: string;
  district: string; pass_out_year: string; career_interest: string; source_table: string;
}

const ADMIN_PASS = 'vzk-admin-2026';
const ADMIN_EMAIL = 'admin@vazhikatti.app';
const ADMIN_SUPABASE_PASS = 'VzkAdmin@2026Secure';
type TimeFilter = 'all' | 'today' | 'yesterday' | 'this_week' | 'last_week' | 'this_month' | 'last_month' | 'last_3_months' | 'this_year';
type TabView = 'analytics' | 'data';

const CHART_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316', '#14b8a6', '#6366f1', '#84cc16', '#d946ef', '#0ea5e9', '#eab308', '#a855f7', '#22c55e'];

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
  const [activeTab, setActiveTab] = useState<TabView>('analytics');

  const getTimeRange = (filter: TimeFilter): { start: Date; end: Date } | null => {
    const now = new Date(); const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dow = today.getDay() || 7;
    switch (filter) {
      case 'today': return { start: today, end: now };
      case 'yesterday': { const y = new Date(today); y.setDate(y.getDate() - 1); return { start: y, end: today }; }
      case 'this_week': { const m = new Date(today); m.setDate(m.getDate() - (dow - 1)); return { start: m, end: now }; }
      case 'last_week': { const tm = new Date(today); tm.setDate(tm.getDate() - (dow - 1)); const lm = new Date(tm); lm.setDate(lm.getDate() - 7); return { start: lm, end: tm }; }
      case 'this_month': return { start: new Date(now.getFullYear(), now.getMonth(), 1), end: now };
      case 'last_month': return { start: new Date(now.getFullYear(), now.getMonth() - 1, 1), end: new Date(now.getFullYear(), now.getMonth(), 1) };
      case 'last_3_months': return { start: new Date(now.getFullYear(), now.getMonth() - 3, 1), end: now };
      case 'this_year': return { start: new Date(now.getFullYear(), 0, 1), end: now };
      default: return null;
    }
  };

  const fetchUsers = async () => {
    setIsLoading(true); setError('');
    try {
      const { data: r1 } = await supabase.from('registrations_12th_learners')
        .select('id,full_name,email,phone,school_name,stream,preferred_course,preferred_institution,career_interests,created_at').order('created_at', { ascending: false });
      const { data: r2 } = await supabase.from('registrations_learners')
        .select('id,full_name,email,phone,institution,degree,created_at').order('created_at', { ascending: false });
      const { data: r3 } = await supabase.from('registrations_employers')
        .select('id,company_name,contact_name,contact_email,contact_phone,created_at').order('created_at', { ascending: false });
      const { data: r4 } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });

      const all: AppUser[] = []; const seen = new Set<string>();
      (r1 || []).forEach(r => { const k = r.phone || r.email || r.id; if (!seen.has(k)) { seen.add(k); all.push({ id: r.id, email: r.email || '', phone: r.phone || '', created_at: r.created_at, last_sign_in: r.created_at, provider: '12th Learner', full_name: r.full_name || '', school_name: r.school_name || '', stream: r.stream || '', district: r.preferred_institution || '', pass_out_year: r.preferred_course || '', career_interest: Array.isArray(r.career_interests) ? r.career_interests.join(', ') : (r.career_interests || ''), source_table: 'registrations_12th_learners' }); } });
      (r2 || []).forEach(r => { const k = r.phone || r.email || r.id; if (!seen.has(k)) { seen.add(k); all.push({ id: r.id, email: r.email || '', phone: r.phone || '', created_at: r.created_at, last_sign_in: r.created_at, provider: 'Learner', full_name: r.full_name || '', school_name: r.institution || '', stream: r.degree || '', district: '', pass_out_year: '', career_interest: '', source_table: 'registrations_learners' }); } });
      (r3 || []).forEach(r => { const k = r.contact_phone || r.contact_email || r.id; if (!seen.has(k)) { seen.add(k); all.push({ id: r.id, email: r.contact_email || '', phone: r.contact_phone || '', created_at: r.created_at, last_sign_in: r.created_at, provider: 'Employer', full_name: r.contact_name || '', school_name: r.company_name || '', stream: '', district: '', pass_out_year: '', career_interest: '', source_table: 'registrations_employers' }); } });
      (r4 || []).forEach((p: any) => {
        const bio = p.bio || '';
        // bio format: "phone | email | school | stream | year | district | career"
        const parts = bio.split('|').map((s: string) => s.trim());
        const phoneFromBio = parts[0] && /^\d{10}$/.test(parts[0]) ? parts[0] : '';
        const emailFromBio = parts[1] || '';
        const schoolFromBio = parts[2] || '';
        const streamFromBio = parts[3] || '';
        const yearFromBio = parts[4] || '';
        const districtFromBio = parts[5] || '';
        const careerFromBio = parts[6] || '';
        const k = phoneFromBio || emailFromBio || p.display_name || p.id;
        if (!seen.has(k)) {
          seen.add(k);
          all.push({ id: p.id, email: emailFromBio, phone: phoneFromBio, created_at: p.created_at || '', last_sign_in: p.updated_at || '', provider: 'App User', full_name: p.display_name || '', school_name: schoolFromBio, stream: streamFromBio, district: districtFromBio, pass_out_year: yearFromBio, career_interest: careerFromBio, source_table: 'profiles' });
        }
      });

      all.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setUsers(all);
      if (all.length === 0) setError('No registered users yet.');
    } catch (err: any) { setError('Failed to load: ' + (err?.message || '')); }
    finally { setIsLoading(false); }
  };

  const handleDelete = async (user: AppUser) => {
    setIsDeleting(true);
    try { await supabase.from(user.source_table as any).delete().eq('id', user.id); setUsers(p => p.filter(u => u.id !== user.id)); if (selectedUser?.id === user.id) setSelectedUser(null); setDeleteConfirm(null); }
    catch (err: any) { alert('Failed: ' + err?.message); }
    finally { setIsDeleting(false); }
  };

  const handleLogin = async () => {
    if (password !== ADMIN_PASS) { setError('Wrong password'); return; }
    setIsLoading(true);
    setError('');
    try {
      // Authenticate with Supabase so we can read data past RLS
      const { error: signInErr } = await supabase.auth.signInWithPassword({
        email: ADMIN_EMAIL, password: ADMIN_SUPABASE_PASS
      });
      if (signInErr) {
        // Admin account doesn't exist yet — create it
        const { error: signUpErr } = await supabase.auth.signUp({
          email: ADMIN_EMAIL, password: ADMIN_SUPABASE_PASS,
          options: { data: { display_name: 'Admin' } }
        });
        if (signUpErr) console.warn('[ADMIN] Signup failed:', signUpErr.message);
        // Try signing in again
        await supabase.auth.signInWithPassword({
          email: ADMIN_EMAIL, password: ADMIN_SUPABASE_PASS
        });
      }
    } catch (e) {
      console.warn('[ADMIN] Auth setup failed, continuing anyway');
    }
    setIsLoggedIn(true);
    setIsLoading(false);
    fetchUsers();
  };

  const filtered = useMemo(() => {
    const range = getTimeRange(timeFilter);
    return users.filter(u => {
      if (filterStream && u.stream !== filterStream) return false;
      if (filterDistrict && u.district !== filterDistrict) return false;
      if (range) { const d = new Date(u.created_at); if (d < range.start || d >= range.end) return false; }
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return u.full_name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.phone.includes(q) || u.school_name.toLowerCase().includes(q) || u.stream.toLowerCase().includes(q) || u.district.toLowerCase().includes(q) || u.career_interest.toLowerCase().includes(q);
    });
  }, [users, filterStream, filterDistrict, timeFilter, search]);

  const stats = useMemo(() => {
    const now = new Date(); const todayStr = now.toDateString();
    const wa = new Date(now); wa.setDate(wa.getDate() - 7);
    const ma = new Date(now); ma.setMonth(ma.getMonth() - 1);
    const ya = new Date(now); ya.setDate(ya.getDate() - 1);
    return {
      total: users.length,
      today: users.filter(u => new Date(u.created_at).toDateString() === todayStr).length,
      yesterday: users.filter(u => new Date(u.created_at).toDateString() === ya.toDateString()).length,
      week: users.filter(u => new Date(u.created_at) >= wa).length,
      month: users.filter(u => new Date(u.created_at) >= ma).length,
    };
  }, [users]);

  // Chart data
  const streamData = useMemo(() => {
    const map: Record<string, number> = {};
    users.forEach(u => { if (u.stream) map[u.stream] = (map[u.stream] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [users]);

  const districtData = useMemo(() => {
    const map: Record<string, number> = {};
    users.forEach(u => { if (u.district) map[u.district] = (map[u.district] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 10);
  }, [users]);

  const careerData = useMemo(() => {
    const map: Record<string, number> = {};
    users.forEach(u => { if (u.career_interest) map[u.career_interest] = (map[u.career_interest] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [users]);

  const dailyTrend = useMemo(() => {
    const map: Record<string, number> = {};
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now); d.setDate(d.getDate() - i);
      map[d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })] = 0;
    }
    users.forEach(u => {
      const d = new Date(u.created_at);
      const key = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
      if (key in map) map[key]++;
    });
    return Object.entries(map).map(([date, count]) => ({ date, count }));
  }, [users]);

  const topSchools = useMemo(() => {
    const map: Record<string, number> = {};
    users.forEach(u => { if (u.school_name) map[u.school_name] = (map[u.school_name] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 8);
  }, [users]);

  const uniqueStreams = useMemo(() => [...new Set(users.map(u => u.stream).filter(Boolean))].sort(), [users]);
  const uniqueDistricts = useMemo(() => [...new Set(users.map(u => u.district).filter(Boolean))].sort(), [users]);

  const formatDate = (d: string) => !d ? '—' : new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const formatDateTime = (d: string) => !d ? '—' : new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  const exportCSV = () => {
    const h = ['S.No', 'Full Name', 'Mobile', 'Email', 'School Name', 'Stream', 'Pass-Out Year', 'District', 'Career Interest', 'Type', 'Registered On'];
    const rows = filtered.map((u, i) => [i + 1, u.full_name, u.phone, u.email, u.school_name, u.stream, u.pass_out_year, u.district, u.career_interest, u.provider, formatDate(u.created_at)]);
    const csv = [h, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = `vazhikatti-learners-${new Date().toISOString().split('T')[0]}.csv`; a.click();
  };

  const timeLabels: Record<TimeFilter, string> = { all: 'All Time', today: 'Today', yesterday: 'Yesterday', this_week: 'This Week', last_week: 'Last Week', this_month: 'This Month', last_month: 'Last Month', last_3_months: 'Last 3 Months', this_year: 'This Year' };
  const activeFilters = [filterStream, filterDistrict, timeFilter !== 'all' ? timeFilter : ''].filter(Boolean).length;

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload?.length) {
      return (<div className="bg-[#0f172a] text-white text-xs px-3 py-2 rounded-lg shadow-xl border border-white/10"><p className="font-semibold">{label}</p><p className="text-emerald-300 font-bold">{payload[0].value} learner{payload[0].value !== 1 ? 's' : ''}</p></div>);
    }
    return null;
  };

  // LOGIN
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">VAZHIKATTI</h1>
            <p className="text-sm text-gray-400 mt-1">Admin Console</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2 block">Admin Password</label>
              <input type="password" placeholder="••••••••••"
                value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all" />
            </div>
            {error && <p className="text-xs text-red-400 font-medium bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/20">{error}</p>}
            <button onClick={handleLogin} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/25">
              Access Dashboard
            </button>
          </div>
          <button onClick={() => navigate('/')} className="w-full mt-4 py-2 text-sm text-gray-500 hover:text-gray-300 transition-colors">← Back to App</button>
        </div>
      </div>
    );
  }

  // DASHBOARD
  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      {/* Nav */}
      <div className="bg-[#0f172a] sticky top-0 z-50 shadow-lg">
        <div className="max-w-[1440px] mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block"><p className="text-sm font-bold text-white leading-none">VAZHIKATTI</p><p className="text-[9px] text-gray-500 mt-0.5">Learner Management Console</p></div>
            </div>
            {/* Tab Switcher */}
            <div className="flex bg-white/5 rounded-lg p-0.5 border border-white/10">
              <button onClick={() => setActiveTab('analytics')} className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all", activeTab === 'analytics' ? "bg-emerald-500 text-white shadow-md" : "text-gray-400 hover:text-white")}>
                <BarChart3 className="w-3.5 h-3.5" /> Analytics
              </button>
              <button onClick={() => setActiveTab('data')} className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all", activeTab === 'data' ? "bg-emerald-500 text-white shadow-md" : "text-gray-400 hover:text-white")}>
                <Table2 className="w-3.5 h-3.5" /> Learner Data
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={fetchUsers} disabled={isLoading} className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10 transition-all">
              <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
            </button>
            <button onClick={exportCSV} className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-300 text-xs font-semibold border border-emerald-500/20 hover:bg-emerald-500/20 transition-all">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
            <button onClick={async () => { await supabase.auth.signOut(); setIsLoggedIn(false); setPassword(''); setUsers([]); setSelectedUser(null); }} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 py-5 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: 'Total', value: stats.total, icon: Users, color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe' },
            { label: 'Today', value: stats.today, icon: UserCheck, color: '#10b981', bg: '#ecfdf5', border: '#a7f3d0' },
            { label: 'Yesterday', value: stats.yesterday, icon: Clock, color: '#8b5cf6', bg: '#f5f3ff', border: '#c4b5fd' },
            { label: 'This Week', value: stats.week, icon: TrendingUp, color: '#f59e0b', bg: '#fffbeb', border: '#fde68a' },
            { label: 'This Month', value: stats.month, icon: BarChart3, color: '#ec4899', bg: '#fdf2f8', border: '#fbcfe8' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-all" style={{ borderColor: s.border }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: s.color }}>{s.label}</p>
                  <p className="text-2xl md:text-3xl font-black mt-0.5" style={{ color: s.color }}>{s.value}</p>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: s.bg }}>
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {isLoading && (
          <div className="text-center py-20 bg-white rounded-xl border"><Loader2 className="w-8 h-8 text-gray-300 mx-auto animate-spin" /><p className="text-sm text-gray-400 mt-3">Loading...</p></div>
        )}

        {error && !isLoading && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-700 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> {error}</div>
        )}

        {/* ANALYTICS TAB */}
        {!isLoading && activeTab === 'analytics' && users.length > 0 && (
          <div className="space-y-4">
            {/* Registration Trend */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div><h3 className="text-sm font-bold text-gray-800">Registration Trend</h3><p className="text-[10px] text-gray-400 mt-0.5">Last 30 days</p></div>
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={dailyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#9ca3af' }} interval={4} />
                  <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} allowDecimals={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3, fill: '#3b82f6' }} activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Stream + Career Charts */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Stream Distribution */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <div><h3 className="text-sm font-bold text-gray-800">Stream Distribution</h3><p className="text-[10px] text-gray-400 mt-0.5">{streamData.length} streams</p></div>
                  <PieChart className="w-5 h-5 text-emerald-400" />
                </div>
                {streamData.length > 0 ? (
                  <div className="flex items-center gap-4">
                    <div className="w-[140px] h-[140px] flex-shrink-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <RePieChart>
                          <Pie data={streamData} dataKey="value" cx="50%" cy="50%" innerRadius={35} outerRadius={65} paddingAngle={2}>
                            {streamData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                        </RePieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {streamData.map((s, i) => (
                        <div key={s.name} className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
                          <span className="text-[11px] text-gray-600 flex-1 truncate">{s.name}</span>
                          <span className="text-[11px] font-bold text-gray-800">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : <p className="text-xs text-gray-400 text-center py-8">No stream data yet</p>}
              </div>

              {/* Career Interest */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <div><h3 className="text-sm font-bold text-gray-800">Career Interest</h3><p className="text-[10px] text-gray-400 mt-0.5">{careerData.length} interests</p></div>
                  <Briefcase className="w-5 h-5 text-amber-400" />
                </div>
                {careerData.length > 0 ? (
                  <div className="flex items-center gap-4">
                    <div className="w-[140px] h-[140px] flex-shrink-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <RePieChart>
                          <Pie data={careerData} dataKey="value" cx="50%" cy="50%" innerRadius={35} outerRadius={65} paddingAngle={2}>
                            {careerData.map((_, i) => <Cell key={i} fill={CHART_COLORS[(i + 4) % CHART_COLORS.length]} />)}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                        </RePieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex-1 space-y-1.5 max-h-[140px] overflow-y-auto">
                      {careerData.map((s, i) => (
                        <div key={s.name} className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: CHART_COLORS[(i + 4) % CHART_COLORS.length] }} />
                          <span className="text-[11px] text-gray-600 flex-1 truncate">{s.name}</span>
                          <span className="text-[11px] font-bold text-gray-800">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : <p className="text-xs text-gray-400 text-center py-8">No career data yet</p>}
              </div>
            </div>

            {/* District + Top Schools */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Top Districts */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <div><h3 className="text-sm font-bold text-gray-800">Top Districts</h3><p className="text-[10px] text-gray-400 mt-0.5">By number of learners</p></div>
                  <MapPin className="w-5 h-5 text-violet-400" />
                </div>
                {districtData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={Math.max(200, districtData.length * 32)}>
                    <BarChart data={districtData} layout="vertical" margin={{ left: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 10, fill: '#9ca3af' }} allowDecimals={false} />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#374151' }} width={100} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={20}>
                        {districtData.map((_, i) => <Cell key={i} fill={CHART_COLORS[(i + 2) % CHART_COLORS.length]} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : <p className="text-xs text-gray-400 text-center py-8">No district data yet</p>}
              </div>

              {/* Top Schools */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <div><h3 className="text-sm font-bold text-gray-800">Top Schools</h3><p className="text-[10px] text-gray-400 mt-0.5">Most registrations</p></div>
                  <School className="w-5 h-5 text-rose-400" />
                </div>
                {topSchools.length > 0 ? (
                  <div className="space-y-2">
                    {topSchools.map((s, i) => (
                      <div key={s.name} className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-gray-300 w-4 text-right">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[11px] font-semibold text-gray-700 truncate pr-2">{s.name}</span>
                            <span className="text-[11px] font-bold text-gray-800 flex-shrink-0">{s.value}</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: `${(s.value / (topSchools[0]?.value || 1)) * 100}%`, backgroundColor: CHART_COLORS[(i + 6) % CHART_COLORS.length] }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : <p className="text-xs text-gray-400 text-center py-8">No school data yet</p>}
              </div>
            </div>
          </div>
        )}

        {/* DATA TAB */}
        {!isLoading && activeTab === 'data' && users.length > 0 && (
          <>
            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {(Object.entries(timeLabels) as [TimeFilter, string][]).map(([k, l]) => (
                  <button key={k} onClick={() => setTimeFilter(k)} className={cn("px-2.5 py-1.5 rounded-full text-[10px] font-bold transition-all border", timeFilter === k ? "bg-[#0f172a] text-white border-[#0f172a]" : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100")}>{l}</button>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="Search name, phone, school, district..." value={search} onChange={e => setSearch(e.target.value)}
                    className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-gray-200 text-sm bg-gray-50/50 outline-none focus:border-blue-400 transition-all" />
                  {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-gray-400" /></button>}
                </div>
                <select value={filterStream} onChange={e => setFilterStream(e.target.value)} className="px-3 py-2.5 rounded-lg border border-gray-200 text-xs bg-gray-50/50 min-w-[130px]">
                  <option value="">All Streams</option>{uniqueStreams.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <select value={filterDistrict} onChange={e => setFilterDistrict(e.target.value)} className="px-3 py-2.5 rounded-lg border border-gray-200 text-xs bg-gray-50/50 min-w-[130px]">
                  <option value="">All Districts</option>{uniqueDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                {activeFilters > 0 && <button onClick={() => { setFilterStream(''); setFilterDistrict(''); setTimeFilter('all'); setSearch(''); }} className="px-3 py-2.5 rounded-lg bg-red-50 text-red-600 text-xs font-bold border border-red-200"><X className="w-3 h-3 inline mr-1" />Clear</button>}
              </div>
              <p className="text-[10px] text-gray-400 mt-2">Showing <strong className="text-gray-600">{filtered.length}</strong> of <strong className="text-gray-600">{users.length}</strong></p>
            </div>

            {/* Table + Detail */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className={cn("bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden", selectedUser ? "lg:w-[58%]" : "w-full")}>
                <div className="hidden md:grid grid-cols-12 gap-1 px-4 py-2.5 bg-[#f8f9fb] border-b border-gray-200">
                  <div className="col-span-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">S.No</div>
                  <div className="col-span-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Learner</div>
                  <div className="col-span-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Mobile</div>
                  <div className="col-span-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">School</div>
                  <div className="col-span-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">District</div>
                  <div className="col-span-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Registered</div>
                </div>
                <div className="divide-y divide-gray-50 max-h-[62vh] overflow-y-auto">
                  {filtered.map((user, idx) => (
                    <div key={user.id} onClick={() => setSelectedUser(selectedUser?.id === user.id ? null : user)}
                      className={cn("px-4 py-3 cursor-pointer transition-all", selectedUser?.id === user.id ? "bg-blue-50/70 border-l-[3px] border-l-blue-500" : "hover:bg-gray-50/80 border-l-[3px] border-l-transparent")}>
                      <div className="md:hidden">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0f172a] to-[#475569] flex items-center justify-center"><span className="text-sm font-bold text-white">{(user.full_name || '?')[0].toUpperCase()}</span></div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{user.full_name || '—'}</p>
                              <p className="text-xs text-gray-500">{user.phone || '—'}{user.district ? ` • ${user.district}` : ''}</p>
                            </div>
                          </div>
                          {selectedUser?.id === user.id ? <ChevronDown className="w-4 h-4 text-blue-500" /> : <ChevronRight className="w-4 h-4 text-gray-300" />}
                        </div>
                        {selectedUser?.id === user.id && (
                          <div className="mt-3 ml-[52px] space-y-2">
                            <MR icon={School} l="School" v={user.school_name} /><MR icon={GraduationCap} l="Stream" v={user.stream} /><MR icon={Calendar} l="Pass-Out" v={user.pass_out_year} /><MR icon={MapPin} l="District" v={user.district} /><MR icon={Briefcase} l="Career" v={user.career_interest} /><MR icon={Mail} l="Email" v={user.email} /><MR icon={Clock} l="Registered" v={formatDateTime(user.created_at)} />
                            <div className="pt-2">{deleteConfirm === user.id ? (
                              <div className="flex gap-2"><button onClick={e => { e.stopPropagation(); handleDelete(user); }} className="px-3 py-1.5 rounded-md bg-red-500 text-white text-[11px] font-bold">{isDeleting ? 'Deleting...' : 'Confirm'}</button><button onClick={e => { e.stopPropagation(); setDeleteConfirm(null); }} className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-600 text-[11px] font-bold">Cancel</button></div>
                            ) : (<button onClick={e => { e.stopPropagation(); setDeleteConfirm(user.id); }} className="flex items-center gap-1 text-red-400 text-[11px] hover:bg-red-50 px-2 py-1 rounded"><Trash2 className="w-3 h-3" />Delete</button>)}</div>
                          </div>
                        )}
                      </div>
                      <div className="hidden md:grid grid-cols-12 gap-1 items-center">
                        <div className="col-span-1"><span className="text-xs font-semibold text-gray-300">{idx + 1}</span></div>
                        <div className="col-span-3 flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0f172a] to-[#475569] flex items-center justify-center flex-shrink-0"><span className="text-[10px] font-bold text-white">{(user.full_name || '?')[0].toUpperCase()}</span></div>
                          <div className="min-w-0"><p className="text-[13px] font-semibold text-gray-900 truncate leading-tight">{user.full_name || '—'}</p>{user.career_interest && <p className="text-[10px] text-blue-500 truncate">{user.career_interest}</p>}</div>
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
              {/* Detail Pane */}
              {selectedUser && (
                <div className="hidden lg:flex lg:flex-col lg:w-[42%] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center"><span className="text-xl font-bold text-white">{(selectedUser.full_name || '?')[0].toUpperCase()}</span></div>
                      <div><h2 className="text-lg font-bold text-white">{selectedUser.full_name || 'Unknown'}</h2><span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">{selectedUser.provider}</span></div>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    <DS t="Contact"><DF i={Phone} l="Mobile" v={selectedUser.phone} h /><DF i={Mail} l="Email" v={selectedUser.email || 'Not provided'} m={!selectedUser.email} /></DS>
                    <DS t="Academic"><DF i={School} l="School" v={selectedUser.school_name} /><DF i={GraduationCap} l="Stream" v={selectedUser.stream} /><DF i={Calendar} l="Pass-Out Year" v={selectedUser.pass_out_year} /></DS>
                    <DS t="Location & Career"><DF i={MapPin} l="District" v={selectedUser.district} /><DF i={Briefcase} l="Career Interest" v={selectedUser.career_interest} /></DS>
                    <DS t="Registration"><DF i={Clock} l="Registered On" v={formatDateTime(selectedUser.created_at)} /></DS>
                    <div className="pt-2 border-t border-gray-100">
                      {deleteConfirm === selectedUser.id ? (
                        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                          <p className="text-sm font-bold text-red-700 mb-1 flex items-center gap-1"><AlertTriangle className="w-4 h-4" />Delete this record?</p>
                          <p className="text-xs text-red-600 mb-3">This cannot be undone.</p>
                          <div className="flex gap-2">
                            <button onClick={() => handleDelete(selectedUser)} disabled={isDeleting} className="px-4 py-2 rounded-lg bg-red-500 text-white text-xs font-bold hover:bg-red-600">{isDeleting ? 'Deleting...' : 'Delete'}</button>
                            <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold">Cancel</button>
                          </div>
                        </div>
                      ) : (<button onClick={() => setDeleteConfirm(selectedUser.id)} className="flex items-center gap-1.5 text-gray-400 text-xs hover:text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-all"><Trash2 className="w-3.5 h-3.5" />Delete record</button>)}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border"><Users className="w-12 h-12 text-gray-200 mx-auto mb-3" /><p className="text-sm font-medium text-gray-500">No learners found</p></div>
            )}
          </>
        )}

        <p className="text-center text-[10px] text-gray-300 pb-4">Data is stored securely and permanently. Only admin can delete records.</p>
      </div>
    </div>
  );
};

// Compact helpers
const DS = ({ t, children }: { t: string; children: React.ReactNode }) => (<div><h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] mb-2">{t}</h3><div className="space-y-0.5">{children}</div><div className="border-t border-gray-100 mt-3" /></div>);
const DF = ({ i: Icon, l, v, m = false, h = false }: { i: any; l: string; v: string; m?: boolean; h?: boolean }) => (
  <div className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", h ? "bg-blue-50" : "bg-gray-50")}><Icon className={cn("w-4 h-4", h ? "text-blue-500" : "text-gray-400")} /></div>
    <div className="flex-1 min-w-0"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{l}</p><p className={cn("text-sm font-medium truncate", m ? "text-gray-300 italic" : "text-gray-800")}>{v || '—'}</p></div>
  </div>
);
const MR = ({ icon: Icon, l, v }: { icon: any; l: string; v: string }) => !v ? null : (
  <div className="flex items-center gap-2.5"><div className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center flex-shrink-0"><Icon className="w-3 h-3 text-gray-400" /></div><span className="text-[11px] text-gray-400 min-w-[65px]">{l}</span><span className="text-[11px] font-semibold text-gray-700">{v}</span></div>
);

export default SimpleAdmin;
