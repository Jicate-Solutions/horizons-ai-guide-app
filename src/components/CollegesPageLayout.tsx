import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Home, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PillNavigation } from '@/components/PillNavigation';
import { supabase } from '@/integrations/supabase/client';
import FloatingChatButton from '@/components/FloatingChatButton';
import { ChatModalProvider } from '@/hooks/useChatModal';

interface CollegesPageLayoutProps {
  activeTab: string;
  children: React.ReactNode;
}

/** Brief loading screen shown while a tab "opens" as a new page. */
const TabLoader = () => (
  <div className="flex flex-col items-center justify-center py-24">
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 rounded-full border-[3px] border-emerald-100" />
      <div className="absolute inset-0 rounded-full border-[3px] border-emerald-600 border-t-transparent animate-spin" />
    </div>
    <p className="mt-4 text-sm font-medium text-emerald-700">Loading…</p>
  </div>
);

export const CollegesPageLayout = ({ activeTab, children }: CollegesPageLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Show a short loading effect on every tab change, so each tab opens
  // as a distinct "next page" rather than appearing to expand inline.
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Scroll the page back to the top so the new tab reads as a fresh screen.
    window.scrollTo({ top: 0, behavior: 'auto' });
    const t = setTimeout(() => setIsLoading(false), 420);
    return () => clearTimeout(t);
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      // Even if Supabase fails, clear local state
    }
    // Clear any local storage
    localStorage.removeItem('vzk_student_profile');
    // Redirect to home
    window.location.href = '/';
  };

  return (
    <ChatModalProvider>
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50/50 to-amber-50/30">
      {/* ═══ COMPACT HEADER ═══ */}
      <header className="bg-gradient-to-r from-emerald-700 via-green-700 to-emerald-800 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=200&fit=crop&auto=format" alt="" className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none" loading="lazy" />
        <div className="px-3 py-2.5 md:px-6 md:py-4 flex items-center gap-3 relative z-10">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white/80 hover:text-white hover:bg-white/15 rounded-lg h-9 w-9 flex-shrink-0"
            onClick={() => navigate('/')}
          >
            <Home className="h-4 w-4" />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="text-sm md:text-xl font-bold text-white leading-tight">
              VAZHIKATTI
            </h1>
            <p className="text-[10px] md:text-sm text-amber-300 leading-tight">
              AI Career Guide · வழிகாட்டி
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/15 hover:bg-red-500/80 active:bg-red-600 text-white text-xs font-semibold transition-all flex-shrink-0"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* ═══ STICKY NAVIGATION ═══ */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-2 py-1.5 md:px-4 md:py-2 flex items-center gap-1.5">
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8 flex-shrink-0 rounded-lg hover:bg-emerald-50 text-emerald-700"
            onClick={() => navigate('/')}
          >
            <Home className="h-4 w-4" />
          </Button>
          <div className="flex-1 overflow-hidden">
            <PillNavigation activeTab={activeTab} />
          </div>
        </div>
      </div>

      {/* ═══ SCROLLABLE CONTENT ═══ */}
      <main className="px-3 py-3 md:px-4 md:py-6 max-w-7xl mx-auto" id="colleges-content-scroll">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="tab-loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <TabLoader />
            </motion.div>
          ) : (
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ═══ FLOATING AI CHAT ═══ */}
      <FloatingChatButton />
    </div>
    </ChatModalProvider>
  );
};
