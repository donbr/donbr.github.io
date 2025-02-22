#!/usr/bin/env node

/**
 * GitHub Pages React/Vite Project Structure Script
 * 
 * This script reorganizes a GitHub Pages portfolio site following Vite/React best practices.
 * It creates a standardized directory structure and sets up proper React components and routing.
 * 
 * Usage:
 * 1. Save this script as restructure.js
 * 2. Run: node restructure.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Index HTML transform function
const transformIndexHtml = function(content) {
  // Transform the index.html to use the React entry point and remove CDN Tailwind
  return content
    .replace(
      /<link href="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/tailwindcss\/.*\/tailwind\.min\.css"[^>]*>/,
      '<!-- Tailwind CSS is now bundled with the application -->'
    )
    .replace(
      /<body>([\s\S]*?)<\/body>/,
      '<body>\n  <div id="root"></div>\n  <script type="module" src="/src/main.tsx"></script>\n</body>'
    );
};

const rawCSP = `default-src 'self'; 
  script-src 'self' https://cdnjs.cloudflare.com https://unpkg.com; 
  style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; 
  img-src 'self' data:; 
  connect-src 'self';
  font-src 'self';
  object-src 'none';
  frame-ancestors 'none';`;

const processedCSP = rawCSP.replace(/\s+/g, ' ').trim();

// Configuration
const config = {
  // Root directory for the project (current directory)
  rootDir: '.',

  // Content Security Policy definition
  csp: processedCSP,

  // Directory structure to create
  dirs: {
    src: {
      _self: 'src',
      components: {
        _self: 'src/components',
        common: 'src/components/common',
        layout: 'src/components/layout',
        projects: 'src/components/projects'
      },
      pages: {
        _self: 'src/pages',
        home: 'src/pages/home',
        projects: 'src/pages/projects',
        projectDetail: 'src/pages/projectDetail'
      },
      hooks: 'src/hooks',
      lib: 'src/lib',
      services: 'src/services',
      assets: {
        _self: 'src/assets',
        images: 'src/assets/images',
        icons: 'src/assets/icons',
        data: 'src/assets/data'
      }
    },
    public: 'public',
    scripts: 'scripts'
  },
  // File mappings from current structure to new structure
  fileMappings: [
    // Keep index.html in the root (required for Vite)
    { from: 'index.html', to: 'index.html', transform: transformIndexHtml },
    
    // CSS files
    { from: 'public/assets/css/styles.css', to: 'src/assets/styles/main.css' },
    
    // Data files - move to public with content hash
    { 
      from: 'public/assets/js/gdelt-gkg.json', 
      to: 'public/data/gdelt-gkg.json', 
      contentHash: true 
    },
    { 
      from: 'public/assets/js/situational-awareness-graph.json', 
      to: 'public/data/situational-awareness-graph.json', 
      contentHash: true 
    },
    { 
      from: 'public/assets/js/string.cyjs', 
      to: 'public/data/string.cyjs', 
      contentHash: true 
    },
    
    // Transformers demo - keep structure but put in public
    { from: 'public/assets/projects/transformers-demo', to: 'public/projects/transformers-demo' },
    
    // Project content files - will be imported by React components with content hash
    { 
      from: 'public/assets/js/event-analyzer.js', 
      to: 'public/js/event-analyzer.js', 
      contentHash: true 
    },
    { 
      from: 'public/assets/js/gdelt-gkg.js', 
      to: 'public/js/gdelt-gkg.js', 
      contentHash: true 
    },
    { 
      from: 'public/assets/js/cytoscape-viewer.js', 
      to: 'public/js/cytoscape-viewer.js', 
      contentHash: true 
    },
    { 
      from: 'public/assets/js/situational-awareness.js', 
      to: 'public/js/situational-awareness.js', 
      contentHash: true 
    }
  ],
  // Files to create
  filesToCreate: [
    // Root index.html (entry point for Vite)
    {
      path: 'index.html',
      content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Don Branson - AI Engineer & Solutions Architect Portfolio" />
  <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">
  <title>Don Branson - AI Engineer & Solutions Architect</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>`
    },
    // TypeScript definition for projects
    {
      path: 'src/types/index.ts',
      content: `export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
}

export interface ProjectDetail extends Project {
  fullDescription?: string;
  technologies?: string[];
  githubUrl?: string;
  demoUrl?: string;
}
`
    },
    // Project services with memoization
    {
      path: 'src/services/projectService.ts',
      content: `import { useMemo } from 'react';
import type { Project, ProjectDetail } from '../types';

// Project data
const projects: Project[] = [
  {
    id: 'gdelt',
    title: 'GDELT GKG Viewer',
    description: 'An interactive viewer for the GDELT Global Knowledge Graph.',
    tags: ['React', 'Tailwind CSS', 'Leaflet', 'Data Visualization'],
    link: '/projects/gdelt'
  },
  {
    id: 'cytoscape',
    title: 'STRING Network Viewer',
    description: 'Interactive visualization of protein-protein interaction networks using Cytoscape.js.',
    tags: ['Cytoscape.js', 'Network Analysis', 'Bioinformatics'],
    link: '/projects/cytoscape'
  },
  {
    id: 'event-analyzer',
    title: 'Event Analysis System',
    description: 'An interactive system for analyzing social media events using pattern matching and ontology support.',
    tags: ['JavaScript', 'NLP', 'Pattern Matching'],
    link: '/projects/event-analyzer'
  },
  {
    id: 'situational-awareness',
    title: 'Situational Awareness Graph',
    description: 'Interactive network visualization for situational awareness scenarios.',
    tags: ['Python', 'NetworkX', 'Graph Analysis'],
    link: '/projects/situational-awareness'
  }
];

// Project details data
const projectDetails: Record<string, ProjectDetail> = {
  'gdelt': {
    id: 'gdelt',
    title: 'GDELT GKG Viewer',
    description: 'An interactive viewer for the GDELT Global Knowledge Graph.',
    tags: ['React', 'Tailwind CSS', 'Leaflet', 'Data Visualization'],
    link: '/projects/gdelt',
    fullDescription: 'An interactive viewer for the GDELT Global Knowledge Graph. Built as a single-page prototype application using React, Tailwind CSS, and Leaflet for map visualizations, it offers a searchable record list, tone analysis, version toggling, and an intuitive user interface for exploring multidimensional data.',
    technologies: ['React', 'Tailwind CSS', 'Leaflet', 'Data Visualization'],
    githubUrl: 'https://github.com/donbr/donbr.github.io'
  },
  'cytoscape': {
    id: 'cytoscape',
    title: 'STRING Network Viewer',
    description: 'Interactive visualization of protein-protein interaction networks using Cytoscape.js.',
    tags: ['Cytoscape.js', 'Network Analysis', 'Bioinformatics'],
    link: '/projects/cytoscape',
    fullDescription: 'Interactive visualization of protein-protein interaction networks using Cytoscape.js. Features dynamic layouts, protein information display, and interaction details.',
    technologies: ['Cytoscape.js', 'JavaScript', 'Network Analysis', 'Bioinformatics'],
    githubUrl: 'https://github.com/donbr/donbr.github.io'
  },
  'event-analyzer': {
    id: 'event-analyzer',
    title: 'Event Analysis System',
    description: 'An interactive system for analyzing social media events using pattern matching and ontology support.',
    tags: ['JavaScript', 'NLP', 'Pattern Matching'],
    link: '/projects/event-analyzer',
    fullDescription: 'An interactive system for analyzing social media events using pattern matching and ontology support. This demo showcases event classification, temporal analysis, and entity extraction capabilities.',
    technologies: ['JavaScript', 'NLP', 'Pattern Matching', 'Ontology'],
    githubUrl: 'https://github.com/donbr/donbr.github.io'
  },
  'situational-awareness': {
    id: 'situational-awareness',
    title: 'Situational Awareness Graph',
    description: 'Interactive network visualization for situational awareness scenarios.',
    tags: ['Python', 'NetworkX', 'Graph Analysis'],
    link: '/projects/situational-awareness',
    fullDescription: 'Interactive network visualization demonstrating relationships between different aspects of situational awareness, including disaster response, cybersecurity threats, and supply chain disruptions.',
    technologies: ['ECharts', 'JavaScript', 'Network Analysis', 'Visualization'],
    githubUrl: 'https://github.com/donbr/donbr.github.io'
  }
};

/**
 * Get all projects
 * @returns Array of projects
 */
