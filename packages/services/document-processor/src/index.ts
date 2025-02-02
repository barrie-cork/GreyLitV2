import express from 'express';

const app = express();
const port = process.env.PORT || 3003;

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(port, () => {
  console.log(`Document processor service listening on port ${port}`);
});
