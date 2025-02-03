import { getHealthStatus } from '../../src/services/health';

describe('Health Service', () => {
  it('should return healthy status', () => {
    const health = getHealthStatus();
    expect(health.status).toBe('healthy');
  });

  it('should include current timestamp', () => {
    const health = getHealthStatus();
    expect(Date.parse(health.timestamp)).not.toBeNaN();
  });

  it('should include dependencies object', () => {
    const health = getHealthStatus();
    expect(health.dependencies).toBeDefined();
    expect(health.dependencies).toBeInstanceOf(Object);
  });
});
