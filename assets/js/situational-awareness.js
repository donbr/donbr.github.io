// situational-awareness.js
document.addEventListener('DOMContentLoaded', function() {
    // Define the graph data
    const nodes = new vis.DataSet([
        // Main scenarios
        { id: 1, label: 'Disaster Response', group: 1, size: 30 },
        { id: 2, label: 'Cybersecurity\nThreats', group: 2, size: 30 },
        { id: 3, label: 'Supply Chain\nDisruption', group: 3, size: 30 },
        { id: 4, label: 'Public Safety', group: 4, size: 30 },
        { id: 5, label: 'Military Operations', group: 5, size: 30 },
        
        // Supporting nodes - Disaster Response
        { id: 11, label: 'FEMA Declarations', group: 1, size: 20 },
        { id: 12, label: 'Critical Infrastructure', group: 1, size: 20 },
        { id: 13, label: 'Emergency Response', group: 1, size: 20 },
        
        // Supporting nodes - Cybersecurity
        { id: 21, label: 'Threat Intelligence', group: 2, size: 20 },
        { id: 22, label: 'Network Monitoring', group: 2, size: 20 },
        { id: 23, label: 'Incident Response', group: 2, size: 20 },
        
        // Supporting nodes - Supply Chain
        { id: 31, label: 'Inventory Tracking', group: 3, size: 20 },
        { id: 32, label: 'Supplier Network', group: 3, size: 20 },
        { id: 33, label: 'Logistics', group: 3, size: 20 },
        
        // Cross-cutting concerns
        { id: 41, label: 'AI & ML', group: 6, size: 25 },
        { id: 42, label: 'Real-time Monitoring', group: 6, size: 25 },
        { id: 43, label: 'Data Integration', group: 6, size: 25 }
    ]);

    const edges = new vis.DataSet([
        // Disaster Response connections
        { from: 1, to: 11 }, { from: 1, to: 12 }, { from: 1, to: 13 },
        
        // Cybersecurity connections
        { from: 2, to: 21 }, { from: 2, to: 22 }, { from: 2, to: 23 },
        
        // Supply Chain connections
        { from: 3, to: 31 }, { from: 3, to: 32 }, { from: 3, to: 33 },
        
        // Cross-domain connections
        { from: 41, to: 1 }, { from: 41, to: 2 }, { from: 41, to: 3 },
        { from: 41, to: 4 }, { from: 41, to: 5 },
        
        { from: 42, to: 1 }, { from: 42, to: 3 }, { from: 42, to: 4 },
        
        { from: 43, to: 1 }, { from: 43, to: 2 }, { from: 43, to: 3 },
        { from: 43, to: 4 }, { from: 43, to: 5 },
        
        // Inter-domain connections
        { from: 1, to: 2, dashes: true },
        { from: 2, to: 3, dashes: true },
        { from: 3, to: 4, dashes: true },
        { from: 4, to: 5, dashes: true }
    ]);

    // Create the network
    const container = document.getElementById('graph-container');
    const data = { nodes, edges };
    
    const options = {
        nodes: {
            shape: 'circle',
            font: {
                size: 14,
                multi: true,
                face: 'arial'
            },
            borderWidth: 2,
            shadow: true
        },
        edges: {
            width: 2,
            smooth: {
                type: 'continuous'
            },
            arrows: {
                to: { enabled: true, scaleFactor: 0.5 }
            }
        },
        physics: {
            stabilization: true,
            barnesHut: {
                gravitationalConstant: -80000,
                springConstant: 0.001,
                springLength: 200
            }
        },
        groups: {
            1: { color: { background: '#FF9999', border: '#FF0000' } },
            2: { color: { background: '#99FF99', border: '#00FF00' } },
            3: { color: { background: '#9999FF', border: '#0000FF' } },
            4: { color: { background: '#FFFF99', border: '#FFFF00' } },
            5: { color: { background: '#FF99FF', border: '#FF00FF' } },
            6: { color: { background: '#99FFFF', border: '#00FFFF' } }
        }
    };

    const network = new vis.Network(container, data, options);

    // Add zoom controls
    document.getElementById('zoomIn').onclick = function() {
        network.zoomIn(0.5);
    };
    
    document.getElementById('zoomOut').onclick = function() {
        network.zoomOut(0.5);
    };
    
    document.getElementById('resetView').onclick = function() {
        network.fit();
    };

    // Add hover effect for nodes
    network.on('hoverNode', function(params) {
        container.style.cursor = 'pointer';
    });
    
    network.on('blurNode', function(params) {
        container.style.cursor = 'default';
    });

    // Initial layout stabilization
    network.once('stabilizationIterationsDone', function() {
        network.setOptions({ physics: false });
    });
});
