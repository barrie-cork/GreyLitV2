import { SearchService } from '../search';
import { testUtils } from '../../__tests__/test-utils';

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
      const query = testUtils.mocks.createSearchQuery();
      const initialStatus = searchService.executeSearch(query);
      
      const status = searchService.getSearchStatus(initialStatus.executionId);
      if (!status) {
        throw new Error('Expected search status to be defined');
      }

      testUtils.assertions.assertValidExecutionStatus(status);
      expect(status.status).toBe('initiated');
      expect(status.timestamp).toBeDefined();
    });

    it('should return null for invalid execution id', () => {
      const status = searchService.getSearchStatus('invalid-id');
      expect(status).toBeNull();
    });
  });
});
