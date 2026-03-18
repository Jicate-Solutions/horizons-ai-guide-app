import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, Loader2, RefreshCw, UserCheck, Clock, Phone, Search, X, LogOut, Download, ChevronDown, ChevronRight, GraduationCap, MapPin, School, Briefcase, Calendar, User, Mail } from 'lucide-react';
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
}

const ADMIN_PASS = 'vzk-admin-2026';

const SimpleAdmin = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [users, setUsers] = useState<AppUser[]>([]);
  const [search, setSearch] = useState('');
  const [stats, setStats] = useState({ total: 0, today: 0, week: 0, active: 0 });
  const [selectedUser, setSelectedUser] = useState<AppUser | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [filterStream, setFilterStream] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');

  const fetchUsers = async () => {
    setIsLoading(true);
    setError('');
    try {
      const { data: reg12th, error: e1 } = await supabase
        .from('registrations_12th_learners')
        .select('id, full_name, email, phone, school_name, board, stream, preferred_course, preferred_institution, career_interests, created_at')
        .order('created_at', { ascending: false });

      const { data: regLearner, error: e2 } = await supabase
        .from('registrations_learners')
        .select('id, full_name, email, phone, institution, degree, created_at')
        .order('created_at', { ascending: false });

      const { data: regEmployer, error: e3 } = await supabase
        .from('registrations_employers')
        .select('id, company_name, contact_name, contact_email, contact_phone, created_at')
        .order('created_at', { ascending: false });

      const { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      const allUsers: AppUser[] = [];
      const seen = new Set<string>();

      (reg12th || []).forEach(r => {
        const key = r.phone || r.email || r.id;
        if (!seen.has(key)) {
          seen.add(key);
          allUsers.push({
            id: r.id, email: r.email || '', phone: r.phone || '',
            created_at: r.created_at, last_sign_in: r.created_at,
            provider: '12th Learner', full_name: r.full_name || '',
            school_name: r.school_name || '', stream: r.stream || '',
            district: r.preferred_institution || '', pass_out_year: r.preferred_course || '',
            career_interest: Array.isArray(r.career_interests) ? r.career_interests.join(', ') : (r.career_interests || ''),
          });
        }
      });

      (regLearner || []).forEach(r => {
        const key = r.phone || r.email || r.id;
        if (!seen.has(key)) {
          seen.add(key);
          allUsers.push({
            id: r.id, email: r.email || '', phone: r.phone || '',
            created_at: r.created_at, last_sign_in: r.created_at,
            provider: 'Learner', full_name: r.full_name || '',
            school_name: r.institution || '', stream: r.degree || '',
            district: '', pass_out_year: '', career_interest: '',
          });
        }
      });

      (regEmployer || []).forEach(r => {
        const key = r.contact_phone || r.contact_email || r.id;
        if (!seen.has(key)) {
          seen.add(key);
          allUsers.push({
            id: r.id, email: r.contact_email || '', phone: r.contact_phone || '',
            created_at: r.created_at, last_sign_in: r.created_at,
            provider: 'Employer', full_name: r.contact_name || '',
            school_name: r.company_name || '', stream: '', district: '',
            pass_out_year: '', career_interest: '',
          });
        }
      });

      (profiles || []).forEach((p: any) => {
        const key = p.bio || p.display_name || p.id;
        if (!seen.has(key)) {
          seen.add(key);
          allUsers.push({
            id: p.id, email: p.bio || '', phone: '',
            created_at: p.created_at || '', last_sign_in: p.updated_at || '',
            provider: 'App User', full_name: p.display_name || '',
            school_name: '', stream: '', district: '',
            pass_out_year: '', career_interest: '',
          });
        }
      });

      allUsers.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setUsers(allUsers);

      const now = new Date();
      const todayStr = now.toDateString();
      const weekAgo = new Date(now); weekAgo.setDate(weekAgo.getDate() - 7);
      setStats({
        total: allUsers.length,
        today: allUsers.filter(u => new Date(u.created_at).toDateString() === todayStr).length,
        week: allUsers.filter(u => new Date(u.created_at) >= weekAgo).length,
        active: allUsers.filter(u => u.last_sign_in && new Date(u.last_sign_in).toDateString() === todayStr).length,
      });

      if (allUsers.length === 0 && !e1 && !e2 && !e3) {
        setError('No registered users yet. Users will appear here after they register on the app.');
      }
    } catch (err: any) {
      setError('Failed to load data. ' + (err?.message || ''));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    if (password === ADMIN_PASS) { setIsLoggedIn(true); setError(''); fetchUsers(); }
    else setError('Wrong password');
  };

  const filtered = users.filter(u => {
    if (filterStream && u.stream !== filterStream) return false;
    if (filterDistrict && u.district !== filterDistrict) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return u.full_name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.phone.includes(q) || u.school_name.toLowerCase().includes(q) || u.stream.toLowerCase().includes(q) || u.district.toLowerCase().includes(q) || u.career_interest.toLowerCase().includes(q);
  });

  const uniqueStreams = [...new Set(users.map(u => u.stream).filter(Boolean))];
  const uniqueDistricts = [...new Set(users.map(u => u.district).filter(Boolean))];

  const formatDate = (d: string) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };
  const formatDateTime = (d: string) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const exportCSV = () => {
    const headers = ['S.No', 'Full Name', 'Mobile', 'Email', 'School Name', 'Stream', 'Pass-Out Year', 'District', 'Career Interest', 'Registered On'];
    const rows = filtered.map((u, i) => [
      i + 1, u.full_name, u.phone, u.email, u.school_name, u.stream, u.pass_out_year, u.district, u.career_interest, formatDate(u.created_at)
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `vazhikatti-learners-${new Date().toISOString().split('T')[0]}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  // LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-[#0f172a] p-8 text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <Shield className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">VAZHIKATTI Admin</h1>
            <p className="text-xs text-gray-400 mt-2">Learner Management Console</p>
          </div>
          <div className="p-6 space-y-4">
            <input type="password" placeholder="Enter admin password"
              value={password} onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-sm focus:border-[#0f172a] outline-none transition-colors" />
            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
            <button onClick={handleLogin}
              className="w-full py-3 rounded-lg bg-[#0f172a] text-white text-sm font-bold hover:bg-[#1e293b] transition-colors">
              Access Dashboard
            </button>
            <button onClick={() => navigate('/')} className="w-full py-2 text-sm text-gray-400 hover:text-gray-600">← Back to App</button>
          </div>
        </div>
      </div>
    );
  }

  // ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Top Nav Bar */}
      <div className="bg-[#0f172a] border-b border-[#1e293b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="text-sm font-bold text-white tracking-tight">VAZHIKATTI</span>
              <span className="text-xs text-gray-400 ml-2 hidden sm:inline">Learner Management</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={fetchUsers} disabled={isLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-colors">
              <RefreshCw className={cn("w-3.5 h-3.5", isLoading && "animate-spin")} /> Refresh
            </button>
            <button onClick={exportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-medium hover:bg-emerald-500/30 transition-colors">
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
            <button onClick={() => { setIsLoggedIn(false); setPassword(''); setUsers([]); setSelectedUser(null); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-red-500/20 text-red-300 text-xs font-medium hover:bg-red-500/30 transition-colors">
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 space-y-5">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, label: 'Total Learners', value: stats.total, bg: 'bg-blue-50', color: 'text-blue-700', border: 'border-blue-200' },
            { icon: UserCheck, label: 'Registered Today', value: stats.today, bg: 'bg-emerald-50', color: 'text-emerald-700', border: 'border-emerald-200' },
            { icon: Clock, label: 'This Week', value: stats.week, bg: 'bg-violet-50', color: 'text-violet-700', border: 'border-violet-200' },
            { icon: GraduationCap, label: 'Unique Streams', value: uniqueStreams.length, bg: 'bg-amber-50', color: 'text-amber-700', border: 'border-amber-200' },
          ].map((s, i) => (
            <div key={i} className={cn("rounded-lg p-4 border", s.bg, s.border)}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">{s.label}</p>
                  <p className={cn("text-3xl font-black mt-1", s.color)}>{s.value}</p>
                </div>
                <s.icon className={cn("w-8 h-8 opacity-30", s.color)} />
              </div>
            </div>
          ))}
        </div>

        {/* Search & Filters Bar */}
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search by name, phone, school, district..."
                value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-9 py-2.5 rounded-md border border-gray-200 text-sm bg-gray-50 outline-none focus:border-blue-400 focus:bg-white transition-all" />
              {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-gray-400" /></button>}
            </div>
            <div className="flex gap-2">
              <select value={filterStream} onChange={e => setFilterStream(e.target.value)}
                className="px-3 py-2.5 rounded-md border border-gray-200 text-xs bg-gray-50 outline-none focus:border-blue-400 min-w-[130px]">
                <option value="">All Streams</option>
                {uniqueStreams.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select value={filterDistrict} onChange={e => setFilterDistrict(e.target.value)}
                className="px-3 py-2.5 rounded-md border border-gray-200 text-xs bg-gray-50 outline-none focus:border-blue-400 min-w-[130px]">
                <option value="">All Districts</option>
                {uniqueDistricts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              {(filterStream || filterDistrict) && (
                <button onClick={() => { setFilterStream(''); setFilterDistrict(''); }}
                  className="px-3 py-2.5 rounded-md bg-red-50 text-red-600 text-xs font-medium border border-red-200 hover:bg-red-100">
                  Clear
                </button>
              )}
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-400">
            Showing {filtered.length} of {users.length} learners
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-16">
            <Loader2 className="w-8 h-8 text-gray-400 mx-auto animate-spin" />
            <p className="text-sm text-gray-500 mt-3">Loading learner data...</p>
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-800">{error}</div>
        )}

        {/* Main Content — List + Detail Panel */}
        {!isLoading && filtered.length > 0 && (
          <div className="flex flex-col lg:flex-row gap-4">
            {/* LEFT — User List Table */}
            <div className={cn("bg-white rounded-lg border border-gray-200 overflow-hidden", selectedUser ? "lg:w-[55%]" : "w-full")}>
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-2 px-4 py-2.5 bg-[#f1f3f5] border-b border-gray-200 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                <div className="col-span-1">#</div>
                <div className="col-span-3">Learner Name</div>
                <div className="col-span-2">Mobile</div>
                <div className="col-span-2">School</div>
                <div className="col-span-2">District</div>
                <div className="col-span-2">Registered</div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-gray-100 max-h-[65vh] overflow-y-auto">
                {filtered.map((user, idx) => (
                  <div key={user.id}
                    onClick={() => setSelectedUser(selectedUser?.id === user.id ? null : user)}
                    className={cn(
                      "px-4 py-3 cursor-pointer transition-all",
                      selectedUser?.id === user.id ? "bg-blue-50 border-l-4 border-l-blue-500" : "hover:bg-gray-50 border-l-4 border-l-transparent"
                    )}>
                    {/* Mobile view */}
                    <div className="md:hidden">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0f172a] to-[#334155] flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-white">{(user.full_name || '?')[0].toUpperCase()}</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{user.full_name || '—'}</p>
                            <p className="text-xs text-gray-500">{user.phone || user.email || '—'}</p>
                          </div>
                        </div>
                        {selectedUser?.id === user.id ? <ChevronDown className="w-4 h-4 text-blue-500" /> : <ChevronRight className="w-4 h-4 text-gray-300" />}
                      </div>
                      {/* Mobile expanded detail */}
                      {selectedUser?.id === user.id && (
                        <div className="mt-3 ml-[46px] space-y-2">
                          <DetailRow icon={School} label="School" value={user.school_name} />
                          <DetailRow icon={GraduationCap} label="Stream" value={user.stream} />
                          <DetailRow icon={Calendar} label="Pass-Out Year" value={user.pass_out_year} />
                          <DetailRow icon={MapPin} label="District" value={user.district} />
                          <DetailRow icon={Briefcase} label="Career Interest" value={user.career_interest} />
                          <DetailRow icon={Mail} label="Email" value={user.email} />
                          <DetailRow icon={Clock} label="Registered" value={formatDateTime(user.created_at)} />
                        </div>
                      )}
                    </div>

                    {/* Desktop view — table row */}
                    <div className="hidden md:grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-1">
                        <span className="text-xs font-medium text-gray-400">{idx + 1}</span>
                      </div>
                      <div className="col-span-3 flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0f172a] to-[#334155] flex items-center justify-center flex-shrink-0">
                          <span className="text-[10px] font-bold text-white">{(user.full_name || '?')[0].toUpperCase()}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{user.full_name || '—'}</p>
                          <p className="text-[10px] text-gray-400 truncate">{user.career_interest || '—'}</p>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-gray-700 font-medium">{user.phone || '—'}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-gray-600 truncate">{user.school_name || '—'}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-gray-600">{user.district || '—'}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-gray-500">{formatDate(user.created_at)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Detail Panel (Desktop only, like Outlook reading pane) */}
            {selectedUser && (
              <div className="hidden lg:block lg:w-[45%] bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{(selectedUser.full_name || '?')[0].toUpperCase()}</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">{selectedUser.full_name || 'Unknown'}</h2>
                      <p className="text-sm text-gray-400 mt-0.5">{selectedUser.provider}</p>
                    </div>
                  </div>
                </div>

                {/* Detail Fields */}
                <div className="p-6 space-y-1">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Contact Information</h3>
                  <DetailField icon={Phone} label="Mobile Number" value={selectedUser.phone} />
                  <DetailField icon={Mail} label="Email Address" value={selectedUser.email || 'Not provided'} muted={!selectedUser.email} />

                  <div className="border-t border-gray-100 my-4" />

                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Academic Details</h3>
                  <DetailField icon={School} label="School Name" value={selectedUser.school_name} />
                  <DetailField icon={GraduationCap} label="Stream" value={selectedUser.stream} />
                  <DetailField icon={Calendar} label="Pass-Out Year" value={selectedUser.pass_out_year} />

                  <div className="border-t border-gray-100 my-4" />

                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Location & Career</h3>
                  <DetailField icon={MapPin} label="District" value={selectedUser.district} />
                  <DetailField icon={Briefcase} label="Career Interest" value={selectedUser.career_interest} />

                  <div className="border-t border-gray-100 my-4" />

                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Registration</h3>
                  <DetailField icon={Clock} label="Registered On" value={formatDateTime(selectedUser.created_at)} />
                </div>
              </div>
            )}
          </div>
        )}

        {!isLoading && filtered.length === 0 && !error && (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <Users className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-500">No learners found</p>
            <p className="text-xs text-gray-400 mt-1">Try changing your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable detail field for the reading pane
const DetailField = ({ icon: Icon, label, value, muted = false }: { icon: any; label: string; value: string; muted?: boolean }) => (
  <div className="flex items-center gap-3 py-2.5 px-3 rounded-md hover:bg-gray-50 transition-colors">
    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
      <Icon className="w-4 h-4 text-gray-500" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{label}</p>
      <p className={cn("text-sm font-medium truncate", muted ? "text-gray-300 italic" : "text-gray-800")}>{value || '—'}</p>
    </div>
  </div>
);

// Compact detail row for mobile expanded view
const DetailRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => {
  if (!value) return null;
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
      <span className="text-[11px] text-gray-500 min-w-[80px]">{label}:</span>
      <span className="text-[11px] font-medium text-gray-800">{value}</span>
    </div>
  );
};

export default SimpleAdmin;
