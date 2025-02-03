# Web Crawler Service Specification

## Service Purpose

The Web Crawler Service is responsible for systematically crawling and extracting content from web pages identified through SERP API results. It handles JavaScript rendering, respects robots.txt rules, manages its own rate limiting, and integrates with the Document Processing Service for content analysis and Knowledge Graph population.

## Core Functionalities

### 1. URL Processing

- Validate and normalize URLs from SERP APIs
- Check robots.txt compliance
- Internal rate limiting management per domain
- URL queuing and prioritization
- Track crawling status for PRISMA reporting

### 2. Content Extraction

- HTML content retrieval via ScrapingAnt
- PDF and document download handling
- Resource management
- Content validation and sanitization
- Automated JavaScript rendering via ScrapingAnt

### 3. Rate Limiting Management

- Per-domain request throttling
- Concurrent connection control
- Bandwidth monitoring
- Request scheduling
- Robots.txt delay compliance

### 4. Document Processing Integration

- Integration with Document Processing Service
- Content format standardization
- Metadata extraction
- Error handling and reporting
- Processing status tracking

### 5. PRISMA Compliance

- Track crawl attempts and outcomes
- Record document types and counts
- Maintain processing statistics
- Generate crawl reports
- Track successful/unsuccessful retrievals

## API Endpoints

### 1. Submit Crawl Request

```yaml
Endpoint: POST /api/crawler/submit
Purpose: Submit URLs for crawling
Authentication: Required
Request:
  Body:
    {
      'searchId': string,
      'urls':
        [
          {
            'url': string,
            'priority': number,
            'metadata': { 'source': string, 'documentType': string, 'serpProvider': string },
          },
        ],
      'configuration':
        {
          'javascript': boolean,
          'maxDepth': number,
          'timeout': number,
          'followLinks': boolean,
          'rateLimits':
            {
              'requestsPerSecond': number,
              'maxConcurrentRequests': number,
              'domainCooldown': number,
            },
        },
    }
Response:
  200 OK:
    {
      'batchId': string,
      'accepted': number,
      'rejected': number,
      'estimatedTime': number,
      'status': 'queued',
      'prismaTracking':
        {
          'totalUrls': number,
          'uniqueUrls': number,
          'documentTypes': { 'pdf': number, 'html': number, 'doc': number },
        },
    }
```

### 2. Get Crawl Status

```yaml
Endpoint: GET /api/crawler/batch/{batchId}/status
Purpose: Check crawling status for PRISMA reporting
Authentication: Required
Response:
  200 OK:
    {
      "batchId": string,
      "searchId": string,
      "status": "queued" | "processing" | "completed" | "failed",
      "progress": {
        "total": number,
        "completed": number,
        "failed": number,
        "remaining": number
      },
      "rateLimitStatus": {
        "activeConnections": number,
        "queuedRequests": number,
        "domainStatuses": [{
          "domain": string,
          "requestsInLastMinute": number,
          "nextAvailableTime": string
        }]
      },
      "prismaMetrics": {
        "attemptedRetrieval": number,
        "successfulRetrieval": number,
        "failedRetrieval": number,
        "documentTypes": {
          "pdf": number,
          "html": number,
          "doc": number
        }
      }
    }
```

### 3. Get Domain Status

```yaml
Endpoint: GET /api/crawler/domain/{domain}/status
Purpose: Check domain-specific crawl status and rate limits
Authentication: Required
Response:
  200 OK:
    {
      'domain': string,
      'rateLimiting':
        {
          'currentRequests': number,
          'maxRequests': number,
          'timeWindow': number,
          'nextAvailableSlot': string,
          'robotsTxtDelay': number,
        },
      'crawlStats':
        {
          'totalRequests': number,
          'successfulRequests': number,
          'failedRequests': number,
          'averageResponseTime': number,
        },
    }
```

## Data Models

### CrawlRequest

```typescript
interface CrawlRequest {
  id: string;
  searchId: string;
  urls: UrlRequest[];
  configuration: CrawlConfiguration;
  rateLimiting: RateLimitConfig;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  prismaTracking: {
    totalUrls: number;
    uniqueUrls: number;
    attemptedRetrieval: number;
    successfulRetrieval: number;
    failedRetrieval: number;
    documentTypes: Record<string, number>;
  };
  progress: {
    total: number;
    completed: number;
    failed: number;
    startTime: Date;
    endTime?: Date;
  };
}

interface RateLimitConfig {
  global: {
    maxConcurrentRequests: number;
    requestsPerSecond: number;
    maxBandwidth: number;
  };
  perDomain: {
    maxConcurrentRequests: number;
    requestsPerMinute: number;
    cooldownPeriod: number;
  };
  robotsTxt: {
    respectCrawlDelay: boolean;
    minDelay: number;
    maxDelay: number;
  };
}

interface DomainStatus {
  domain: string;
  requestCount: number;
  lastRequestTime: Date;
  robotsTxtRules: {
    crawlDelay: number;
    allowedPaths: string[];
    disallowedPaths: string[];
  };
  currentWindow: {
    startTime: Date;
    requestCount: number;
    bandwidth: number;
  };
}
```

