// Global test timeout
jest.setTimeout(10000);

// Mock console.error to avoid noise in tests
console.error = jest.fn();
