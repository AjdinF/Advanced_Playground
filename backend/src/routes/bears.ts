import express, { Router, Request, Response } from 'express';
import axios from 'axios';
import { extractBears } from '../utils/extractBears.js';
import NodeCache from 'node-cache';

const router: Router = express.Router();
const cache = new NodeCache({ stdTTL: 3600 });
const baseUrl = 'https://en.wikipedia.org/w/api.php';

router.get('/bears', async (req: Request, res: Response): Promise<void> => {
  try {
    const cachedData = cache.get('bears');
    if (cachedData) {
      console.log('Serving from cache');
      res.json(cachedData);
      return;
    }
    const params = {
      action: 'parse',
      page: 'List_of_ursids',
      prop: 'wikitext',
      section: '3',
      format: 'json',
    };

    const url = `${baseUrl}?${new URLSearchParams(params).toString()}`;
    const response = await axios.get(url);

    const wikitext = response.data.parse.wikitext['*'];
    const bears = await extractBears(wikitext);

    cache.set('bears', bears);
    console.log('Serving from Wikipedia API and caching result');
    res.json(bears);
  } catch (error) {
    console.error('Error fetching or processing bear data:', error);
    res.status(500).json({ error: 'Failed to fetch bear data' });
  }
});

export default router;
