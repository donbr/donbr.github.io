import React from 'react';
import StatusPage from '@/components/layout/StatusPage';

const NotFoundPage: React.FC = () => (
  <StatusPage
    title="Page Not Found"
    heading="404 - Page Not Found"
    message="The page you are looking for doesn't exist or has been moved."
    actions={[{ label: 'Go Home', to: '/' }]}
  />
);

export default NotFoundPage;
