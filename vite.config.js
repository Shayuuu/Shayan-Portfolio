import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/hayan-portfolio/' // <-- EXACTLY your GitHub repo name
})
