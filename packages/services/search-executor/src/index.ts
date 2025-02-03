import express from 'express';
import { getConfig } from './config';
import healthRoutes from './routes/health';
import searchRoutes from './routes/search';
import { errorHandler } from './middleware/error';

const app = express();
const config = getConfig();

// Middleware
app.use(express.json());

// Routes
app.use('/', healthRoutes);
app.use('/api', searchRoutes);

// Error handling
app.use(errorHandler);

// Export for testing
export { app };

// Only listen if we're not testing
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(`Search executor service listening on port ${config.port}`);
  });
}