export function getAllProjects(): Project[] {
  return projects;
}

/**
 * Custom hook to get all projects with memoization
 * @returns Memoized array of projects
 */
export function useAllProjects(): Project[] {
  return useMemo(() => getAllProjects(), []);
}

/**
 * Get project details by ID
 * @param id Project ID
 * @returns Project details or undefined if not found
 */
export function getProjectById(id: string): ProjectDetail | undefined {
  return projectDetails[id];
}

/**
 * Custom hook to get project details by ID with memoization
 * @param id Project ID
 * @returns Memoized project details
 */
export function useProjectById(id: string): ProjectDetail | undefined {
  return useMemo(() => getProjectById(id), [id]);
}
`
    },
    // tsconfig.node.json
    {
      path: 'tsconfig.node.json',
      content: `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
`
    },
    // GitHub Actions workflow
    {
      path: '.github/workflows/deploy.yml',
      content: `name: Build and Deploy

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v3

      - name: Setup Node.js ⚙️
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install Dependencies 📦
        run: npm ci

      - name: Lint 🧹
        run: npm run lint

      - name: Type Check 🔍
        run: npm run typecheck
        
      - name: Build 🔨
        run: npm run build
        
      - name: Check build output 🔍
        run: |
          if [ ! -f "dist/index.html" ]; then
            echo "Build failed: index.html not found in dist directory"
            exit 1
          fi

      - name: Deploy to GitHub Pages 🚀
        if: github.ref == 'refs/heads/main'
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
          branch: gh-pages
          clean: true
`
    },
    // Create an enhanced ErrorBoundary with error tracking
    {
      path: 'src/components/common/ErrorBoundary.tsx',
      content: `import React, { Component, ErrorInfo, ReactNode } from 'react';
