# Search Configuration Service Specification

## Service Purpose

Manages the configuration of search concepts using the PIC (Population, Interest, Context) framework, handles document uploads for reference guidelines, and controls SERP API result limits.

## API Endpoints

### 1. Create Search Configuration

- **Endpoint:** POST /api/search/configure
- **Purpose:** Create new search configuration
- **Request Body:**

```json
{
  "population": {
    "description": string,
    "concept": string[]
  },
  "interest": {
    "description": string,
    "concept": string[]
  },
  "context": {
    "description": string,
    "concept": string[]
  },
  "targetUrls": string[],
  "serpApiConfig": {
    "serpapi": {
      "enabled": boolean,
      "maxResultsPerQuery": number  // e.g., 50
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
```

- **Response:** SearchConfiguration object

### 2. Get Search Configuration

- **Endpoint:** GET /api/search/{id}
- **Purpose:** Retrieve existing configuration
- **Parameters:** id (string)
- **Response:** SearchConfiguration object

### 3. Update SERP API Configuration

- **Endpoint:** PUT /api/search/{id}/serp-config
- **Purpose:** Update SERP API result limits
- **Request Body:**

```json
{
  "serpApiConfig": {
    "serpapi": {
      "enabled": boolean,
      "maxResultsPerQuery": number
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
```

- **Response:**

```json
{
  "updated": boolean,
  "serpApiConfig": object,
  "estimatedTotalResults": number
}
```

### 4. Upload Reference Document

[Previous endpoint remains unchanged]

## Data Models

### SearchConfiguration

```typescript
interface SearchConfiguration {
  id: string;
  userId: string;
  population: PICComponent;
  interest: PICComponent;
  context: PICComponent;
  targetUrls: string[];
  serpApiConfig: {
    serpapi: SerpApiConfig;
    serper: SerpApiConfig;
    googleSearch: SerpApiConfig;
    duckduckgo: SerpApiConfig;
  };
  status: 'draft' | 'active' | 'complete';
  createdAt: Date;
  updatedAt: Date;
}

interface PICComponent {
  description: string;
  concept: string[];
  suggestedTerms?: string[];
}

interface SerpApiConfig {
  enabled: boolean;
  maxResultsPerQuery: number;
  defaultResultsPerQuery?: number;
}
```

## External Dependencies

### Required Services

- Authentication Service
- Document Processing Service
- MongoDB

### Libraries and Frameworks

- LangChain (framework for document processing integration)

### Configuration Requirements

```typescript
interface ServiceConfig {
  server: {
    port: number;
    host: string;
    uploadPath: string;
  };
  database: {
    mongoUrl: string;
    options: {
      maxPoolSize: number;
      retryWrites: boolean;
    };
  };
  upload: {
    maxFileSize: number;
    allowedTypes: string[];
    tempDirectory: string;
  };
  serpApi: {
    defaults: {
      maxResultsPerQuery: number; // Default: 50
      maxTotalResults: number; // Default: 1000
    };
    limits: {
      serpapi: {
        maxAllowed: number; // Maximum allowed results per query
        costPerResult: number; // For quota calculation
      };
      serper: {
        maxAllowed: number;
        costPerResult: number;
      };
      googleSearch: {
        maxAllowed: number;
        costPerResult: number;
      };
      duckduckgo: {
        maxAllowed: number;
        costPerResult: number;
      };
    };
  };
}
```

## Validation Rules

### SERP API Configuration

```yaml
Rules:
  - maxResultsPerQuery must not exceed API-specific limits
  - At least one SERP API must be enabled
  - Values must be positive integers
  - Default limits of 50 will be applied if not specified
```

## Test Scenarios

### Unit Tests

1. PIC validation
2. Configuration creation
3. Document upload handling
4. SERP API config validation
5. Result limit validation

### Integration Tests

1. Database operations
2. Service communication
3. File processing
4. SERP API limit enforcement

### E2E Tests

1. Complete configuration flow
2. Document upload workflow
3. Error handling scenarios
4. SERP API configuration updates
