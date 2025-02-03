// Global test timeout
global.jest.setTimeout(10000);

// Mock console.error to avoid noise in tests
global.console.error = global.jest.fn();
