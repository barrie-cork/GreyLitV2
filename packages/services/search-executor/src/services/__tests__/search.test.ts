import request from 'supertest';
import { app } from '../../src/app';
import { testUtils } from '../../src/__tests__/test-utils';

describe('Search Flow E2E', () => {
  it('should complete full search execution flow', async () => {
    // 1. Execute search
    const query = testUtils.mocks.createSearchQuery();
    const searchResponse = await request(app)
      .post('/api/search')
      .send(query);

    expect(searchResponse.status).toBe(200);
    const executionId = searchResponse.body.executionId;

    // 2. Poll status until complete
    let status;
    do {
      const statusResponse = await request(app)
        .get(`/api/search/${executionId}/status`);
      
      expect(statusResponse.status).toBe(200);
      status = statusResponse.body;
      
      if (status.status === 'failed') {
        throw new Error('Search execution failed');
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
    } while (status.status !== 'completed');

    // 3. Get results
    const resultsResponse = await request(app)
      .get(`/api/search/${executionId}/results`);

    expect(resultsResponse.status).toBe(200);
    expect(Array.isArray(resultsResponse.body)).toBe(true);
    resultsResponse.body.forEach(testUtils.assertions.assertValidSearchResult);
  });
});
