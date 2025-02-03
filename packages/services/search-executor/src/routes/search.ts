import { Router } from 'express';
import { SearchService } from '../services/search';

const router = Router();
const searchService = new SearchService();

// GET endpoint returns active searches
router.get('/search', (_req, res) => {
  try {
    const searches = searchService.getActiveSearches();
    res.json({ searches });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get active searches' });
  }
});

// POST endpoint initiates new search
router.post('/search', (req, res) => {
  try {
    if (!req.body.string) {
      res.status(400).json({ error: 'Search string is required' });
      return;
    }
    const status = searchService.executeSearch(req.body);
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: 'Failed to execute search' });
  }
});

// GET results for specific execution
router.get('/search/:executionId/results', (req, res) => {
  try {
    const { executionId } = req.params;
    if (!executionId) {
      res.status(400).json({ error: 'Execution ID is required' });
      return;
    }

    const results = searchService.getResults(executionId);
    if (!results) {
      res.status(404).json({ error: 'Search execution not found' });
      return;
    }
    res.json({ results });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get search results' });
  }
});

export default router;
