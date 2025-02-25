import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/',  //  Either set it to '/' OR remove this line completely.
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})