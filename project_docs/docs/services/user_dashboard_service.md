# User Dashboard Service Specification

## Service Purpose

The User Dashboard Service provides the central interface for managing search activities, displaying search history, and accessing search results. It serves as the primary control panel for Public Health Researchers to manage and monitor their systematic review processes.

## Core Functionalities

### 1. Search Management

- Initiate new searches
- Display search history
- Track search status
- Manage saved searches

### 2. Search History

- List previous searches
- Display search details
- Track search progress
- Provide search analytics

### 3. Results Management

- Display search results
- Track classification progress
- Manage result exports
- Handle result updates

### 4. User Preferences

- Save search preferences
- Manage display settings
- Configure notifications
- Set default views

## API Endpoints

### 1. Get Dashboard Overview

```yaml
Endpoint: GET /api/dashboard/overview
Purpose: Retrieve dashboard summary
Authentication: Required
Response:
  200 OK:
    {
      'activeSearches': { 'total': number, 'inProgress': number, 'needsAttention': number },
      'recentSearches':
        [
          {
            'id': string,
            'title': string,
            'status': string,
            'lastUpdated': string,
            'progress': { 'completed': number, 'total': number },
          },
        ],
      'notifications':
        [{ 'type': string, 'message': string, 'searchId': string, 'timestamp': string }],
    }
```

### 2. Get Search History

```yaml
Endpoint: GET /api/dashboard/searches
Purpose: Retrieve search history
Authentication: Required
Parameters:
  - page: number
  - limit: number
  - status?: 'Completed' | 'In Progress' | 'Draft'
Response:
  200 OK:
    {
      "searches": [{
        "id": string,
        "title": string,
        "dateExecuted": string,
        "status": string,
        "summary": {
          "totalResults": number,
          "classified": number,
          "included": number,
          "excluded": number,
          "maybe": number
        },
        "lastUpdated": string
      }],
      "pagination": {
        "currentPage": number,
        "totalPages": number,
        "totalItems": number
      }
    }
```

### 3. Get Search Details

```yaml
Endpoint: GET /api/dashboard/searches/{searchId}
Purpose: Get detailed search information
Authentication: Required
Response:
  200 OK:
    {
      "id": string,
      "title": string,
      "status": "Completed" | "In Progress" | "Draft",
      "configuration": {
        "population": string,
        "interest": string,
        "context": string
      },
      "progress": {
        "stage": string,
        "percentComplete": number,
        "timeRemaining?: number
      },
      "results": {
        "total": number,
        "processed": number,
        "classified": {
          "included": number,
          "excluded": number,
          "maybe": number
        }
      },
      "timeline": {
        "created": string,
        "started": string,
        "lastUpdated": string,
        "completed?: string
      }
    }
```

### 4. Update Search Status

```yaml
Endpoint: PUT /api/dashboard/searches/{searchId}/status
Purpose: Update search status
Authentication: Required
Request:
  Body:
    {
      "status": "Draft" | "In Progress" | "Completed",
      "note?: string
    }
Response:
  200 OK:
    {
      "searchId": string,
      "status": string,
      "updatedAt": string,
      "note?: string
    }
```

## Data Models

### DashboardSearch

```typescript
interface DashboardSearch {
  id: string;
  userId: string;
  title: string;
  status: 'Draft' | 'In Progress' | 'Completed';
  configuration: {
    population: string;
    interest: string;
    context: string;
    dateCreated: Date;
    lastModified: Date;
  };
  progress: {
    stage: string;
    percentComplete: number;
    timeRemaining?: number;
    lastUpdated: Date;
  };
  results: {
    total: number;
    processed: number;
    classified: {
      included: number;
      excluded: number;
      maybe: number;
    };
  };
  timeline: {
    created: Date;
    started?: Date;
    lastUpdated: Date;
    completed?: Date;
  };
  metadata: {
    createdBy: string;
    modifiedBy: string;
    version: number;
  };
}

interface UserPreferences {
  id: string;
  userId: string;
  displayPreferences: {
    defaultView: string;
    resultsPerPage: number;
    sortOrder: string;
  };
  notifications: {
    email: boolean;
    desktop: boolean;
    frequency: string;
  };
  searchDefaults: {
    apis: string[];
    maxResults: number;
    autoClassify: boolean;
  };
}
```

## External Dependencies

### Required Services

```yaml
Services:
  - Authentication Service
  - Search Configuration Service
  - Results Processing Service
  - Reporting Service

Databases:
  - MongoDB: Search history and user preferences
  - Redis: Session management and caching
```

### Configuration Requirements

```typescript
interface ServiceConfig {
  server: {
    port: number;
    host: string;
    timeout: number;
  };
  pagination: {
    defaultLimit: number;
    maxLimit: number;
  };
  caching: {
    enabled: boolean;
    ttl: number;
  };
  monitoring: {
    enabled: boolean;
    metrics: string[];
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
  };
}
```

## Processing Pipeline

### 1. Dashboard Data Collection

```yaml
Steps: 1. Gather user searches
  2. Collect status updates
  3. Aggregate metrics
  4. Process notifications
```

### 2. Search Status Updates

```yaml
Steps: 1. Validate status change
  2. Update search record
  3. Trigger notifications
  4. Update dashboard
```

### 3. Results Integration

```yaml
Steps: 1. Process result updates
  2. Update search metrics
  3. Refresh dashboard data
  4. Update progress indicators
```

## Error Handling

### Error Types

```typescript
enum DashboardError {
  INVALID_SEARCH = 'INVALID_SEARCH',
  UPDATE_FAILED = 'UPDATE_FAILED',
  FETCH_ERROR = 'FETCH_ERROR',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
}
```

### Error Responses

```typescript
interface ErrorResponse {
  error: {
    code: DashboardError;
    message: string;
    details?: object;
  };
}
```

## Testing Requirements

### Unit Tests

```yaml
Coverage:
  - Data aggregation
  - Status updates
  - Progress tracking
  - Error handling
```

### Integration Tests

```yaml
Coverage:
  - Service communication
  - Data persistence
  - Cache management
  - User preferences
```

## Monitoring

### Health Metrics

```yaml
Metrics:
  - Active users
  - Search counts
  - Response times
  - Error rates
```

### Performance Tracking

```yaml
Indicators:
  - Dashboard load time
  - Update latency
  - Cache hit rates
  - Resource usage
```

## Security

### Access Control

```yaml
Measures:
  - User authentication
  - Role-based access
  - Session management
  - Activity logging
```

### Data Protection

```yaml
Measures:
  - Input validation
  - Data encryption
  - Secure transmission
  - Audit trails
```

## Performance Optimization

### Caching Strategy

```yaml
Levels:
  - Dashboard data
  - Search history
  - User preferences
  - Common queries
```

### Resource Management

```yaml
Controls:
  - Connection pooling
  - Query optimization
  - Memory management
  - Background tasks
```

## User Interface Integration

### Dashboard Components

```yaml
Components:
  - Search overview
  - Status indicators
  - Progress tracking
  - Action buttons
```

### Data Visualization

```yaml
Elements:
  - Progress charts
  - Status indicators
  - Result distributions
  - Timeline views
```

## Notification System

### Notification Types

```yaml
Types:
  - Search completion
  - Status updates
  - System alerts
  - Result updates
```

### Delivery Methods

```yaml
Methods:
  - In-dashboard alerts
  - Email notifications
  - Browser notifications
  - Status updates
```
