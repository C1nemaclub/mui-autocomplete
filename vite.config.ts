import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enables global access to describe, it, expect
    environment: 'jsdom', // Simulates a browser environment
    setupFiles: ['./setup.ts'], // Path to your test setup file
  },
});
