import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import RouteErrorBoundary from '@/components/layout/RouteErrorBoundary';

// Page Components: small and light, so they stay in the main bundle (ProjectsPage is
// the most-visited secondary route; splitting its ~11 KB out only added a round trip)
import HomePage from '@/pages/HomePage';
import ProjectsPage from '@/pages/ProjectsPage';
import NotFoundPage from '@/pages/NotFoundPage';

// Lazy-loaded project routes: keeps ECharts, Cytoscape and Leaflet out of the main bundle
const GdeltRecordViewer = lazy(() => import('@/components/projects/gdelt/GdeltRecordViewer'));
const CytoscapeViewer = lazy(() => import('@/components/projects/cytoscape/CytoscapeViewer'));
const EventAnalyzer = lazy(() => import('@/components/projects/event-analyzer/EventAnalyzer'));
const SituationalAwareness = lazy(() => import('@/components/projects/situational-awareness/SituationalAwareness'));
const GdeltKnowledgeBase = lazy(() => import('@/components/projects/gdelt-kb/GdeltKnowledgeBase'));
const AdvancedRetrieval = lazy(() => import('@/components/projects/advanced-retrieval/AdvancedRetrieval'));

// Shown while a lazy route's chunk loads; keeps the nav and footer in place
const RouteFallback: React.FC = () => (
  <Layout>
    <div className="max-w-6xl mx-auto px-4 py-16 text-gray-500" role="status">
      Loading…
    </div>
  </Layout>
);

const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <RouteErrorBoundary resetKey={location.key}>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/assets/projects" element={<ProjectsPage />} />

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
      </Suspense>
    </RouteErrorBoundary>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
