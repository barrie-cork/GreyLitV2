import { ServiceError } from '../types';

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
