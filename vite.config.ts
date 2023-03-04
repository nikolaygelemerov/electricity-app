import react from '@vitejs/plugin-react';
import * as path from 'node:path';
import { configDefaults, defineConfig } from 'vitest/config';

const exclude = [
  ...configDefaults.exclude,
  '**/common/**',
  '**/context/**',
  '**/obsolete/**',
  '**/types/**',
  '**/app/**/test/**',
  '**/entry.client.tsx',
  '**/entry.server.tsx',
  '**/styled.{ts,tsx}'
];

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './app')
    }
  },
  test: {
    coverage: {
      exclude: [...exclude, '**/tests/**'],
      provider: 'c8',
      reporter: ['text', 'html', 'clover', 'json', 'lcov']
    },
    deps: {
      inline: ['@polestar/component-warehouse-react']
    },
    environment: 'jsdom',
    exclude,
    setupFiles: './vitest/setup.ts'
  }
});
