import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { usePayment } from '@/hooks/usePayment';
import { Loader2 } from 'lucide-react';

interface PaymentRouteProps {
  children: React.ReactNode;
}

const PaymentRoute = ({ children }: PaymentRouteProps) => {
  const { user, loading: authLoading } = useAuth();
  const { hasPaid, loading: paymentLoading } = usePayment();

  if (authLoading || paymentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;
  if (!hasPaid) return <Navigate to="/unlock" replace />;

  return <>{children}</>;
};

export default PaymentRoute;
