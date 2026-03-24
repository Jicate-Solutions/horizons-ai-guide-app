import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, GraduationCap, Calculator, Briefcase, BookOpen, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error:", location.pathname);
  }, [location.pathname]);

  const quickLinks = [
    { label: 'Home', href: '/', icon: Home, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { label: 'Career Assessment', href: '/career-assessment', icon: GraduationCap, color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { label: 'Cutoff Calculator', href: '/edu-cutoff', icon: Calculator, color: 'bg-violet-50 text-violet-700 border-violet-200' },
    { label: 'Govt Exams', href: '/government-exams', icon: BookOpen, color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { label: 'Job Portal', href: '/jobs', icon: Briefcase, color: 'bg-rose-50 text-rose-700 border-rose-200' },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🔍</span>
        </div>
        <h1 className="text-6xl font-black text-gray-900 mb-2">404</h1>
        <p className="text-lg text-gray-600 mb-2">Page not found</p>
        <p className="text-sm text-gray-400 mb-8">
          The page <code className="bg-gray-200 px-2 py-0.5 rounded text-xs">{location.pathname}</code> doesn't exist.
        </p>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          {quickLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-all hover:scale-[1.02] hover:shadow-md ${link.color}`}
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to VAZHIKATTI Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
