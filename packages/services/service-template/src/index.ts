import express from 'express';
import { getConfig } from './config';
import healthRoutes from './routes/health';

const app = express();
const config = getConfig();

// Middleware
app.use(express.json());

// Routes
app.use('/', healthRoutes);

// Start server
app.listen(config.port, () => {
  console.log(`Service template listening on port ${config.port}`);
});
