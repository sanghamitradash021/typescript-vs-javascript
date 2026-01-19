import { defineConfig } from 'vite';

export default defineConfig({
  root: './ts-version',
  build: {
    outDir: '../dist/ts-version',
    emptyOutDir: true,
  },
});
