#!/bin/bash
# This script sets up a minimal project structure for Vite and moves files as appropriate.
# Please back up your work before running it.

set -e

echo "Creating project directories: src, public, and dist..."
mkdir -p src
mkdir -p public
mkdir -p dist

# Move index.html into the public directory, if it exists in the repository root.
if [ -f index.html ]; then
    echo "Moving index.html to the public/ directory..."
    mv index.html public/
fi

# Optional: Move a current assets folder into public (adjust folder name as needed)
if [ -d assets ]; then
    echo "Moving assets/ directory into public/..."
    mv assets public/
fi

# Create a minimal package.json if one doesn't exist.
if [ ! -f package.json ]; then
    echo "Creating package.json..."
    cat << 'EOF' > package.json
{
  "name": "donbr.github.io",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "audit": "npm audit"
  },
  "dependencies": {},
  "devDependencies": {
    "vite": "^4.0.0"
  }
}
EOF
fi

# Create a minimal vite.config.js if one doesn't exist.
if [ ! -f vite.config.js ]; then
    echo "Creating vite.config.js..."
    cat << 'EOF' > vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'public',
  build: {
    outDir: '../dist'
  }
})
EOF
fi

echo "Project structure setup complete. Please review the changes and adjust as necessary."