import type { Stylesheet } from 'cytoscape';

export interface NetworkData {
  format_version: string;
  data: {
    uri: string;
    database: string;
    network_type: string;
    species: string;
    confidence_score: number;
    name: string;
  };
  elements: {
    nodes: Array<Node>;
    edges: Array<Edge>;
  };
}

export interface Node {
  data: NodeData;
  position?: Position;
  selected: boolean;
}

export interface Edge {
  data: EdgeData;
  selected: boolean;
}

export interface Position {
  x: number;
  y: number;
}

export interface NodeData {
  id: string;
  display_name: string;
  stringdb_node_color: string;
  stringdb_description: string;
  [key: string]: unknown;
}

export interface EdgeData {
  source: string;
  target: string;
  stringdb_score: number;
  [key: string]: unknown;
}