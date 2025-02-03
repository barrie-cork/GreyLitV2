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
import { SearchQuery, SearchResult, ExecutionStatus } from '../types';
import { Express, Request, Response } from 'express';
import { Server } from 'http';

export const testUtils = {
  mocks: {
    createSearchQuery: (): SearchQuery => ({
      string: 'test search',
      targetUrl: 'https://example.com'
    }),

    createResponse: () => {
      const res: Partial<Response> = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      return res as Response;
    },

    createRequest: (overrides: Record<string, any> = {}): Partial<Request> => ({
      body: {},
      query: {},
      params: {},
      headers: {},
      ...overrides,
    }),

    createNext: () => jest.fn()
  },

  helpers: {
    createTestServer: (app: Express): Server => app.listen(0),

    closeTestServer: (server: Server): Promise<void> => 
      new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) reject(err);
          else resolve();
        });
      }),

    wait: (ms: number): Promise<void> => 
      new Promise(resolve => setTimeout(resolve, ms))
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
      expect(status).toHaveProperty('apiStatus');
    }
  }
};
import { SearchQuery, SearchResult, ExecutionStatus, APIStatus } from '../types';

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

    createAPIStatus: (overrides?: Partial<APIStatus>): APIStatus => ({
      enabled: true,
      status: 'ready',
      maxResults: 10,
      currentResults: 0,
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
import { SearchQuery, SearchResult, ExecutionStatus, APIStatus } from '../types';

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

    createAPIStatus: (overrides?: Partial<APIStatus>): APIStatus => ({
      enabled: true,
      status: 'ready',
      maxResults: 10,
      currentResults: 0,
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
