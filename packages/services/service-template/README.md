# Service Template

This template provides a standardized structure for creating new microservices in the Grey Literature Search Engine project.

## Directory Structure

```
src/
├── config/        # Service configuration
├── routes/        # Express route handlers
├── services/      # Business logic
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Development

```bash
# Install dependencies
yarn install

# Run in development mode
yarn dev

# Build for production
yarn build

# Run tests
yarn test
```

## Adding New Features

1. Add new routes in `src/routes/`
2. Implement business logic in `src/services/`
3. Define types in `src/types/`
4. Add configuration in `src/config/`
5. Create tests in `__tests__/`

## Testing

Tests should mirror the source directory structure:

```
__tests__/
├── config/        # Configuration tests
├── routes/        # Route handler tests
├── services/      # Service logic tests
└── utils/         # Utility function tests
```

## Health Check

The service includes a basic health check endpoint at GET /health that returns:

```json
{
  "status": "healthy",
  "timestamp": "ISO-8601 timestamp",
  "dependencies": {
    "dependency-name": {
      "status": "up" | "down",
      "latency": number
    }
  }
}
```
