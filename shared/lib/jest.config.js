/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */

/**
 * Unhandled promise rejections warnings were disabled for jest scripts on
 * package.json due to an existing issue with Jest not being able to identify
 * that the promises were handled making the rejection bubbles up until causing
 * an exception in the Node.js process.
 *
 * To suppress those warnings, a NODE_OPTIONS variable variable is being set
 * with the "--unhandled-rejections=none" flag before running the tests.
 *
 * Please see: https://github.com/facebook/jest/issues/5311
 */

module.exports = {
  roots: ['./src'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/'],
  globals: {
    'ts-jest': {
      compiler: 'typescript',
      isolatedModules: true,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/src/test/testHelpers.ts'],
  verbose: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
