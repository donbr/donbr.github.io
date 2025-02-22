import React, { useEffect, Suspense, lazy } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjectById } from '../../services/projectService';
import ErrorBoundary from '../../components/common/ErrorBoundary';

// Lazy load project components
const GdeltViewer = lazy(() => import('../../components/projects/GdeltViewer'));
const CytoscapeViewer = lazy(() => import('../../components/projects/CytoscapeViewer'));
const EventAnalyzer = lazy(() => import('../../components/projects/EventAnalyzer'));
const SituationalAwareness = lazy(() => import('../../components/projects/SituationalAwareness'));

interface ProjectParams {
  projectId: string;
}

/**
 * Project detail page component showing individual project details and content
 */
const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<ProjectParams>();
  const navigate = useNavigate();
  
  // Use memoized project details
  const project = useProjectById(projectId || '');
  
  // Map of project IDs to their respective components
  const projectComponents: Record<string, React.ComponentType> = {
    'gdelt': GdeltViewer,
    'cytoscape': CytoscapeViewer,
    'event-analyzer': EventAnalyzer,
    'situational-awareness': SituationalAwareness
  };
  
  useEffect(() => {
    // If invalid project ID, redirect to projects page
    if (!project) {
      navigate('/projects');
    }
  }, [project, navigate]);
  
  if (!project) return <div>Loading...</div>;
  
  // Dynamically render the project component
  const ProjectComponent = projectComponents[project.id];
  
  return (
    <div className="bg-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <button 
          onClick={() => navigate('/projects')} 
          className="text-gray-500 hover:text-gray-900 mb-4"
        >
          ← Back to Projects
        </button>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{project.title}</h1>
        <p className="text-gray-600 mb-8">{project.fullDescription || project.description}</p>
        
        {/* Technology tags */}
        {project.technologies && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Project content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <ErrorBoundary>
            <Suspense fallback={
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-2 text-gray-600">Loading project...</p>
              </div>
            }>
              <ProjectComponent />
            </Suspense>
          </ErrorBoundary>
        </div>
        
        {/* Github link if available */}
        {project.githubUrl && (
          <div className="mt-8 text-center">
            <a 
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 inline-block"
            >
              View on GitHub
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
