import { SearchService } from '../../src/services/search';
import { SearchQuery } from '../../src/types';

describe('SearchService', () => {
  let searchService: SearchService;

  beforeEach(() => {
    searchService = new SearchService();
  });

  describe('getActiveSearches', () => {
    it('should return empty array when no searches exist', () => {
      const searches = searchService.getActiveSearches();
      expect(searches).toEqual([]);
    });

    it('should return searches sorted by timestamp', () => {
      const query: SearchQuery = { string: 'test query' };
      const status1 = searchService.executeSearch(query);
      const status2 = searchService.executeSearch(query);
      
      const searches = searchService.getActiveSearches();
      expect(searches).toHaveLength(2);
      expect(searches[0].executionId).toBe(status2.executionId);
      expect(searches[1].executionId).toBe(status1.executionId);
    });
  });

  describe('executeSearch', () => {
    it('should create new search with valid status', () => {
      const query: SearchQuery = { string: 'test query' };
      const status = searchService.executeSearch(query);

      expect(status.executionId).toBeDefined();
      expect(status.status).toBe('initiated');
      expect(status.timestamp).toBeDefined();
      expect(status.query).toEqual(query);
      expect(status.apiStatus).toBeDefined();
    });

    it('should initialize API status correctly', () => {
      const query: SearchQuery = { string: 'test query' };
      const status = searchService.executeSearch(query);

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
      const query: SearchQuery = { string: 'test query' };
      const executed = searchService.executeSearch(query);
      
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
      const query: SearchQuery = { string: 'test query' };
      const status = searchService.executeSearch(query);
      
      const results = searchService.getResults(status.executionId);
      expect(results).toEqual([]);
    });
  });
});
