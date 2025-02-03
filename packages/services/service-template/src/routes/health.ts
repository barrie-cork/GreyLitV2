import { Request, Response, NextFunction } from 'express';
import { getHealthStatus } from '../services/health';

export default async function healthRoutes(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const health = await getHealthStatus();
    res.json(health);
  } catch (error) {
    next(error);
  }
}
