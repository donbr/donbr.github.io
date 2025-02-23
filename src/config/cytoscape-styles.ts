import type { Stylesheet } from 'cytoscape';

export const cytoscapeStyles: Stylesheet[] = [
  {
    selector: 'node',
    style: {
      label: 'data(display_name)',
      'background-color': 'data(stringdb_node_color)',
      'text-outline-width': 2,
      'text-outline-color': 'white',
      'text-valign': 'center',
      'text-halign': 'center',
      width: 50,
      height: 50,
      'font-size': '12px',
      'text-wrap': 'wrap'
    }
  },
  {
    selector: 'edge',
    style: {
      width: 'mapData(stringdb_score, 0, 1, 1, 8)',
      'line-color': '#666',
      'curve-style': 'bezier',
      opacity: 0.8
    }
  }
];