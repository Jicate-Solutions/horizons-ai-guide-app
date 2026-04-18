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
      const { data } = await (supabase as any)
        .from('user_payments')
        .select('id')
        .eq('user_id', user.id)
        .eq('status', 'paid')
        .maybeSingle();
      setHasPaid(!!data);
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
