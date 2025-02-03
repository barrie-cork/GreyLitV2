import { getEnvVar } from '@grey-lit/utils';

export interface ServiceConfig {
  port: number;
  nodeEnv: string;
  apis: {
    serpapi: {
      enabled: boolean;
      maxResultsPerQuery: number;
    };
    serper: {
      enabled: boolean;
      maxResultsPerQuery: number;
    };
    duckduckgo: {
      enabled: boolean;
      maxResultsPerQuery: number;
    };
  };
}

export function getConfig(): ServiceConfig {
  return {
    port: parseInt(getEnvVar('PORT', '3005'), 10),
    nodeEnv: getEnvVar('NODE_ENV', 'development'),
    apis: {
      serpapi: {
        enabled: getEnvVar('SERPAPI_ENABLED', 'true') === 'true',
        maxResultsPerQuery: parseInt(getEnvVar('SERPAPI_MAX_RESULTS', '100'), 10),
      },
      serper: {
        enabled: getEnvVar('SERPER_ENABLED', 'true') === 'true',
        maxResultsPerQuery: parseInt(getEnvVar('SERPER_MAX_RESULTS', '100'), 10),
      },
      duckduckgo: {
        enabled: getEnvVar('DUCKDUCKGO_ENABLED', 'true') === 'true',
        maxResultsPerQuery: parseInt(getEnvVar('DUCKDUCKGO_MAX_RESULTS', '100'), 10),
      },
    },
  };
}
