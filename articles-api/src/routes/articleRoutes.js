const express = require('express');
const { getArticles, getDetailArticle, getDetailArticleByTitle } = require('../controllers/articleControllers');

const router = express.Router();

router.get('/articles', getArticles);
router.get('/articles/:id', getDetailArticle);
router.get('/articles/recommendation/:judul', getDetailArticleByTitle);

module.exports = router;
