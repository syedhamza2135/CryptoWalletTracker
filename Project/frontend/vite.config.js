import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Disable Fast Refresh entirely to avoid all issues
      fastRefresh: false,
    })
  ],
})
