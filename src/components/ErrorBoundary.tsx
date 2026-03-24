import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[VAZHIKATTI] Error caught by boundary:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          minHeight: '60vh', padding: '24px', fontFamily: 'system-ui, sans-serif',
        }}>
          <div style={{ textAlign: 'center', maxWidth: '400px' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '16px',
              background: '#fef2f2', display: 'flex', alignItems: 'center',
              justifyContent: 'center', margin: '0 auto 16px', fontSize: '28px',
            }}>
              ⚠️
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937', margin: '0 0 8px' }}>
              Something went wrong
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 20px', lineHeight: 1.5 }}>
              This page encountered an error. Please try refreshing.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: '10px 24px', borderRadius: '10px', border: 'none',
                  background: '#059669', color: '#fff', fontSize: '14px',
                  fontWeight: 600, cursor: 'pointer',
                }}
              >
                Refresh Page
              </button>
              <button
                onClick={() => { window.location.href = '/'; }}
                style={{
                  padding: '10px 24px', borderRadius: '10px',
                  border: '1px solid #d1d5db', background: '#fff',
                  color: '#374151', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                }}
              >
                Go Home
              </button>
            </div>
            {this.state.error && (
              <p style={{
                fontSize: '11px', color: '#9ca3af', marginTop: '20px',
                padding: '8px 12px', background: '#f9fafb', borderRadius: '8px',
                wordBreak: 'break-all',
              }}>
                {this.state.error.message}
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
