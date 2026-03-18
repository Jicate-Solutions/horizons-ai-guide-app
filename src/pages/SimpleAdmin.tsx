import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, ArrowLeft, Loader2, RefreshCw, UserCheck, Clock, Mail, Phone, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppUser {
  id: string;
  email: string;
  phone: string;
  created_at: string;
  last_sign_in: string;
  provider: string;
  confirmed: boolean;
}

const SimpleAdmin = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [users, setUsers] = useState<AppUser[]>([]);
  const [total, setTotal] = useState(0);
  const [setupNeeded, setSetupNeeded] = useState(false);
  const [search, setSearch] = useState('');

  const fetchUsers = async (pwd: string) => {
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin-users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed');
        return false;
      }
      setUsers(data.users || []);
      setTotal(data.total || 0);
      setSetupNeeded(data.setupNeeded || false);
      return true;
    } catch {
      setError('Network error. Try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!password.trim()) return;
    const ok = await fetchUsers(password);
    if (ok) setIsLoggedIn(true);
  };

  const handleRefresh = () => fetchUsers(password);

  const filtered = users.filter(u => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return u.email.toLowerCase().includes(q) || u.phone.includes(q) || u.provider.toLowerCase().includes(q);
  });

  const formatDate = (d: string) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const todayCount = users.filter(u => {
    const d = new Date(u.created_at);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  }).length;

  const thisWeekCount = users.filter(u => {
    const d = new Date(u.created_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return d >= weekAgo;
  }).length;

  const activeToday = users.filter(u => {
    if (!u.last_sign_in) return false;
    const d = new Date(u.last_sign_in);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  }).length;

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
            <p className="text-xs text-gray-400 mt-1">Enter admin password to continue</p>
          </div>
          <div className="p-6 space-y-4">
            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:border-gray-900 outline-none"
            />
            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Checking...</> : 'Login'}
            </button>
            <button onClick={() => navigate('/')} className="w-full py-2 text-sm text-gray-500 hover:text-gray-700">
              ← Back to App
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-bold text-white">VAZHIKATTI Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleRefresh} disabled={isLoading}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20">
              <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
            </button>
            <button onClick={() => { setIsLoggedIn(false); setPassword(''); setUsers([]); }}
              className="px-3 py-2 rounded-lg bg-red-500/20 text-red-300 text-xs font-bold hover:bg-red-500/30">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-4">

        {/* Setup Warning */}
        {setupNeeded && (
          <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-200">
            <p className="text-sm font-bold text-amber-800">⚠️ Setup Required</p>
            <p className="text-xs text-amber-700 mt-1">Add <strong>SUPABASE_SERVICE_ROLE_KEY</strong> in Vercel → Settings → Environment Variables.</p>
            <p className="text-xs text-amber-600 mt-1">Find it at: Supabase Dashboard → Settings → API → service_role key</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <p className="text-2xl font-black text-gray-900">{total}</p>
            <p className="text-xs text-gray-500">Total Users</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <UserCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
            <p className="text-2xl font-black text-emerald-600">{todayCount}</p>
            <p className="text-xs text-gray-500">Registered Today</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <Clock className="w-5 h-5 text-violet-600 mx-auto mb-1" />
            <p className="text-2xl font-black text-violet-600">{thisWeekCount}</p>
            <p className="text-xs text-gray-500">This Week</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <Users className="w-5 h-5 text-amber-600 mx-auto mb-1" />
            <p className="text-2xl font-black text-amber-600">{activeToday}</p>
            <p className="text-xs text-gray-500">Active Today</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text" placeholder="Search by email or phone..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-xl border-2 border-gray-200 text-sm focus:border-gray-400 outline-none bg-white"
          />
          {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-gray-400" /></button>}
        </div>

        {/* User List */}
        <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <p className="text-sm font-bold text-gray-700">Registered Users ({filtered.length})</p>
            <p className="text-xs text-gray-500">Sorted by newest first</p>
          </div>

          {filtered.length === 0 ? (
            <div className="p-10 text-center">
              <Users className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">{setupNeeded ? 'Add SUPABASE_SERVICE_ROLE_KEY to see users' : 'No users found'}</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map((user, idx) => (
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
                          <span className="text-sm font-bold text-gray-900 flex items-center gap-1">
                            <Phone className="w-3 h-3 text-gray-400 flex-shrink-0" /> {user.phone}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span className="text-xs text-gray-500">Joined: {formatDate(user.created_at)}</span>
                        <span className="text-xs text-gray-500">Last login: {formatDate(user.last_sign_in)}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full",
                          user.provider === 'phone' ? 'bg-blue-100 text-blue-700' :
                          user.provider === 'google' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-600'
                        )}>
                          {user.provider === 'phone' ? '📱 Phone' : user.provider === 'google' ? '🔵 Google' : '📧 Email'}
                        </span>
                        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full",
                          user.confirmed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        )}>
                          {user.confirmed ? '✅ Verified' : '⏳ Unverified'}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">#{filtered.length - idx}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleAdmin;
