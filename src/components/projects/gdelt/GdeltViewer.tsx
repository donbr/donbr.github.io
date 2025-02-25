import React from 'react';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';

const GdeltViewer: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">GDELT GKG Viewer</h1>
          <p className="text-gray-600 mb-8">
            This component is a placeholder for the GDELT GKG Viewer that will be implemented soon.
          </p>
          <Link to="/assets/projects" className="text-blue-600 hover:text-blue-800">
            ← Back to Projects
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default GdeltViewer;