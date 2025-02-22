import { useState, useEffect } from 'react';
import { isUrlAllowedByCSP, getScriptIntegrity } from '../lib/security';

interface ScriptStatus {
  loaded: boolean;
  error: Error | null;
}

/**
 * Custom hook to load an external script with security best practices
 * @param src Script URL
 * @returns Script loading status
 */
export default function useScript(src: string): ScriptStatus {
  const [status, setStatus] = useState<ScriptStatus>({
    loaded: false,
    error: null
  });

  useEffect(() => {
    // Skip if src is empty
    if (!src) {
      return;
    }
    
    // Check if URL is allowed by CSP
    if (!isUrlAllowedByCSP(src)) {
      setStatus({
        loaded: false,
        error: new Error(`Script URL "${src}" is not allowed by CSP`)
      });
      return;
    }

    // Look for existing script
    let script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;

    if (!script) {
      // Create script
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      
      // Add integrity check if available
      const integrity = getScriptIntegrity(src);
      if (integrity) {
        script.integrity = integrity;
        script.crossOrigin = 'anonymous';
      }
      
      // Add to document
      document.body.appendChild(script);
      
      // Handle events
      const handleLoad = () => setStatus({ loaded: true, error: null });
      const handleError = (err: Event | string) => {
        const error = err instanceof Event ? new Error(`Failed to load ${src}`) : new Error(err);
        setStatus({ loaded: false, error });
      };
      
      script.addEventListener('load', handleLoad);
      script.addEventListener('error', handleError as EventListener);
      
      // Cleanup
      return () => {
        script.removeEventListener('load', handleLoad);
        script.removeEventListener('error', handleError as EventListener);
        
        // Only remove if not needed elsewhere
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    } else {
      // Script already exists
      setStatus({ loaded: true, error: null });
    }
  }, [src]);

  return status;
}
