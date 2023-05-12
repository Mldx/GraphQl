import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: '/src/components',
      constants: '/src/constants',
      pages: '/src/pages',
      store: '/src/store',
      styles: '/src/styles',
      types: '/src/types',
      utils: '/src/utils',
      api: '/src/api',
      hooks: '/src/hooks',
    },
  },
  base: './',
});
