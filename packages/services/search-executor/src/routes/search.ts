import { Router } from 'express';
import { SearchService } from '../services/search';

const router = Router();
const searchService = new SearchService();

// GET endpoint for testing
router.get('/search', (_req, res) => {
  res.json({ message: 'Search endpoint is working' });
});

router.post('/search', async (req, res) => {
  try {
    const status = await searchService.executeSearch(req.body);
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: 'Failed to execute search' });
  }
});

router.get('/search/:executionId/results', async (_req, res) => {
  try {
    const results = await searchService.getResults();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get search results' });
  }
});

export default router;
