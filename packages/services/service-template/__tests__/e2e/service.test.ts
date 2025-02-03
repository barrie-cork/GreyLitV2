import request from 'supertest';
import { app } from '../../src/app';
import { testUtils } from '../../src/__tests__/test-utils';

describe('Service Template E2E', () => {
  describe('Core Service Flows', () => {
    describe('Health Check Flow', () => {
      it('should return health status and check dependencies', async () => {
        const response = await request(app).get('/health');
        
        expect(response.status).toBe(200);
        testUtils.assertions.assertValidHealthCheck(response.body);
      });
    });
  });

  describe('Error Scenarios', () => {
    it('should handle invalid routes', async () => {
      const response = await request(app).get('/invalid-route');
      
      expect(response.status).toBe(404);
      testUtils.assertions.assertErrorResponse(response.body);
    });

    it('should handle server errors', async () => {
      // Trigger an internal error
      const response = await request(app).get('/health?trigger_error=true');
      
      expect(response.status).toBe(500);
      testUtils.assertions.assertErrorResponse(response.body);
    });
  });
});
