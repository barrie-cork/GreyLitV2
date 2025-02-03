import { HealthCheckResponse } from '../types';

export function getHealthStatus(): HealthCheckResponse {
  const timestamp = new Date().toISOString();
  return {
    status: 'healthy',
    timestamp,
    dependencies: {
      serpapi: {
        status: 'up',
        latency: 0,
      },
      serper: {
        status: 'up',
        latency: 0,
      },
      duckduckgo: {
        status: 'up',
        latency: 0,
      },
    },
  };
}
