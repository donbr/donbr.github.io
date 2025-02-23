import type { NetworkData } from '../types/cytoscape';

export const cytoscapeStyles = [
  {
    selector: 'node',
    style: {
      label: 'data(display_name)',
      'background-color': 'data(stringdb_node_color)',
      // ... other node styles
    }
  },
  // ... other style definitions
];

export async function fetchNetworkData(networkId?: string): Promise<NetworkData> {
  const response = await fetch('/data/string.cyjs');
  if (!response.ok) {
    throw new Error(`Network error: ${response.statusText}`);
  }
  return response.json();
}