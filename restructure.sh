#!/bin/bash

# Create target directories first
mkdir -p src/{assets/{images,styles},features/projects,lib,pages,routes,types,utils}

# Move JS utilities to lib (handle empty cases)
find public/js -name '*.cjs' -exec mv {} src/lib/ \; 2>/dev/null || true
find public/assets/js -name '*.cjs' -exec mv {} src/lib/ \; 2>/dev/null || true

# Move project assets to features (handle missing directories)
for project in cytoscape event-analyzer gdelt situational-awareness transformers-demo; do
  if [ -d "public/assets/projects/${project}" ]; then
    mkdir -p "src/features/${project}/assets"
    mv "public/assets/projects/${project}" "src/features/${project}/assets/"
  fi
done

# Move core styles
[ -f src/assets/styles/main.css ] && mv src/assets/styles/main.css src/assets/styles/base.css

# Move services to features (ensure target exists)
[ -f src/services/projectService.ts ] && mkdir -p src/features/projects && mv src/services/projectService.ts src/features/projects/

# Clean up legacy directories after moving content
rm -rf public/js public/assets/{projects,js} assets restructure.cjs

# Update Vite config (existing content)
cat > vite.config.ts <<EOL
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/donbr.github.io/',
  build: {
    outDir: 'dist',
    assetsDir: 'static',
    sourcemap: true
  }
})
EOL

# Add deployment helpers
npm install gh-pages --save-dev
jq '.scripts += { "predeploy": "vite build", "deploy": "gh-pages -d dist" }' package.json > tmp.json && mv tmp.json package.json

echo "Restructuring complete. Run 'npm run deploy' to deploy to GitHub Pages"