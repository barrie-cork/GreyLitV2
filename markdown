# Technology Stack Documentation

## Core Technology
- React.js 18.2.0
- Node.js 20.11.1

## Infrastructure
### API Gateway
- Kong 3.6.1
  - Purpose: Manage microservice routing and load balancing
  - Chosen because: Production-grade API gateway with extensive plugin ecosystem

### Message Queue
- RabbitMQ 3.13.1
  - Purpose: Asynchronous service communication
  - Chosen because: Reliable message broker for distributed processing

### Monitoring
- Prometheus 2.52.0
  - Purpose: Metrics collection and alerting
  - Chosen because: De-facto standard for monitoring
- Grafana 10.4.2
  - Purpose: Metrics visualization and dashboards
  - Chosen because: Rich visualization capabilities

## Required Dependencies
### State Management
- Redux Toolkit 2.2.1
  - Purpose: Predictable state container for JavaScript apps
  - Chosen because: Official recommended approach for Redux, simplifies state management

### UI Components
- Material-UI (MUI) 5.14.2
  - Purpose: Comprehensive suite of UI components
  - Chosen because: Follows Material Design, extensive component library

### Routing
- React Router 6.22.3
  - Purpose: Declarative routing for React applications
  - Chosen because: Most popular routing solution for React

### Data Fetching
- React Query 4.35.0
  - Purpose: Server state management and data fetching
  - Chosen because: Simplifies data fetching and caching

### Form Handling
- React Hook Form 7.47.0
  - Purpose: Performant and flexible forms
  - Chosen because: Minimal re-renders, easy validation

### Real-time Updates
- Socket.IO Client 4.7.2
  - Purpose: Real-time, bidirectional communication
  - Chosen because: Reliable WebSocket implementation

### Visualization
- Recharts 2.7.0
  - Purpose: Composable charting library
  - Chosen because: Built on React components, flexible

## Compatibility Matrix
All dependencies are compatible with React 18.2.0 and support TypeScript. Each library is actively maintained and widely used in the React ecosystem.

## AI/ML Dependencies
### LangChain Components
- langchain-community 0.2.1
  - Purpose: Document loader integrations and utilities
  - Chosen because: Required for ScrapingAntLoader and document processing
- langchain-neo4j 0.1.7
  - Purpose: Knowledge graph operations and graph-based search
  - Chosen because: Official Neo4j integration for LangChain

### Web Crawling
- ScrapingAnt 1.3.0
  - Purpose: Headless browser crawling
  - Chosen because: Specified in PRD for web content extraction

## Security Dependencies
### Authentication
- jsonwebtoken 9.0.2
  - Purpose: JWT token generation and validation
  - Chosen because: Industry standard for stateless authentication
- bcrypt 5.1.1
  - Purpose: Secure password hashing
  - Chosen because: Battle-tested password security

## Version Lock Rationale
All versions are exact (e.g., "1.2.3" not "^1.2.3") to ensure:
- Consistent behavior across environments
- Predictable dependency resolution
- Reproducible builds
- Avoid unexpected breaking changes

## System Requirements
- Node.js >= 20.11.1 (Required for LangChain)
- OpenSSL >= 3.0 (Required for Neo4j driver)
- Redis >= 7.0 (Required for Redis-Cell rate limiting)
