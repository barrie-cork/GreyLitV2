import request from 'supertest';
import { app } from '../../src/app';
import { testUtils } from '../../src/__tests__/test-utils';

describe('Search Integration', () => {
  describe('POST /api/search', () => {
    it('should execute search and return valid status', async () => {
      const query = testUtils.mocks.createSearchQuery();
      
      const response = await request(app)
        .post('/api/search')
        .send(query);

      expect(response.status).toBe(200);
      testUtils.assertions.assertValidExecutionStatus(response.body);
    });
  });

  describe('GET /api/search/:executionId/status', () => {
    it('should return current execution status', async () => {
      // First create a search
      const query = testUtils.mocks.createSearchQuery();
      const searchResponse = await request(app)
        .post('/api/search')
        .send(query);

      const executionId = searchResponse.body.executionId;

      // Then check its status
      const statusResponse = await request(app)
        .get(`/api/search/${executionId}/status`);

      expect(statusResponse.status).toBe(200);
      testUtils.assertions.assertValidExecutionStatus(statusResponse.body);
    });
  });
});