## External Dependencies

### Required Services

```yaml
Services:
  - Document Processing Service
  - Search Strategy Service

Libraries:
  - LangChain's ScrapingAntLoader
  - pdf.js for PDF processing
  - cheerio for HTML parsing

Databases:
  - MongoDB: Crawl state & results
  - Redis: Cache and session management
```

## Configuration

### Service Configuration

```typescript
interface ServiceConfig {
  server: {
    port: number;
    host: string;
    timeout: number;
  };
  crawler: {
    userAgent: string;
    maxConcurrent: number;
    defaultTimeout: number;
    retryAttempts: number;
    respectRobotsTxt: boolean;
  };
  redis: {
    host: string;
    port: number;
    password: string;
    database: number;
  };
  rateLimit: {
    redis: {
      prefix: string; // Prefix for Redis-Cell keys
    };
    global: {
      maxBurst: number; // Maximum burst size
      count: number; // Number of requests allowed
      period: number; // Time period in seconds
    };
    perDomain: {
      maxBurst: number; // Per domain burst allowance
      count: number; // Requests per domain
      period: number; // Time window in seconds
    };
  };
  databases: {
    mongodb: {
      uri: string;
      options: object;
    };
  };
}
```

## Rate Limiting Implementation

### Redis-Cell Integration

```typescript
class RateLimiter {
  async checkLimit(domain: string): Promise<RateLimitResult> {
    // Global rate limit check
    const [globalAllowed] = await this.redis.call(
      'CL.THROTTLE',
      `${this.config.rateLimit.redis.prefix}:global`,
      this.config.rateLimit.global.maxBurst,
      this.config.rateLimit.global.count,
      this.config.rateLimit.global.period
    );

    // Domain-specific rate limit check
    const [domainAllowed] = await this.redis.call(
      'CL.THROTTLE',
      `${this.config.rateLimit.redis.prefix}:domain:${domain}`,
      this.config.rateLimit.perDomain.maxBurst,
      this.config.rateLimit.perDomain.count,
      this.config.rateLimit.perDomain.period
    );

    return {
      allowed: globalAllowed === 0 && domainAllowed === 0,
      retryAfter: Math.max(globalAllowed, domainAllowed),
    };
  }
}
```

### Per-Domain Control

```yaml
Features:
  - Redis-Cell GCRA algorithm
  - Precise rate measurements
  - Burst handling
  - Atomic operations
```

### Global Control

```yaml
Features:
  - Service-wide rate limiting
  - Resource protection
  - Quota management
  - Request scheduling
```

### Rate Limit Storage

```yaml
Storage:
  - In-memory counters
  - Redis cache
  - Persistent configurations
  - Domain status tracking
  - Historical metrics
```

## Error Handling

### Rate Limit Errors

```yaml
Types:
  - Global limit exceeded
  - Domain limit exceeded
  - Bandwidth exceeded
  - Concurrent limit reached
  - Robots.txt violation
```

### Recovery Procedures

```yaml
Procedures:
  - Exponential backoff
  - Request rescheduling
  - Domain cooldown
  - Limit adjustment
  - Queue reordering
```

## Monitoring

### Rate Limit Metrics

```yaml
Metrics:
  - Request rates per domain
  - Global request rate
  - Bandwidth usage
  - Queue lengths
  - Rejection rates
```

### Performance Tracking

```yaml
Indicators:
  - Response times
  - Success rates
  - Resource usage
  - Domain health
  - Compliance status
```

## Configuration

### Rate Limit Settings

```yaml
Settings:
  - Default limits
  - Domain-specific rules
  - Backoff parameters
  - Window sizes
  - Bandwidth caps
```

### Crawler Settings

```yaml
Settings:
  - User agent string
  - Request timeouts
  - Retry policies
  - Resource limits
  - Processing priorities
```

# Guideline Concept Integration

# Web Crawler Service Specification

[Previous content remains the same until Data Models]

## Data Models

### CrawlRequest

````typescript
interface CrawlRequest {
  // ... existing fields ...
  guidelineValidation: {
    requireGuidelineMatch: boolean;  // Whether to validate against guideline concepts
    matchedTerms: string[];         // Guideline terms found in content
    confidence: number;             // Confidence of being a guideline
  };
}

### Content Processing
```yaml
Steps:
  1. Extract content
  2. Verify guideline indicators
  3. Process JavaScript if needed
  4. Handle document downloads
  5. Update PRISMA metrics
````
