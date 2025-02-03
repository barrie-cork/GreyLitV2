import { HealthCheckResponse } from '../types';

export function getHealthStatus(): HealthCheckResponse {
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    dependencies: {
      // Add service-specific dependencies here
    },
  };
}
