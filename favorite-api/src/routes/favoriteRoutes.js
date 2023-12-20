const express = require('express');
const { addFavoriteArticle, getFavoriteArticles, getDetailFavoriteArticle, deleteFavoriteArticle } = require('../controllers/favoriteControllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/favorite', authMiddleware, addFavoriteArticle);
router.get('/favorite', authMiddleware, getFavoriteArticles);
router.get('/favorite/:id', authMiddleware, getDetailFavoriteArticle);
router.delete('/favorite/:id', authMiddleware, deleteFavoriteArticle);

module.exports = router;
