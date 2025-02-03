import { app } from './app';
import { getConfig } from './config';

const config = getConfig();

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(`Search executor service listening on port ${config.port}`);
  });
}
