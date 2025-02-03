import { SearchService } from '../services/search';
import { SearchQuery } from '../types';

describe('SearchService', () => {
  let searchService: SearchService;
  const testQuery: SearchQuery = { string: 'test query' };

  beforeEach(() => {
    searchService = new SearchService();
  });

  describe('getActiveSearches', () => {
    it('should return empty array when no searches exist', () => {
      const searches = searchService.getActiveSearches();
      expect(searches).toEqual([]);
    });

    it('should return searches sorted by timestamp', () => {
      const status1 = searchService.executeSearch(testQuery);
      const status2 = searchService.executeSearch(testQuery);
      
      const searches = searchService.getActiveSearches();
      expect(searches).toHaveLength(2);
      expect(searches[0].executionId).toBe(status2.executionId);
      expect(searches[1].executionId).toBe(status1.executionId);
    });
  });

  describe('executeSearch', () => {
    it('should create new search with valid status', () => {
      const status = searchService.executeSearch(testQuery);

      expect(status.executionId).toBeDefined();
      expect(status.status).toBe('initiated');
      expect(status.timestamp).toBeDefined();
      expect(status.query).toEqual(testQuery);
      expect(status.apiStatus).toBeDefined();
    });

    it('should initialize API status correctly', () => {
      const status = searchService.executeSearch(testQuery);

      expect(status.apiStatus.serpapi).toBeDefined();
      expect(status.apiStatus.serper).toBeDefined();
      expect(status.apiStatus.duckduckgo).toBeDefined();
    });
  });

  describe('getSearchStatus', () => {
    it('should return null for non-existent search', () => {
      const status = searchService.getSearchStatus('invalid-id');
      expect(status).toBeNull();
    });

    it('should return correct status for existing search', () => {
      const executed = searchService.executeSearch(testQuery);
      
      const status = searchService.getSearchStatus(executed.executionId);
      expect(status).toEqual(executed);
    });
  });

  describe('getResults', () => {
    it('should return null for non-existent search', () => {
      const results = searchService.getResults('invalid-id');
      expect(results).toBeNull();
    });

    it('should return empty array for new search', () => {
      const status = searchService.executeSearch(testQuery);
      
      const results = searchService.getResults(status.executionId);
      expect(results).toEqual([]);
    });
  });
});
import { SearchService } from '../services/search';
import { testUtils } from './test-utils';
import { ExecutionStatus } from '../types';

describe('Search Service', () => {
  let searchService: SearchService;

  beforeEach(() => {
    searchService = new SearchService();
  });

  describe('executeSearch', () => {
    it('should create new search execution', () => {
      const query = testUtils.mocks.createSearchQuery();
      const status = searchService.executeSearch(query);

      testUtils.assertions.assertValidExecutionStatus(status);
      expect(status.status).toBe('initiated');
    });
  });

  describe('getSearchStatus', () => {
    it('should return status for valid execution id', () => {
      // First create a search execution
      const query = testUtils.mocks.createSearchQuery();
      const initialStatus = searchService.executeSearch(query);
      
      // Get the status using the executionId
      const status = searchService.getSearchStatus(initialStatus.executionId);
      
      // Assert that status exists and has expected properties
      expect(status).toBeDefined();
      if (!status) {
        throw new Error('Status should not be null');
      }

      // Now we can safely access properties since we've checked for null
      expect(status.status).toBe('initiated');
      expect(status.timestamp).toBeDefined();
    });

    it('should return null for invalid execution id', () => {
      const status = searchService.getSearchStatus('invalid-id');
      expect(status).toBeNull();
    });
  });

  describe('getResults', () => {
    it('should return results for valid execution id', () => {
      const query = testUtils.mocks.createSearchQuery();
      const { executionId } = searchService.executeSearch(query);
      
      const results = searchService.getResults(executionId);
      expect(results).toBeDefined();
      expect(Array.isArray(results)).toBe(true);
    });

    it('should return null for invalid execution id', () => {
      const results = searchService.getResults('invalid-id');
      expect(results).toBeNull();
    });
  });
});
