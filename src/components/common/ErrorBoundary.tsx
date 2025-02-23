import React, { Component, ErrorInfo, ReactNode } from 'react';
import { analyticsService } from '../../lib/vitals';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorState {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary component to catch JavaScript errors anywhere in child component tree
 * and display a fallback UI instead of crashing the whole app
 */
class ErrorBoundary extends Component<Props, ErrorState> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false
    };
  }

  static getDerivedStateFromError(error: Error): ErrorState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    this.logError(error, errorInfo);
  }
  
  /**
   * Log error to analytics service
   * In production, this would connect to Sentry, LogRocket, etc.
   */
  private logError(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    // Track error in analytics
    analyticsService.trackEvent('error_boundary', {
      error: error.toString(),
      componentStack: errorInfo.componentStack,
      url: window.location.href
    });
    
    // Example integration with error monitoring services
    if (window.Sentry) {
      window.Sentry.captureException(error);
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Default fallback UI
      return (
        <div role="alert">Something went wrong. Please try again.</div>
      );
    }

    return this.props.children;
  }
}

// Add type definition for Sentry
declare global {
  interface Window {
    Sentry?: {
      captureException: (error: Error) => void;
    };
  }
}

export default ErrorBoundary;
