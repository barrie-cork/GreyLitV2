# Search Strategy Service Specification

## Service Purpose

The Search Strategy Service is responsible for generating and optimizing search strategies using LLM integration. It processes PIC framework inputs, manages keyword suggestions, handles search string generation and management, and enables user refinement of both keywords and search strings.

## Core Functionalities

### 1. Strategy Generation

- Process PIC framework inputs
- Generate search terms using LLM
- Optimize Boolean queries
- Include default guideline concept keywords
- Handle context-aware refinement

### 2. Knowledge Graph Integration

- Query Neo4j for relevant keywords
- Retrieve keyword relationships
- Access document-derived insights
- Identify high-specificity terms

### 3. LLM Integration

- Connect with OpenRouter API
- Generate keyword suggestions
- Process user refinements
- Provide keyword explanations

### 4. Keyword Management

- Process LLM keyword suggestions
- Handle user keyword modifications
- Track keyword changes
- Maintain keyword history
- Update affected search strings

### 5. Search String Management

- Generate search string variations
- Track search string status
- Handle string deletions/restorations
- Monitor coverage metrics

## API Endpoints

### 1. Generate Strategy

```yaml
Endpoint: POST /api/strategy/generate
Purpose: Generate initial search strategy
Authentication: Required
Request:
  Body:
    {
      "configurationId": string,
      "picFramework": {
        "population": string,
        "interest": string,
        "context": string
      },
      "processedDocumentIds": string[],
      "parameters": {
        "maxTerms": number,
        "minConfidence": number,
        "includeSynonyms": boolean
      }
    }
Response:
  200 OK:
    {
      "strategyId": string,
      "status": "processing",
      "estimatedCompletion": string,
      "initialQueries": {
        "population": string[],
        "interest": string[],
        "context": string[],
        "defaultConcept": "(guideline* OR Recommendation* OR Guidance OR "Consensus Statement")"
      }
    }
```

### 2. Refine Strategy

```yaml
Endpoint: POST /api/strategy/{strategyId}/refine
Purpose: Refine existing strategy
Authentication: Required
Request:
  Body:
    {
      "feedback": {
        "component": "population" | "interest" | "context",
        "additions": string[],
        "removals": string[],
        "modifications": {
          "original": string,
          "modified": string
        }[]
      },
      "parameters": {
        "maxTerms": number,
        "minConfidence": number
      }
    }
Response:
  200 OK:
    {
      "strategyId": string,
      "refinements": {
        "added": string[],
        "removed": string[],
        "modified": {
          "original": string,
          "modified": string,
          "reason": string
        }[]
      },
      "updatedQueries": {
        "population": string[],
        "interest": string[],
        "context": string[]
      }
    }
```

### 3. Chat with LLM

```yaml
Endpoint: POST /api/strategy/{strategyId}/chat
Purpose: Interact with LLM for keyword refinement
Authentication: Required
Request:
  Body:
    {
      "message": string,
      "context": {
        "component": "population" | "interest" | "context",
        "currentTerms": string[],
        "previousChat": [{
          "role": "user" | "assistant",
          "content": string
        }]
      }
    }
Response:
  200 OK:
    {
      "response": string,
      "suggestions": {
        "keywords": string[],
        "explanations": [{
          "keyword": string,
          "reason": string,
          "confidence": number
        }]
      }
    }
```

### 4. Query Knowledge Graph

```yaml
Endpoint: POST /api/strategy/{strategyId}/graph-query
Purpose: Find related terms in knowledge graph
Authentication: Required
Request:
  Body:
    {
      "component": "population" | "interest" | "context",
      "terms": string[],
      "parameters": {
        "maxResults": number,
        "minRelevance": number
      }
    }
Response:
  200 OK:
    {
      "results": [{
        "term": string,
        "relevance": number,
        "relationships": [{
          "type": string,
          "connectedTerm": string,
          "strength": number
        }]
      }]
    }
```

### 5. Manage Concept Keywords

```yaml
Endpoint: PUT /api/strategy/{strategyId}/concepts/{conceptType}/keywords
Purpose: Modify suggested keywords for a concept
Authentication: Required
Request:
  Body:
    {
      "actions": [{
        "type": "remove" | "add" | "modify",
        "keyword": string,
        "newKeyword?: string,
        "reason?: string
      }]
    }
Response:
  200 OK:
    {
      "conceptType": "population" | "interest" | "context",
      "updatedKeywords": string[],
      "removed": string[],
      "added": string[],
      "modified": [{
        "original": string,
        "new": string
      }],
      "searchStringsAffected": number,
      "validation": {
        "minKeywordsRequired": number,
        "currentKeywords": number,
        "status": "valid" | "warning" | "invalid"
      }
    }
```

