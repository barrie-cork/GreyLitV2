import { Request, Response, NextFunction } from 'express';
import { ServiceError } from '../types';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('Error:', err);

  if (err instanceof Error && 'statusCode' in err) {
    const serviceError = err as ServiceError;
    res.status(serviceError.statusCode).json({
      error: {
        code: serviceError.code,
        message: serviceError.message,
        details: serviceError.details,
      },
    });
    return;
  }

  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred',
    },
  });
}
import { Request, Response, NextFunction } from 'express';
import { ServiceError } from '../types';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('Error:', err);

  if (err instanceof Error && 'statusCode' in err) {
    const serviceError = err as ServiceError;
    res.status(serviceError.statusCode).json({
      error: {
        code: serviceError.code,
        message: serviceError.message,
        details: serviceError.details,
      },
    });
    return;
  }

  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred',
    },
  });
}
import { Request, Response, NextFunction } from 'express';
import { ServiceError } from '../types';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('Error:', err);

  if (err instanceof Error && 'statusCode' in err) {
    const serviceError = err as ServiceError;
    res.status(serviceError.statusCode).json({
      error: {
        code: serviceError.code,
        message: serviceError.message,
        details: serviceError.details,
      },
    });
    return;
  }

  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred',
    },
  });
}
