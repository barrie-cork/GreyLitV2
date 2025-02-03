import { BaseServiceError, ConfigurationError, ValidationError, DependencyError } from '../index';

describe('Service Error Types', () => {
  describe('BaseServiceError', () => {
    it('should create error with correct properties', () => {
      const error = new BaseServiceError('test error', 'TEST_ERROR', 500);
      
      expect(error.message).toBe('test error');
      expect(error.code).toBe('TEST_ERROR');
      expect(error.statusCode).toBe(500);
      expect(error.name).toBe('BaseServiceError');
    });
  });

  describe('ConfigurationError', () => {
    it('should create error with correct defaults', () => {
      const error = new ConfigurationError('config error');
      
      expect(error.message).toBe('config error');
      expect(error.code).toBe('CONFIGURATION_ERROR');
      expect(error.statusCode).toBe(500);
    });
  });

  describe('ValidationError', () => {
    it('should create error with correct defaults', () => {
      const error = new ValidationError('validation error');
      
      expect(error.message).toBe('validation error');
      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.statusCode).toBe(400);
    });
  });

  describe('DependencyError', () => {
    it('should create error with correct defaults', () => {
      const error = new DependencyError('dependency error');
      
      expect(error.message).toBe('dependency error');
      expect(error.code).toBe('DEPENDENCY_ERROR');
      expect(error.statusCode).toBe(503);
    });
  });
});
