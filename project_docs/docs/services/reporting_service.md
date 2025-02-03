# Reporting Service Specification

## Service Purpose

The Reporting Service is responsible for generating PRISMA 2020-compliant reports, compiling search metrics including API-specific result limits and usage, and providing exportable documentation of the systematic review process.

## Core Functionalities

### 1. PRISMA Report Generation

- Generate PRISMA 2020-compliant flowcharts
- Compile search process documentation
- Track API-specific result limits and usage
- Create detailed metrics reports

### 2. Search Process Documentation

- Track search execution metrics
- Document API source results and limits
- Record deduplication statistics
- Track document retrieval attempts

### 3. Results Analysis

- Compile classification statistics
- Generate document type breakdowns
- Calculate success rates
- Create summary statistics

### 4. Export Management

- PDF report generation
- HTML report creation
- Data export formatting
- Report versioning

## API Endpoints

### 1. Generate Report

```yaml
Endpoint: POST /api/reports/generate
Purpose: Generate PRISMA-compliant report
Authentication: Required
Request:
  Body:
    {
      'searchId': string,
      'format': ['pdf', 'html'],
      'options':
        {
          'includePrismaFlowchart': boolean,
          'includeDetailedMetrics': boolean,
          'includeClassificationJustifications': boolean,
        },
    }
Response:
  200 OK:
    {
      'reportId': string,
      'status': 'generating',
      'estimatedCompletion': string,
      'formats':
        {
          'pdf': { 'status': 'pending', 'url': null },
          'html': { 'status': 'pending', 'url': null },
        },
    }
```

### 2. Get Search Metrics

```yaml
Endpoint: GET /api/reports/search/{searchId}/metrics
Purpose: Retrieve detailed search metrics
Authentication: Required
Response:
  200 OK:
    {
      'searchId': string,
      'metrics':
        {
          'apiResults':
            {
              'total': number,
              'perApi': { 'serpapi': { 'maxResultsPerQuery': number, ? // User-specified limit
                        "totalQueries"
                      : number, 'totalResults': number, 'queriesAtLimit': number, ? // Queries that hit the limit
                        "averageResultsPerQuery"
                      : number }, 'serper': { 'maxResultsPerQuery': number, 'totalQueries': number, 'totalResults': number, 'queriesAtLimit': number, 'averageResultsPerQuery': number }, 'googleSearch': { 'maxResultsPerQuery': number, 'totalQueries': number, 'totalResults': number, 'queriesAtLimit': number, 'averageResultsPerQuery': number }, 'duckduckgo': { 'maxResultsPerQuery': number, 'totalQueries': number, 'totalResults': number, 'queriesAtLimit': number, 'averageResultsPerQuery': number } },
            },
          'deduplication':
            { 'initialCount': number, 'duplicatesRemoved': number, 'uniqueResults': number },
          'retrieval':
            {
              'attemptedRetrieval': number,
              'successfulRetrieval': number,
              'failedRetrieval': number,
            },
          'classification':
            { 'included': number, 'excluded': number, 'maybe': number, 'total': number },
        },
      'timeline': { 'searchStarted': string, 'searchCompleted': string, 'totalDuration': number },
    }
```

## Data Models

### Report

```typescript
interface Report {
  id: string;
  searchId: string;
  status: 'generating' | 'completed' | 'failed';
  metadata: {
    generatedBy: string;
    generatedAt: Date;
    version: string;
  };
  prismaData: {
    flowchart: PrismaFlowchart;
    metrics: SearchMetrics;
    documentation: SearchDocumentation;
  };
  formats: {
    pdf?: ReportFormat;
    html?: ReportFormat;
  };
}

interface SearchMetrics {
  apiResults: {
    total: number;
    perApi: Record<string, APIMetrics>;
  };
  deduplication: {
    initialCount: number;
    duplicatesRemoved: number;
    uniqueResults: number;
  };
  retrieval: {
    attemptedRetrieval: number;
    successfulRetrieval: number;
    failedRetrieval: number;
  };
  classification: {
    included: number;
    excluded: number;
    maybe: number;
    total: number;
  };
}

interface APIMetrics {
  maxResultsPerQuery: number; // User-specified limit
  totalQueries: number;
  totalResults: number;
  queriesAtLimit: number; // Queries that hit the limit
  averageResultsPerQuery: number;
}

interface PrismaFlowchart {
  identification: {
    totalResults: number;
    resultsPerApi: Record<string, APIMetrics>;
    duplicatesRemoved: number;
  };
  screening: {
    recordsScreened: number;
    recordsExcluded: number;
  };
  included: {
    totalIncluded: number;
  };
}
```

## Processing Pipeline

### 1. Data Collection

```yaml
Steps:
  1. Gather search metrics
  2. Collect API-specific metrics including:
     - User-specified result limits
     - Actual results obtained
     - Queries hitting limits
  3. Compile classification data
  4. Validate data completeness
```

### 2. Report Generation

```yaml
Steps:
  1. Generate PRISMA flowchart
  2. Compile metrics tables including:
     - API result limits and usage
     - Deduplication statistics
     - Classification breakdown
  3. Format documentation
  4. Create visualizations
```

## Error Handling

### Error Types

```typescript
enum ReportingError {
  DATA_INCOMPLETE = 'DATA_INCOMPLETE',
  GENERATION_FAILED = 'GENERATION_FAILED',
  STORAGE_ERROR = 'STORAGE_ERROR',
  TEMPLATE_ERROR = 'TEMPLATE_ERROR',
}
```

## Monitoring

### Health Metrics

```yaml
Metrics:
  - Report generation time
  - API result limit usage
  - Success/failure rates
  - Resource usage
```

### Performance Tracking

```yaml
Indicators:
  - Generation latency
  - Data completeness
  - Resource utilization
  - Error rates
```

## Security

### Access Control

```yaml
Measures:
  - Authentication
  - Authorization
  - Report access control
  - Audit logging
```

### Data Protection

```yaml
Measures:
  - Secure storage
  - Encryption
  - Access logging
  - Data retention
```

## Performance Optimization

### Caching Strategy

```yaml
Levels:
  - API metrics
  - Generated reports
  - Templates
  - Static assets
```

### Resource Management

```yaml
Controls:
  - Memory usage
  - Storage cleanup
  - Concurrent generation
  - Queue management
```
