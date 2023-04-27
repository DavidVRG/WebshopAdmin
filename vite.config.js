import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    include: "**/*.jsx",
  })],
  base: '/WebshopAdmin/',
  server: {
    host: true
  },
  resolve: {
    mainFields: ['module', 'main']
  }
})