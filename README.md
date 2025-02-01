# Grey Literature Search Engine

A systematic literature search engine following PRISMA 2020 guidelines.

## Project Structure

- `packages/`
  - `shared/` - Shared utilities and types
    - `types/` - Common TypeScript types and interfaces
    - `utils/` - Shared utility functions
  - `services/` - Microservices
    - `auth/` - Authentication service
    - `dashboard/` - User dashboard service
    - `search-config/` - Search configuration service
    - `document-processor/` - Document processing service
    - `search-strategy/` - Search strategy service
    - `search-executor/` - Search execution service
    - `result-processor/` - Result processing service
    - `report-generator/` - Report generation service
    - `web-crawler/` - Web crawling service
  - `config/` - Shared configuration files

## Development

### Prerequisites
- Node.js 18.17.1
- Yarn 1.22.0 or higher

### Setup
1. Install dependencies: `yarn install`
2. Build packages: `yarn build`
3. Run tests: `yarn test`

## Architecture
See [Architecture Documentation](./project_docs/architecture/initial_architecture.md)
