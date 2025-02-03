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
import { HealthCheckResponse } from '../types';

export async function getHealthStatus(): Promise<HealthCheckResponse> {
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    dependencies: {
      // Add actual dependency checks here
      database: {
        status: 'up',
        latency: 5
      }
    }
  };
}
