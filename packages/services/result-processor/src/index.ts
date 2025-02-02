import express from 'express';

const app = express();
const port = process.env.PORT || 3006;

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(port, () => {
  console.log(`Result processor service listening on port ${port}`);
});
