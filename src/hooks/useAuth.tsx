import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName?: string, learnerDetails?: {
    phone?: string; schoolName?: string; stream?: string; passOutYear?: string;
    district?: string; careerInterest?: string; userEmail?: string;
  }) => Promise<{ error: Error | null; data?: any }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, displayName?: string, learnerDetails?: {
    phone?: string; schoolName?: string; stream?: string; passOutYear?: string;
    district?: string; careerInterest?: string; userEmail?: string;
  }) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          display_name: displayName,
          phone: learnerDetails?.phone || '',
          school_name: learnerDetails?.schoolName || '',
          stream: learnerDetails?.stream || '',
          pass_out_year: learnerDetails?.passOutYear || '',
          district: learnerDetails?.district || '',
          career_interest: learnerDetails?.careerInterest || '',
          user_email: learnerDetails?.userEmail || '',
          registered_at: new Date().toISOString(),
        },
      },
    });

    return { error: error as Error | null, data };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Ensure profile exists for admin visibility
    if (!error && data?.user) {
      try {
        const authEmail = data.user.email || email;
        const displayName = data.user.user_metadata?.display_name || '';
        
        // Extract phone from vazhikatti email format: 9876543210@vazhikatti.app
        const phone = authEmail.includes('@vazhikatti.app') 
          ? authEmail.split('@')[0] 
          : '';
        
        // Check if profile already has full details (7 parts in bio)
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('bio')
          .eq('user_id', data.user.id)
          .limit(1);
        
        const existingBio = existingProfile?.[0]?.bio || '';
        const existingParts = existingBio.split('|').map((s: string) => s.trim());
        
        // Only update if profile doesn't have full details yet
        if (existingParts.length < 3) {
          await supabase.from('profiles').upsert({
            user_id: data.user.id,
            display_name: displayName || phone || authEmail.split('@')[0],
            bio: phone || authEmail,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'user_id' });
        } else {
          // Just update the timestamp
          await supabase.from('profiles').update({
            updated_at: new Date().toISOString(),
          }).eq('user_id', data.user.id);
        }
      } catch (profileErr) {
        console.warn('[VAZHIKATTI] Profile update failed:', profileErr);
      }
    }

    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
