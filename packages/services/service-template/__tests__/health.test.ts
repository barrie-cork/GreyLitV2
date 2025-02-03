import request from 'supertest';
import express from 'express';
import healthRoutes from '../../src/routes/health';

const app = express();
app.use('/', healthRoutes);

describe('Health Check Endpoint', () => {
  it('should return healthy status with timestamp', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'healthy');
    expect(response.body).toHaveProperty('timestamp');
    expect(Date.parse(response.body.timestamp)).not.toBeNaN();
  });

  it('should include dependencies section', async () => {
    const response = await request(app).get('/health');
    expect(response.body).toHaveProperty('dependencies');
    expect(response.body.dependencies).toBeInstanceOf(Object);
  });
});
