# Technology Stack Documentation

## Core Technologies

| Technology | Version | Purpose            | Rationale                                |
| ---------- | ------- | ------------------ | ---------------------------------------- |
| React.js   | 18.2.0  | Frontend framework | Stable version with concurrent rendering |
| Node.js    | 20.11.1 | Backend runtime    | LTS version with ES2023 support          |

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

| Category         | Library         | Version | Purpose                     |
| ---------------- | --------------- | ------- | --------------------------- |
| State Management | Redux Toolkit   | 2.2.1   | Predictable state container |
| Routing          | React Router    | 6.22.3  | Declarative navigation      |
| Data Fetching    | React Query     | 4.35.0  | Server-state management     |
| Forms            | React Hook Form | 7.47.0  | High-performance forms      |
| Visualization    | Recharts        | 2.7.0   | Charting library            |

## Backend Dependencies

| Category      | Library         | Version | Purpose                   |
| ------------- | --------------- | ------- | ------------------------- |
| API Framework | Express         | 4.19.2  | REST API construction     |
| Databases     | MongoDB         | 7.0.8   | Document sto/coderage     |
|               | Neo4j Driver    | 5.14.0  | Graph database operations |
|               | Pinecone Client | 3.4.0   | Vector search             |

## AI/ML Components

| Component           | Version | Integration Point            |
| ------------------- | ------- | ---------------------------- |
| LangChain Community | 0.2.1   | Document processing pipeline |
| LangChain Neo4j     | 0.1.7   | Knowledge graph operations   |
| ScrapingAnt         | 1.3.0   | Web content extraction       |

## Security

| Component       | Version | Standard        |
| --------------- | ------- | --------------- |
| JSON Web Tokens | 9.0.2   | RFC 7519        |
| bcrypt          | 5.1.1   | NIST SP 800-63B |

## Compatibility Matrix

| Component       | Node 20 | React 18 | MongoDB 7 | Neo4j 5 |
| --------------- | ------- | -------- | --------- | ------- |
| Express 4.19.2  | ✓       | -        | ✓         | -       |
| LangChain 0.2.1 | ✓       | -        | ✓         | ✓       |
| Redis 7.2.4     | ✓       | -        | -         | -       |

## Version Lock Rationale

1. All versions verified against Node.js 20 LTS
2. Security patches current as of July 2024
3. LangChain components aligned with document processing requirements
4. Neo4j driver compatible with OpenSSL 3.0+

## System Requirements

- **Node.js**: ≥20.11.1 (required for async hooks)
- **OpenSSL**: ≥3.0 (required for Neo4j encryption)
- **Docker**: ≥24.0.7 (required for compose v2)
- **Hardware**: AVX2 instruction set (required for Pinecone)

> **Critical Note**: All versions are exact (no caret ^ or tilde ~) to ensure reproducible builds across environments.
