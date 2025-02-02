/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/packages/**/__tests__/**/*.test.ts'],
  moduleNameMapper: {
    '^@grey-lit/(.*)$': '<rootDir>/packages/$1/src'
  },
  collectCoverageFrom: [
    'packages/**/src/**/*.ts',
    '!packages/**/src/index.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  verbose: true
};
