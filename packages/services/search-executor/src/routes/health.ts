import { Router } from 'express';
import { getHealthStatus } from '../services/health';

const router = Router();

router.get('/health', (_req, res) => {
  const healthStatus = getHealthStatus();
  res.json(healthStatus);
});

export default router;
import { Router } from 'express';
import { getHealthStatus } from '../services/health';

const router = Router();

router.get('/health', async (_req, res, next) => {
  try {
    const health = await getHealthStatus();
    res.json(health);
  } catch (error) {
    next(error);
  }
});

export default router;
