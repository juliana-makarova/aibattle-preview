import { defineConfig } from 'vite';

export default defineConfig({
  preview: {
    allowedHosts: ['aibattle.ru', '.aibattle.ru']
  },
  server: {
    allowedHosts: ['aibattle.ru', '.aibattle.ru']
  }
});
