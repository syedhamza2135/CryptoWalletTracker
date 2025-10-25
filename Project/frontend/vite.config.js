import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import jsconfigPaths from "vite-jsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), jsconfigPaths()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@chakra-ui/react', 'lucide-react'],
        },
      },
    },
    // Increase chunk size warning limit slightly
    chunkSizeWarningLimit: 600,
  },
})
