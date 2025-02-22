import { defineConfig } from 'vite';
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
