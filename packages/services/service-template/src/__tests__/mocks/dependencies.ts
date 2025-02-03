/**
 * Mock dependency responses for testing
 */
export const mockDependencyResponses = {
  database: {
    healthy: {
      status: 'up',
      latency: 5,
    },
    unhealthy: {
      status: 'down',
      latency: 500,
    },
  },
};

/**
 * Mock configuration for testing
 */
export const mockConfig = {
  port: 3000,
  nodeEnv: 'test',
};
