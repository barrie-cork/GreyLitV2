import { Router } from 'express';
import { getHealthStatus } from '../services/health';

const router = Router();

router.get('/health', (_req, res) => {
  const healthStatus = getHealthStatus();
  res.json(healthStatus);
});

export default router;
