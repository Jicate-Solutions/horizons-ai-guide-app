import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, Loader2, RefreshCw, UserCheck, Clock, Mail, Phone, Search, X, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

interface AppUser {
  id: string;
  email: string;
  phone: string;
  created_at: string;
  last_sign_in: string;
  provider: string;
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

  const fetchUsers = async () => {
    setIsLoading(true);
    setError('');
    try {
      // Method 1: Fetch from registrations_12th_learners table
      const { data: reg12th, error: e1 } = await supabase
        .from('registrations_12th_learners')
        .select('id, full_name, email, phone, school_name, board, stream, preferred_course, created_at')
        .order('created_at', { ascending: false });

      // Method 2: Fetch from registrations_learners table
      const { data: regLearner, error: e2 } = await supabase
        .from('registrations_learners')
        .select('id, full_name, email, phone, institution, degree, created_at')
        .order('created_at', { ascending: false });

      // Method 3: Fetch from registrations_employers table
      const { data: regEmployer, error: e3 } = await supabase
        .from('registrations_employers')
        .select('id, company_name, contact_name, contact_email, contact_phone, created_at')
        .order('created_at', { ascending: false });

      // Also try profiles if it exists
      const { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      // Combine all users
      const allUsers: AppUser[] = [];
      const seenEmails = new Set<string>();

      // 12th learners
      (reg12th || []).forEach(r => {
        if (r.email && !seenEmails.has(r.email)) {
          seenEmails.add(r.email);
          allUsers.push({
            id: r.id,
            email: r.email || '',
            phone: r.phone || '',
            created_at: r.created_at,
            last_sign_in: r.created_at,
            provider: '12th Learner' + (r.school_name ? ` · ${r.school_name}` : '') + (r.stream ? ` · ${r.stream}` : ''),
          });
        }
      });

      // General learners
      (regLearner || []).forEach(r => {
        if (r.email && !seenEmails.has(r.email)) {
          seenEmails.add(r.email);
          allUsers.push({
            id: r.id,
            email: r.email || '',
            phone: r.phone || '',
            created_at: r.created_at,
            last_sign_in: r.created_at,
            provider: 'Learner' + (r.institution ? ` · ${r.institution}` : '') + (r.degree ? ` · ${r.degree}` : ''),
          });
        }
      });

      // Employers
      (regEmployer || []).forEach(r => {
        const email = r.contact_email || '';
        if (email && !seenEmails.has(email)) {
          seenEmails.add(email);
          allUsers.push({
            id: r.id,
            email: email,
            phone: r.contact_phone || '',
            created_at: r.created_at,
            last_sign_in: r.created_at,
            provider: 'Employer' + (r.company_name ? ` · ${r.company_name}` : ''),
          });
        }
      });

      // Profiles (auth users)
      (profiles || []).forEach((p: any) => {
        const email = p.bio || p.display_name || p.id;
        if (!seenEmails.has(email)) {
          seenEmails.add(email);
          allUsers.push({
            id: p.id,
            email: p.bio || '',
            phone: '',
            created_at: p.created_at || p.updated_at || '',
            last_sign_in: p.updated_at || p.created_at || '',
            provider: 'App User' + (p.display_name ? ` · ${p.display_name}` : ''),
          });
        }
      });

      // Sort by newest first
      allUsers.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setUsers(allUsers);

      // Calculate stats
      const now = new Date();
      const todayStr = now.toDateString();
      const weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 7);

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
    if (password === ADMIN_PASS) {
      setIsLoggedIn(true);
      setError('');
      fetchUsers();
    } else {
      setError('Wrong password');
    }
  };

  const filtered = users.filter(u => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return u.email.toLowerCase().includes(q) || u.phone.includes(q) || u.provider.toLowerCase().includes(q);
  });

  const formatDate = (d: string) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  // LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-center">
            <div className="w-14 h-14 bg-white/10 rounded-xl mx-auto mb-3 flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-lg font-bold text-white">VAZHIKATTI Admin</h1>
            <p className="text-xs text-gray-400 mt-1">Enter admin password to view user data</p>
          </div>
          <div className="p-6 space-y-4">
            <input type="password" placeholder="Admin Password"
              value={password} onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:border-gray-900 outline-none" />
            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
            <button onClick={handleLogin}
              className="w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800">
              Login
            </button>
            <button onClick={() => navigate('/')} className="w-full py-2 text-sm text-gray-500 hover:text-gray-700">← Back to App</button>
          </div>
        </div>
      </div>
    );
  }

  // ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-bold text-white">VAZHIKATTI Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={fetchUsers} disabled={isLoading}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20">
              <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
            </button>
            <button onClick={() => { setIsLoggedIn(false); setPassword(''); setUsers([]); }}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-500/20 text-red-300 text-xs font-bold">
              <LogOut className="w-3 h-3" /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Users, label: 'Total Users', value: stats.total, color: 'text-blue-600' },
            { icon: UserCheck, label: 'Today', value: stats.today, color: 'text-emerald-600' },
            { icon: Clock, label: 'This Week', value: stats.week, color: 'text-violet-600' },
            { icon: Users, label: 'Active Today', value: stats.active, color: 'text-amber-600' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-gray-200 text-center">
              <s.icon className={cn("w-5 h-5 mx-auto mb-1", s.color)} />
              <p className={cn("text-2xl font-black", s.color)}>{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search by email, phone, or type..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-xl border-2 border-gray-200 text-sm bg-white outline-none focus:border-gray-400" />
          {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-gray-400" /></button>}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-10">
            <Loader2 className="w-8 h-8 text-gray-400 mx-auto animate-spin" />
            <p className="text-sm text-gray-500 mt-2">Loading users...</p>
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800">{error}</div>
        )}

        {/* User List */}
        {!isLoading && filtered.length > 0 && (
          <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <p className="text-sm font-bold text-gray-700">Registered Users ({filtered.length})</p>
              <p className="text-xs text-gray-500">Newest first</p>
            </div>
            <div className="divide-y divide-gray-100">
              {filtered.map((user, idx) => (
                <div key={user.id} className="px-4 py-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-white">{(user.email || user.phone || '?')[0].toUpperCase()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        {user.email && (
                          <span className="text-sm font-bold text-gray-900 flex items-center gap-1 truncate">
                            <Mail className="w-3 h-3 text-gray-400 flex-shrink-0" /> {user.email}
                          </span>
                        )}
                        {user.phone && (
                          <span className="text-sm text-gray-600 flex items-center gap-1">
                            <Phone className="w-3 h-3 text-gray-400 flex-shrink-0" /> {user.phone}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Joined: {formatDate(user.created_at)}</p>
                      <div className="mt-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{user.provider}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">#{filtered.length - idx}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isLoading && filtered.length === 0 && !error && (
          <div className="text-center py-10 bg-white rounded-xl border border-gray-200">
            <Users className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleAdmin;
