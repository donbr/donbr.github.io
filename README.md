# Don Branson - Portfolio Site

A personal portfolio and project showcase built with React, TypeScript, and Vite, deployed to GitHub Pages. Features interactive data visualizations, detailed project deep-dives, and teaching & mentorship highlights.

🌐 **Live Site:** [donbr.github.io](https://donbr.github.io)

---

## Technology Stack

- **React 19** with TypeScript
- **Vite 6** for fast development and optimized builds
- **Tailwind CSS** for styling
- **React Router v7** for navigation
- **shadcn/ui** for UI components
- **Visualization Libraries:**
  - ECharts for data visualization
  - Cytoscape.js for network graphs
  - Leaflet for map visualization
- **Deployment:** GitHub Pages

---

## Quick Start

### Prerequisites

- Node.js 18.17.0 or higher
- npm 9.0.0 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/donbr/donbr.github.io.git
cd donbr.github.io

# Install dependencies
npm install
```

### Development

```bash
# Start development server with hot reload
npm run dev

# Server will start at http://localhost:5173
```

### Building

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint
```

### Deployment

```bash
# Deploy to GitHub Pages
# (automatically runs build before deploying)
npm run deploy
```

---

## Project Structure

```
donbr.github.io/
├── src/
│   ├── components/
│   │   ├── layout/              # Layout components (header, footer)
│   │   ├── projects/            # Project-specific components
│   │   │   ├── gdelt-kb/        # GDELT Knowledge Base page
│   │   │   ├── advanced-retrieval/  # Advanced Retrieval page
│   │   │   ├── gdelt/           # GDELT Record Viewer
│   │   │   ├── cytoscape/       # Network visualization
│   │   │   ├── event-analyzer/  # Event analysis
│   │   │   └── situational-awareness/  # Situational awareness graph
│   │   └── ui/                  # shadcn/ui components
│   ├── data/                    # JSON data files for visualizations
│   ├── lib/                     # Utility functions
│   ├── pages/                   # Page components
│   │   ├── HomePage.tsx         # Landing page with sections
│   │   ├── ProjectsPage.tsx     # Projects listing
│   │   └── NotFoundPage.tsx     # 404 page
│   ├── App.tsx                  # Main app component with routing
│   └── main.tsx                 # Entry point
├── docs/                        # Documentation
│   └── site-enhancement-plan.md # Detailed enhancement roadmap
├── CLAUDE.md                    # AI assistant project guide
└── README.md                    # This file
```

---

## Key Features

### Teaching & Mentorship Section
Highlights experience as Peer Supporter & Mentor for AI Makerspace Certified AI Engineer Bootcamp, including:
- Session 7: Synthetic Data Generation
- Sessions 8-9: RAG Evaluation Metrics
- Session 10: Advanced Retrieval Strategies

### Project Deep-Dive Pages

**GDELT Knowledge Base** (`/assets/projects/gdelt-knowledge-base`)
- Five-layer RAG architecture visualization
- Retrieval evaluation results with Cohere reranker comparison
- Technical implementation details and dataset statistics

**Advanced Retrieval Strategies** (`/assets/projects/advanced-retrieval`)
- Comprehensive retrieval taxonomy (Vector, Keyword, Hybrid, Re-ranking)
- Cohere reranker deep dive with performance metrics
- Teaching insights and pedagogical approach

### Interactive Project Demos
- GDELT GKG Viewer with map visualizations
- Cytoscape network visualizations
- Event analysis system
- Situational awareness graphs

---

## Development Guide

### Path Aliases

The project uses TypeScript path aliases for clean imports:

```typescript
import Layout from '@/components/layout/Layout';
import { cn } from '@/lib/utils';
```

### Styling

- **Tailwind CSS** with custom configuration
- **cn() utility** for conditional class names (clsx + tailwind-merge)
- **shadcn/ui** components for consistent UI elements

### Adding New Projects

1. Add project metadata to `projects` array in `src/pages/ProjectsPage.tsx`
2. Create component in `src/components/projects/[project-name]/`
3. Add route in `src/App.tsx`
4. Add data files (if needed) to `src/data/`

See [CLAUDE.md](CLAUDE.md) for detailed development guidance.

---

## Deployment

The site is automatically deployed to GitHub Pages using the `gh-pages` package:

```bash
npm run deploy
```

This command:
1. Runs `npm run build` (via predeploy hook)
2. Deploys the `dist/` folder to the `gh-pages` branch
3. GitHub Pages serves the site at https://donbr.github.io

---

## AI Assistant Support

This project includes [CLAUDE.md](CLAUDE.md) with comprehensive guidance for AI coding assistants like Claude Code. The file documents:
- Project architecture and patterns
- Build commands and workflows
- Component structure and routing
- Data management patterns

---

## Browser Support

Modern browsers with ES2020 support:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

---

## Performance

- **Bundle Size:** ~2MB (optimized for production)
- **Build Time:** ~6-7 seconds
- **Technologies:** Vite ensures fast HMR during development

---

## Future Enhancements

See [docs/site-enhancement-plan.md](docs/site-enhancement-plan.md) for detailed roadmap:

- **Phase 3:** Content generation automation
- **Phase 4:** Architecture diagrams (in progress)
- **Phase 5:** Mentorship analytics page (optional)

---

## License

All rights reserved. The code and design of this portfolio are proprietary and not licensed for public use or distribution.

---

## Contact

- **GitHub:** [@donbr](https://github.com/donbr)
- **LinkedIn:** [Don Branson](https://www.linkedin.com/in/donbranson/)
- **Hugging Face:** [@dwb2023](https://huggingface.co/dwb2023)

---

Built with ❤️ using React, TypeScript, and Vite
