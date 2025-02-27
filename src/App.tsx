import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Page Components
import HomePage from '@/pages/HomePage';
import ProjectsPage from '@/pages/ProjectsPage';
import NotFoundPage from '@/pages/NotFoundPage';

// Project Components
import GdeltRecordViewer from '@/components/projects/gdelt/GdeltRecordViewer'; // Add .jsx extension
import CytoscapeViewer from '@/components/projects/cytoscape/CytoscapeViewer';
import EventAnalyzer from '@/components/projects/event-analyzer/EventAnalyzer';
import SituationalAwareness from '@/components/projects/situational-awareness/SituationalAwareness';

// Prototype Graph Explorers
import TemporalGraphExplorer from '@/components/projects/basic-temporal-graph/TemporalGraphExplorer';
import CytoscapeGraphExplorer from '@/components/projects/cytoscape-temporal-graph/CytoscapeGraphExplorer';
import PlaceholderPage from '@/components/projects/placeholder-page/PlaceholderPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/assets/projects" element={<ProjectsPage />} />

        {/* Project routes */}
        <Route path="/assets/projects/gdelt" element={<GdeltRecordViewer />} />
        <Route path="/assets/projects/cytoscape" element={<CytoscapeViewer />} />
        <Route path="/assets/projects/event-analyzer" element={<EventAnalyzer />} />
        <Route path="/assets/projects/situational-awareness" element={<SituationalAwareness />} />
        <Route path="/assets/projects/temporal-graph" element={<TemporalGraphExplorer />} />
        <Route path="/assets/projects/cytoscape-graph" element={<CytoscapeGraphExplorer />} />
        <Route path="/assets/projects/placeholder-page" element={<PlaceholderPage />} />

        {/* Catch-all route for 404s */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
