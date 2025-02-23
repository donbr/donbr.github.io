import { useState, useEffect } from 'react';
import { isUrlAllowedByCSP, getScriptIntegrity } from '../lib/security';

interface ScriptOptions {
  async?: boolean;
  nonce?: string;
  integrity?: string;
  crossOrigin?: string;
}

type ScriptStatus = 'idle' | 'loading' | 'ready' | 'error';

export default function useScript(
  src: string | null,
  options: ScriptOptions = {}
): ScriptStatus {
  const [status, setStatus] = useState<ScriptStatus>('idle');

  useEffect(() => {
    if (!src) {
      return;
    }

    if (!isUrlAllowedByCSP(src)) {
      setStatus('error');
      console.error(`Script URL "${src}" is not allowed by CSP`);
      return;
    }

    setStatus('loading');
    
    const script = document.createElement('script');
    script.src = src;
    script.async = options.async ?? true;
    
    // Apply security options
    if (options.nonce) script.nonce = options.nonce;
    
    // Use provided integrity or get from scriptHashes
    const integrity = options.integrity || getScriptIntegrity(src);
    if (integrity) {
      script.integrity = integrity;
      script.crossOrigin = options.crossOrigin || 'anonymous';
    }

    const handleLoad = () => setStatus('ready');
    const handleError = () => setStatus('error');

    script.addEventListener('load', handleLoad);
    script.addEventListener('error', handleError);
    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
      script.remove();
    };
  }, [src, options.async, options.nonce, options.integrity, options.crossOrigin]);

  return status;
}
