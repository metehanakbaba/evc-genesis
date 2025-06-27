import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button, Card, CardBody } from '@/shared/ui';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary component to catch JavaScript errors
 * Provides a fallback UI when errors occur
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (import.meta.env.DEV) {
      // Error logging would go to external service in production
      // console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    // Update state with error info
    this.setState({
      error,
      errorInfo,
    });

    // TODO: Log to error reporting service (e.g., Sentry)
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // Custom fallback provided
      if (fallback) {
        return <>{fallback}</>;
      }

      // Default error UI
      return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
          <Card className="w-full max-w-lg" padding="lg">
            <CardBody>
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>

                <h2 className="mt-4 font-semibold text-2xl text-white">
                  Something went wrong
                </h2>

                <p className="mt-2 text-gray-300">
                  We're sorry, but something unexpected happened. Please try
                  refreshing the page.
                </p>

                {import.meta.env.DEV && error && (
                  <details className="mt-4 rounded-md bg-gray-800 border border-gray-700 p-4 text-left">
                    <summary className="cursor-pointer font-medium text-gray-200">
                      Error details (Development only)
                    </summary>
                    <pre className="mt-2 overflow-auto text-gray-300 text-xs">
                      {error.toString()}
                      {error.stack}
                    </pre>
                  </details>
                )}

                <div className="mt-6 flex justify-center gap-4">
                  <Button
                    variant="secondary"
                    styleType="outline"
                    onClick={this.handleReset}
                  >
                    Try again
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      window.location.href = '/';
                    }}
                  >
                    Go to home
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      );
    }

    return children;
  }
}

// Hook for functional components to use error boundary
export const useErrorHandler = () => {
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return setError;
};
