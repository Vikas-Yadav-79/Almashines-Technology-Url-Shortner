import express from 'express';
import { 
  createShortURL, 
  redirectShortURL, 
  getURLAnalytics, 
  accessPasswordProtectedURL 
} from '../controllers/urlController.js';

const router = express.Router();

router.post('/shorten', createShortURL);

router.get('/:shortUrl', redirectShortURL);

router.get('/analytics/:shortUrl', getURLAnalytics);

router.post('/access/:shortUrl', accessPasswordProtectedURL);

export default router;