import { analyticsService } from '../../lib/vitals';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary component to catch JavaScript errors anywhere in child component tree
 * and display a fallback UI instead of crashing the whole app
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    this.logError(error, errorInfo);
  }
  
  /**
   * Log error to analytics service
   * In production, this would connect to Sentry, LogRocket, etc.
   */
  private logError(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    // Track error in analytics
    analyticsService.trackEvent('error_boundary', {
      error: error.toString(),
      componentStack: errorInfo.componentStack,
      url: window.location.href
    });
    
    // Example integration with error monitoring services
    if (window.Sentry) {
      window.Sentry.captureException(error);
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Default fallback UI
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h3>
          <p className="text-red-600 mb-4">
            There was an error loading this component. Try refreshing the page.
          </p>
          <details className="text-sm text-gray-700">
            <summary className="cursor-pointer">Technical details</summary>
            <pre className="mt-2 p-2 bg-gray-100 rounded overflow-x-auto">
              {this.state.error?.toString()}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Add type definition for Sentry
declare global {
  interface Window {
    Sentry?: {
      captureException: (error: Error) => void;
    };
  }
}

export default ErrorBoundary;
`
    },
    
    // Security Utils for CSP and SRI
    {
      path: 'src/lib/security.ts',
      content: `/**
 * Security utility functions for CSP and SRI
 */

/**
 * Gets the SRI hash for a script
 * @param scriptUrl URL of the script
 * @returns SRI hash or undefined if not found
 */
export function getScriptIntegrity(scriptUrl: string): string | undefined {
  return window.scriptHashes?.[scriptUrl];
}

/**
 * Validates a script URL against CSP rules
 * @param url Script URL to validate
 * @returns True if URL is allowed by CSP
 */
export function isUrlAllowedByCSP(url: string): boolean {
  // Extract domain from URL
  let domain = '';
  try {
    domain = new URL(url).hostname;
  } catch (e) {
    // Handle relative URLs
    if (url.startsWith('/')) {
      return true;
    }
    return false;
  }
  
  // List of allowed domains from CSP
  const allowedDomains = [
    'cdnjs.cloudflare.com',
    'unpkg.com',
    window.location.hostname
  ];
  
  return allowedDomains.some(allowed => domain === allowed || domain.endsWith(\`.\${allowed}\`));
}

/**
 * Safely loads a script with CSP validation and SRI when available
 * @param url Script URL
 * @returns Promise that resolves when script is loaded
 */
export function loadScriptSafely(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!isUrlAllowedByCSP(url)) {
      reject(new Error(\`Script URL "\${url}" is not allowed by CSP\`));
      return;
    }
    
    const script = document.createElement('script');
    script.src = url;
    
    // Add integrity check if available
    const integrity = getScriptIntegrity(url);
    if (integrity) {
      script.integrity = integrity;
      script.crossOrigin = 'anonymous';
    }
    
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(\`Failed to load script "\${url}"\`));
    
    document.body.appendChild(script);
  });
}

// Add type definition for script hashes
declare global {
  interface Window {
    scriptHashes?: Record<string, string>;
  }
}
`
    },
    {
      path: 'src/lib/vitals.ts',
      content: `import type { CLSMetric, FIDMetric, LCPMetric } from 'web-vitals';

/**
 * Interface for web vitals metric
 */
type MetricType = CLSMetric | FIDMetric | LCPMetric;

/**
 * Reports web vitals to analytics service
 * @param metric Web vitals metric
 */
function reportWebVitals(metric: MetricType): void {
  // Send to analytics service 
  console.log('Web Vitals:', metric);
  
  // Example: Google Analytics
  if (window.gtag) {
    window.gtag('event', 'web-vitals', {
      event_category: 'Web Vitals',
      event_label: metric.name,
      value: Math.round(metric.value * 100) / 100,
      non_interaction: true,
    });
  }
}

/**
 * Initializes web vitals tracking
 */
export function initWebVitals(): void {
  if (import.meta.env.PROD) {
    import('web-vitals').then(({ getCLS, getFID, getLCP }) => {
      getCLS(reportWebVitals);
      getFID(reportWebVitals);
      getLCP(reportWebVitals);
    });
  }
}

// Add type definition for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
`
    },
    
    // Update main.tsx to use TypeScript and include Web Vitals
    {
      path: 'src/main.tsx',
      content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { initWebVitals } from './lib/vitals';
import './assets/styles/main.css';

// Initialize web vitals in production
initWebVitals();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
`
    },
    
    // App.tsx with ErrorBoundary
    {
      path: 'src/App.tsx',
      content: `import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ErrorBoundary from './components/common/ErrorBoundary';

// Lazy-loaded pages for code splitting
const HomePage = lazy(() => import('./pages/home'));
const ProjectsPage = lazy(() => import('./pages/projects'));
const ProjectDetailPage = lazy(() => import('./pages/projectDetail'));

function App(): JSX.Element {
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
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

export default App;
`
    },
    // Header component
    {
      path: 'src/components/layout/Header.jsx',
      content: `import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link to="/" className="flex items-center py-4">
                <span className="font-semibold text-gray-700 text-lg">Don Branson</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/#about" className="py-4 px-2 text-gray-500 hover:text-gray-900">About</Link>
            <Link to="/#expertise" className="py-4 px-2 text-gray-500 hover:text-gray-900">Expertise</Link>
            <Link to="/#certifications" className="py-4 px-2 text-gray-500 hover:text-gray-900">Certifications</Link>
            <Link to="/projects" className="py-4 px-2 text-gray-500 hover:text-gray-900">Projects</Link>
            <Link to="/#contact" className="py-4 px-2 text-gray-500 hover:text-gray-900">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
`
    },
    // Footer component
    {
      path: 'src/components/layout/Footer.jsx',
      content: `import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p>&copy; {currentYear} Don Branson. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
`
    },
    // Home page
    {
      path: 'src/pages/home/index.jsx',
      content: `import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Don Branson</h1>
            <p className="text-xl text-gray-600 mb-8">AI Engineer & Solutions Architect</p>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Versatile professional with over two decades of expertise in AI engineering, solutions architecture, and business solution implementation.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="https://github.com/donbr" className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700">GitHub</a>
              <a href="https://www.linkedin.com/in/donbranson/" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">About Me</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 leading-relaxed mb-4">
              Based in Southern California, I'm a solutions architect and AI engineer with comprehensive expertise spanning program management, 
              architecture, development, and business solution implementation. I specialize in delivering outcomes across diverse industries 
              including travel and transportation, public sector, life sciences, telecommunications, and insurance.
            </p>
            <p className="text-gray-600 leading-relaxed">
              I'm particularly focused on cutting-edge AI technologies including generative AI, large language models, and computer vision, 
              with a strong emphasis on responsible AI development and deployment.
            </p>
          </div>
        </div>
      </section>

      {/* Additional sections would be added here */}
    </div>
  );
}

export default HomePage;
`
    },
    // Projects page
    {
      path: 'src/pages/projects/index.jsx',
      content: `import React from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../../components/common/ProjectCard';

function ProjectsPage() {
  const projects = [
    {
      id: 'gdelt',
      title: 'GDELT GKG Viewer',
      description: 'An interactive viewer for the GDELT Global Knowledge Graph.',
      tags: ['React', 'Tailwind CSS', 'Leaflet', 'Data Visualization'],
      link: '/projects/gdelt'
    },
    {
      id: 'cytoscape',
      title: 'STRING Network Viewer',
      description: 'Interactive visualization of protein-protein interaction networks using Cytoscape.js.',
      tags: ['Cytoscape.js', 'Network Analysis', 'Bioinformatics'],
      link: '/projects/cytoscape'
    },
    {
      id: 'event-analyzer',
      title: 'Event Analysis System',
      description: 'An interactive system for analyzing social media events using pattern matching and ontology support.',
      tags: ['JavaScript', 'NLP', 'Pattern Matching'],
      link: '/projects/event-analyzer'
    },
    {
      id: 'situational-awareness',
      title: 'Situational Awareness Graph',
      description: 'Interactive network visualization for situational awareness scenarios.',
      tags: ['Python', 'NetworkX', 'Graph Analysis'],
      link: '/projects/situational-awareness'
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Recent Projects</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map(project => (
            <ProjectCard 
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              tags={project.tags}
              link={project.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsPage;
`
    },
    // ProjectCard component
    {
      path: 'src/components/common/ProjectCard.jsx',
      content: `import React from 'react';
import { Link } from 'react-router-dom';

function ProjectCard({ id, title, description, tags, link }) {
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
}

export default ProjectCard;
`
    },
    // Project Detail page
    {
      path: 'src/pages/projectDetail/index.jsx',
      content: `import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Import project components
import GdeltViewer from '../../components/projects/GdeltViewer';
import CytoscapeViewer from '../../components/projects/CytoscapeViewer';
import EventAnalyzer from '../../components/projects/EventAnalyzer';
import SituationalAwareness from '../../components/projects/SituationalAwareness';

function ProjectDetailPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  
  // Map of project IDs to their respective components
  const projectComponents = {
    'gdelt': GdeltViewer,
    'cytoscape': CytoscapeViewer,
    'event-analyzer': EventAnalyzer,
    'situational-awareness': SituationalAwareness
  };
  
  // Project data
  const projectData = {
    'gdelt': {
      title: 'GDELT GKG Viewer',
      description: 'An interactive viewer for the GDELT Global Knowledge Graph. Built as a single-page prototype application using React, Tailwind CSS, and Leaflet for map visualizations, it offers a searchable record list, tone analysis, version toggling, and an intuitive user interface for exploring multidimensional data.'
    },
    'cytoscape': {
      title: 'STRING Network Viewer',
      description: 'Interactive visualization of protein-protein interaction networks using Cytoscape.js. Features dynamic layouts, protein information display, and interaction details.'
    },
    'event-analyzer': {
      title: 'Event Analysis System',
      description: 'An interactive system for analyzing social media events using pattern matching and ontology support. This demo showcases event classification, temporal analysis, and entity extraction capabilities.'
    },
    'situational-awareness': {
      title: 'Situational Awareness Graph',
      description: 'Interactive network visualization demonstrating relationships between different aspects of situational awareness, including disaster response, cybersecurity threats, and supply chain disruptions.'
    }
  };
  
  useEffect(() => {
    // If invalid project ID, redirect to projects page
    if (!projectData[projectId]) {
      navigate('/projects');
      return;
    }
    
    setProject(projectData[projectId]);
  }, [projectId, navigate]);
  
  if (!project) return <div>Loading...</div>;
  
  // Dynamically render the project component
  const ProjectComponent = projectComponents[projectId];
  
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
        <p className="text-gray-600 mb-8">{project.description}</p>
        
        {/* Project content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <ProjectComponent />
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailPage;
`
    },
    // GdeltViewer component stub
    {
      path: 'src/components/projects/GdeltViewer.jsx',
      content: `import React, { useEffect, useRef } from 'react';

function GdeltViewer() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Load the legacy script
    const script = document.createElement('script');
    script.src = '/js/gdelt-gkg.js';
    script.async = true;
    document.body.appendChild(script);
    
    // Clean up
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  return (
    <div>
      {/* This div will be used by the legacy script */}
      <div id="root" ref={containerRef}></div>
    </div>
  );
}

export default GdeltViewer;
`
    },
    // CytoscapeViewer component stub
    {
      path: 'src/components/projects/CytoscapeViewer.jsx',
      content: `import React, { useEffect, useRef } from 'react';

function CytoscapeViewer() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Load Cytoscape.js
    const cytoscapeScript = document.createElement('script');
    cytoscapeScript.src = 'https://unpkg.com/cytoscape@3.31.0/dist/cytoscape.min.js';
    cytoscapeScript.async = true;
    document.head.appendChild(cytoscapeScript);
    
    cytoscapeScript.onload = () => {
      // Load the viewer script after Cytoscape is loaded
      const viewerScript = document.createElement('script');
      viewerScript.src = '/js/cytoscape-viewer.js';
      viewerScript.async = true;
      document.body.appendChild(viewerScript);
    };
    
    // Clean up
    return () => {
      document.head.removeChild(cytoscapeScript);
      // Remove viewer script if it was added
      const viewerScript = document.querySelector('script[src="/js/cytoscape-viewer.js"]');
      if (viewerScript) {
        document.body.removeChild(viewerScript);
      }
    };
  }, []);
  
  return (
    <div>
      <div id="title"></div>
      <div id="cy" style={{ width: '100%', height: '600px', display: 'block', border: '1px solid #ddd' }}></div>
      <div className="controls space-x-4">
        <button id="fit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500">
          Fit View
        </button>
        <button id="showAll" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500">
          Show All Properties
        </button>
      </div>
      <div id="info" style={{ 
        position: 'fixed',
        right: '20px',
        top: '20px',
        background: 'white',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        maxWidth: '300px',
        display: 'none',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        zIndex: 1000
      }}></div>
      <div id="error-message" style={{
        position: 'absolute',
        left: '20px',
        top: '20px',
        background: '#f8d7da',
        color: '#721c24',
        padding: '10px',
        border: '1px solid #f5c6cb',
        borderRadius: '4px',
        display: 'none'
      }}></div>
    </div>
  );
}

export default CytoscapeViewer;
`
    },
    // SituationalAwareness component stub
    {
      path: 'src/components/projects/SituationalAwareness.jsx',
      content: `import React, { useEffect, useRef } from 'react';

function SituationalAwareness() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Load ECharts
    const echartsScript = document.createElement('script');
    echartsScript.src = 'https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js';
    echartsScript.async = true;
    document.head.appendChild(echartsScript);
    
    echartsScript.onload = () => {
      // Load the viewer script after ECharts is loaded
      const viewerScript = document.createElement('script');
      viewerScript.src = '/js/situational-awareness.js';
      viewerScript.async = true;
      document.body.appendChild(viewerScript);
    };
    
    // Clean up
    return () => {
      document.head.removeChild(echartsScript);
      // Remove viewer script if it was added
      const viewerScript = document.querySelector('script[src="/js/situational-awareness.js"]');
      if (viewerScript) {
        document.body.removeChild(viewerScript);
      }
    };
  }, []);
  
  return (
    <div>
      <div id="graph-container" style={{ width: '100%', height: '700px', border: '1px solid #ddd', backgroundColor: 'white' }}></div>
      <div className="mt-4 flex gap-4">
        <button id="zoomIn" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500">Zoom In</button>
        <button id="zoomOut" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500">Zoom Out</button>
        <button id="resetView" className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500">Reset View</button>
        <button id="toggleLayout" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500">Toggle Layout</button>
      </div>
    </div>
  );
}

export default SituationalAwareness;
`
    },
    // EventAnalyzer component stub
    {
      path: 'src/components/projects/EventAnalyzer.jsx',
      content: `import React, { useEffect, useState } from 'react';

function EventAnalyzer() {
  const [result, setResult] = useState('');
  const [input, setInput] = useState('BREAKING: Major protest gathering @downtown_group in New York City at 14:30 today. #CivilRights Organization reports over 1000 participants at Times Square.');
  
  useEffect(() => {
    // Load Lodash
    const lodashScript = document.createElement('script');
    lodashScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js';
    lodashScript.async = true;
    document.head.appendChild(lodashScript);
    
    lodashScript.onload = () => {
      // Load the event analyzer script after Lodash is loaded
      const analyzerScript = document.createElement('script');
      analyzerScript.src = '/js/event-analyzer.js';
      analyzerScript.async = true;
      document.body.appendChild(analyzerScript);
      
      // Wait for script to load before initializing
      analyzerScript.onload = initializeAnalyzer;
    };
    
    function initializeAnalyzer() {
      // If the script has defined an EventAnalyzer class
      if (window.EventAnalyzer) {
        const analyzer = new window.EventAnalyzer();
        analyzeText(analyzer, input);
      }
    }
    
    // Clean up
    return () => {
      document.head.removeChild(lodashScript);
      // Remove analyzer script if it was added
      const analyzerScript = document.querySelector('script[src="/js/event-analyzer.js"]');
      if (analyzerScript) {
        document.body.removeChild(analyzerScript);
      }
    };
  }, []);
  
  const analyzeText = async (analyzer, text) => {
    try {
      const analysis = await analyzer.analyzeTweet(text);
      
      // Format the results
      const formattedResult = {
        ...analysis,
        confidence: \`\${(analysis.confidence * 100).toFixed(1)}%\`,
        summary: generateSummary(analysis)
      };
      
      setResult(JSON.stringify(formattedResult, null, 2));
    } catch (error) {
      setResult(\`Error: \${error.message}\`);
    }
  };
  
  // This function should match the one in the original script
  const generateSummary = (analysis) => {
    const parts = [];
    
    if (analysis.type) {
      parts.push(\`Type: \${analysis.type}\`);
    }
    
    if (analysis.time && analysis.time.length > 0) {
      const times = analysis.time.map(t => t.value).join(', ');
      parts.push(\`Time: \${times}\`);
    }
    
    if (analysis.place && analysis.place.length > 0) {
      const places = analysis.place.map(p => p.value).join(', ');
      parts.push(\`Location: \${places}\`);
    }
    
    if (analysis.entities && analysis.entities.length > 0) {
      const entities = analysis.entities.map(e => \`\${e.type}: \${e.value}\`).join(', ');
      parts.push(\`Entities: \${entities}\`);
    }
    
    return parts.join(' | ');
  };
  
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  
  const handleAnalyzeClick = () => {
    if (window.EventAnalyzer) {
      const analyzer = new window.EventAnalyzer();
      analyzeText(analyzer, input);
    }
  };
  
  return (
    <div>
      <div className="mb-4">
        <label htmlFor="tweetInput" className="block text-gray-700 font-medium mb-2">Enter text to analyze:</label>
        <textarea 
          id="tweetInput" 
          rows="4" 
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={handleInputChange}
        />
      </div>
      <button 
        id="analyzeBtn" 
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 transition-colors"
        onClick={handleAnalyzeClick}
      >
        Analyze Text
      </button>
      
      {/* Results Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Analysis Results:</h3>
        <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto text-sm font-mono">{result}</pre>
      </div>
    </div>
  );
}

export default EventAnalyzer;
`
    },
    // Vite config with code splitting and CSS optimization
    {
      path: 'vite.config.ts',
      content: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  // Configure base for GitHub Pages deployment
  base: '/donbr.github.io/',
  
  // Add React plugin
  plugins: [react()],
  
  // Resolve aliases for easier imports
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@lib': resolve(__dirname, 'src/lib'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@pages': resolve(__dirname, 'src/pages')
    }
  },
  
  // Configure build output with optimizations
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true, // Enable source maps for debugging
    cssCodeSplit: true, // Split CSS by chunks
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for node_modules
          vendor: [
            'react', 
            'react-dom', 
            'react-router-dom'
          ],
          // Separate chunks for each major section
          home: ['./src/pages/home/index.tsx'],
          projects: ['./src/pages/projects/index.tsx'],
          projectDetail: ['./src/pages/projectDetail/index.tsx']
        }
      }
    },
    // Terser options for production
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
      }
    }
  },
  
  // CSS optimization
  css: {
    devSourcemap: true, // Source maps for CSS in development
    preprocessorOptions: {
      scss: {
        // Add any SCSS options here if needed
      }
    }
  },
});
`
    },
    // Package.json
    {
      path: 'package.json',
      content: `{
  "name": "donbr-github-io",
  "version": "1.0.0",
  "description": "Don Branson's portfolio website",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write 'src/**/*.{js,jsx,ts,tsx,html,css}'"
  },
  "devDependencies": {
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.56.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "postcss": "^8.4.32",
    "prettier": "^3.1.1",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.3",
    "vite": "^5.0.10"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.1"
  }
}
`
    },
    // TypeScript config
    {
      path: 'tsconfig.json',
      content: `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    
    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    
    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    
    /* Paths */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@assets/*": ["src/assets/*"],
      "@lib/*": ["src/lib/*"],
      "@hooks/*": ["src/hooks/*"],
      "@pages/*": ["src/pages/*"]
    }
  },
    "include": ["src"],
    "references": [{ "path": "./tsconfig.node.json" }]
  }
`
    },
    // Tailwind CSS configuration
    {
      path: 'postcss.config.js',
      content: `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`
    },
    
    // Tailwind configuration file
    {
      path: 'tailwind.config.js',
      content: `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
    },
  },
  plugins: [],
}
`
    },
    
    // Main CSS file with Tailwind imports
    {
      path: 'src/assets/styles/main.css',
      content: `/* Import Tailwind CSS */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles */
