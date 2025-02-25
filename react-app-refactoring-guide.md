# React Application Refactoring Guide

## Overview

This guide provides a structured approach for refactoring applications to follow the patterns established in the `react-bootstrap-script.sh`. It serves as a reference for converting existing applications to use modern React practices with TypeScript, Vite, and Tailwind CSS.

## Bootstrap Script Technology Stack

- **React 18+** with TypeScript
- **Vite** as the build tool
- **Tailwind CSS** for styling
- **shadcn/ui-style** component patterns
- Path aliases using `@/` notation

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/               # Base UI components (Button, Card, etc.)
│   └── [feature]/        # Feature-specific components
├── lib/                  # Utility functions and shared logic
│   ├── utils.ts          # General utilities (including cn function)
│   ├── types.ts          # Shared TypeScript interfaces and types
│   └── api.ts            # API interaction functions
├── pages/                # Page components (if using React Router)
├── hooks/                # Custom React hooks
├── assets/               # Static assets
└── App.tsx               # Main application component
```

## Component Pattern

All components should follow this consistent pattern from the bootstrap script:

```typescript
import React from 'react';
import { cn } from '@/lib/utils';

// Define prop interface
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

// Component with typed props
export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        // Base styles
        'rounded-md font-medium transition-colors',
        // Variant styles
        variant === 'default' && 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
        variant === 'secondary' && 'bg-gray-800 text-white hover:bg-gray-900',
        // Size styles
        size === 'sm' && 'px-3 py-1 text-sm',
        size === 'md' && 'px-4 py-2',
        size === 'lg' && 'px-6 py-3 text-lg',
        // Custom classes
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
```

## Styling Pattern

Always use Tailwind CSS with the `cn()` utility function from the bootstrap script:

```typescript
// utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage in components
import { cn } from "@/lib/utils";

const className = cn(
  "base-style",
  condition && "conditional-style",
  props.className
);
```

## Custom Hooks Pattern

Extract reusable logic into custom hooks:

```typescript
// Example data fetching hook
export function useData<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
```

## TypeScript Patterns

### Interface Definitions

Always define explicit interfaces for component props and data structures:

```typescript
// Component props
interface ComponentProps {
  data: DataItem[];
  onSelect: (item: DataItem) => void;
  isLoading?: boolean;
}

// Data structures
interface DataItem {
  id: string;
  name: string;
  value: number;
}
```

### Type Safety Guidelines

1. Avoid using `any` type whenever possible
2. Use function components with explicit return types 
3. Properly type event handlers
4. Use discriminated unions for complex state

```typescript
// Example of well-typed event handler
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setValue(event.target.value);
};

// Example of discriminated union for state
type State = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success', data: DataItem[] }
  | { status: 'error', error: string };
```

## Environment Configuration

### Environment Variables

Follow this pattern for environment variables:

```typescript
// .env.local
VITE_API_KEY=your_api_key
VITE_SERVICE_URL=https://api.example.com

// Prefixing for avoiding conflicts
VITE_BAWS_ACCESS_KEY_ID=your_aws_key  // 'B' prefix to avoid AWS name conflicts

// In your code - config.ts
export const config = {
  apiKey: import.meta.env.VITE_API_KEY as string,
  serviceUrl: import.meta.env.VITE_SERVICE_URL as string,
  aws: {
    accessKeyId: import.meta.env.VITE_BAWS_ACCESS_KEY_ID as string,
    // Other AWS config
  }
};
```

### Feature Flags

Use a centralized config file for feature flags:

```typescript
// config.ts
export interface Config {
  enabledFeatures: {
    showLeftSidebar: boolean;
    showRightSidebar: boolean;
    darkMode: boolean;
  };
  api: {
    baseUrl: string;
    timeout: number;
  };
}

export const config: Config = {
  enabledFeatures: {
    showLeftSidebar: import.meta.env.VITE_ENABLE_LEFT_SIDEBAR === 'true',
    showRightSidebar: import.meta.env.VITE_ENABLE_RIGHT_SIDEBAR === 'true',
    darkMode: import.meta.env.VITE_ENABLE_DARK_MODE === 'true'
  },
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '5000')
  }
};
```

## Conditional Component Rendering

Use dynamic imports for conditional loading:

```typescript
import { lazy, Suspense } from 'react';
import { config } from '@/lib/config';

// Conditionally load components based on config
const LeftSidebar = config.enabledFeatures.showLeftSidebar 
  ? lazy(() => import('@/components/LeftSidebar'))
  : () => null;

const RightSidebar = config.enabledFeatures.showRightSidebar
  ? lazy(() => import('@/components/RightSidebar'))
  : () => null;

