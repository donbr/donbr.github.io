# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal portfolio website built with React, TypeScript, and Vite, deployed to GitHub Pages. Features interactive data visualizations including GDELT analysis, network graphs with Cytoscape, event analysis, and situational awareness visualizations.

## Build and Development Commands

### Development
```bash
npm run dev              # Start dev server with hot reload
npm run preview          # Preview production build locally
```

### Building
```bash
npm run build            # Vite build (TypeScript compilation included)
```

### Linting
```bash
npm run lint             # Run ESLint on all files
```

### Deployment
```bash
npm run deploy           # Deploy to GitHub Pages (runs predeploy build automatically)
```

## Architecture

### Project Structure

- **src/pages/**: Page components
  - `HomePage.tsx`: Main landing page with hero, about, expertise sections
  - `ProjectsPage.tsx`: Projects listing with inline project data
  - `NotFoundPage.tsx`: 404 page
- **src/components/**: React components
  - `layout/Layout.tsx`: Main layout wrapper with navigation and footer
  - `ui/`: shadcn/ui components (button, etc.)
  - `projects/`: Project-specific components, each in its own subdirectory
    - `gdelt/GdeltRecordViewer.tsx`: GDELT data viewer
    - `gdelt-kb/GdeltKnowledgeBase.tsx`: GDELT knowledge base viewer
    - `cytoscape/CytoscapeViewer.tsx`: Network visualization
    - `event-analyzer/EventAnalyzer.tsx`: Event analysis component
    - `situational-awareness/SituationalAwareness.tsx`: Situational awareness graph
    - `advanced-retrieval/AdvancedRetrieval.tsx`: Advanced retrieval strategies component
- **src/data/**: JSON data files for visualizations
- **src/lib/**: Utility functions (utils.ts)
- **src/assets/**: Static assets

### Routing

Simple React Router setup in App.tsx:
- `/` - HomePage
- `/assets/projects` - ProjectsPage
- `/assets/projects/gdelt` - GdeltRecordViewer
- `/assets/projects/gdelt-knowledge-base` - GdeltKnowledgeBase
- `/assets/projects/cytoscape` - CytoscapeViewer
- `/assets/projects/event-analyzer` - EventAnalyzer
- `/assets/projects/situational-awareness` - SituationalAwareness
- `/assets/projects/advanced-retrieval` - AdvancedRetrieval
- `*` - NotFoundPage (404)

No lazy loading is used - all components are directly imported.

### Project Data Management

Projects are defined inline as a simple array in `ProjectsPage.tsx` (lines 130-205). Each project has:
- title
- description
- tags (with color mapping defined in tagColorMap at lines 24-70)
- Optional: demoUrl, codeUrl, huggingFaceUrl, detailUrl

The ProjectCard component is also defined inline in ProjectsPage.tsx (lines 15-127).

### Layout Component

The Layout component (`src/components/layout/Layout.tsx`) wraps all pages and provides:
- Navigation bar with links to sections (About, Expertise, Certifications, Projects, Teaching, Contact, Graph Demos)
- Active link highlighting using hash-based navigation for sections and pathname for Projects
- Footer with social links (GitHub, LinkedIn, Graph Visualizations)

### Styling

- Tailwind CSS for styling
- `cn()` utility from lib/utils.ts for conditional class names (using clsx and tailwind-merge)
- shadcn/ui components for reusable UI elements

### Utility Functions

The `src/lib/utils.ts` file provides project-specific utilities:
- `cn()`: Combines class names with Tailwind CSS conflict resolution
- `formatGdeltDate()`: Formats GDELT date strings (YYYYMMDDHHMMSS) to readable format
- `truncateString()`: Truncates strings with ellipsis
- `stringToColor()`: Generates consistent colors from strings for visualizations
- `hexToRgb()`: Converts hex colors to RGB for opacity operations

### Path Alias

TypeScript path alias configured:
- `@/*` → `src/*`

Used throughout for clean imports (e.g., `import Layout from '@/components/layout/Layout'`)

### Technical Configuration

**Vite:**
- Base URL commented out / set to `/` for deployment flexibility
- Path alias resolution for `@`

**TypeScript:**
- Strict mode enabled
- ES2020 target
- Bundler module resolution
- JSX transform: react-jsx

**ESLint:**
- Uses flat config format

## Key Dependencies

- **react** & **react-dom**: v19.0.0
- **react-router-dom**: v7.2.0 for routing
- **cytoscape**: Network visualization
- **echarts** & **echarts-for-react**: Charting for situational awareness
- **leaflet** & **react-leaflet**: Map visualization for GDELT
- **lodash**: Utility functions
- **lucide-react**: Icon library
- **class-variance-authority**, **clsx**, **tailwind-merge**: Styling utilities

## Working with Projects

To add a new project:

1. **Add project metadata** to the `projects` array in `src/pages/ProjectsPage.tsx`
2. **Create project component** in `src/components/projects/[project-name]/`
3. **Add route** in `src/App.tsx`
4. **Add data files** (if needed) to `src/data/`

## Data Files

Located in `src/data/`:
- `gdelt-gkg.json`: GDELT knowledge graph data
- `situational-awareness-graph.json`: Situational awareness graph data
- `string.json`: Network data for Cytoscape

## Notes

- No testing framework is currently configured
- No formatter (like Prettier) is configured in package.json
- Project uses direct imports (no code splitting/lazy loading)
- Some project components include their own types (e.g., situational-awareness/types.ts)
