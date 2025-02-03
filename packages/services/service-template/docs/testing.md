# Testing Strategy

## Overview

This document outlines the testing strategy for the service template, which serves as a model for all microservices in the system.

## Test Categories

### 1. Unit Tests (/src/**/__tests__)
- Purpose: Test individual components in isolation
- Location: Alongside source files
- Characteristics:
  - Fast execution
  - Full dependency mocking
  - High granularity
  - Focus on business logic

### 2. Integration Tests (/__tests__/integration)
- Purpose: Test component interactions
- Location: Root __tests__/integration directory
- Characteristics:
  - Minimal mocking
  - Database integration
  - API endpoint testing
  - Service boundary testing

### 3. E2E Tests (/__tests__/e2e)
- Purpose: Test complete service flows
- Location: Root __tests__/e2e directory
- Characteristics:
  - Real dependencies
  - Full API flows
  - User scenario testing
  - System boundary testing

## Directory Structure
```
service-name/
├── __tests__/
│   ├── e2e/                    # End-to-end tests
│   │   └── service.test.ts     # Full service flows
│   └── integration/            # Integration tests
│       ├── api.test.ts         # API endpoint tests
│       └── dependencies.test.ts # External dependency tests
├── src/
│   ├── __tests__/             # Unit tests & utilities
│   │   ├── test-utils.ts      # Shared test utilities
│   │   └── mocks/             # Shared test mocks
│   ├── config/
│   │   └── __tests__/         # Configuration tests
│   ├── middleware/
│   │   └── __tests__/         # Middleware tests
│   ├── routes/
│   │   └── __tests__/         # Route handler tests
│   ├── services/
│   │   └── __tests__/         # Business logic tests
│   └── utils/
│       └── __tests__/         # Utility function tests
```

## Test Utilities

The `testUtils` object in `src/__tests__/test-utils.ts` provides:

### Mock Factories
```typescript
testUtils.mocks.createServiceError()  // Create error instances
testUtils.mocks.createResponse()      // Mock HTTP responses
testUtils.mocks.createRequest()       // Mock HTTP requests
testUtils.mocks.createNext()          // Mock Express next()
```

### Test Helpers
```typescript
testUtils.helpers.createTestServer()   // Create test HTTP server
testUtils.helpers.closeTestServer()    // Clean up test server
testUtils.helpers.wait()              // Promise-based delay
```

### Common Assertions
```typescript
testUtils.assertions.assertValidHealthCheck()  // Verify health check
testUtils.assertions.assertErrorResponse()     // Verify error format
```

## Running Tests

```bash
# Run all tests
yarn test

# Run specific test types
yarn test:unit            # Run unit tests
yarn test:integration    # Run integration tests
yarn test:e2e           # Run end-to-end tests

# Run with coverage
yarn test:coverage

# Run in watch mode
yarn test:watch
```

## Coverage Requirements

| Category    | Threshold |
|-------------|-----------|
| Branches    | 70%       |
| Functions   | 80%       |
| Lines       | 80%       |
| Statements  | 80%       |

Critical paths must maintain 100% coverage.

## Best Practices

### 1. Test Organization
- Group tests logically by feature/component
- Use descriptive test suite and case names
- Follow the AAA pattern (Arrange-Act-Assert)

### 2. Test Independence
- Each test should be self-contained
- Clean up after tests
- Don't share state between tests
- Use before/after hooks appropriately

### 3. Test Quality
- Test behavior, not implementation
- One assertion per test when possible
- Keep tests focused and simple
- Use meaningful test descriptions

### 4. Mocking Strategy
- Mock at the appropriate level
- Use Jest's mocking capabilities
- Create dedicated mock files
- Document mock behavior

### 5. Error Handling
- Test both success and error paths
- Verify error messages and codes
- Test boundary conditions
- Include edge cases

## Example Test Structure

```typescript
describe('Component Name', () => {
  // Setup and teardown
  beforeAll(() => {
    // Global setup
  });

  afterAll(() => {
    // Global cleanup
  });

  describe('Feature/Method', () => {
    beforeEach(() => {
      // Per-test setup
    });

    afterEach(() => {
      // Per-test cleanup
    });

    it('should handle successful case', async () => {
      // Arrange
      const input = testUtils.mocks.createValidInput();

      // Act
      const result = await component.method(input);

      // Assert
      expect(result).toBeDefined();
      testUtils.assertions.assertValidResult(result);
    });

    it('should handle error case', async () => {
      // Arrange
      const invalidInput = testUtils.mocks.createInvalidInput();

      // Act & Assert
      await expect(
        component.method(invalidInput)
      ).rejects.toThrow(ValidationError);
    });
  });
});
```
