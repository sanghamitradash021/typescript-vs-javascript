import { defineConfig } from 'vite';

export default defineConfig({
  root: './js-version',

  build: {
    outDir: '../dist/js-version',
    emptyOutDir: true,
  },
});
