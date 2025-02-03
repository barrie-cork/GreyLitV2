import { getHealthStatus } from '../../src/services/health';

describe('Health Service', () => {
  describe('getHealthStatus', () => {
    it('should return valid health status', () => {
      const status = getHealthStatus();
      
      expect(status.status).toBe('healthy');
      expect(status.timestamp).toBeDefined();
      expect(status.dependencies).toBeDefined();
    });

    it('should include all API dependencies', () => {
      const status = getHealthStatus();
      
      expect(status.dependencies?.serpapi).toBeDefined();
      expect(status.dependencies?.serper).toBeDefined();
      expect(status.dependencies?.duckduckgo).toBeDefined();
    });

    it('should have valid dependency status format', () => {
      const status = getHealthStatus();
      
      Object.values(status.dependencies || {}).forEach(dep => {
        expect(dep.status).toMatch(/^(up|down)$/);
        expect(typeof dep.latency).toBe('number');
      });
    });
  });
});
