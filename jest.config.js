/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.json'
    }]
  },
  moduleNameMapper: {
    '^@grey-lit/(.*)$': '<rootDir>/../../shared/$1/src'
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.test.ts'
  ],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json'
    }
  }
};

module.exports = config;
