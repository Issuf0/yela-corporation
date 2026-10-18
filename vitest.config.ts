import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.{ts,tsx}'],
    // Default is node; component tests opt into jsdom with `// @vitest-environment jsdom`.
    environment: 'node',
  },
});
