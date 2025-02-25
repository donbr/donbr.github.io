# File Structure and Setup Instructions

Here's the expected file structure for our React application:

```
src/
├── components/
│   ├── layout/
│   │   ├── Layout.tsx       # Layout component with navigation and footer
│   ├── projects/
│   │   ├── cytoscape/
│   │   │   └── CytoscapeViewer.tsx
│   │   ├── event-analyzer/
│   │   │   └── EventAnalyzer.tsx
│   │   ├── gdelt/
│   │   │   └── GdeltViewer.tsx
│   │   └── situational-awareness/
│   │       └── SituationalAwareness.tsx
│   └── ui/
│       └── button.tsx      # shadcn/ui button component
├── data/
│   ├── gdelt-gkg.json
│   ├── situational-awareness-graph.json
│   └── string.cyjs
├── lib/
│   └── utils.ts
├── pages/
│   ├── HomePage.tsx
│   ├── NotFoundPage.tsx
│   └── ProjectsPage.tsx
├── App.tsx
└── main.tsx
```

## Setup Steps

1. Create all necessary directories:
```bash
mkdir -p src/components/layout
mkdir -p src/components/projects/gdelt
mkdir -p src/components/projects/cytoscape
mkdir -p src/components/projects/event-analyzer
mkdir -p src/components/projects/situational-awareness
mkdir -p src/data
mkdir -p src/pages
```

2. Move your data files to the data directory:
```bash
cp ./assets/js/gdelt-gkg.json ./src/data/
cp ./assets/js/situational-awareness-graph.json ./src/data/
cp ./assets/js/string.cyjs ./src/data/
```

3. Create all component files as previously defined.

4. Install necessary dependencies:
```bash
npm install react-router-dom
npm install echarts echarts-for-react
npm install cytoscape @types/cytoscape
npm install leaflet react-leaflet @types/leaflet
```

5. Update the `main.tsx` file to use React Router:
```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

6. Now you can run the application:
```bash
npm run dev
```

## Next Steps

Once this basic structure is set up and running, we can continue by:

1. Implementing the visualization components (GDELT Viewer, Cytoscape Viewer, etc.)
2. Creating reusable UI components with shadcn/ui
3. Adding more advanced features based on the project requirements

This foundational structure aligns with your React App Refactoring Guide and provides a solid starting point for migrating your existing JavaScript components to React.
