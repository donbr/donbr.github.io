import ProjectCard from '../../components/common/ProjectCard';
import { useAllProjects } from '../../features/projects/projectService';
import ErrorBoundary from '../../components/common/ErrorBoundary';

/**
 * Projects page component showing all available projects
 */
const ProjectsPage: React.FC = () => {
  // Use memoized projects list
  const projects = useAllProjects();

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Recent Projects</h1>
        <ErrorBoundary>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map(project => (
              <ProjectCard 
                key={project.id}
                {...project}
              />
            ))}
          </div>
        </ErrorBoundary>
      </div>
    </section>
  );
};

export default ProjectsPage;
