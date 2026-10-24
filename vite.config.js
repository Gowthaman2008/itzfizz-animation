import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' makes the build work from any sub-path (GitHub Pages project sites,
// Vercel, Netlify). Override with VITE_BASE=/repo-name/ if you prefer absolute paths.
export default defineConfig({
  base: process.env.VITE_BASE ?? './',
  plugins: [react()],
})
