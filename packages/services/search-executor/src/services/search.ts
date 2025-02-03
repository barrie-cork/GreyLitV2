import { randomUUID } from 'crypto';
import { SearchQuery, SearchResult, ExecutionStatus } from '../types';
import { getConfig } from '../config';

export class SearchService {
  private activeSearches: Map<string, ExecutionStatus>;
  private searchResults: Map<string, SearchResult[]>;
  private config: ReturnType<typeof getConfig>;

  constructor() {
    this.activeSearches = new Map();
    this.searchResults = new Map();
    this.config = getConfig();
  }

  getActiveSearches(): ExecutionStatus[] {
    const searches = Array.from(this.activeSearches.values());
    // Sort by timestamp descending
    return searches.sort((a, b) => {
      const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
      const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
      return timeB - timeA;
    });
  }

  getSearchStatus(executionId: string): ExecutionStatus | null {
    return this.activeSearches.get(executionId) || null;
  }

  executeSearch(query: SearchQuery): ExecutionStatus {
    const executionId = randomUUID();
    const timestamp = new Date().toISOString();
    
    // Initial status using config
    const status: ExecutionStatus = {
      executionId,
      status: 'initiated',
      timestamp,
      query,
      apiStatus: {
        serpapi: {
          enabled: this.config.apis.serpapi.enabled,
          status: 'ready',
          maxResults: this.config.apis.serpapi.maxResultsPerQuery,
          currentResults: 0
        },
        serper: {
          enabled: this.config.apis.serper.enabled,
          status: 'ready',
          maxResults: this.config.apis.serper.maxResultsPerQuery,
          currentResults: 0
        },
        duckduckgo: {
          enabled: this.config.apis.duckduckgo.enabled,
          status: 'ready',
          maxResults: this.config.apis.duckduckgo.maxResultsPerQuery,
          currentResults: 0
        }
      }
    };

    // Store the search status
    this.activeSearches.set(executionId, status);
    this.searchResults.set(executionId, []);

    // Start processing the search asynchronously
    this.processSearch(executionId, query).catch(console.error);

    return status;
  }

  getResults(executionId: string): SearchResult[] | null {
    return this.searchResults.get(executionId) || null;
  }

  private async processSearch(executionId: string, query: SearchQuery): Promise<void> {
    const status = this.activeSearches.get(executionId);
    if (!status) return;

    try {
      // Update status to running
      status.status = 'running';
      this.activeSearches.set(executionId, status);

      // Simulate search delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Add a sample result
      const results = this.searchResults.get(executionId) || [];
      results.push({
        title: `Result for "${query.string}"`,
        url: query.targetUrl || 'https://example.com',
        snippet: `Sample result for search: ${query.string}`,
        source: 'serpapi',
        timestamp: new Date().toISOString()
      });
      this.searchResults.set(executionId, results);

      // Update status to completed
      status.status = 'completed';
      if (status.apiStatus.serpapi) {
        status.apiStatus.serpapi.currentResults = 1;
      }
      this.activeSearches.set(executionId, status);
    } catch (error) {
      status.status = 'failed';
      this.activeSearches.set(executionId, status);
      throw error;
    }
  }
}