### 6. List Search Strings

```yaml
Endpoint: GET /api/strategy/{strategyId}/search-strings
Purpose: List all generated search strings
Authentication: Required
Parameters:
  - status?: "active" | "deleted" | "all"
  - page?: number
  - limit?: number
Response:
  200 OK:
    {
      "searchStrings": [{
        "id": string,
        "string": string,
        "components": {
          "population": string[],
          "interest": string[],
          "context": string[],
          "guidelines": string
        },
        "targetUrl": string,
        "status": "active" | "deleted",
        "metadata": {
          "createdAt": string,
          "modifiedAt?: string,
          "keywordCoverage": number,
          "deleteReason?: string
        }
      }],
      "summary": {
        "total": number,
        "active": number,
        "deleted": number
      },
      "validation": {
        "minRequired": number,
        "status": "valid" | "warning" | "invalid"
      }
    }
```

### 7. Manage Search Strings

```yaml
Endpoint: PUT /api/strategy/{strategyId}/search-strings
Purpose: Update search string statuses
Authentication: Required
Request:
  Body:
    {
      "actions": [{
        "stringId": string,
        "action": "delete" | "restore",
        "reason?: string
      }]
    }
Response:
  200 OK:
    {
      "updated": number,
      "remaining": number,
      "searchStrings": {
        "active": number,
        "deleted": number
      },
      "validation": {
        "minRequired": number,
        "status": "valid" | "warning" | "invalid"
      }
    }
```

## Data Models

### SearchStrategy

```typescript
interface SearchStrategy {
  id: string;
  configurationId: string;
  version: number;
  status: 'draft' | 'active' | 'refined' | 'archived';
  components: {
    population: StrategyComponent;
    interest: StrategyComponent;
    context: StrategyComponent;
    defaultConcept: {
      value: "(guideline* OR Recommendation* OR Guidance OR "Consensus Statement")",
      enabled: boolean
    }
  };
  searchStrings: SearchString[];
  keywordHistory: {
    population: KeywordChange[];
    interest: KeywordChange[];
    context: KeywordChange[];
  };
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    refinements: number;
  };
  validation: {
    keywordCounts: {
      population: number;
      interest: number;
      context: number;
    };
    searchStringCount: number;
    status: 'valid' | 'warning' | 'invalid';
    messages: string[];
  };
}

interface StrategyComponent {
  terms: {
    value: string;
    confidence: number;
    source: 'user' | 'llm' | 'knowledge_graph';
    alternatives?: string[];
    status: 'active' | 'deleted';
    metadata?: {
      deleteReason?: string;
      modifiedAt?: Date;
      modifiedBy?: string;
    };
  }[];
  queries: {
    value: string;
    type: 'boolean' | 'phrase' | 'proximity';
    performance?: {
      precision: number;
      recall: number;
    };
  }[];
  metadata: {
    lastRefined: Date;
    refinementCount: number;
    activeTerms: number;
    deletedTerms: number;
  };
}

interface SearchString {
  id: string;
  string: string;
  components: {
    population: string[];
    interest: string[];
    context: string[];
    guidelines: string;
  };
  targetUrl: string;
  status: 'active' | 'deleted';
  metadata: {
    createdAt: Date;
    modifiedAt?: Date;
    modifiedBy?: string;
    keywordCoverage: number;
    deleteReason?: string;
  };
}

interface KeywordChange {
  timestamp: Date;
  action: 'add' | 'remove' | 'modify';
  keyword: string;
  newKeyword?: string;
  reason?: string;
  userId: string;
  affectedSearchStrings: number;
}
```

## Processing Pipeline

### 1. Strategy Generation

```yaml
Steps:
  1. Process PIC inputs:
    - Validate components
    - Extract key concepts
    - Prepare for LLM

  2. Generate initial terms:
    - Query LLM for suggestions
    - Check knowledge graph
    - Combine sources

  3. Construct queries:
    - Apply Boolean logic
    - Add guideline concept
    - Optimize structure

  4. Validate strategy:
    - Check coverage
    - Verify syntax
    - Estimate effectiveness
```

### 2. Keyword Management

