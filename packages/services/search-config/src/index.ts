import express from 'express';

const app = express();
const port = process.env.PORT || 3002;

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(port, () => {
  console.log(`Search config service listening on port ${port}`);
});
