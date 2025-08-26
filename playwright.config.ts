import { defineConfig, devices,PlaywrightTestConfig } from '@playwright/test';
import path from 'path';
require('dotenv').config({ path: path.resolve(__dirname,'./config', '.env') });

// Config to hold extra properties
interface TestConfig extends PlaywrightTestConfig {
  baseUrl: string;
  testData: string;
}

// set config for dev
const devConfig: TestConfig = {
  baseUrl: 'https://practice.expandtesting.com/notes/',
  testData: 'https://dev.api.example.com'
};

// set config for stage
const stageConfig: TestConfig = {
  // baseUrl in stage environment can be different from the dev environment. In this experimental project, this is not the focus
  baseUrl: 'https://practice.expandtesting.com/notes/',  
  testData: 'https://stage.api.example.com'
};

export default defineConfig({

  testDir: './tests',
  expect: { timeout: 10_000 },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://practice.expandtesting.com/notes/',
    screenshot: 'only-on-failure',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'UI chrome',
      testMatch: '**/ui/*.spec.ts', 
      use: { ...devices['Desktop Chrome'] },
    },

     {
      name: 'firefox',
      testMatch: '**/ui/*.spec.ts', 
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'UI webkit',
      testMatch: '**/ui/*.spec.ts', 
      use: { ...devices['Desktop Safari'] },
    }, 
    {
      name: 'API Test',
      testMatch: '**/api/*.spec.ts',
    }

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
