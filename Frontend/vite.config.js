import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: VITE_BACK_URL_DEPLOYED,
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
