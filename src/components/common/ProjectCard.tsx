import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../../types';

interface ProjectCardProps extends Project {}

/**
 * Project card component for displaying project information
 * Memoized to prevent unnecessary re-renders
 */
const ProjectCard: React.FC<ProjectCardProps> = memo(({ id, title, description, tags, link }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 project-card">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span 
            key={index} 
            className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4">
        <Link to={link} className="text-blue-600 hover:text-blue-800">
          View Project →
        </Link>
      </div>
    </div>
  );
});

// Display name for debugging
ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
