import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

// Browsers word a failed dynamic import differently: Chrome/Edge "Failed to fetch dynamically
// imported module", Firefox "error loading dynamically imported module", Safari "Importing a
// module script failed".
const CHUNK_LOAD_ERROR = /dynamically imported module|Importing a module script failed/i;

const isChunkLoadError = (error: Error) => CHUNK_LOAD_ERROR.test(error.message);

interface RouteErrorBoundaryProps {
  children: React.ReactNode;
  // Changing this (the current pathname) clears the error, so nav links still work
  resetKey: string;
}

interface RouteErrorBoundaryState {
  error: Error | null;
}

// Catches failures while rendering a route, most commonly a lazy route's chunk failing
// to load after a deploy replaced the hashed filenames an open tab still references
// (main.tsx reloads once automatically for that case; this is the fallback if it recurs).
// Without it, React unmounts the whole app and the visitor sees a blank page.
class RouteErrorBoundary extends React.Component<RouteErrorBoundaryProps, RouteErrorBoundaryState> {
  state: RouteErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): RouteErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error('Route failed to render:', error);
  }

  componentDidUpdate(prevProps: RouteErrorBoundaryProps) {
    if (this.state.error && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ error: null });
    }
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    // Only a chunk that failed to load is fixed by reloading; other render errors are bugs
    const chunkFailed = isChunkLoadError(error);

    return (
      <Layout>
        <title>Page failed to load | Don Branson</title>
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center" role="alert">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {chunkFailed ? "This page didn't load" : 'Something went wrong on this page'}
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl">
            {chunkFailed
              ? 'The site was probably updated since you opened it. Reloading fetches the latest version.'
              : 'This page hit an error while rendering. The rest of the site still works.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Reload page
            </button>
            {!chunkFailed && (
              <Link
                to="/"
                className="border border-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Go to homepage
              </Link>
            )}
          </div>
        </div>
      </Layout>
    );
  }
}

export default RouteErrorBoundary;
