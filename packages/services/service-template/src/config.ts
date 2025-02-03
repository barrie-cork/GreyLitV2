import { getEnvVar } from '@grey-lit/utils';

export interface ServiceConfig {
  port: number;
  nodeEnv: string;
}

export function getConfig(): ServiceConfig {
  return {
    port: parseInt(getEnvVar('PORT', '3000'), 10),
    nodeEnv: getEnvVar('NODE_ENV', 'development'),
  };
}
