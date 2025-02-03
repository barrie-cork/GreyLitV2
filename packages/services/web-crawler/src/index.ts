import express from 'express';
import { getEnvVarNumber } from '@grey-lit/utils';

const app = express();
const port = getEnvVarNumber('PORT', 3008);

app.get('/health', (_req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(port, () => {
  console.log(`Web crawler service listening on port ${port}`);
});
