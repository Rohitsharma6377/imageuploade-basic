import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Adjust the alias as needed
    },
  },
  server: {
    port: 3000, // You can specify your preferred port here
  },
});
