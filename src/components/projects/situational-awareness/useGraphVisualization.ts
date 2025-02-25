// src/components/projects/situational-awareness/useGraphVisualization.ts
import { useState, useEffect, useRef } from 'react';
import { GraphNode, GraphData } from './types';
import type { EChartsOption } from 'echarts';

interface UseGraphVisualizationProps {
  graphData: GraphData;
}

export const useGraphVisualization = ({ graphData }: UseGraphVisualizationProps) => {
  const [option, setOption] = useState<EChartsOption | null>(null);
  
  // Store node data reference for tooltips
  const nodeDataRef = useRef<Record<string, GraphNode>>({});

  useEffect(() => {
    // Store nodes by id for tooltip reference
    const nodeDataMap: Record<string, GraphNode> = {};
    graphData.nodes.forEach(node => {
      nodeDataMap[node.id] = node;
    });
    nodeDataRef.current = nodeDataMap;

    // Convert nodes and edges to ECharts format
    const nodes = graphData.nodes.map(node => {
      return {
        id: node.id,
        name: node.id,
        symbolSize: getNodeSize(node),
        itemStyle: { color: getNodeColor(node.id) },
        // Don't assign GraphNode directly to value
        value: node.id
      };
    });
    
    const edges = graphData.edges.map(edge => ({
      source: edge.source,
      target: edge.target,
    }));

    // Configure the ECharts option
    const chartOption: EChartsOption = {
      title: {
        text: 'Situational Awareness Graph',
        left: 'center',
      },
      tooltip: {
        formatter: function(params: unknown) {
          // Type guard for node data
          if (
            typeof params === 'object' && 
            params !== null && 
            'dataType' in params && 
            params.dataType === 'node' &&
            'name' in params && 
            typeof params.name === 'string' &&
            'data' in params && 
            typeof params.data === 'object' && 
            params.data !== null &&
            'value' in params.data
          ) {
            const name = params.name;
            const nodeId = String(params.data.value);
            const nodeData = nodeDataRef.current[nodeId];
            
            if (!nodeData) return '';
            
            let tooltipContent = `<strong>${name}</strong><br/>`;
            
            // Add all metrics for this node
            Object.keys(nodeData).forEach(key => {
              if (key !== 'id') {
                const value = typeof nodeData[key as keyof GraphNode] === 'number' 
                  ? (nodeData[key as keyof GraphNode] as number).toFixed(2) 
                  : nodeData[key as keyof GraphNode];
                tooltipContent += `${key}: ${value}<br/>`;
              }
            });
            
            return tooltipContent;
          }
          return '';
        }
      },
      series: [{
        type: 'graph',
        layout: 'force',
        data: nodes,
        links: edges,
        roam: true,
        label: {
          show: true,
          position: 'right',
          formatter: '{b}'
        },
        force: {
          repulsion: 200,
          edgeLength: 100,
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3
        }
      }]
    };

    setOption(chartOption);
  }, [graphData]);

  // Function to determine node size based on metrics
  const getNodeSize = (node: GraphNode) => {
    const scaleFactor = 50;
    let metric = 40;
    
    if (node['Incident Response Time']) metric = node['Incident Response Time'] / 4;
    else if (node['Detection Rate']) metric = node['Detection Rate'] * scaleFactor;
    else if (node['Disruption Impact']) metric = node['Disruption Impact'] * scaleFactor;
    else if (node['Anomaly Accuracy']) metric = node['Anomaly Accuracy'] * scaleFactor;
    else if (node['Decision Accuracy']) metric = node['Decision Accuracy'] * scaleFactor;
    
    return Math.min(Math.max(metric, 20), 100);
  };

  // Function to get node color based on node type
  const getNodeColor = (id: string) => {
    const colorMap: Record<string, string> = {
      'Disaster Response': '#1f77b4',
      'Cybersecurity Threat Propagation': '#ff7f0e',
      'Supply Chain Disruption': '#2ca02c',
      'Public Safety Real-Time Anomaly Detection': '#d62728',
      'Military Operations Causal Reasoning': '#9467bd',
      'AI and Machine Learning': '#e377c2',
      'Real-time Monitoring Systems': '#7f7f7f',
      'Data Sharing and Integration': '#bcbd22',
      'Supplier Diversity and Risk Management': '#17becf'
    };
    
    return colorMap[id] || '#7f7f7f';
  };

  return { option };
};