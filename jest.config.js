/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: ['<rootDir>/packages/*/jest.config.js'],
  moduleNameMapper: {
    '^@grey-lit/(.*)$': '<rootDir>/packages/$1/src'
  }
};
