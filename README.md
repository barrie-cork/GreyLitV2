# Grey Literature Search Engine

## Overview
A microservice-based search engine for systematically discovering and analyzing grey literature, specifically clinical guidelines, following PRISMA 2020 guidelines.

## Prerequisites
- Node.js 18.17.1
- Yarn 1.22.0+
- Docker & Docker Compose

## Quick Start

1. Clone the repository:
```bash
git clone <repository-url>
cd grey-lit-search
```

2. Copy environment template:
```bash
copy .env.example .env
```

3. Start development environment:
```bash
docker-compose -f docker-compose.dev.yml up --build
```

## Development

### Project Structure
```
.
├── packages/
│   ├── shared/          # Shared utilities and types
│   │   ├── types/      # Common TypeScript interfaces
│   │   └── utils/      # Shared utility functions
│   └── services/       # Microservices
│       ├── auth/       # Authentication service
│       ├── dashboard/  # User dashboard
│       └── ...         # Other services
└── project_docs/       # Project documentation
```

### Available Scripts
- `yarn build` - Build all packages for production
- `yarn build:dev` - Build with development settings
- `yarn test` - Run tests
- `yarn lint` - Check code style
- `yarn format` - Format code

### Development Workflow
1. Create feature branch from main
2. Make changes following style guide
3. Run tests and linting
4. Submit pull request

## Documentation
- [Architecture Overview](./project_docs/architecture/README.md)
- [API Documentation](./project_docs/api/README.md)
- [Development Guidelines](./project_docs/guidelines/README.md)

## Contributing
See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License
MIT
