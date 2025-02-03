import request from 'supertest';
import express from 'express';

const app = express();

app.get('/health', (_req, res) => {
  res.json({ status: 'healthy' });
});

describe('Health Check Endpoint', () => {
  it('should return healthy status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'healthy' });
  });
});
