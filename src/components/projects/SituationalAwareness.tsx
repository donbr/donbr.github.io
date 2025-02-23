import React, { useEffect, useRef } from 'react';
import viewerScriptUrl from '../../lib/situational-awareness.cjs?url';
import useScript from '../../hooks/useScript';

// Declare global ECharts type if needed
declare global {
  interface Window {
    echarts: any; // Replace 'any' with proper ECharts type if available
  }
}

const SituationalAwareness: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Retrieve nonce from meta tag if available
  const nonce = document.querySelector('meta[nonce]')?.getAttribute('nonce') || '';

  // Load ECharts using the useScript hook
  const echartsScriptStatus = useScript(
    'https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js',
    { async: true, nonce }
  );

  // Load the situational awareness script only after ECharts is ready
  const situationalScriptStatus = useScript(
    echartsScriptStatus === 'ready' ? viewerScriptUrl : null,
    { async: true, nonce }
  );

  useEffect(() => {
    if (echartsScriptStatus === 'ready' && situationalScriptStatus === 'ready') {
      // Initialize your visualization here
      // This will only run when both scripts are loaded
      if (containerRef.current && window.echarts) {
        // Your initialization code here
      }
    }
  }, [echartsScriptStatus, situationalScriptStatus]);

  return (
    <div>
      <div 
        id="graph-container" 
        ref={containerRef}
        style={{ 
          width: '100%', 
          height: '700px', 
          border: '1px solid #ddd', 
          backgroundColor: 'white' 
        }}
      ></div>
      <div className="mt-4 flex gap-4">
        <button 
          id="zoomIn" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
        >
          Zoom In
        </button>
        <button 
          id="zoomOut" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
        >
          Zoom Out
        </button>
        <button 
          id="resetView" 
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500"
        >
          Reset View
        </button>
        <button 
          id="toggleLayout" 
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
        >
          Toggle Layout
        </button>
      </div>
    </div>
  );
};

export default SituationalAwareness;
