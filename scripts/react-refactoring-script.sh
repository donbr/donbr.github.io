#!/bin/bash
# Bootstrap a lightweight React application with Vite, TypeScript, Tailwind CSS, and shadcn/ui
# Based on Anthropic Quickstarts best practices

set -e # Exit on error

# Check for required tools
command -v npm >/dev/null 2>&1 || { echo >&2 "Error: npm is required but not installed. Aborting."; exit 1; }
command -v git >/dev/null 2>&1 || { echo >&2 "Warning: git is not installed. Repository initialization will be skipped."; GIT_MISSING=true; }
command -v node >/dev/null 2>&1 || { echo >&2 "Error: node is required but not installed. Aborting."; exit 1; }

# Check Node.js version (minimum v18.17.0 as per Anthropic Quickstarts)
NODE_VERSION=$(node -v | cut -d "v" -f 2)
NODE_MAJOR=$(echo $NODE_VERSION | cut -d "." -f 1)
NODE_MINOR=$(echo $NODE_VERSION | cut -d "." -f 2)

if [ "$NODE_MAJOR" -lt 18 ] || [[ "$NODE_MAJOR" -eq 18 && "$NODE_MINOR" -lt 17 ]]; then
  echo >&2 "Error: Node.js v18.17.0 or higher is required. Current version: $NODE_VERSION"
  exit 1
fi

# Colors for terminal output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}  Lightweight React App Refactoring      ${NC}"
echo -e "${BLUE}=========================================${NC}"

read -p "Enter project name (alphanumeric, hyphens and underscores only): " PROJECT_NAME

PROJECT_DIR="./${PROJECT_NAME}"

# Create project with Vite
echo -e "\n${YELLOW}Creating new Vite + React + TypeScript project...${NC}"
npm create vite@latest ${PROJECT_NAME} -- --template react-ts

cd ${PROJECT_DIR}

# Install core dependencies
echo -e "\n${YELLOW}Installing core dependencies...${NC}"
npm install

# Install Tailwind CSS and its peer dependencies
echo -e "\n${YELLOW}Setting up Tailwind CSS...${NC}"
npm install -D tailwindcss@^3.4.1 @tailwindcss/postcss@^4.0.8 postcss@^8 autoprefixer@^10.4.16
npx tailwindcss init -p

# Configure Tailwind
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

# Add Tailwind directives to CSS
cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-rgb: 10, 10, 10;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background-color: rgb(var(--background-rgb));
}
EOF

# Install path alias support
echo -e "\n${YELLOW}Setting up path aliases...${NC}"
npm install -D @types/node

# Configure path aliases
cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
EOF

# Update tsconfig.json to support path aliases
cat > tsconfig.json << 'EOF'
{
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
    
    /* Path aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    
    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF

# Install shadcn/ui dependencies
echo -e "\n${YELLOW}Setting up UI component library dependencies...${NC}"
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react # Icons

# Install additional useful packages
echo -e "\n${YELLOW}Installing additional helpful packages...${NC}"
npm install react-router-dom # Routing

# Create a simple utils.ts file for class name merging (like in the sample project)
mkdir -p src/lib
cat > src/lib/utils.ts << 'EOF'
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
EOF

# Create a basic component structure
echo -e "\n${YELLOW}Setting up component structure...${NC}"
mkdir -p src/components/ui

# Create a basic button component
cat > src/components/ui/button.tsx << 'EOF'
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
EOF

# Update App.tsx with a minimal example
cat > src/App.tsx << 'EOF'
import { useState } from 'react';
import { Button } from '@/components/ui/button';

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Lightweight React App
        </h1>
        
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <p className="mb-4 text-center">
            Edit <code className="font-mono bg-gray-100 dark:bg-gray-700 p-1 rounded">src/App.tsx</code> and save to test HMR
          </p>
          
          <div className="flex justify-center mb-4">
            <Button 
              onClick={() => setCount((count) => count + 1)}
              className="transition-all hover:scale-105"
            >
              Count is {count}
            </Button>
          </div>
          
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Based on Vite + React + TypeScript + Tailwind CSS
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;
EOF

echo -e "\n${GREEN}=========================================${NC}"
echo -e "${GREEN}  Project setup complete!               ${NC}"
echo -e "${GREEN}=========================================${NC}"
echo -e "Run these commands to start development:"
echo -e "  ${BLUE}cd ${PROJECT_NAME}${NC}"
echo -e "  ${BLUE}npm run dev${NC}"
echo -e "\nAccess the app at: ${BLUE}http://localhost:5173${NC}"
echo -e "\nHappy coding! 🚀"
