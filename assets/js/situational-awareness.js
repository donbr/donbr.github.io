// situational-awareness.js
document.addEventListener('DOMContentLoaded', async function() {
    // Load the graph data
    const response = await fetch('/assets/js/situational-awareness-graph.json');
    const graphData = await response.json();
    
    // Process nodes and edges into Cytoscape format
    const elements = {
        nodes: graphData.nodes.map(node => ({
            data: {
                id: node.id,
                label: node.id,
                // Include metrics as properties
                incidentResponseTime: node['Incident Response Time'],
                coordination: node['Coordination'],
                detectionRate: node['Detection Rate'],
                responseTime: node['Response Time'],
                disruptionImpact: node['Disruption Impact'],
                anomalyAccuracy: node['Anomaly Accuracy'],
                decisionAccuracy: node['Decision Accuracy'],
                // Add a color based on node type
                color: getNodeColor(node.id),
                // Add size based on metrics
                size: getNodeSize(node)
            }
        })),
        edges: graphData.edges.map(edge => ({
            data: {
                source: edge.source,
                target: edge.target
            }
        }))
    };
    
    // Helper function to determine node size based on available metrics
    function getNodeSize(node) {
        if (node['Incident Response Time']) return node['Incident Response Time'] / 2;
        if (node['Detection Rate']) return node['Detection Rate'] * 80;
        if (node['Disruption Impact']) return node['Disruption Impact'] * 80;
        if (node['Anomaly Accuracy']) return node['Anomaly Accuracy'] * 80;
        if (node['Decision Accuracy']) return node['Decision Accuracy'] * 80;
        return 40; // default size for nodes without metrics
    }
    
    // Helper function to assign colors based on node type
    function getNodeColor(id) {
        const colors = {
            'Disaster Response': '#ef4444',           // red
            'Cybersecurity Threat Propagation': '#22c55e', // green
            'Supply Chain Disruption': '#3b82f6',     // blue
            'Public Safety Real-Time Anomaly Detection': '#f59e0b', // amber
            'Military Operations Causal Reasoning': '#8b5cf6'  // purple
        };
        return colors[id] || '#94a3b8'; // default gray for other nodes
    }

    // Initialize Cytoscape
    const cy = cytoscape({
        container: document.getElementById('graph-container'),
        elements: elements,
        style: [
            {
                selector: 'node',
                style: {
                    'label': 'data(label)',
                    'text-wrap': 'wrap',
                    'text-max-width': '100px',
                    'font-size': '12px',
                    'text-valign': 'center',
                    'text-halign': 'center',
                    'background-color': 'data(color)',
                    'border-width': 2,
                    'border-color': '#4f46e5',
                    'width': 'data(size)',
                    'height': 'data(size)',
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 2,
                    'line-color': '#94a3b8',
                    'target-arrow-color': '#94a3b8',
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'bezier'
                }
            },
            {
                selector: ':selected',
                style: {
                    'background-color': '#f59e0b',
                    'border-color': '#d97706',
                    'line-color': '#f59e0b',
                    'target-arrow-color': '#f59e0b'
                }
            }
        ],
        layout: {
            name: 'cola',
            animate: true,
            nodeSpacing: 120,
            edgeLengthVal: 100,
            maxSimulationTime: 3000
        }
    });

    // Calculate node degrees for sizing
    cy.nodes().forEach(node => {
        node.data('degree', node.degree());
    });

    // Add tooltips
    const tooltip = document.querySelector('.node-tooltip');
    cy.on('mouseover', 'node', function(e) {
        const node = e.target;
        const pos = e.renderedPosition;
        const data = node.data();
        
        // Build tooltip content
        let content = `<strong>${data.label}</strong><br>`;
        for (const [key, value] of Object.entries(data)) {
            if (key !== 'id' && key !== 'label') {
                content += `${key}: ${typeof value === 'number' ? value.toFixed(2) : value}<br>`;
            }
        }
        
        tooltip.innerHTML = content;
        tooltip.style.left = `${pos.x + 10}px`;
        tooltip.style.top = `${pos.y + 10}px`;
        tooltip.style.display = 'block';
    });

    cy.on('mouseout', 'node', function() {
        tooltip.style.display = 'none';
    });

    // Add zoom controls
    document.getElementById('zoomIn').addEventListener('click', () => {
        cy.zoom({
            level: cy.zoom() * 1.2,
            renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 }
        });
    });

    document.getElementById('zoomOut').addEventListener('click', () => {
        cy.zoom({
            level: cy.zoom() * 0.8,
            renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 }
        });
    });

    document.getElementById('resetView').addEventListener('click', () => {
        cy.fit();
        cy.center();
    });

    let usingCola = true;
    document.getElementById('toggleLayout').addEventListener('click', () => {
        const layout = usingCola ? 
            { name: 'concentric', minNodeSpacing: 100 } : 
            { name: 'cola', nodeSpacing: 120, edgeLengthVal: 100 };
        
        cy.layout(layout).run();
        usingCola = !usingCola;
    });

    cy.on('mouseover', 'node', function(e) {
        const node = e.target.data();
        let content = `<strong>${node.label}</strong><br>`;
        
        if (node.incidentResponseTime) 
            content += `Incident Response Time: ${node.incidentResponseTime.toFixed(2)}<br>`;
        if (node.coordination) 
            content += `Coordination: ${node.coordination.toFixed(2)}<br>`;
        if (node.detectionRate) 
            content += `Detection Rate: ${node.detectionRate.toFixed(2)}<br>`;
        if (node.responseTime) 
            content += `Response Time: ${node.responseTime.toFixed(2)}<br>`;
        if (node.disruptionImpact) 
            content += `Disruption Impact: ${node.disruptionImpact.toFixed(2)}<br>`;
        if (node.anomalyAccuracy) 
            content += `Anomaly Accuracy: ${node.anomalyAccuracy.toFixed(2)}<br>`;
        if (node.decisionAccuracy) 
            content += `Decision Accuracy: ${node.decisionAccuracy.toFixed(2)}<br>`;
        
        tooltip.innerHTML = content;
        const pos = e.renderedPosition;
        tooltip.style.left = `${pos.x + 10}px`;
        tooltip.style.top = `${pos.y + 10}px`;
        tooltip.style.display = 'block';
    });

    // Add double-click to zoom
    cy.on('dblclick', 'node', function(e) {
        const node = e.target;
        cy.animate({
            zoom: 2,
            center: { eles: node }
        }, {
            duration: 500
        });
    });

    // Initial layout
    cy.layout({ name: 'cola' }).run();
});
