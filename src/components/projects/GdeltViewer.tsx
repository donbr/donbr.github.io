import React from 'react';

import ErrorBoundary from '../common/ErrorBoundary';
import GdeltRecordViewer from '../../lib/gdelt-gkg';

const GdeltViewer: React.FC = () => {
  return (
    <ErrorBoundary>
      <GdeltRecordViewer />
    </ErrorBoundary>
  );
};

export default GdeltViewer;