@layer components {
  .project-card {
    @apply transition-transform duration-200 ease-in-out;
  }
  
  .project-card:hover {
    @apply transform -translate-y-1 shadow-lg;
  }
  
  .skill-card {
    @apply transition-transform duration-200 ease-in-out;
  }
  
  .skill-card:hover {
    @apply transform -translate-y-1 shadow-lg;
  }
}
`
    },
    
    // Project Card component with TypeScript and memoization
    {
      path: 'src/components/common/ProjectCard.tsx',
      content: `import React, { memo } from 'react';
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
`
    },
    
    // Add accessibility enhancements to Header component
    {
      path: 'src/components/layout/Header.tsx',
      content: `import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Header component with navigation and accessibility improvements
 */
const Header: React.FC = () => {
  return (
    <nav className="bg-white shadow-lg" aria-label="Main navigation">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link to="/" className="flex items-center py-4" aria-label="Home page">
                <span className="font-semibold text-gray-700 text-lg">Don Branson</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-3" role="menubar">
            <Link to="/#about" className="py-4 px-2 text-gray-500 hover:text-gray-900" role="menuitem">About</Link>
            <Link to="/#expertise" className="py-4 px-2 text-gray-500 hover:text-gray-900" role="menuitem">Expertise</Link>
            <Link to="/#certifications" className="py-4 px-2 text-gray-500 hover:text-gray-900" role="menuitem">Certifications</Link>
            <Link to="/projects" className="py-4 px-2 text-gray-500 hover:text-gray-900" role="menuitem">Projects</Link>
            <Link to="/#contact" className="py-4 px-2 text-gray-500 hover:text-gray-900" role="menuitem">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
`
    },
    
    // Footer component with TypeScript
    {
      path: 'src/components/layout/Footer.tsx',
      content: `import React from 'react';

/**
 * Footer component
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p>&copy; {currentYear} Don Branson. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
`
    },
    
    // Update GdeltViewer component to use ErrorBoundary and handle script loading more securely
    {
      path: 'src/components/projects/GdeltViewer.tsx',
      content: `import React, { useEffect, useRef, useState } from 'react';
import ErrorBoundary from '../common/ErrorBoundary';

interface ScriptStatus {
  loaded: boolean;
  error: Error | null;
}

/**
 * GdeltViewer component that loads and integrates with the legacy GDELT viewer script
 */
const GdeltViewer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptStatus, setScriptStatus] = useState<ScriptStatus>({ loaded: false, error: null });
  
  // Calculate script URL with content hash (will be generated during build)
  const scriptUrl = '/js/gdelt-gkg.js';
  
  useEffect(() => {
    // Load the legacy script
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    
    // Handle script loading events
    script.onload = () => {
      setScriptStatus({ loaded: true, error: null });
    };
    
    script.onerror = (e) => {
      setScriptStatus({ loaded: false, error: new Error('Failed to load GDELT script') });
      console.error('Failed to load GDELT script:', e);
    };
    
    // Add integrity check if available
    if (window.scriptHashes && window.scriptHashes[scriptUrl]) {
      script.integrity = window.scriptHashes[scriptUrl];
      script.crossOrigin = 'anonymous';
    }
    
    document.body.appendChild(script);
    
    // Clean up
    return () => {
      document.body.removeChild(script);
    };
  }, [scriptUrl]);
  
  if (scriptStatus.error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading GDELT Viewer</h3>
        <p className="text-red-600">
          There was a problem loading the GDELT viewer. Please try refreshing the page.
        </p>
      </div>
    );
  }
  
  return (
    <ErrorBoundary>
      <div className="gdelt-container">
        {!scriptStatus.loaded && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Loading GDELT viewer...</p>
          </div>
        )}
        <div id="root" ref={containerRef} className={scriptStatus.loaded ? '' : 'opacity-0'} />
      </div>
    </ErrorBoundary>
  );
};

