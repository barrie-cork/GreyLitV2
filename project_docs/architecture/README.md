# Architecture Documentation

## Overview
The Grey Literature Search Engine uses a microservice architecture to provide scalable, maintainable search capabilities for clinical guidelines.

## Core Components

### API Gateway
- Routes requests to appropriate services
- Handles authentication/authorization
- Manages rate limiting

### Microservices
1. Authentication Service
   - User management
   - Session handling
   - Access control

2. Dashboard Service
   - User interface
   - Search history
   - Result management

3. Search Configuration Service
   - PIC framework input
   - Search parameter management
   - Document upload handling

4. Document Processing Service
   - Document parsing
   - Text extraction
   - Vector embedding

5. Search Strategy Service
   - LLM-based strategy generation
   - Boolean query construction
   - Query optimization

6. Search Executor Service
   - SERP API integration
   - Rate limiting
   - Result aggregation

7. Result Processor Service
   - Result ranking
   - Classification
   - User feedback handling

8. Report Generator Service
   - PRISMA report generation
   - Export functionality
   - Search metrics

9. Web Crawler Service
   - ScrapingAnt integration
   - Quota management
   - Response processing

## Data Storage
- MongoDB: Document storage
- Neo4j: Knowledge graph
- Vector Database: Semantic search
- Redis: Rate limiting

## Communication Patterns
- REST APIs for synchronous operations
- Message queues for asynchronous tasks
- Event-driven architecture for notifications
