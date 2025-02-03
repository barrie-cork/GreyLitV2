import express from 'express';
import { getConfig } from './config';
import healthRoutes from './routes/health';
import searchRoutes from './routes/search';

const app = express();
const config = getConfig();

// Middleware
app.use(express.json());

// Routes
app.use('/', healthRoutes);
app.use('/api', searchRoutes);

// Start server
app.listen(config.port, () => {
  console.log(`Search executor service listening on port ${config.port}`);
});