// Add type definition for script hashes
declare global {
  interface Window {
    scriptHashes?: Record<string, string>;
  }
}

export default GdeltViewer;
`
    },
    
    // Update index.html with meta tags and centralized CSP
    {
      path: 'index.html',
      content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Don Branson - AI Engineer & Solutions Architect Portfolio" />
  <meta name="author" content="Don Branson" />
  <meta name="keywords" content="AI, Solutions Architecture, Machine Learning, Engineering" />
  
  <!-- Security headers - centralized CSP definition -->
  <meta http-equiv="Content-Security-Policy" content="${processedCSP}" />
  <meta http-equiv="X-Content-Type-Options" content="nosniff" />
  <meta http-equiv="X-Frame-Options" content="DENY" />
  <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
  <meta http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
  
  <title>Don Branson - AI Engineer & Solutions Architect</title>
  
  <!-- Script hash container -->
  <script>
    window.scriptHashes = {};
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`
    },
    
    // Update useScript hook to use security utilities
    {
      path: 'src/hooks/useScript.ts',
      content: `import { useState, useEffect } from 'react';
import { isUrlAllowedByCSP, getScriptIntegrity } from '../lib/security';

interface ScriptStatus {
  loaded: boolean;
  error: Error | null;
}

/**
 * Custom hook to load an external script with security best practices
 * @param src Script URL
 * @returns Script loading status
 */
export default function useScript(src: string): ScriptStatus {
  const [status, setStatus] = useState<ScriptStatus>({
    loaded: false,
    error: null
  });

  useEffect(() => {
    // Skip if src is empty
    if (!src) {
      return;
    }
    
    // Check if URL is allowed by CSP
    if (!isUrlAllowedByCSP(src)) {
      setStatus({
        loaded: false,
        error: new Error(\`Script URL "\${src}" is not allowed by CSP\`)
      });
      return;
    }

    // Look for existing script
    let script = document.querySelector(\`script[src="\${src}"]\`) as HTMLScriptElement;

    if (!script) {
      // Create script
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      
      // Add integrity check if available
      const integrity = getScriptIntegrity(src);
      if (integrity) {
        script.integrity = integrity;
        script.crossOrigin = 'anonymous';
      }
      
      // Add to document
      document.body.appendChild(script);
      
      // Handle events
      const handleLoad = () => setStatus({ loaded: true, error: null });
      const handleError = (err: Event | string) => {
        const error = err instanceof Event ? new Error(\`Failed to load \${src}\`) : new Error(err);
        setStatus({ loaded: false, error });
      };
      
      script.addEventListener('load', handleLoad);
      script.addEventListener('error', handleError as EventListener);
      
      // Cleanup
      return () => {
        script.removeEventListener('load', handleLoad);
        script.removeEventListener('error', handleError as EventListener);
        
        // Only remove if not needed elsewhere
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    } else {
      // Script already exists
      setStatus({ loaded: true, error: null });
    }
  }, [src]);

  return status;
}
`
    },
    
    // Create ProjectsPage with TypeScript
    {
      path: 'src/pages/projects/index.tsx',
      content: `import React from 'react';
import ProjectCard from '../../components/common/ProjectCard';
import { useAllProjects } from '../../services/projectService';
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
`
    },
    
    // Create ProjectDetailPage with TypeScript
    {
      path: 'src/pages/projectDetail/index.tsx',
      content: `import React, { useEffect, Suspense, lazy } from 'react';
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
`
    }
