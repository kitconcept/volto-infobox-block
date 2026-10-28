import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI || !!process.env.GITHUB_ACTIONS;

export default defineConfig({
  forbidOnly: isCI,
  timeout: 30_000,
  expect: { timeout: 10_000 },
  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'acceptance',
      testDir: 'acceptance/tests',
      testMatch: ['**/*.{spec,test}.{ts,tsx}'],
      outputDir: 'acceptance/results/acceptance',
      // Tests share one backend that is reset between tests.
      fullyParallel: false,
      workers: 1,
      retries: isCI ? 3 : 0,
      use: { viewport: { width: 1440, height: 1000 } },
    },
  ],
});
