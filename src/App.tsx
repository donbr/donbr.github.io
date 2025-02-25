import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Page Components
import HomePage from '@/pages/HomePage';
import ProjectsPage from '@/pages/ProjectsPage';
import NotFoundPage from '@/pages/NotFoundPage';

// Project Components - These will be implemented later
import GdeltViewer from '@/components/projects/gdelt/GdeltViewer';
import CytoscapeViewer from '@/components/projects/cytoscape/CytoscapeViewer';
import EventAnalyzer from '@/components/projects/event-analyzer/EventAnalyzer';
import SituationalAwareness from '@/components/projects/situational-awareness/SituationalAwareness';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/assets/projects" element={<ProjectsPage />} />
        
        {/* Project routes - These will use dummy components initially */}
        <Route path="/assets/projects/gdelt" element={<GdeltViewer />} />
        <Route path="/assets/projects/cytoscape" element={<CytoscapeViewer />} />
        <Route path="/assets/projects/event-analyzer" element={<EventAnalyzer />} />
        <Route path="/assets/projects/situational-awareness" element={<SituationalAwareness />} />
        
        {/* Catch-all route for 404s */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;