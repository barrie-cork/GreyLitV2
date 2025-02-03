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

export interface ServiceError extends Error {
  code: string;
  statusCode: number;
  details?: unknown;
}

export class BaseServiceError extends Error implements ServiceError {
  code: string;
  statusCode: number;
  details?: unknown;

  constructor(message: string, code: string, statusCode: number, details?: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

export class ConfigurationError extends BaseServiceError {
  constructor(message: string, details?: unknown) {
    super(message, 'CONFIGURATION_ERROR', 500, details);
  }
}

export class ValidationError extends BaseServiceError {
  constructor(message: string, details?: unknown) {
    super(message, 'VALIDATION_ERROR', 400, details);
  }
}

export class DependencyError extends BaseServiceError {
  constructor(message: string, details?: unknown) {
    super(message, 'DEPENDENCY_ERROR', 503, details);
  }
}
