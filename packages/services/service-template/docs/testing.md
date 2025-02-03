# Testing Strategy

## Test Types

### 1. Unit Tests (/src/**/__tests__)
- Individual component testing
- Mocked dependencies
- Fast execution
- Located alongside source files

### 2. Integration Tests (/__tests__/integration)
- Component interaction testing
- Minimal mocking
- Database integration
- Tests service boundaries

### 3. E2E Tests (/__tests__/e2e)
- Full flow testing
- Real dependencies
- API endpoint testing
- Complete user scenarios

## Directory Structure
```
├── __tests__/
│   ├── integration/    # Integration tests
│   └── e2e/           # End-to-end tests
└── src/
    ├── config/
    │   └── __tests__/ # Config unit tests
    ├── middleware/
    │   └── __tests__/ # Middleware unit tests
    ├── routes/
    │   └── __tests__/ # Route unit tests
    ├── services/
    │   └── __tests__/ # Service unit tests
    └── utils/
        └── __tests__/ # Utility unit tests
```

## Test Naming Conventions
- Unit tests: `*.test.ts`
- Integration tests: `*.integration.test.ts`
- E2E tests: `*.e2e.test.ts`
- Test files should mirror source file names
- Test suites should describe the component under test
- Test cases should describe the expected behavior

## Running Tests
```bash
# Run all tests
yarn test

# Run specific test types
yarn test:unit
yarn test:integration
yarn test:e2e

# Run with coverage
yarn test:coverage
```

## Writing Tests

### Unit Tests
```typescript
describe('ComponentName', () => {
  describe('methodName', () => {
    it('should describe expected behavior', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

### Integration Tests
```typescript
describe('API Endpoint', () => {
  it('should handle the request correctly', async () => {
    // Setup
    // Make request
    // Verify response
  });
});
```

## Mocking
- Use Jest's mocking capabilities
- Create dedicated mock files in __mocks__ directories
- Use test utilities for common mocking patterns

## Coverage Requirements
- Minimum 80% line coverage
- Minimum 70% branch coverage
- Critical paths must have 100% coverage
- Integration tests for all API endpoints

## Best Practices
1. Follow AAA pattern (Arrange-Act-Assert)
2. One assertion per test when possible
3. Use meaningful test descriptions
4. Keep tests focused and simple
5. Don't test implementation details
6. Maintain test independence
7. Clean up after tests
8. Use before/after hooks appropriately
