
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { componentTagger } from "lovable-tagger"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  server: {
    host: "::",
    port: 8080
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: './' // Important for GitHub Pages
}))
