export interface ServiceResponse {
  status: string;
  timestamp: string;
}

export interface HealthCheckResponse extends ServiceResponse {
  dependencies?: {
    [key: string]: {
      status: 'up' | 'down';
      latency?: number;
    };
  };
}

export interface SearchQuery {
  string: string;
  targetUrl?: string;
}

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  source: string;
  timestamp: string;
}

export interface APIStatus {
  enabled: boolean;
  status: 'ready' | 'rate_limited';
  maxResults: number;
  currentResults: number;
}

export interface ExecutionStatus {
  executionId: string;
  status: 'initiated' | 'running' | 'completed' | 'failed';
  timestamp?: string;
  apiStatus: {
    serpapi?: APIStatus;
    serper?: APIStatus;
    duckduckgo?: APIStatus;
  };
}
