import { defineConfig } from 'vite';

export default defineConfig({
  base: '/petcare-plus/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
  },
});
