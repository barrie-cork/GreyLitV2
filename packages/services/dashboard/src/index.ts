import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.get('/health', (_req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(port, () => {
  console.log(`Dashboard service listening on port ${port}`);
});
