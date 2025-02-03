import express from 'express';
import { getConfig } from './config';

const app = express();
const config = getConfig();

app.use(express.json());

// Health check endpoint
app.get('/health', (_req, res) => {
  const timestamp = new Date().toISOString();
  res.json({
    status: 'healthy',
    timestamp,
    dependencies: {
      serpapi: {
        status: 'up',
        latency: 0,
      },
      serper: {
        status: 'up',
        latency: 0,
      },
      duckduckgo: {
        status: 'up',
        latency: 0,
      },
    },
  });
});

app.listen(config.port, () => {
  console.log(`Search executor service listening on port ${config.port}`);
});
