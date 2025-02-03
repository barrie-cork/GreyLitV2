import { Router } from 'express';
import { SearchService } from '../services/search';

const router = Router();
const searchService = new SearchService();

// GET endpoint returns active searches
router.get('/search', async (_req, res) => {
  try {
    const searches = await searchService.getActiveSearches();
    res.json({ searches });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get active searches' });
  }
});

// POST endpoint initiates new search
router.post('/search', async (req, res) => {
  try {
    if (!req.body.string) {
      return res.status(400).json({ error: 'Search string is required' });
    }
    const status = await searchService.executeSearch(req.body);
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: 'Failed to execute search' });
  }
});

// GET results for specific execution
router.get('/search/:executionId/results', async (req, res) => {
  try {
    const results = await searchService.getResults(req.params.executionId);
    if (!results) {
      return res.status(404).json({ error: 'Search execution not found' });
    }
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get search results' });
  }
});

export default router;
