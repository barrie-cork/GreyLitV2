/**
 * Get environment variable value with type safety
 * @param key Environment variable key
 * @param defaultValue Optional default value if env var is not set
 * @returns The environment variable value or default value
 */
export const getEnvVar = (key: keyof NodeJS.ProcessEnv, defaultValue?: string): string => {
  const value = process.env[key];
  return value ?? defaultValue ?? '';
};

/**
 * Get environment variable as number
 * @param key Environment variable key
 * @param defaultValue Optional default value if env var is not set
 * @returns The environment variable value as number or default value
 */
export const getEnvVarNumber = (key: keyof NodeJS.ProcessEnv, defaultValue: number): number => {
  const value = process.env[key];
  return value ? parseInt(value, 10) : defaultValue;
};
