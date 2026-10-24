import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use the repo subpath for GitHub Pages project sites.
export default defineConfig({
  base: '/itzfizz-animation/',
  plugins: [react()],
})
