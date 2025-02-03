# Results Processing Service Specification

## Service Purpose

The Results Processing Service manages the processing, analysis, and classification of search results from SERP APIs. It handles result ranking, classification, user feedback, and prepares data for PRISMA-compliant reporting.

## Core Functionalities

### 1. Results Processing

- Aggregate results from multiple SERP APIs
- Remove duplicates
- Extract metadata
- Process document content
- Generate result summaries

### 2. Classification System

- Result categorization (Include/Exclude/Maybe)
- Justification management
- Classification history
- Bulk classification handling

### 3. Results Analysis

- Relevance scoring
- Content analysis
- Metadata enrichment
- Pattern identification

### 4. Reporting Preparation

- Metrics calculation
- PRISMA data preparation
- Export formatting
- Data aggregation

## API Endpoints

### 1. Process Search Results

```yaml
Endpoint: POST /api/results/process
Purpose: Process new search results
Authentication: Required
Request:
  Body:
    {
      'configurationId': string,
      'results':
        [
          {
            'url': string,
            'title': string,
            'snippet': string,
            'source': string,
            'metadata': { 'dateFound': string, 'apiSource': string },
          },
        ],
      'processingOptions':
        { 'deduplication': boolean, 'enrichment': boolean, 'summarization': boolean },
    }
Response:
  200 OK:
    {
      'batchId': string,
      'status': 'processing',
      'processedCount': number,
      'duplicatesFound': number,
      'estimatedCompletion': string,
    }
```

### 2. Classify Result

```yaml
Endpoint: POST /api/results/{resultId}/classify
Purpose: Classify a search result
Authentication: Required
Request:
  Body:
    {
      "classification": "include" | "exclude" | "maybe",
      "justification": string,
      "tags": string[],
      "metadata": {
        "reviewer": string,
        "reviewDate": string,
        "confidence": number
      }
    }
Response:
  200 OK:
    {
      "resultId": string,
      "status": "classified",
      "classification": {
        "value": string,
        "justification": string,
        "timestamp": string,
        "reviewer": string
      },
      "history": [{
        "classification": string,
        "timestamp": string,
        "reviewer": string
      }]
    }
```

### 3. Bulk Classification

```yaml
Endpoint: POST /api/results/bulk-classify
Purpose: Classify multiple results
Authentication: Required
Request:
  Body:
    {
      "classifications": [{
        "resultId": string,
        "classification": "include" | "exclude" | "maybe",
        "justification": string
      }],
      "metadata": {
        "reviewer": string,
        "batchNote": string
      }
    }
Response:
  200 OK:
    {
      "batchId": string,
      "processedCount": number,
      "failedCount": number,
      "results": [{
        "resultId": string,
        "status": "success" | "failed",
        "error?: string
      }]
    }
```

### 4. Get Results Analysis

```yaml
Endpoint: GET /api/results/analysis
Purpose: Get analysis of processed results
Authentication: Required
Parameters:
  - configurationId: string
  - startDate?: string
  - endDate?: string
Response:
  200 OK:
    {
      'summary':
        {
          'totalResults': number,
          'processedResults': number,
          'includedResults': number,
          'excludedResults': number,
          'maybeResults': number,
          'unclassifiedResults': number,
        },
      'patterns':
        {
          'commonTerms': [{ 'term': string, 'frequency': number, 'relevance': number }],
          'sourcesDistribution': [{ 'source': string, 'count': number, 'percentage': number }],
        },
      'timeline':
        { 'processingDuration': number, 'classificationProgress': number, 'lastUpdated': string },
    }
```

## Data Models

### SearchResult

```typescript
interface SearchResult {
  id: string;
  configurationId: string;
  url: string;
  title: string;
  snippet: string;
  source: string;
  metadata: {
    dateFound: Date;
    apiSource: string;
    lastChecked: Date;
    availability: boolean;
  };
  processing: {
    status: 'new' | 'processing' | 'processed' | 'failed';
    error?: string;
    processedAt?: Date;
    enrichmentStatus: boolean;
  };
  classification: {
    status: 'unclassified' | 'classified' | 'needs_review';
    value?: 'include' | 'exclude' | 'maybe';
    justification?: string;
    confidence?: number;
    reviewer?: string;
    reviewDate?: Date;
    history: ClassificationHistory[];
  };
  content: {
    fullText?: string;
    summary?: string;
    keyPhrases: string[];
    entities: Entity[];
  };
  metrics: {
    relevanceScore: number;
    qualityScore: number;
    citationCount?: number;
  };
}

interface ClassificationHistory {
  value: 'include' | 'exclude' | 'maybe';
  justification: string;
  reviewer: string;
  timestamp: Date;
  changes?: {
    from: string;
    to: string;
    reason: string;
  };
}

interface Entity {
  type: string;
  value: string;
  confidence: number;
  context: string;
}
```

## External Dependencies

### Required Services

```yaml
Services:
  - Document Processing Service
  - Search Strategy Service
  - Reporting Service

APIs:
  - LangChain for content analysis
  - URL validation services
  - Content extraction APIs

Databases:
  - MongoDB: Result storage
  - Vector DB: Semantic search
  - Redis: Cache management
```

### Configuration Requirements

