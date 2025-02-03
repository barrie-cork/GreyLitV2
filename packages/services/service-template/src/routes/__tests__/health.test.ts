import { Request, Response } from 'express';
import { testUtils } from '../../__tests__/test-utils';
import healthRoutes from '../../routes/health';

describe('Health Routes', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockReq = testUtils.mocks.createRequest();
    mockRes = testUtils.mocks.createResponse();
    mockNext = testUtils.mocks.createNext();
  });

  it('should return health status', async () => {
    await healthRoutes(mockReq as Request, mockRes as Response, mockNext);
    
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: expect.any(String),
        timestamp: expect.any(String),
        dependencies: expect.any(Object),
      })
    );
  });
});
