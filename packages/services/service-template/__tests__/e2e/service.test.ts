import request from 'supertest';
import { app } from '../../src/app';

describe('Service E2E Tests', () => {
  describe('Health Check Flow', () => {
    it('should return health status and check dependencies', async () => {
      const response = await request(app).get('/health');
      
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        status: 'healthy',
        dependencies: expect.any(Object),
      });
    });
  });

  describe('Error Handling Flow', () => {
    it('should handle invalid routes', async () => {
      const response = await request(app).get('/invalid-route');
      
      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        error: {
          code: expect.any(String),
          message: expect.any(String),
        },
      });
    });
  });
});
