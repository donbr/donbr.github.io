import React, { useEffect, useRef, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import cytoscape, { Core, EventObject } from 'cytoscape';
// Import directly - this is allowed in Vite with JSON imports
import networkData from '@/data/string.json';

type CytoscapeInstance = Core | null;

const CytoscapeViewer: React.FC = () => {
  const cyRef = useRef<HTMLDivElement>(null);
  const [cyInstance, setCyInstance] = useState<CytoscapeInstance>(null);
  const [infoContent, setInfoContent] = useState<string>('');
  const [showInfoBox, setShowInfoBox] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    if (!cyRef.current) return;

    try {
      // Use the imported JSON directly 
      // Validate data
      if (!networkData?.elements) {
        throw new Error("Invalid network data format");
      }

      // Set title using network metadata
      if (networkData.data) {
        setTitle(`${networkData.data.network_type} - ${networkData.data.species}`);
      }

      // Initialize Cytoscape
      const cy = cytoscape({
        container: cyRef.current,
        elements: networkData.elements,
        style: [
          {
            selector: 'node',
            style: {
              'label': 'data(display_name)',
              'background-color': 'data(stringdb_node_color)',
              'text-outline-width': 2,
              'text-outline-color': 'white',
              'text-valign': 'center',
              'text-halign': 'center',
              'width': 50,
              'height': 50,
              'font-size': '12px',
              'text-wrap': 'wrap'
            }
          },
          {
            selector: 'edge',
            style: {
              'width': 'mapData(stringdb_score, 0, 1, 1, 8)',
              'line-color': '#666',
              'curve-style': 'bezier',
              'opacity': 0.8,
              'label': 'data(stringdb_score)',
              'text-rotation': 'autorotate',
              'text-opacity': 0,
              'font-size': '10px'
            }
          },
          {
            selector: 'edge:selected',
            style: {
              'text-opacity': 1,
              'line-color': '#333',
              'width': 'mapData(stringdb_score, 0, 1, 2, 10)'
            }
          },
          {
            selector: 'node:selected',
            style: {
              'border-width': 3,
              'border-color': '#333'
            }
          },
          {
            selector: 'node:active',
            style: {
              'overlay-opacity': 0.3,
              'overlay-color': '#000'
            }
          }
        ],
        layout: {
          name: 'cose',
          idealEdgeLength: () => 100,
          nodeOverlap: 20,
          refresh: 20,
          fit: true,
          padding: 30,
          randomize: false,
          componentSpacing: 100,
          nodeRepulsion: () => 400000,
          edgeElasticity: () => 100,
          nestingFactor: 5,
          gravity: 80,
          numIter: 1000,
          initialTemp: 200,
          coolingFactor: 0.95,
          minTemp: 1.0
        },
        minZoom: 0.2,
        maxZoom: 3,
        wheelSensitivity: 0.3,
        boxSelectionEnabled: true,
        selectionType: 'single'
      });

      // Node tap: update the infoHtml with proper text colors
      cy.on('tap', 'node', function(evt: EventObject) {
        const data = evt.target.data();
        const infoHtml = `
          <div class="relative text-gray-800">
            <h3 class="text-lg font-semibold mb-2">${data.display_name}</h3>
            <p class="mb-1"><strong>Description:</strong> ${data.stringdb_description || 'N/A'}</p>
            <p class="mb-1"><strong>Family:</strong> ${data.target_family || 'N/A'}</p>
            <p class="mb-1"><strong>Development Level:</strong> ${data.target_development_level || 'N/A'}</p>
            <hr class="my-2" />
            <p class="font-semibold">Expression Levels:</p>
            <ul class="list-disc pl-5 mb-2">
              <li>Brain: ${data.tissue_nervous_system ?? 'N/A'}</li>
              <li>Heart: ${data.tissue_heart ?? 'N/A'}</li>
              <li>Liver: ${data.tissue_liver ?? 'N/A'}</li>
              <li>Kidney: ${data.tissue_kidney ?? 'N/A'}</li>
            </ul>
          </div>
        `;
        setInfoContent(infoHtml);
        setShowInfoBox(true);
      });

      // Edge tap: also update with proper text colors
      cy.on('tap', 'edge', function(evt: EventObject) {
        const data = evt.target.data();
        const infoHtml = `
          <div class="relative text-gray-800">
            <h3 class="text-lg font-semibold mb-2">Interaction Details</h3>
            <p class="mb-1"><strong>Combined Score:</strong> ${data.stringdb_score || 'N/A'}</p>
            <p class="font-semibold mt-2">Evidence Types:</p>
            <ul class="list-disc pl-5 mb-2">
              <li>Experiments: ${data.stringdb_experiments ?? 'N/A'}</li>
              <li>Database: ${data.stringdb_databases ?? 'N/A'}</li>
              <li>Textmining: ${data.stringdb_textmining ?? 'N/A'}</li>
              <li>Coexpression: ${data.stringdb_coexpression ?? 'N/A'}</li>
            </ul>
          </div>
        `;
        setInfoContent(infoHtml);
        setShowInfoBox(true);
      });

      // Hide info box when background is tapped
      cy.on('tap', function(evt: EventObject) {
        if (evt.target === cy) {
          setShowInfoBox(false);
        }
      });

      setCyInstance(cy);
    } catch (e) {
      console.error("Error loading network data:", e);
      setErrorMessage(e instanceof Error ? e.message : 'Unknown error');
    }

    return () => {
      if (cyInstance) {
        cyInstance.destroy();
      }
    };
  }, []);

  // Button handlers
  const handleFit = () => {
    if (cyInstance) {
      cyInstance.fit();
    }
  };

  const handleShowAll = () => {
    alert("Show All Properties functionality is not implemented yet.");
  };

  const handleCloseInfoBox = () => {
    setShowInfoBox(false);
  };

  // Add keyboard support for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showInfoBox) {
        setShowInfoBox(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showInfoBox]);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">STRING Network Viewer</h1>
        <p className="text-gray-600 mb-8">
          Interactive visualization of protein-protein interaction networks
          using Cytoscape.js. This tool allows exploration of complex biological
          networks with detailed protein information and interaction data.
        </p>

        {/* Visualization Container */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div id="title" className="text-center mb-5 text-lg font-semibold">{title}</div>
          <div 
            ref={cyRef} 
            style={{ width: '100%', height: '600px', border: '1px solid #ddd' }} 
          />
          <div className="controls space-x-4 mt-4">
            <button
              id="fit"
              onClick={handleFit}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
            >
              Fit View
            </button>
            <button
              id="showAll"
              onClick={handleShowAll}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
            >
              Show All Properties
            </button>
          </div>

          {/* Info Box */}
          {showInfoBox && (
            <div 
              className="fixed right-5 top-20 bg-white p-4 border border-gray-200 rounded-md shadow-lg z-50 max-w-sm max-h-[80vh] overflow-y-auto text-gray-800"
            >
              <button 
                onClick={handleCloseInfoBox}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                aria-label="Close"
              >
                &times;
              </button>
              <div dangerouslySetInnerHTML={{ __html: infoContent }} />
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-4 bg-red-100 text-red-700 p-4 rounded-md border border-red-300">
              <h2 className="font-bold">Error Loading Network</h2>
              <p>{errorMessage}</p>
            </div>
          )}
        </div>

        {/* Technical Details */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Implementation Details
          </h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">
              This visualization leverages several key technologies and
              features:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Cytoscape.js for network visualization and interaction</li>
              <li>
                Dynamic loading and parsing of STRING database network data
              </li>
              <li>Interactive node and edge information display</li>
              <li>
                Customizable layout algorithms for optimal network arrangement
              </li>
              <li>
                Detailed protein information including expression levels and
                descriptions
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <Link to="/assets/projects" className="text-blue-600 hover:text-blue-800">
            ← Back to Projects
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default CytoscapeViewer;