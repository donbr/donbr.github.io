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
                target: edge.target,
                // Assign a default color; customize as needed
                edgeColor: '#6b7280'
            }
        }))
    };
    
    // Helper function to determine node size based on available metrics
    function getNodeSize(node) {
        const scaleFactor = 50; // Adjust scaling
        let metric = 40; // Default size
        if (node['Incident Response Time']) metric = node['Incident Response Time'] / 4;
        else if (node['Detection Rate']) metric = node['Detection Rate'] * scaleFactor;
        else if (node['Disruption Impact']) metric = node['Disruption Impact'] * scaleFactor;
        else if (node['Anomaly Accuracy']) metric = node['Anomaly Accuracy'] * scaleFactor;
        else if (node['Decision Accuracy']) metric = node['Decision Accuracy'] * scaleFactor;
        return Math.min(Math.max(metric, 20), 100); // Keep size within [20,100]
    }

    // Helper function to determine node color based on ID
    function getNodeColor(id) {
        const colorMap = {
            'Disaster Response': '#1f77b4',
            'Cybersecurity Threat Propagation': '#ff7f0e',
            'Supply Chain Disruption': '#2ca02c',
            'Public Safety Real-Time Anomaly Detection': '#d62728',
            'Military Operations Causal Reasoning': '#9467bd'
        };
        return colorMap[id] || '#7f7f7f'; // Default color for unspecified nodes
    }

    // Initialize Cytoscape
    const cy = cytoscape({
        container: document.getElementById('graph-container'),
        elements: elements,
        style: [
            {
                selector: 'node',
                style: {
                    'background-color': 'data(color)',
                    'label': 'data(label)',
                    'width': 'data(size)',
                    'height': 'data(size)',
                    'text-valign': 'center',
                    'text-halign': 'center',
                    'color': '#fff',
                    'font-size': 10,
                    'overlay-padding': '6px',
                    'z-index': 10
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 2,
                    'line-color': 'data(edgeColor)',
                    'target-arrow-color': 'data(edgeColor)',
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'bezier'
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
                selector: 'edge:selected',
                style: {
                    'width': 4
                }
            }
        ],
        layout: {
            name: 'cola',
            animate: true,
            nodeSpacing: 120,
            edgeLength: function(edge) { return 100; },
            maxSimulationTime: 3000
        }
    });

    // Tooltip handling
    const tooltip = document.querySelector('.node-tooltip');
    cy.on('mouseover', 'node', (event) => {
        const node = event.target;
        const metrics = [
            { label: 'Incident Response Time', value: node.data('incidentResponseTime') },
            { label: 'Coordination', value: node.data('coordination') },
            { label: 'Detection Rate', value: node.data('detectionRate') },
            { label: 'Response Time', value: node.data('responseTime') },
            { label: 'Disruption Impact', value: node.data('disruptionImpact') },
            { label: 'Anomaly Accuracy', value: node.data('anomalyAccuracy') },
            { label: 'Decision Accuracy', value: node.data('decisionAccuracy') }
        ].filter(metric => metric.value !== undefined);

        if (metrics.length > 0) {
            tooltip.innerHTML = `<strong>${node.data('label')}</strong><br>` +
                metrics.map(metric => `${metric.label}: ${metric.value.toFixed(2)}`).join('<br>');
            tooltip.style.display = 'block';
        }
    });

    cy.on('mouseout', 'node', () => {
        tooltip.style.display = 'none';
    });

    cy.on('mousemove', (event) => {
        tooltip.style.left = (event.renderedPosition.x + 10) + 'px';
        tooltip.style.top = (event.renderedPosition.y + 10) + 'px';
    });

    // Zoom controls
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
        cy.zoom(1);
    });

    // Layout toggle
    let usingCola = true;
    document.getElementById('toggleLayout').addEventListener('click', () => {
        let layout;
        if (usingCola) {
            layout = { name: 'concentric', minNodeSpacing: 100 };
        } else {
            layout = { 
                name: 'cola',
                animate: true,
                nodeSpacing: 120,
                edgeLength: function(edge) { return 100; },
                maxSimulationTime: 3000
            };
        }
        cy.layout(layout).run();
        usingCola = !usingCola;
    });
});
