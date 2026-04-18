import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface PaymentContextType {
  hasPaid: boolean;
  loading: boolean;
  refreshPayment: () => void;
}

const PaymentContext = createContext<PaymentContextType>({
  hasPaid: false,
  loading: true,
  refreshPayment: () => {},
});

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [hasPaid, setHasPaid] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkPayment = async () => {
    if (!user) { setHasPaid(false); setLoading(false); return; }
    try {
      // First check localStorage (instant, no DB needed)
      const localKey = `vzk_paid_${user.id}`;
      if (localStorage.getItem(localKey) === 'true') {
        setHasPaid(true); setLoading(false); return;
      }
      // Then try Supabase if available
      const { data, error } = await (supabase as any)
        .from('user_payments')
        .select('id')
        .eq('user_id', user.id)
        .eq('status', 'paid')
        .maybeSingle();
      if (!error && data) {
        localStorage.setItem(localKey, 'true');
        setHasPaid(true);
      } else {
        setHasPaid(false);
      }
    } catch {
      setHasPaid(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { checkPayment(); }, [user]);

  return (
    <PaymentContext.Provider value={{ hasPaid, loading, refreshPayment: checkPayment }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);
