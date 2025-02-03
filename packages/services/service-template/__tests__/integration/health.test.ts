import request from 'supertest';
import { app } from '../../src/app';

describe('Health Check Integration', () => {
  it('should return health status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'healthy');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('dependencies');
  });

  it('should include dependency statuses', async () => {
    const response = await request(app).get('/health');
    expect(response.body.dependencies).toHaveProperty('database');
    expect(response.body.dependencies.database).toHaveProperty('status');
    expect(response.body.dependencies.database).toHaveProperty('latency');
  });
});
