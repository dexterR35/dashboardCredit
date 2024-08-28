import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }) // Automatically opens the visualizer after build
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Create a chunk for Firebase-related libraries
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          // Create a chunk for React-related libraries
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 500, // You can adjust this limit as needed
  },
});
