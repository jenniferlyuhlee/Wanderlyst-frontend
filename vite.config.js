import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set root directory to src
  build: {
    outDir: '../dist'
  },
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
  }
})

