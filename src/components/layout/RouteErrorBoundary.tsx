import React from 'react';
import Layout from '@/components/layout/Layout';

interface RouteErrorBoundaryProps {
  children: React.ReactNode;
  // Changing this (the current pathname) clears the error, so nav links still work
  resetKey: string;
}

interface RouteErrorBoundaryState {
  error: Error | null;
}

// Catches failures while rendering a route, most commonly a lazy route's chunk failing
// to load after a deploy replaced the hashed filenames an open tab still references.
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
    if (!this.state.error) return this.props.children;

    return (
      <Layout>
        <title>Page failed to load | Don Branson</title>
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center" role="alert">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">This page didn't load</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl">
            The site was probably updated since you opened it. Reloading fetches the latest version.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Reload page
          </button>
        </div>
      </Layout>
    );
  }
}

export default RouteErrorBoundary;