// At the end of restructure.js
]
};

// Execute restructuring
function restructure() {
  console.log('Starting restructure...');
  // Create directories
  console.log('Creating directory structure...');
  createDirectories(config.dirs);

  // Create new files
  console.log('Creating new files...');
  createFiles(config.filesToCreate);

  // Move and transform files
  console.log('Moving and transforming files...');
  moveFiles(config.fileMappings);

  // Install dependencies
  console.log('Installing dependencies...');
  installDependencies();

  console.log('Restructure complete!');

// Helper functions
function createDirectories(dirs) {
  Object.entries(dirs).forEach(([key, value]) => {
    if (typeof value === 'string') {
      fs.mkdirSync(value, { recursive: true });
    } else if (typeof value === 'object') {
      // Handle nested directories
      if (value._self) {
        fs.mkdirSync(value._self, { recursive: true });
      }
      // Recursively create subdirectories
      createDirectories(value);
    }
  });
}

function createFiles(files) {
  files.forEach(file => {
    const dir = path.dirname(file.path);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file.path, file.content);
  });
}

function moveFiles(mappings) {
  mappings.forEach(mapping => {
    if (!fs.existsSync(mapping.from)) {
      console.warn(`Warning: Source file ${mapping.from} does not exist`);
      return;
    }

    // Check if the source is a file
    const stats = fs.statSync(mapping.from);
    if (!stats.isFile()) {
      console.warn(`Warning: ${mapping.from} is not a file and will be skipped.`);
      return;
    }

    // Create target directory if it doesn't exist
    const targetDir = path.dirname(mapping.to);
    fs.mkdirSync(targetDir, { recursive: true });

    // Read content
    let content = fs.readFileSync(mapping.from, 'utf8');

    // Apply transform if specified
    if (mapping.transform) {
      content = mapping.transform(content);
    }

    // Write to target
    fs.writeFileSync(mapping.to, content);
  });
}

function installDependencies() {
  try {
    execSync('npm install', { stdio: 'inherit' });
  } catch (error) {
    console.error('Error installing dependencies:', error);
    process.exit(1);
  }
}
}

restructure();