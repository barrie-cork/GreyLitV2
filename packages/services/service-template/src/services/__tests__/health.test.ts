import { getHealthStatus } from '../health';

describe('Health Service', () => {
  it('should return healthy status', async () => {
    const health = await getHealthStatus();
    expect(health.status).toBe('healthy');
  });

  it('should include current timestamp', async () => {
    const health = await getHealthStatus();
    expect(Date.parse(health.timestamp)).not.toBeNaN();
  });

  it('should include dependencies object', async () => {
    const health = await getHealthStatus();
    expect(health.dependencies).toBeDefined();
    expect(health.dependencies).toBeInstanceOf(Object);
  });
});
