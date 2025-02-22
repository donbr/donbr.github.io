import React, { useEffect, useRef, useState } from 'react';
import ErrorBoundary from '../common/ErrorBoundary';

interface ScriptStatus {
  loaded: boolean;
  error: Error | null;
}

/**
 * GdeltViewer component that loads and integrates with the legacy GDELT viewer script
 */
const GdeltViewer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptStatus, setScriptStatus] = useState<ScriptStatus>({ loaded: false, error: null });
  
  // Calculate script URL with content hash (will be generated during build)
  const scriptUrl = '/js/gdelt-gkg.js';
  
  useEffect(() => {
    // Load the legacy script
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    
    // Handle script loading events
    script.onload = () => {
      setScriptStatus({ loaded: true, error: null });
    };
    
    script.onerror = (e) => {
      setScriptStatus({ loaded: false, error: new Error('Failed to load GDELT script') });
      console.error('Failed to load GDELT script:', e);
    };
    
    // Add integrity check if available
    if (window.scriptHashes && window.scriptHashes[scriptUrl]) {
      script.integrity = window.scriptHashes[scriptUrl];
      script.crossOrigin = 'anonymous';
    }
    
    document.body.appendChild(script);
    
    // Clean up
    return () => {
      document.body.removeChild(script);
    };
  }, [scriptUrl]);
  
  if (scriptStatus.error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading GDELT Viewer</h3>
        <p className="text-red-600">
          There was a problem loading the GDELT viewer. Please try refreshing the page.
        </p>
      </div>
    );
  }
  
  return (
    <ErrorBoundary>
      <div className="gdelt-container">
        {!scriptStatus.loaded && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Loading GDELT viewer...</p>
          </div>
        )}
        <div id="root" ref={containerRef} className={scriptStatus.loaded ? '' : 'opacity-0'} />
      </div>
    </ErrorBoundary>
  );
};

// Add type definition for script hashes
declare global {
  interface Window {
    scriptHashes?: Record<string, string>;
  }
}

export default GdeltViewer;
