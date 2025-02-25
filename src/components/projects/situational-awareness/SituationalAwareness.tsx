import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactECharts from 'echarts-for-react';
import Layout from '@/components/layout/Layout';
import graphData from '@/data/situational-awareness-graph.json';
import { useGraphVisualization } from './useGraphVisualization';
import { GraphData } from './types';

const SituationalAwareness: React.FC = () => {
  const { option } = useGraphVisualization({ graphData: graphData as GraphData });
  const chartRef = useRef<ReactECharts>(null);
  const [isClient, setIsClient] = useState(false);
  
  // Wait for component to be mounted to avoid SSR issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle zoom controls
  const handleZoomIn = () => {
    const chart = chartRef.current?.getEchartsInstance();
    if (chart) {
      try {
        const option = chart.getOption();
        // Access series as unknown first
        const seriesOption = (option as unknown as { series?: Array<{ zoom?: number }> });
        const zoom = seriesOption.series?.[0]?.zoom || 1;
        
        chart.setOption({
          series: [{
            zoom: zoom * 1.2
          }]
        });
      } catch (error) {
        console.error('Error adjusting zoom:', error);
      }
    }
  };

  const handleZoomOut = () => {
    const chart = chartRef.current?.getEchartsInstance();
    if (chart) {
      try {
        const option = chart.getOption();
        // Access series as unknown first
        const seriesOption = (option as unknown as { series?: Array<{ zoom?: number }> });
        const zoom = seriesOption.series?.[0]?.zoom || 1;
        
        chart.setOption({
          series: [{
            zoom: zoom * 0.8
          }]
        });
      } catch (error) {
        console.error('Error adjusting zoom:', error);
      }
    }
  };

  const handleResetView = () => {
    const chart = chartRef.current?.getEchartsInstance();
    if (chart) {
      chart.dispatchAction({
        type: 'restore'
      });
    }
  };

  const handleToggleLayout = () => {
    const chart = chartRef.current?.getEchartsInstance();
    if (chart) {
      try {
        const option = chart.getOption();
        // Access series as unknown first
        const seriesOption = (option as unknown as { series?: Array<{ layout?: string }> });
        const isForceLayout = seriesOption.series?.[0]?.layout === 'force';
        
        chart.setOption({
          series: [{
            layout: isForceLayout ? 'circular' : 'force'
          }]
        });
      } catch (error) {
        console.error('Error toggling layout:', error);
      }
    }
  };

  // Force chart resize on window resize
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.getEchartsInstance().resize();
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Initial resize after component mounts
    setTimeout(handleResize, 200);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout>
      <div className="bg-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Situational Awareness Graph</h1>
          <p className="text-gray-600 mb-8">
            Interactive network visualization demonstrating relationships between different aspects of situational awareness,
            including disaster response, cybersecurity threats, and supply chain disruptions.
          </p>

          {/* Graph Container */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-full h-[700px] border border-gray-200">
              {isClient && option && (
                <ReactECharts 
                  ref={chartRef}
                  option={option} 
                  style={{ height: '100%', width: '100%' }}
                  opts={{ renderer: 'canvas' }}
                  onEvents={{
                    // Ensure chart is properly sized after render
                    'rendered': (): void => {
                      if (chartRef.current) {
                        setTimeout(() => {
                          chartRef.current?.getEchartsInstance().resize();
                        }, 0);
                      }
                    }
                  }}
                />
              )}
            </div>
            
            {/* Controls */}
            <div className="mt-4 flex flex-wrap gap-4">
              <button 
                onClick={handleZoomIn}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors"
              >
                Zoom In
              </button>
              <button 
                onClick={handleZoomOut}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors"
              >
                Zoom Out
              </button>
              <button 
                onClick={handleResetView}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-colors"
              >
                Reset View
              </button>
              <button 
                onClick={handleToggleLayout}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition-colors"
              >
                Toggle Layout
              </button>
            </div>
          </div>

          {/* Technical Details */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Implementation Details</h2>
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-4">
                This visualization demonstrates the interconnected nature of different situational awareness domains:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Disaster Response and Emergency Management</li>
                <li>Cybersecurity Threat Propagation</li>
                <li>Supply Chain Disruption Analysis</li>
                <li>Public Safety Monitoring</li>
                <li>Military Operations Intelligence</li>
              </ul>
              <p className="text-gray-600 mt-4">
                The graph shows relationships between these domains and their supporting components,
                highlighting the complex nature of situational awareness in modern systems.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link to="/assets/projects" className="text-blue-600 hover:text-blue-800">
              ← Back to Projects
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SituationalAwareness;