```typescript
interface ServiceConfig {
  server: {
    port: number;
    host: string;
    timeout: number;
  };
  processing: {
    batchSize: number;
    concurrentProcessing: number;
    enrichmentTimeout: number;
    retryAttempts: number;
  };
  classification: {
    autoClassificationThreshold: number;
    reviewThreshold: number;
    batchLimit: number;
  };
  databases: {
    mongodb: {
      uri: string;
      options: object;
    };
    redis: {
      host: string;
      port: number;
      password: string;
    };
    vectorDb: {
      endpoint: string;
      apiKey: string;
    };
  };
  analysis: {
    summarizationLength: number;
    keyPhrasesLimit: number;
    relevanceThreshold: number;
  };
}
```

## Processing Pipeline

### 1. Result Reception

```yaml
Steps: 1. Validate input data
  2. Check for duplicates
  3. Create result records
  4. Initialize processing status
```

### 2. Content Processing

```yaml
Steps: 1. Extract full content
  2. Generate summaries
  3. Identify key phrases
  4. Extract entities
```

### 3. Analysis

```yaml
Steps: 1. Calculate relevance scores
  2. Assess quality metrics
  3. Generate recommendations
  4. Update result records
```

### 4. Classification Management

```yaml
Steps: 1. Process classification requests
  2. Validate justifications
  3. Update classification history
  4. Trigger notifications
```

## Error Handling

### Error Types

```typescript
enum ProcessingError {
  INVALID_RESULT = 'INVALID_RESULT',
  PROCESSING_FAILED = 'PROCESSING_FAILED',
  CLASSIFICATION_FAILED = 'CLASSIFICATION_FAILED',
  ANALYSIS_FAILED = 'ANALYSIS_FAILED',
  DATABASE_ERROR = 'DATABASE_ERROR',
}
```

### Error Responses

```typescript
interface ErrorResponse {
  error: {
    code: ProcessingError;
    message: string;
    details?: object;
  };
}
```

## Testing Requirements

### Unit Tests

```yaml
Coverage:
  - Result validation
  - Classification logic
  - Analysis algorithms
  - Error handling
```

### Integration Tests

```yaml
Coverage:
  - Database operations
  - Service communication
  - API endpoints
  - Processing pipeline
```

### Performance Tests

```yaml
Metrics:
  - Processing speed
  - Classification accuracy
  - System throughput
  - Resource usage
```

## Monitoring

### Health Metrics

```yaml
Metrics:
  - Processing queue length
  - Classification rates
  - Error frequencies
  - Response times
```

### Alerts

```yaml
Triggers:
  - Processing failures
  - High error rates
  - Performance degradation
  - Resource constraints
```

## Security

### Data Security

```yaml
Measures:
  - Input sanitization
  - Access control
  - Data encryption
  - Audit logging
```

### API Security

```yaml
Measures:
  - Authentication
  - Rate limiting
  - Request validation
  - Response filtering
```

## Performance Optimization

### Caching Strategy

```yaml
Levels:
  - Processed results
  - Classification history
  - Analysis results
  - Frequent queries
```

### Resource Management

```yaml
Controls:
  - Batch processing
  - Connection pooling
  - Memory management
  - CPU utilization
```

## Reporting Integration

### Metrics Collection

```yaml
Types:
  - Processing statistics
  - Classification metrics
  - Quality indicators
  - Timeline data
```

### Data Export

```yaml
Formats:
  - PRISMA-compliant data
  - CSV exports
  - JSON dumps
  - Audit logs
```

# Default Guideline Concept Integration

# Results Processing Service Updates

### Result Analysis Enhancement

```yaml
Classification Metrics:
  Guidelines Relevance:
    - Track matches with guideline keywords
    - Analyze document type indicators
    - Evaluate guideline-specific metadata
    - Score guideline relevance

Result Ranking Factors:
  - Guideline keyword presence
  - Document type identification
  - Source authority
  - Publication metadata
```

### Enhanced Data Model

```typescript
interface SearchResult {
  // ... existing fields ...
  guidelineMetrics: {
    keywordMatches: {
      term: string;
      count: number;
      context: string[];
    }[];
    documentType: {
      isGuideline: boolean;
      confidence: number;
      indicators: string[];
    };
    relevanceScore: number;
  };
}
```

# Guideline Concept Integration

# Results Processing Service Specification

[Previous content remains the same until Data Models]

## Data Models

### SearchResult

```typescript
interface SearchResult {
  id: string;
  configurationId: string;
  url: string;
  title: string;
  snippet: string;
  source: string;
  metadata: {
    dateFound: Date;
    apiSource: string;
    lastChecked: Date;
    availability: boolean;
    guidelineMatch: {
      // New field for guideline concept matching
      matched: boolean;
      matchedTerms: string[];
      confidence: number;
    };
  };
  // ... rest of interface remains the same
}
```

## Processing Pipeline

### 1. Result Reception

```yaml
Steps: 1. Validate input data
  2. Check for duplicates
  3. Verify guideline concept matches
  4. Create result records
  5. Initialize processing status
```

Example result analysis:

```yaml
Result:
  URL: 'https://www.nice.org.uk/guidance/ng28'
  GuidelineMatch:
    Matched: true
    Terms: ['guideline', 'Guidance']
    Confidence: 0.95
```
