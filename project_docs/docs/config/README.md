# Configuration Guide

## Environment Variables

### Required Variables

```bash
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/greylit
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=password
VECTOR_DB_URL=http://localhost:8000

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRY=24h

# External APIs
OPENROUTER_API_KEY=your-api-key
SERP_API_KEY=your-api-key
SERPAPI_KEY=your-api-key

# Storage
UPLOAD_PATH=./uploads
```

### Optional Variables

```bash
# Logging
LOG_LEVEL=debug
LOG_FORMAT=json

# Rate Limiting
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX=100

# Cache
REDIS_URL=redis://localhost:6379
```

## Service Configuration

### Authentication Service

```typescript
interface AuthConfig {
  jwtSecret: string;
  jwtExpiry: string;
  passwordHashRounds: number;
}
```

### Search Configuration Service

```typescript
interface SearchConfig {
  uploadPath: string;
  maxFileSize: number;
  allowedFileTypes: string[];
}
```

### Document Processing Service

```typescript
interface ProcessingConfig {
  vectorDimensions: number;
  batchSize: number;
  processingTimeout: number;
}
```

## Database Configuration

### MongoDB

```javascript
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}
```

### Neo4j

```javascript
{
  maxConnectionPoolSize: 50,
  connectionTimeout: 5000,
  trustStrategy: "TRUST_ALL_CERTIFICATES"
}
```

### Vector Database

```javascript
{
  dimension: 384,
  metric: "cosine",
  pods: 1,
  replicas: 1
}
```

## API Configuration

### Rate Limiting

```javascript
{
  windowMs: 60000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
}
```

### CORS

```javascript
{
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}
```

## Logging Configuration

### Winston Logger

```javascript
{
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" })
  ]
}
```

## Development Setup

### Local Development

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Start development server
npm run dev
```

### Docker Development

```yaml
version: '3.8'
services:
  app:
    build: .
    env_file: .env
    ports:
      - '3000:3000'
    volumes:
      - .:/usr/src/app
```

## Production Configuration

### Security Settings

```javascript
{
  helmet: {
    contentSecurityPolicy: true,
    crossOriginEmbedderPolicy: true,
    expectCt: true,
    hidePoweredBy: true,
    hsts: true,
    noSniff: true,
    referrerPolicy: true,
    xssFilter: true
  }
}
```

### Performance Tuning

```javascript
{
  compression: {
    level: 6,
    threshold: 100 * 1000
  },
  cache: {
    ttl: 60 * 60 * 1000,
    max: 1000
  }
}
```

## Backup Configuration

### MongoDB Backup

```bash
# Backup script
mongodump --uri="$MONGODB_URI" --out=/backup/mongodb/$(date +%Y%m%d)

# Restore script
mongorestore --uri="$MONGODB_URI" --dir=/backup/mongodb/20240101
```

### Neo4j Backup

```bash
# Backup script
neo4j-admin backup --backup-dir=/backup/neo4j/$(date +%Y%m%d)

# Restore script
neo4j-admin restore --from=/backup/neo4j/20240101
```

## Monitoring Configuration

### Health Checks

```javascript
{
  path: "/health",
  interval: 30000,
  timeout: 5000,
  startPeriod: 30000,
  retries: 3
}
```

### Metrics Collection

```javascript
{
  prometheus: {
    collectDefaultMetrics: true,
    timeout: 5000
  }
}
```
