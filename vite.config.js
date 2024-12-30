import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Expose the server to the network
    port: 5173,      // Optional: Ensure the port matches your setup
  },
});
