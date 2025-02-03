# Search Execution Service Specification

## Service Purpose

The Search Execution Service manages the execution of search strategies across multiple SERP APIs, implementing robust rate limiting using Redis-Cell, handling result limits from Search Configuration Service, and managing result aggregation.

## Core Functionalities

### 1. SERP API Integration

- Execute searches using LangChain SERP API wrappers
- Handle API-specific authentication
- Process API responses
- Track API health
- Enforce per-query result limits

### 2. Rate Limiting

- Redis-Cell module integration for SERP APIs
- ScrapingAnt quota management
- Request throttling based on ScrapingAnt limits
- Response header handling for rate limits

### 3. Result Management

- Track results per query
- Enforce maxResultsPerQuery limits
- Handle pagination within limits
- Aggregate results across APIs

### 4. Search Execution

- Process search strings
- Manage parallel requests
- Track execution progress
- Monitor result counts

## API Endpoints

### 1. Execute Search

```yaml
Endpoint: POST /api/search/execute
Purpose: Execute search strategy
Authentication: Required
Request:
  Body:
    {
      "strategyId": string,
      "searchConfigurationId": string,
      "searchStrings": [{
        "string": string,
        "targetUrl": string
      }],
      "apiConfig": {
        "serpapi": {
          "enabled": boolean,
          "maxResultsPerQuery": number  // From Search Configuration
        },
        "serper": {
          "enabled": boolean,
          "maxResultsPerQuery": number
        },
        "googleSearch": {
          "enabled": boolean,
          "maxResultsPerQuery": number
        },
        "duckduckgo": {
          "enabled": boolean,
          "maxResultsPerQuery": number
        }
      }
    }
Response:
  200 OK:
    {
      "executionId": string,
      "status": "initiated",
      "apiStatus": {
        "serpapi": {
          "status": "ready" | "rate_limited",
          "maxResults": number,
          "currentResults": number
        },
        // Status for other APIs...
      }
    }
```

### 2. Get Execution Status

```yaml
Endpoint: GET /api/search/execution/{executionId}/status
Purpose: Check execution status
Authentication: Required
Response:
  200 OK:
    {
      "executionId": string,
      "status": "running" | "completed" | "failed",
      "progress": {
        "totalQueries": number,
        "completedQueries": number,
        "failedQueries": number
      },
      "results": {
        "perApi": {
          "serpapi": {
            "maxResults": number,
            "currentResults": number,
            "remainingResults": number
          },
          // Results for other APIs...
        },
        "total": number
      },
      "rateLimiting": {
        "serpapi": {
          "remaining": number,
          "resetAfter": number,
          "retryAfter": number,
          "isLimited": boolean
        },
        // Rate limit status for other APIs...
      }
    }
```

## Data Models

### SearchExecution

```typescript
interface SearchExecution {
  id: string;
  strategyId: string;
  searchConfigurationId: string;
  status: 'initiated' | 'running' | 'completed' | 'failed';
  apiConfig: {
    serpapi: APIExecutionConfig;
    serper: APIExecutionConfig;
    googleSearch: APIExecutionConfig;
    duckduckgo: APIExecutionConfig;
  };
  progress: {
    startTime: Date;
    endTime?: Date;
    totalQueries: number;
    completedQueries: number;
    failedQueries: number;
  };
  results: {
    total: number;
    perApi: Record<string, APIResults>;
  };
}

interface APIExecutionConfig {
  enabled: boolean;
  maxResultsPerQuery: number;
  currentResults: number;
  status: 'ready' | 'rate_limited' | 'completed';
  rateLimiting: {
    remaining: number;
    resetAfter: number;
    retryAfter: number;
  };
}

interface APIResults {
  maxResults: number;
  currentResults: number;
  remainingResults: number;
  queries: {
    completed: number;
    remaining: number;
  };
}
```

## Configuration

```typescript
interface ServiceConfig {
  server: {
    port: number;
    host: string;
  };
  rateLimiting: {
    redis: {
      host: string;
      port: number;
      password: string;
    };
    defaultBackoff: {
      initialDelay: number;
      maxDelay: number;
      factor: number;
    };
  };
  apis: {
    serpapi: APIConfig;
    serper: APIConfig;
    googleSearch: APIConfig;
    duckduckgo: APIConfig;
  };
  resultLimits: {
    defaultMaxResults: {
      serpapi: number;
      serper: number;
      googleSearch: number;
      duckduckgo: number;
    };
    maxResultsPerPage: {
      serpapi: number;
      serper: number;
      googleSearch: number;
      duckduckgo: number;
    };
  };
}

interface APIConfig {
  wrapper: string; // LangChain wrapper class name
  apiKey?: string;
  rateLimit: RedisCellConfig;
}

interface RedisCellConfig {
  maxBurst: number;
  countPerPeriod: number;
  periodSeconds: number;
}
```

## Processing Pipeline

### 1. Search Initialization

```yaml
Steps: 1. Fetch search configuration
  2. Validate API limits
  3. Initialize result tracking
  4. Create execution plan
```

### 2. Query Execution

```yaml
Steps: 1. Check rate limits (Redis-Cell)
  2. Check result limits
  3. Execute API request
  4. Update result counts
  5. Handle pagination within limits
```

### 3. Result Management

```yaml
Steps: 1. Track results per query
  2. Aggregate across APIs
  3. Update progress
  4. Check completion criteria
```

## Error Handling

### Error Types

```typescript
enum ExecutionError {
  API_ERROR = 'API_ERROR',
  RATE_LIMIT = 'RATE_LIMIT',
  RESULT_LIMIT = 'RESULT_LIMIT',
  CONFIG_ERROR = 'CONFIG_ERROR',
}

interface ErrorResponse {
  error: {
    code: ExecutionError;
    message: string;
    details?: {
      api?: string;
      currentResults?: number;
      maxResults?: number;
      rateLimitInfo?: object;
    };
  };
}
```

## Monitoring

### Metrics

```yaml
Execution Metrics:
  - Results per query
  - Results per API
  - Completion rates
  - Limit adherence

Rate Limit Metrics:
  - Rate limit hits
  - Quota usage
  - API availability
  - Error rates
```

## Security

### API Security

```yaml
Measures:
  - Authentication
  - Rate limiting
  - Result validation
  - Access control
```

## Performance Optimization

### Caching Strategy

```yaml
Levels:
  - Search configuration
  - Result counts
  - Rate limit status
  - API responses
```

### Resource Management

```yaml
Controls:
  - Concurrent requests
  - Result buffering
  - Memory usage
  - Connection pooling
```
