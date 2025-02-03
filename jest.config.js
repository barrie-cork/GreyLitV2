/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.json',
      babelConfig: true
    }]
  },
  moduleNameMapper: {
    '^@grey-lit/(.*)$': '<rootDir>/../../shared/$1/src'
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.test.ts'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsconfig: {
        jsx: 'react',
        esModuleInterop: true,
        allowJs: true
      }
    }
  }
};

module.exports = config;
