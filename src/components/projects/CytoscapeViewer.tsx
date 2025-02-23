import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useScript from '../../hooks/useScript';
import { cytoscapeStyles } from '../../config/cytoscape-styles';
import { fetchNetworkData } from '../../services/network';
import type { NetworkData } from '../../types/cytoscape';

const CytoscapeViewer: React.FC = () => {
  const { networkId } = useParams<{ networkId: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [networkData, setNetworkData] = useState<NetworkData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cytoscapeStatus = useScript(
    'https://unpkg.com/cytoscape@3.31.0/dist/cytoscape.min.js',
    { async: true }
  );

  useEffect(() => {
    const loadNetwork = async () => {
      try {
        const data = await fetchNetworkData(networkId);
        setNetworkData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load network');
      }
    };

    if (cytoscapeStatus === 'ready') {
      loadNetwork();
    }
  }, [cytoscapeStatus, networkId]);

  useEffect(() => {
    if (!networkData || !containerRef.current || cytoscapeStatus !== 'ready') {
      return;
    }

    const cy = cytoscape({
      container: containerRef.current,
      elements: networkData.elements,
      style: cytoscapeStyles,
      layout: {
        name: 'cose',
        idealEdgeLength: 100,
        nodeOverlap: 20,
        refresh: 20,
        fit: true,
        padding: 30,
        randomize: false,
        componentSpacing: 100,
        nodeRepulsion: 400000,
        edgeElasticity: 100,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0
      }
    });

    // Event handlers
    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      console.log('Node clicked:', node.data());
    });

    return () => {
      cy.destroy();
    };
  }, [networkData, cytoscapeStatus]);

  if (!networkData) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
        <p className="mt-2 text-gray-600">Loading network visualization...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div data-testid="cytoscape-container">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          {networkData.data.network_type} - {networkData.data.species}
        </h2>
      </div>
      <div 
        ref={containerRef}
        className="flex-1 border border-gray-200 rounded-lg"
        style={{ minHeight: '600px' }}
      />
    </div>
  );
};

export default CytoscapeViewer;