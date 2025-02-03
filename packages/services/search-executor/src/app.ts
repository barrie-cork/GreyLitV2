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

export { app };