function App() {
  return (
    <div className="flex">
      <Suspense fallback={<div>Loading sidebar...</div>}>
        <LeftSidebar />
      </Suspense>
      
      <main className="flex-1">
        {/* Main content */}
      </main>
      
      <Suspense fallback={<div>Loading sidebar...</div>}>
        <RightSidebar />
      </Suspense>
    </div>
  );
}
```

## Error Handling and API Patterns

### Structured API Responses

Use zod for schema validation of API responses:

```typescript
import { z } from 'zod';

// Define schema for API response
const responseSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      value: z.number(),
    })
  ),
  meta: z.object({
    total: z.number(),
    page: z.number(),
  }),
});

// Type inferred from schema
type ApiResponse = z.infer<typeof responseSchema>;

// API function with validation
async function fetchData(): Promise<ApiResponse> {
  const response = await fetch('/api/data');
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  const data = await response.json();
  
  // Validate response against schema
  try {
    return responseSchema.parse(data);
  } catch (error) {
    console.error('Invalid API response format:', error);
    throw new Error('Invalid API response format');
  }
}
```

### API Performance Tracking

Measure API performance with timestamps:

```typescript
async function fetchWithMetrics<T>(url: string): Promise<T> {
  const startTime = performance.now();
  
  try {
    const response = await fetch(url);
    const networkTime = performance.now() - startTime;
    console.debug(`Network time: ${networkTime.toFixed(2)}ms for ${url}`);
    
    const data = await response.json();
    const totalTime = performance.now() - startTime;
    console.debug(`Total fetch time: ${totalTime.toFixed(2)}ms for ${url}`);
    
    return data as T;
  } catch (error) {
    const errorTime = performance.now() - startTime;
    console.error(`Error after ${errorTime.toFixed(2)}ms for ${url}:`, error);
    throw error;
  }
}
```

### Comprehensive Error Handling

Implement consistent error handling:

```typescript
// Error types
type NetworkError = { type: 'network'; status?: number; message: string };
type ValidationError = { type: 'validation'; fields: Record<string, string>; message: string };
type AuthError = { type: 'auth'; message: string };
type AppError = NetworkError | ValidationError | AuthError;

// Error handling hook
function useErrorHandler() {
  const [error, setError] = useState<AppError | null>(null);
  
  const handleError = useCallback((err: unknown) => {
    if (err instanceof Error) {
      // Handle different error types
      if (err.message.includes('Failed to fetch')) {
        setError({ type: 'network', message: 'Network error. Please check your connection.' });
      } else if (err.message.includes('Unauthorized')) {
        setError({ type: 'auth', message: 'Authentication error. Please log in again.' });
      } else {
        setError({ type: 'network', message: err.message });
      }
    } else {
      setError({ type: 'network', message: 'An unknown error occurred.' });
    }
    
    // Log error to monitoring service
    console.error('Application error:', err);
  }, []);
  
  return { error, setError, handleError };
}

// Usage in component
function DataComponent() {
  const { data, loading } = useData('/api/data');
  const { error, handleError } = useErrorHandler();
  
  // Render error state
  if (error) {
    return <ErrorDisplay error={error} />;
  }
  
  // Rest of component
}
```

## Theme Management

### CSS Variables and Theming

Use CSS variables for theming, compatible with Tailwind:

```css
/* In index.css */
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 0 0% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  --secondary: 0 0% 96.1%;
  --secondary-foreground: 0 0% 9%;
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;
  --accent: 0 0% 96.1%;
  --accent-foreground: 0 0% 9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 89.8%;
  --input: 0 0% 89.8%;
  --ring: 0 0% 3.9%;
  --radius: 0.75rem;
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  /* Additional dark mode variables */
}
```

### Theme Switcher Implementation

```typescript
import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Read from localStorage or default to system
    return (localStorage.getItem('theme') as Theme) || 'system';
  });
  
  // Update document with selected theme
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? 'dark' 
        : 'light';
        
      root.classList.remove('light', 'dark');
      root.classList.add(systemTheme);
    } else {
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  return { theme, setTheme };
}
```

## Accessibility Patterns

### Focus Management

```typescript
import { useRef, useEffect } from 'react';

function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Trap focus inside modal when open
  useEffect(() => {
    if (!isOpen) return;
    
    const modal = modalRef.current;
    if (!modal) return;
    
    // Focus first focusable element
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
    }
    
    // Create a focus trap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      
      if (e.key !== 'Tab') return;
      
      if (focusableElements.length === 0) return;
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      
      // Trap focus in modal
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div role="dialog" aria-modal="true" ref={modalRef}>
      {children}
    </div>
  );
}
```

### ARIA and Accessibility Attributes

```typescript
// Accessible button component
function Button({ 
  children, 
  isLoading, 
  disabled,
  onClick,
  ...props 
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      aria-busy={isLoading ? 'true' : 'false'}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="sr-only">Loading</span>
          <Spinner className="h-4 w-4" />
        </>
      ) : children}
    </button>
  );
}

