# Don Branson - Portfolio Site

This is the personal portfolio and project showcase for Don Branson, an AI Engineer & Solutions Architect. The site is built with modern web technologies to showcase projects, skills, and professional background.

## Technology Stack

- **React 18+** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **React Router** for navigation
- **ECharts** for data visualization
- **Cytoscape.js** for network visualization
- **Leaflet** for map visualization

## Project Structure

The project follows a structured approach to organization:

```
src/
├── components/     # Reusable UI components
│   ├── layout/     # Layout components (header, footer, etc.)
│   ├── projects/   # Project-specific components
│   └── ui/         # Base UI components
├── data/           # Static data files
├── lib/            # Utility functions and shared logic
├── pages/          # Page components for routing
└── App.tsx         # Main application component
```

## Projects Showcase

The portfolio includes interactive demos of various projects:

- **GDELT GKG Viewer**: Interactive viewer for the GDELT Global Knowledge Graph
- **STRING Network Viewer**: Protein interaction network visualization
- **Event Analysis System**: Social media event pattern analysis
- **Situational Awareness Graph**: Network visualization for disaster response scenarios

## Development

### Prerequisites

- Node.js 18.17.0 or higher
- npm 9.0.0 or higher

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

```bash
npm run build
```

## Deployment

The site is deployed on GitHub Pages and can be accessed at [donbr.github.io](https://donbr.github.io).

## License

All rights reserved. The code and design of this portfolio are proprietary and not licensed for public use or distribution.
