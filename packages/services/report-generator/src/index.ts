import express from 'express';

const app = express();
const port = process.env.PORT || 3007;

app.get('/health', (_req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(port, () => {
  console.log(`Report generator service listening on port ${port}`);
});
