import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Page Components
import HomePage from '@/pages/HomePage';
import ProjectsPage from '@/pages/ProjectsPage';
import ConceptsPage from '@/pages/ConceptsPage';
import NotFoundPage from '@/pages/NotFoundPage';

// Project Components
import GdeltRecordViewer from '@/components/projects/gdelt/GdeltRecordViewer'; // Add .jsx extension
import CytoscapeViewer from '@/components/projects/cytoscape/CytoscapeViewer';
import EventAnalyzer from '@/components/projects/event-analyzer/EventAnalyzer';
import SituationalAwareness from '@/components/projects/situational-awareness/SituationalAwareness';
import GdeltKnowledgeBase from '@/components/projects/gdelt-kb/GdeltKnowledgeBase';
import AdvancedRetrieval from '@/components/projects/advanced-retrieval/AdvancedRetrieval';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/assets/projects" element={<ProjectsPage />} />
        <Route path="/concepts" element={<ConceptsPage />} />

        {/* Project routes */}
        <Route path="/assets/projects/gdelt" element={<GdeltRecordViewer />} />
        <Route path="/assets/projects/cytoscape" element={<CytoscapeViewer />} />
        <Route path="/assets/projects/event-analyzer" element={<EventAnalyzer />} />
        <Route path="/assets/projects/situational-awareness" element={<SituationalAwareness />} />
        <Route path="/assets/projects/gdelt-knowledge-base" element={<GdeltKnowledgeBase />} />
        <Route path="/assets/projects/advanced-retrieval" element={<AdvancedRetrieval />} />

        {/* Catch-all route for 404s */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
