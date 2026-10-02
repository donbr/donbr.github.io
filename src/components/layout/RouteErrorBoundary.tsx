import React from 'react';
import StatusPage from '@/components/layout/StatusPage';

// Browsers word a failed dynamic import differently: Chrome/Edge "Failed to fetch dynamically
// imported module", Firefox "error loading dynamically imported module", Safari "Importing a
// module script failed". Vite adds "Unable to preload CSS for ..." when a route's CSS fails.
const CHUNK_LOAD_ERROR = /dynamically imported module|Importing a module script failed|Unable to preload CSS/i;

interface RouteErrorBoundaryProps {
  children: React.ReactNode;
  // Changing this (the current location.key, new on every navigation) clears the error,
  // so nav links work, including 'Go to homepage' from an error on '/'
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

  componentDidUpdate(prevProps: RouteErrorBoundaryProps) {
    if (this.state.error && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ error: null });
    }
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    // Only a chunk that failed to load is fixed by reloading; other render errors are bugs
    const reload = { label: 'Reload page', onClick: () => window.location.reload() };

    return CHUNK_LOAD_ERROR.test(error.message) ? (
      <StatusPage
        role="alert"
        title="Page failed to load"
        heading="This page didn't load"
        message="The site was probably updated since you opened it. Reloading fetches the latest version."
        actions={[reload]}
      />
    ) : (
      <StatusPage
        role="alert"
        title="Page failed to load"
        heading="Something went wrong on this page"
        message="This page hit an error while rendering. The rest of the site still works."
        actions={[reload, { label: 'Go to homepage', to: '/', variant: 'secondary' }]}
      />
    );
  }
}

export default RouteErrorBoundary;
