import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // or '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This was for the previous step
    proxy: {
      // This is the new proxy configuration
      '/api': {
       // This is the "Local-to-Docker" name
target: 'http://localhost:5001', // Target the 'api' service container
        changeOrigin: true,
        secure: false,
      }
    }
  }
})