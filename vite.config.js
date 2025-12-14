import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Base path is configurable via VITE_BASE_URL environment variable
// Defaults to '/' for Vercel deployment
// GitHub Pages workflow sets VITE_BASE_URL=/Chrommatic/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_URL || '/',
})
