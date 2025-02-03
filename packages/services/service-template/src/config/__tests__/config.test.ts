import { getConfig } from '..';

describe('Service Configuration', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should use default port when not specified', () => {
    const config = getConfig();
    expect(config.port).toBe(3000);
  });

  it('should use environment port when specified', () => {
    process.env.PORT = '4000';
    const config = getConfig();
    expect(config.port).toBe(4000);
  });

  it('should use default node env when not specified', () => {
    const config = getConfig();
    expect(config.nodeEnv).toBe('development');
  });

  it('should use environment node env when specified', () => {
    process.env.NODE_ENV = 'production';
    const config = getConfig();
    expect(config.nodeEnv).toBe('production');
  });
});
