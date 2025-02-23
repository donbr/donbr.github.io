import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ErrorBoundary from './components/common/ErrorBoundary';
import CytoscapeViewer from './components/projects/CytoscapeViewer';

// Lazy-loaded pages for code splitting
const HomePage = lazy(() => import('./pages/home'));
const ProjectsPage = lazy(() => import('./pages/projects'));
const ProjectDetailPage = lazy(() => import('./pages/projectDetail'));

function App(): React.ReactElement {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <ErrorBoundary>
          <Suspense fallback={<div className="p-4">Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
              <Route path="/projects/network/:networkId?" element={<CytoscapeViewer />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

export default App;
