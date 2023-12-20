const { db } = require('../utils/firebaseConfig');

const getArticles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 159;
    const searchTitle = req.query.search;
    const articleType = req.query.jenis;

    const articlesRef = db.collection('articles');
    let snapshot;

    if (searchTitle) {
      snapshot = await articlesRef.get();
    } else if (articleType) {
      snapshot = await articlesRef.where('jenis', '==', articleType).get();
    } else {
      snapshot = await articlesRef.limit(size).offset((page - 1) * size).get();
    }

    const listArticles = [];
    const searchResults = [];
    const filteredResults = [];

    snapshot.forEach((doc) => {
      const articleData = doc.data();
      articleData.id = doc.id;

      if (articleData.alatBahan && Array.isArray(articleData.alatBahan)) {
        const formattedAlatBahan = articleData.alatBahan.map((item, index) => `${index + 1}. ${item}`).join('\n');
        articleData.alatBahan = formattedAlatBahan;
      }

      if (articleData.langkah && Array.isArray(articleData.langkah)) {
        const formattedLangkah = articleData.langkah.map((item, index) => `${index + 1}. ${item}`).join('\n\n');
        articleData.langkah = formattedLangkah;
      }

      listArticles.push(articleData);

      if (searchTitle) {
        const lowercaseJudul = articleData.judul.toLowerCase();
        const lowercaseSearchTitle = searchTitle.toLowerCase();

        if (lowercaseJudul.includes(lowercaseSearchTitle)) {
          searchResults.push(articleData);
        }
      }

      if (articleType && articleData.jenis === articleType) {
        filteredResults.push(articleData);
      }
    });

    let responseList;
    if (searchResults.length > 0) {
      responseList = searchResults.slice((page - 1) * size, page * size);
    } else if (filteredResults.length > 0) {
      responseList = filteredResults.slice((page - 1) * size, page * size);
    } else {
      responseList = listArticles.slice((page - 1) * size, page * size);
    }

    res.status(200).json({
      error: false,
      message: 'Articles fetched successfully',
      listArticles: responseList,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Internal Server Error',
    });
  }
};

const getDetailArticle = async (req, res) => {
  try {
    const articleId = req.params.id;

    const articleRef = db.collection('articles').doc(articleId);
    const doc = await articleRef.get();

    if (!doc.exists) {
      return res.status(404).json({
        error: true,
        message: 'Article not found',
      });
    }

    const articleData = doc.data();
    articleData.id = doc.id;

    if (articleData.alatBahan && Array.isArray(articleData.alatBahan)) {
      const formattedAlatBahan = articleData.alatBahan.map((item, index) => `${index + 1}. ${item}`).join('\n');
      articleData.alatBahan = formattedAlatBahan;
    }

    if (articleData.langkah && Array.isArray(articleData.langkah)) {
      const formattedLangkah = articleData.langkah.map((item, index) => `${index + 1}. ${item}`).join('\n\n');
      articleData.langkah = formattedLangkah;
    }

    res.status(200).json({
      error: false,
      message: 'Article fetched successfully',
      article: articleData,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Internal Server Error',
    });
  }
};

const getDetailArticleByTitle = async (req, res) => {
  try {
    const searchTitle = req.params.judul;

    const articlesRef = db.collection('articles');
    const snapshot = await articlesRef.where('judul', '==', searchTitle).get();

    const matchingArticles = [];
    snapshot.forEach((doc) => {
      const articleData = doc.data();
      articleData.id = doc.id;

      if (articleData.alatBahan && Array.isArray(articleData.alatBahan)) {
        const formattedAlatBahan = articleData.alatBahan.map((item, index) => `${index + 1}. ${item}`).join('\n');
        articleData.alatBahan = formattedAlatBahan;
      }

      if (articleData.langkah && Array.isArray(articleData.langkah)) {
        const formattedLangkah = articleData.langkah.map((item, index) => `${index + 1}. ${item}`).join('\n\n');
        articleData.langkah = formattedLangkah;
      }

      matchingArticles.push(articleData);
    });

    if (matchingArticles.length === 0) {
      return res.status(404).json({
        error: true,
        message: 'Article not found',
      });
    }

    const articleData = matchingArticles[0];

    res.status(200).json({
      error: false,
      message: 'Article fetched successfully',
      article: articleData,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Internal Server Error',
    });
  }
};

module.exports = { getArticles, getDetailArticle, getDetailArticleByTitle };