import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'c1g25i',
  fileServerFolder: './tests/cypress',
  fixturesFolder: './tests/cypress/fixtures',
  screenshotsFolder: './tests/cypress/screenshots',
  videosFolder: './tests/cypress/videos',
  reporter: 'junit',
  reporterOptions: {
    mochaFile: './tests/cypress/results/test-output-[hash].xml',
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./tests/cypress/plugins')(on, config);
    },
    baseUrl: 'http://localhost:3500',
    specPattern: [
      '**/*.feature',
      'cypress/{E2E,integration}/**/*.cy.{js,jsx,ts,tsx}',
    ],
    supportFile: './tests/cypress/support/index.ts',
  },
});
