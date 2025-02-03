import express from 'express';
import { getEnvVarNumber } from '@grey-lit/utils';

const app = express();
const port = getEnvVarNumber('PORT', 3003);

app.get('/health', (_req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(port, () => {
  console.log(`Document processor service listening on port ${port}`);
});
