# Grey Literature Search Engine - Architecture Design Document

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Core Layers](#core-layers)
3. [Cross-cutting Concerns](#cross-cutting-concerns)
4. [Integration Patterns](#integration-patterns)
5. [Component Interactions](#component-interactions)
6. [Interface Contracts](#interface-contracts)

## Architecture Overview

The Grey Literature Search Engine is built on an event-driven microservices architecture, designed to support systematic literature searches following PRISMA 2020 guidelines. The system employs a distributed architecture pattern to handle complex search operations, document processing, and real-time updates.

![Architecture Overview](./architecture/diagrams/architecture-overview.png)

<details>
<summary>Diagram Source</summary>

[View Mermaid source in ./architecture/diagrams/architecture-overview.mmd]
</details>

## Core Layers

### Domain Layer

#### Core Entities
- **User & UserProfile**: User authentication and preferences
- **Search & SearchConfiguration**: Search parameters and configurations
- **Document & ProcessedDocument**: Document metadata and content
- **SearchResult & ResultClassification**: Search results and classifications
- **Report & PrismaReport**: Generated reports and metrics
- **CrawlJob & CrawlResult**: Web crawling operations and results

#### Business Rules
- PRISMA 2020 compliance requirements
- Rate limiting for external API access
- Search validation and verification
- Document processing pipeline rules
- Guideline extraction specifications
- Knowledge graph relationship rules

#### Service Interfaces
```typescript
interface IAuthService {
    login(credentials: Credentials): Promise<Session>
    createAccount(userData: UserData): Promise<User>
    resetPassword(email: string): Promise<void>
    validateSession(token: string): Promise<boolean>
}

interface IDashboardService {
    getSearchHistory(userId: string): Promise<Search[]>
    getSearchSummary(searchId: string): Promise<SearchSummary>
    startNewSearch(userId: string): Promise<Search>
    reopenSearch(searchId: string): Promise<Search>
    getSearchStatus(searchId: string): Promise<SearchStatus>
}

interface ISearchConfigService {
    definePICFramework(config: PICConfig): Promise<SearchConfig>
    selectSERPAPIs(apis: SERP[]): Promise<void>
    addTargetedURLs(urls: string[]): Promise<void>
    uploadGuidelines(files: File[]): Promise<ProcessingJob>
    validateConfiguration(config: SearchConfig): Promise<ValidationResult>
}

interface IDocumentProcessor {
    processUploadedDocument(file: File): Promise<ProcessedDocument>
    processWebDocument(url: string): Promise<ProcessedDocument>
    extractEntities(doc: ProcessedDocument): Promise<Entity[]>
    generateEmbeddings(text: string): Promise<Vector>
    updateKnowledgeGraph(entities: Entity[]): Promise<void>
}

interface ISearchStrategy {
    generateKeywords(framework: PICFramework): Promise<Keywords>
    refineSuggestions(feedback: Feedback): Promise<Keywords>
    constructBooleanStrings(keywords: Keywords): Promise<SearchString[]>
    queryKnowledgeGraph(query: Query): Promise<GraphResults>
    expandQueries(baseQueries: Query[]): Promise<Query[]>
}

interface ISearchExecutor {
    executeSERPSearch(queries: Query[]): Promise<SearchResults>
    managePagination(results: SearchResults): Promise<void>
    handleRateLimits(): Promise<void>
    aggregateResults(results: Result[]): Promise<AggregatedResults>
    deduplicateResults(results: Result[]): Promise<Result[]>
}

interface IResultProcessor {
    rankResults(results: Result[]): Promise<RankedResults>
    classifyResult(resultId: string, classification: Classification): Promise<void>
    processMetadata(result: Result): Promise<ProcessedResult>
    updateSearchStatus(searchId: string, status: SearchStatus): Promise<void>
}

interface IReportGenerator {
    generatePRISMAReport(searchId: string): Promise<Report>
    generateFlowchart(data: ReportData): Promise<Flowchart>
    exportPDF(report: Report): Promise<Buffer>
    exportHTML(report: Report): Promise<string>
    generateSearchMetrics(searchId: string): Promise<Metrics>
}

interface IWebCrawler {
    crawlURL(url: string): Promise<CrawlResult>
    handleAntiBot(): Promise<void>
    respectRobotsTxt(url: string): Promise<boolean>
    extractContent(html: string): Promise<ExtractedContent>
    validateContent(content: ExtractedContent): Promise<ValidationResult>
}
```

### Application Layer

#### Use Cases
1. **Authentication & User Management**
   - Login/register flows
   - Password reset
   - Session management

2. **Dashboard Operations**
   - View search history
   - Start new search
   - Resume existing search

3. **Search Configuration**
   - PIC framework input
   - API selection
   - URL targeting
   - Guideline upload

4. **Document Processing**
   - Parse guidelines
   - Extract entities
   - Generate embeddings
   - Update knowledge graph

5. **Strategy Generation**
   - Keyword generation
   - Query construction
   - Knowledge graph querying

6. **Search Execution**
   - SERP API querying
   - Rate limit management
   - Result aggregation

7. **Results Processing**
   - Result ranking
   - Classification handling
   - Metadata processing

8. **Report Generation**
   - PRISMA report creation
   - Metrics compilation
   - Export handling

9. **Web Crawling**
   - URL processing
   - Content extraction
   - Anti-bot handling

### Infrastructure Layer

#### External Services Integration
- **SERP APIs**
  - SERP API
  - SERPER API
  - DuckDuckGo API
- **OpenRouter API** (LLM access)
- **ScrapingAnt** (web crawling)

#### Persistence Layer
1. **MongoDB**
   - User profiles
   - Search configurations
   - Results
   - Reports

2. **Neo4j**
   - Knowledge graph
   - Entity relationships
   - Query patterns

3. **Pinecone**
   - Document vectors
   - Semantic search indices

4. **Redis**
   - Rate limiting
   - Session management
   - Cache

#### Communication
- REST APIs (inter-service)
- RabbitMQ (event bus)
- WebSocket (real-time updates)

### API Layer
- **Kong API Gateway**
  - Authentication middleware
  - Rate limiting
  - Request routing
- Service-specific REST endpoints
- WebSocket endpoints for dashboard updates

## Cross-cutting Concerns

### Error Handling
- Centralized error handling
- Custom domain exceptions
- Error tracking and monitoring

### Logging
- ELK Stack implementation
- Distributed tracing
- Audit logging

### Security
- JWT-based authentication
- Role-based access control
- API key management

### State Synchronization
- Event-driven architecture
- Message queue
- Eventual consistency

### Configuration
- Environment-based
- Docker secrets
- Service discovery

## Integration Patterns

### External Service Integration
- Circuit breaker pattern
- Retry with exponential backoff
- Fallback mechanisms

### Inter-service Communication
- Event-driven microservices
- Command Query Responsibility Segregation (CQRS)
- Saga pattern for distributed transactions

### Event Handling
- Publisher/Subscriber with RabbitMQ
- Event sourcing
- Dead letter queues

### State Persistence
- Event sourcing
- Snapshot pattern
- Materialized views

## Component Interactions

### Service Communication Flows
1. **Search Initiation Flow**
   ```mermaid
   sequenceDiagram
       participant U as User
       participant D as Dashboard
       participant C as Config
       participant S as Strategy
       
       U->>D: Start New Search
       D->>C: Initialize Config
       C->>S: Generate Strategy
       S-->>C: Strategy Created
       C-->>D: Ready for Input
       D-->>U: Display Config Form
   ```

2. **Document Processing Flow**
   ```mermaid
   sequenceDiagram
       participant C as Config
       participant D as DocProcessor
       participant V as VectorDB
       participant K as KnowledgeGraph
       
       C->>D: Upload Document
       D->>D: Process Content
       par Vector Storage
           D->>V: Store Vectors
       and Graph Update
           D->>K: Update Graph
       end
       D-->>C: Processing Complete
   ```

### State Transitions
1. **Search State Transitions**
   ```mermaid
   stateDiagram-v2
       [*] --> Configured
       Configured --> Processing
       Processing --> Executing
       Executing --> ResultsReady
       ResultsReady --> [*]
   ```

2. **Document Processing States**
   ```mermaid
   stateDiagram-v2
       [*] --> Uploaded
       Uploaded --> Processing
       Processing --> Vectorized
       Vectorized --> GraphUpdated
       GraphUpdated --> [*]
   ```

## Interface Contracts

### API Specifications
All service APIs follow OpenAPI 3.0 specification with standardized:
- Request/response formats
- Error handling
- Authentication
- Rate limiting

### Event Schemas
Events follow a standardized schema:
```typescript
interface Event {
    id: string;
    type: EventType;
    timestamp: Date;
    producer: ServiceName;
    payload: unknown;
    metadata: {
        correlationId: string;
        userId?: string;
        searchId?: string;
    };
}
```

### Database Schemas
1. **MongoDB Collections**
   - Users
   - SearchConfigurations
   - SearchResults
   - Reports

2. **Neo4j Graph Schema**
   - Nodes: Guidelines, Topics, Keywords
   - Relationships: RELATED_TO, MENTIONED_IN

3. **Vector Database Schema**
   - Document embeddings
   - Semantic search indices

### External API Contracts
- SERP API integration specifications
- OpenRouter API integration
- ScrapingAnt integration

---

## Implementation Notes

### Service Dependencies
- Node.js 18.17.1
- LangChain 0.0.347
- MongoDB 7.0.8
- Neo4j 5.14.0
- Pinecone 2.2.2

### Development Guidelines
1. Follow TypeScript strict mode
2. Implement comprehensive error handling
3. Include detailed logging
4. Write unit tests for all services
5. Document API changes

### Deployment Considerations
1. Use Docker containers
2. Implement health checks
3. Configure monitoring
4. Set up CI/CD pipelines
5. Plan scaling strategies
