// Global test timeout
jest.setTimeout(10000);

// Mock console.error to avoid noise in tests
console.error = jest.fn();

// Add TextEncoder/TextDecoder for ESM compatibility
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;
