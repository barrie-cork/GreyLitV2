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
import request from 'supertest';
import { app } from '../../src/app';
import { testUtils } from '../../src/__tests__/test-utils';

describe('Health Check Integration', () => {
  describe('Dependencies', () => {
    it('should check all service dependencies', async () => {
      const response = await request(app).get('/health');
      
      expect(response.status).toBe(200);
      expect(response.body.dependencies).toBeDefined();
      
      // Check each dependency has required properties
      Object.values(response.body.dependencies).forEach((dep: any) => {
        expect(dep).toHaveProperty('status');
        expect(dep).toHaveProperty('latency');
        expect(typeof dep.latency).toBe('number');
      });
    });

    it('should report dependency failures accurately', async () => {
      // TODO: Add mock to simulate dependency failure
      const response = await request(app).get('/health?simulate_failure=true');
      
      expect(response.status).toBe(503);
      expect(response.body.dependencies).toHaveProperty('database');
      expect(response.body.dependencies.database.status).toBe('down');
    });
  });

  describe('Status Reporting', () => {
    it('should include accurate timestamp', async () => {
      const response = await request(app).get('/health');
      
      expect(response.status).toBe(200);
      const timestamp = new Date(response.body.timestamp);
      expect(timestamp).toBeInstanceOf(Date);
      expect(timestamp.getTime()).toBeLessThanOrEqual(Date.now());
    });

    it('should aggregate dependency statuses correctly', async () => {
      const response = await request(app).get('/health');
      
      const allDependenciesUp = Object.values(response.body.dependencies)
        .every((dep: any) => dep.status === 'up');
      
      expect(response.body.status).toBe(allDependenciesUp ? 'healthy' : 'unhealthy');
    });
  });
});
