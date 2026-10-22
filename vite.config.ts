import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Base path for GitHub Pages.
// - Project site (https://<user>.github.io/<repo>/): set VITE_BASE_PATH="/<repo>/".
// - User site (https://<user>.github.io/): leave unset (defaults to "/").
// The deploy workflow sets this automatically from the repository name.
const base = process.env.VITE_BASE_PATH ?? '/';

export default defineConfig({
  plugins: [react()],
  base,
  build: {
    target: 'es2022',
    sourcemap: false,
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
