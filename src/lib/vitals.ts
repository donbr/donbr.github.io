import type { Metric } from 'web-vitals';

// Modern metric type (includes INP instead of FID)
type MetricType = Metric & {
  name: 'LCP' | 'FID' | 'CLS' | 'INP' | 'TTFB' | 'FCP';
};

// Unified handler for all metrics
function reportWebVitals(metric: MetricType): void {
  console.log(metric.name, metric.value);
  
  if (window.gtag) {
    window.gtag('event', 'web-vital', {
      event_category: 'Web Vitals',
      event_label: metric.name,
      value: Math.round(metric.value),
      non_interaction: true,
    });
  }
}

export function initWebVitals(): void {
  if (import.meta.env.PROD) {
    import('web-vitals').then((webVitals) => {
      webVitals.onCLS(reportWebVitals);
      webVitals.onFID(reportWebVitals);
      webVitals.onLCP(reportWebVitals);
      webVitals.onTTFB(reportWebVitals);
      webVitals.onFCP(reportWebVitals);
    });
  }
}

// Add to vitals.ts
export const analyticsService = {
  trackError: (error: Error, componentStack: string) => {
    console.error('Application Error:', error, componentStack);
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: true
      });
    }
  }
};

// Add type definition for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