// Accessible form input
function FormInput({
  id,
  label,
  error,
  ...props
}: FormInputProps) {
  const hasError = !!error;
  
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={hasError ? 'true' : 'false'}
        aria-describedby={hasError ? `${id}-error` : undefined}
        {...props}
      />
      {hasError && (
        <p id={`${id}-error`} className="text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
```

## UI Component Composition

### Compound Component Pattern

```typescript
// Tabs component with compound pattern
import React, { createContext, useContext, useState } from 'react';
import { cn } from '@/lib/utils';

type TabsContextType = {
  activeTab: string;
  setActiveTab: (id: string) => void;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be used within Tabs component');
  }
  return context;
}

// Main container
const Tabs = ({ children, defaultTab, className }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab || '');
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn('tabs-container', className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// Tab list container
const TabList = ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div role="tablist" className={cn('flex', className)}>
      {children}
    </div>
  );
};

// Individual tab
const Tab = ({ children, id, className }: TabProps) => {
  const { activeTab, setActiveTab } = useTabs();
  
  return (
    <button
      role="tab"
      id={`tab-${id}`}
      aria-selected={activeTab === id}
      aria-controls={`panel-${id}`}
      tabIndex={activeTab === id ? 0 : -1}
      onClick={() => setActiveTab(id)}
      className={cn(
        'px-4 py-2 border-b-2',
        activeTab === id ? 'border-blue-500 text-blue-600' : 'border-transparent',
        className
      )}
    >
      {children}
    </button>
  );
};

// Tab panel
const TabPanel = ({ children, id, className }: TabPanelProps) => {
  const { activeTab } = useTabs();
  
  if (activeTab !== id) return null;
  
  return (
    <div
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={`tab-${id}`}
      className={className}
    >
      {children}
    </div>
  );
};

// Export as compound component
Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

export { Tabs };

// Usage
<Tabs defaultTab="tab1">
  <Tabs.TabList>
    <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab id="tab2">Tab 2</Tabs.Tab>
  </Tabs.TabList>
  
  <Tabs.Panel id="tab1">Content for Tab 1</Tabs.Panel>
  <Tabs.Panel id="tab2">Content for Tab 2</Tabs.Panel>
</Tabs>
```

## Refactoring Checklist

When refactoring an existing component:

1. **Convert to TypeScript** with proper interfaces
2. **Use functional components** with hooks
3. **Apply Tailwind CSS** styling with the `cn()` utility
4. **Extract reusable logic** into custom hooks
5. **Implement proper error handling** and loading states
6. **Follow the project structure** from the bootstrap script
7. **Add accessibility attributes**
8. **Support theming** via CSS variables

## Practical Refactoring Examples

### Converting Class Components

```typescript
// BEFORE: Class Component
class Counter extends React.Component {
  state = {
    count: 0
  };
  
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };
  
  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

// AFTER: Functional Component with TypeScript and Tailwind
interface CounterProps {
  initialCount?: number;
  className?: string;
}

const Counter: React.FC<CounterProps> = ({ 
  initialCount = 0,
  className 
}) => {
  const [count, setCount] = useState(initialCount);
  
  const increment = () => {
    setCount(count + 1);
  };
  
  return (
    <div className={cn("p-4 bg-white rounded-lg shadow", className)}>
      <p className="text-lg font-medium">Count: {count}</p>
      <button 
        onClick={increment}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Increment
      </button>
    </div>
  );
};
```

### Refactoring API Calls

```typescript
// BEFORE: Direct API calls in component
function DataComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);
  
  // Component rendering...
}

// AFTER: Custom hook with TypeScript
interface DataItem {
  id: string;
  title: string;
  // Other properties...
}

function useDataFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);
  
  return { data, loading, error };
}

// Component using the hook
function DataComponent() {
  const { data, loading, error } = useDataFetch<DataItem[]>('/api/data');
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  // Component rendering with data...
}
```

## LLM Instructions

When generating code based on this guide:

1. Always use TypeScript with proper type definitions
2. Always use functional components with React hooks
3. Always use Tailwind CSS with the `cn()` utility for styling
4. Always follow the project structure from the bootstrap script
5. Always implement proper error handling and loading states
6. Never use `any` type when a specific type can be inferred
7. Never use inline styles; use Tailwind classes instead

## Output Validation Checklist

Before returning code, ensure it meets these criteria:

- [ ] Uses TypeScript with proper interfaces and types
- [ ] Uses functional React components with hooks
- [ ] Uses Tailwind CSS via the `cn()` utility function
- [ ] Implements proper error and loading states
- [ ] Follows the project structure from the bootstrap script
- [ ] Utilizes path aliases (`@/`) for imports
- [ ] Avoids using `any` type
