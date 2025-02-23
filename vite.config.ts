import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import crypto from 'crypto'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        // Generate CSP nonce for inline scripts
        const nonce = crypto.randomBytes(16).toString('base64')
        process.env.VITE_CSP_NONCE = nonce
        return html.replace(/%NONCE%/g, nonce)
      },
    }
  ],
  // Configure base URL for GitHub Pages
  // Use repository name as base when deploying to GitHub Pages
  base: '/donbr.github.io/',
  
  build: {
    // Output directory for production build
    outDir: 'dist',
    // Place assets in a dedicated directory
    assetsDir: 'assets',
    // Generate source maps for debugging
    sourcemap: true,
    // Configure rollup options
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code into separate chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chart-vendor': ['chart.js', 'echarts'],
          'utils-vendor': ['lodash', 'cytoscape']
        }
      }
    }
  },
  
  server: {
    // Enable host for network access
    host: true,
    // Configure security headers
    headers: {
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://unpkg.com",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https:",
        "connect-src 'self' https: ws: wss:",
        "font-src 'self' data:",
        "frame-src 'self'"
      ].join('; ')
    }
  },

  // Configure preview server
  preview: {
    host: true
  }
})