import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import crypto from 'crypto'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        const nonce = crypto.randomBytes(16).toString('base64')
        process.env.VITE_CSP_NONCE = nonce
        return html.replace(/%NONCE%/g, nonce)
      },
    }
  ],
  base: '/donbr.github.io/',
  server: {
    host: true,
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
  }
})