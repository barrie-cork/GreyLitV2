import { ServiceError } from '../types';
import { Express } from 'express';
import { Server } from 'http';

/**
 * Test helper to create a mock ServiceError
 */
export function createMockServiceError(
  message: string,
  code: string,
  statusCode: number,
  details?: unknown
): ServiceError {
  return {
    name: 'ServiceError',
    message,
    code,
    statusCode,
    details,
  };
}

/**
 * Test helper to create a mock HTTP response
 */
export function createMockResponse() {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.set = jest.fn().mockReturnValue(res);
  return res;
}

/**
 * Test helper to create a mock HTTP request
 */
export function createMockRequest(overrides: Record<string, any> = {}) {
  return {
    body: {},
    query: {},
    params: {},
    headers: {},
    ...overrides,
  };
}

/**
 * Test helper to create a mock Express next function
 */
export function createMockNext() {
  return jest.fn();
}

/**
 * Test helper to create a test server
 */
export function createTestServer(app: Express): Server {
  return app.listen(0); // Random available port
}

/**
 * Test helper to close a test server
 */
export function closeTestServer(server: Server): Promise<void> {
  return new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

/**
 * Test helper to wait for a specified time
 */
export function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
