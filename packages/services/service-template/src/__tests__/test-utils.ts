import { ServiceError, HealthCheckResponse } from '../types';
import { Express, Request, Response } from 'express';
import { Server } from 'http';

export const testUtils = {
  mocks: {
    createServiceError: (
      message: string,
      code: string,
      statusCode: number,
      details?: unknown
    ): ServiceError => ({
      name: 'ServiceError',
      message,
      code,
      statusCode,
      details,
    }),

    createResponse: () => {
      const res: Partial<Response> = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      res.set = jest.fn().mockReturnValue(res);
      return res as Response;
    },

    createRequest: (overrides: Record<string, any> = {}): Partial<Request> => ({
      body: {},
      query: {},
      params: {},
      headers: {},
      ...overrides,
    }),

    createNext: () => jest.fn(),

    createMockServiceError: (
      message: string,
      code: string,
      statusCode: number,
      details?: unknown
    ): ServiceError => ({
      name: 'ServiceError',
      message,
      code,
      statusCode,
      details,
    })
  },

  helpers: {
    createTestServer: (app: Express): Server => app.listen(0),

    closeTestServer: (server: Server): Promise<void> => 
      new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) reject(err);
          else resolve();
        });
      }),

    wait: (ms: number): Promise<void> => 
      new Promise(resolve => setTimeout(resolve, ms)),
      
    setupTestDatabase: async () => {
      // Add database setup logic
    },

    cleanupTestDatabase: async () => {
      // Add database cleanup logic
    }
  },

  assertions: {
    assertValidHealthCheck: (response: HealthCheckResponse) => {
      expect(response).toHaveProperty('status');
      expect(response).toHaveProperty('timestamp');
      expect(response).toHaveProperty('dependencies');
      expect(Date.parse(response.timestamp)).not.toBeNaN();
      expect(typeof response.dependencies).toBe('object');
    },

    assertErrorResponse: (response: any) => {
      expect(response).toHaveProperty('error');
      expect(response.error).toHaveProperty('code');
      expect(response.error).toHaveProperty('message');
    },

    assertValidResponse: (response: any, expectedStatus: number) => {
      expect(response.status).toBe(expectedStatus);
      expect(response.body).toBeDefined();
    }
  }
};