```yaml
Steps:
  1. Process keyword changes:
    - Validate modifications
    - Update concept keywords
    - Track changes history
    - Identify affected search strings

  2. Update search strings:
    - Mark affected strings
    - Generate coverage metrics
    - Update status counts

  3. Validate changes:
    - Check minimum keyword requirements
    - Verify concept coverage
    - Update strategy metrics
```

### 3. Search String Management

```yaml
Steps:
  1. Process string actions:
    - Validate requests
    - Update string status
    - Track modifications

  2. Update metrics:
    - Recalculate coverage
    - Update active counts
    - Check thresholds

  3. Validate state:
    - Verify minimum requirements
    - Check concept coverage
    - Update strategy status
```

## Error Handling

### Error Types

```typescript
enum StrategyError {
  INVALID_INPUT = 'INVALID_INPUT',
  LLM_ERROR = 'LLM_ERROR',
  GRAPH_QUERY_ERROR = 'GRAPH_QUERY_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  KEYWORD_ERROR = 'KEYWORD_ERROR',
  SEARCH_STRING_ERROR = 'SEARCH_STRING_ERROR',
  MIN_REQUIREMENT_ERROR = 'MIN_REQUIREMENT_ERROR',
}

interface ErrorResponse {
  error: {
    code: StrategyError;
    message: string;
    details?: {
      validationErrors?: string[];
      currentValues?: object;
      requiredValues?: object;
    };
  };
}
```

## External Dependencies

### Required Services

```yaml
Services:
  - OpenRouter API (LLM)
  - Neo4j (Knowledge Graph)
  - Document Processing Service

Libraries:
  - LangChain
  - Neo4j Driver
  - Vector Operations
```

## Configuration

```typescript
interface ServiceConfig {
  server: {
    port: number;
    host: string;
    timeout: number;
  };
  llm: {
    provider: string;
    model: string;
    temperature: number;
    maxTokens: number;
  };
  knowledgeGraph: {
    uri: string;
    credentials: {
      username: string;
      password: string;
    };
  };
  strategy: {
    maxTermsPerComponent: number;
    minConfidence: number;
    maxQueryLength: number;
  };
  keywords: {
    minPerConcept: number;
    maxPerConcept: number;
    warningThreshold: number;
  };
  searchStrings: {
    minRequired: number;
    maxGenerated: number;
    retainDeleted: boolean;
    warningThreshold: number;
  };
}
```

## Testing Requirements

### Unit Tests

```yaml
Coverage:
  - Term generation
  - Query construction
  - Strategy validation
  - Keyword management
  - Search string management
  - Error handling
```

### Integration Tests

```yaml
Coverage:
  - LLM integration
  - Graph queries
  - Service communication
  - End-to-end flows
  - Validation rules
```

## Monitoring

### Health Metrics

```yaml
Strategy Metrics:
  - Generation time
  - LLM response times
  - Graph query performance
  - Error rates

Keyword Metrics:
  - Keywords per concept
  - Keyword modification frequency
  - Search string coverage
  - Deletion patterns

Search String Metrics:
  - Active vs deleted ratio
  - Keyword distribution
  - URL coverage
  - Modification history
```

### Performance Tracking

```yaml
Indicators:
  - Query quality
  - Term relevance
  - Response times
  - Resource usage
  - Validation status
```

## Security

### API Security

```yaml
Measures:
  - Authentication
  - Input validation
  - Rate limiting
  - Access control
```

### Data Protection

```yaml
Measures:
  - Secure storage
  - Encryption
  - Audit logging
  - Access tracking
```

## Performance Optimization

### Caching Strategy

```yaml
Levels:
  - LLM responses
  - Graph queries
  - Generated strategies
  - Term relationships
  - Validation results
```

### Resource Management

```yaml
Controls:
  - Connection pooling
  - Request batching
  - Memory usage
  - Concurrent processing
```

## Usage Examples

### Keyword Management

```json
// Remove a keyword
PUT /api/strategy/{strategyId}/concepts/population/keywords
{
  "actions": [{
    "type": "remove",
    "keyword": "adult*",
    "reason": "Too broad, using more specific terms"
  }]
}

// Add new keywords
PUT /api/strategy/{strategyId}/concepts/interest/keywords
{
  "actions": [{
    "type": "add",
    "keyword": "type 2 diabetes mellitus"
  }]
}
```

### Search String Management

```json
// Delete specific search strings
PUT /api/strategy/{strategyId}/search-strings
{
  "actions": [{
    "stringId": "string123",
    "action": "delete",
    "reason": "Too broad coverage"
  }]
}

// List active search strings
GET /api/strategy/{strategyId}/search-strings?status=active
```
