import { render, screen } from '@testing-library/react';
import CytoscapeViewer from '../projects/CytoscapeViewer';

describe('CytoscapeViewer', () => {
  it('should render without crashing', async () => {
    render(<CytoscapeViewer />);
    
    // Wait for the element with test id 'cytoscape-container' to appear
    const container = await screen.findByTestId('cytoscape-container', {}, { timeout: 5000 });
    expect(container).toBeInTheDocument();
  });
});