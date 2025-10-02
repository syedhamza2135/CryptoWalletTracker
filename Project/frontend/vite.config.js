import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// PostCSS config is provided by postcss.config.cjs

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // PostCSS is configured via postcss.config.cjs
  server: {
    port: 3000,
    proxy: {
      // Proxy API requests to backend during development
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  }
})
