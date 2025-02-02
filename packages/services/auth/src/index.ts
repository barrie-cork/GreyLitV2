import express from 'express';
import { User } from '@grey-lit/types';
import { isValidEmail } from '@grey-lit/utils';

const app = express();
const port = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(port, () => {
  console.log(`Auth service listening on port ${port}`);
});
