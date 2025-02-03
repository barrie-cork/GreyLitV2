require('@testing-library/jest-dom');

// Global test timeout
jest.setTimeout(10000);

// Global beforeAll
beforeAll(() => {
  // Add any global test setup here
});

// Global afterAll
afterAll(() => {
  // Add any global test cleanup here
});

// Mock console.error to avoid noise in tests
console.error = jest.fn();
