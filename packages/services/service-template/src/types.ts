// Service-specific type definitions
export interface ServiceResponse {
  status: string;
  timestamp: string;
}

export interface HealthCheckResponse extends ServiceResponse {
  dependencies?: {
    [key: string]: {
      status: 'up' | 'down';
      latency?: number;
    };
  };
}
