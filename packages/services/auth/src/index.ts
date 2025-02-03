import express from 'express';
import { getEnvVarNumber } from '@grey-lit/utils';

const app = express();
const port = getEnvVarNumber('PORT', 3001);

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(port, () => {
  console.log(`Auth service listening on port ${port}`);
});
