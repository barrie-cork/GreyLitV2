import { SearchQuery, SearchResult, ExecutionStatus } from '../types';

export const testUtils = {
  mocks: {
    createSearchQuery: (overrides?: Partial<SearchQuery>): SearchQuery => ({
      string: 'test query',
      targetUrl: 'https://example.com',
      ...overrides
    }),

    createSearchResult: (overrides?: Partial<SearchResult>): SearchResult => ({
      title: 'Test Result',
      url: 'https://example.com/result',
      snippet: 'Test snippet',
      source: 'test-source',
      timestamp: new Date().toISOString(),
      ...overrides
    }),

    createExecutionStatus: (overrides?: Partial<ExecutionStatus>): ExecutionStatus => ({
      executionId: 'test-id',
      status: 'initiated',
      timestamp: new Date().toISOString(),
      apiStatus: {
        serpapi: {
          enabled: true,
          status: 'ready',
          maxResults: 10,
          currentResults: 0
        }
      },
      ...overrides
    })
  },

  assertions: {
    assertValidSearchResult: (result: SearchResult) => {
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('url');
      expect(result).toHaveProperty('snippet');
      expect(result).toHaveProperty('source');
      expect(result).toHaveProperty('timestamp');
    },

    assertValidExecutionStatus: (status: ExecutionStatus) => {
      expect(status).toHaveProperty('executionId');
      expect(status).toHaveProperty('status');
      expect(status).toHaveProperty('timestamp');
      expect(status).toHaveProperty('apiStatus');
    }
  }
};
