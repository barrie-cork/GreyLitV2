import express from 'express';
import { getConfig } from './config';
import healthRoutes from './routes/health';
import { errorHandler } from './middleware/error';

const app = express();
const config = getConfig();

// Middleware
app.use(express.json());

// Routes
app.use('/', healthRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`Document processor service listening on port ${config.port}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
