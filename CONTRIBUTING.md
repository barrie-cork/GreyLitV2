# Contributing to Grey Literature Search Engine

## Getting Started

### Prerequisites
- Node.js 18.17.1
- Yarn 1.22.0+
- Docker & Docker Compose

### Setup
1. Fork the repository
2. Clone your fork
3. Install dependencies: `yarn install`
4. Copy environment file: `copy .env.example .env`
5. Start development environment: `docker-compose -f docker-compose.dev.yml up --build`

## Development Process

### Creating Changes
1. Create a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Write or update tests
4. Run tests: `yarn test`
5. Run linting: `yarn lint`
6. Format code: `yarn format`

### Commit Messages
Follow conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation
- `test:` Tests
- `chore:` Maintenance

### Pull Requests
1. Update your branch with main
2. Resolve any conflicts
3. Ensure tests pass
4. Submit PR with clear description
5. Link related issues

## Code Standards

### TypeScript
- Use strict mode
- Follow ESLint rules
- Document public APIs
- Write unit tests

### Testing
- Write unit tests for utilities
- Integration tests for APIs
- Maintain test coverage
- Test error cases

## Questions?
Open an issue for questions or suggestions.

## License
By contributing, you agree that your contributions will be licensed under the MIT License.
