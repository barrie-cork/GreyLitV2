# Technology Stack Documentation

## Core Technologies
| Technology | Version | Purpose | Rationale |
|------------|---------|---------|-----------|
| Node.js | 18.17.1 | Backend runtime | LTS version aligned with PRD requirements |
| LangChain | 0.0.347 | AI workflow orchestration | Provides required document loaders and Neo4j integration |
| Pinecone | 2.2.2 | Vector search | Compatible with LangChain's retrieval modules |

## Infrastructure Components
### API Gateway
- **Kong 3.6.1**  
  - Purpose: Microservice routing & load balancing  
  - Rationale: Production-grade with plugin ecosystem

### Message Queue
- **RabbitMQ 3.13.1**  
  - Purpose: Async service communication  
  - Rationale: AMQP 0-9-1 protocol support

### Monitoring
- **Prometheus 2.52.0** + **Grafana 10.4.2**  
  - Purpose: Metrics collection & visualization  
  - Rationale: Cloud Native Computing Foundation stack

## Frontend Dependencies
| Category | Library | Version | Purpose |
|----------|---------|---------|---------|
| State Management | Redux Toolkit | 2.2.1 | Predictable state container |
| Routing | React Router | 6.22.3 | Declarative navigation |
| Data Fetching | React Query | 4.35.0 | Server-state management |
| Forms | React Hook Form | 7.47.0 | High-performance forms |
| Visualization | Recharts | 2.7.0 | Charting library |

## Backend Dependencies
| Category | Library | Version | Purpose |
|----------|---------|---------|---------|
| API Framework | Express | 4.19.2 | REST API construction |
| Databases | MongoDB | 7.0.8 | Document storage |
| | Neo4j Driver | 5.14.0 | Graph database operations |
| | Pinecone Client | 2.2.2 | Vector search |

## AI/ML Components
| Component | Version | Integration Point |
|-----------|---------|-------------------|
| LangChain Community | 0.0.347 | Document processing pipeline |
| LangChain Neo4j | 0.0.347 | Knowledge graph operations | 
| ScrapingAnt | 1.3.1 | Web content extraction |

## Security
| Component | Version | Standard |
|-----------|---------|----------|
| JSON Web Tokens | 9.0.2 | RFC 7519 |
| bcrypt | 5.1.1 | NIST SP 800-63B |

## Compatibility Matrix
| Component       | Node 18 | React 18 | MongoDB 7 | Neo4j 5 | Pinecone 2.2 |
|-----------------|---------|----------|-----------|---------|--------------|
| Express 4.19.2  | ✓       | -        | ✓         | -       | ✓            |
| LangChain 0.0.347 | ✓      | -        | ✓         | ✓       | ✓            |
| Redis 7.0.11    | ✓       | -        | -         | -       | -            |

## Version Lock Rationale
1. Node.js 18.17.1 matches LTS requirements from PRD
2. LangChain 0.0.347 contains exact document loader versions needed
3. Pinecone 2.2.2 validated with LangChain's vector store integration
4. Neo4j driver compatibility maintained through LangChain's graph modules

## System Requirements
- **Node.js**: =18.17.1 (required for LTS support)
- **Pinecone**: Requires 2.2.x client for embedding workflows

> **Critical Note**: All versions are exact (no caret ^ or tilde ~) to ensure reproducible builds across environments.
