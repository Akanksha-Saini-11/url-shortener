const express = require('express');
const router = express.Router();

const {
  createShortUrl,
  getAllUrls,
  redirectUrl,
  deleteUrl,
} = require('../controllers/urlController');

const auth = require('../middleware/authMiddleware');

// Protected
router.post('/shorten', auth, createShortUrl);
router.get('/all', auth, getAllUrls);
router.delete('/delete/:id', auth, deleteUrl);

// Public - must be last
router.get('/:shortId', redirectUrl);

module.exports = router;