// src/components/projects/situational-awareness/types.ts

export interface GraphNode {
    id: string;
    'Incident Response Time'?: number;
    'Coordination'?: number;
    'Detection Rate'?: number;
    'Response Time'?: number;
    'Disruption Impact'?: number;
    'Anomaly Accuracy'?: number;
    'Decision Accuracy'?: number;
  }
  
  export interface GraphEdge {
    source: string;
    target: string;
  }
  
  export interface GraphData {
    directed: boolean;
    multigraph: boolean;
    graph: Record<string, unknown>;
    nodes: GraphNode[];
    edges: GraphEdge[];
  }