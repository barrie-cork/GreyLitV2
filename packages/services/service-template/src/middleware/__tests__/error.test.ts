import { Request, Response } from 'express';
import { errorHandler } from '../error';
import { ServiceError } from '../../types';
import { createMockRequest, createMockResponse, createMockNext, createMockServiceError } from '../../__tests__/test-utils';

describe('Error Handler Middleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockReq = createMockRequest();
    mockRes = createMockResponse();
    mockNext = createMockNext();
  });

  it('should handle ServiceError correctly', () => {
    const serviceError = createMockServiceError(
      'test error',
      'TEST_ERROR',
      400,
      { detail: 'test detail' }
    );

    errorHandler(serviceError, mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: {
        code: 'TEST_ERROR',
        message: 'test error',
        details: { detail: 'test detail' },
      },
    });
  });

  it('should handle unknown errors with 500 status', () => {
    const error = new Error('Unknown error');

    errorHandler(error, mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred',
      },
    });
  });
});
