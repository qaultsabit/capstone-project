const { db } = require('../utils/firebaseConfig');

const getUser = async (userId) => {
  const userRef = db.collection('users').doc(userId);
  const user = await userRef.get();
  return user.data();
};

const getArticle = async (articleId) => {
  const articleRef = db.collection('articles').doc(articleId);
  const articleDoc = await articleRef.get();
  return articleDoc.data();
};

const getUserFavoritesRef = (userId) => {
  return db.collection('users').doc(userId).collection('favoriteArticles');
};

const addFavoriteArticle = async (req, res) => {
  try {
    const user = await getUser(req.user.userId);
    const articleId = req.body.id;

    const articleData = await getArticle(articleId);

    if (!articleData) {
      return res.status(404).json({
        error: true,
        message: 'Article not found',
      });
    }

    const favoritesRef = getUserFavoritesRef(req.user.userId);
    const existingFavorite = await favoritesRef.doc(articleId).get();

    if (existingFavorite.exists) {
      return res.status(400).json({
        error: true,
        message: 'Article already in favorites',
      });
    }

    console.log('favoritesRef path:', favoritesRef.path);

    await favoritesRef.doc(articleId).set(articleData);

    res.status(200).json({
      error: false,
      message: 'Article added to favorites successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: 'Internal Server Error',
    });
  }
};

const getFavoriteArticles = async (req, res) => {
  try {
    const favoritesRef = getUserFavoritesRef(req.user.userId);
    const favoriteArticlesSnapshot = await favoritesRef.get();
    const favoriteArticles = [];

    favoriteArticlesSnapshot.forEach((doc) => {
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

      favoriteArticles.push(articleData);
    });

    res.status(200).json({
      error: false,
      message: 'Articles fetched successfully',
      favoriteArticles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: 'Internal Server Error',
    });
  }
};

const getDetailFavoriteArticle = async (req, res) => {
  try {
    const favoritesRef = getUserFavoritesRef(req.user.userId);
    const articleId = req.params.id;

    const doc = await favoritesRef.doc(articleId).get();

    if (!doc.exists) {
      return res.status(404).json({
        error: true,
        message: 'Favorite article not found',
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
    console.error(error);
    res.status(500).json({
      error: true,
      message: 'Internal Server Error',
    });
  }
};

const deleteFavoriteArticle = async (req, res) => {
  try {
    const favoritesRef = getUserFavoritesRef(req.user.userId);
    const articleId = req.params.id;

    const favoriteArticleDoc = await favoritesRef.doc(articleId).get();

    if (!favoriteArticleDoc.exists) {
      return res.status(404).json({
        error: true,
        message: 'Favorite article not found',
      });
    }

    await favoritesRef.doc(articleId).delete();

    res.status(200).json({
      error: false,
      message: 'Favorite article deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: 'Internal Server Error',
    });
  }
};

module.exports = {
  addFavoriteArticle,
  getFavoriteArticles,
  getDetailFavoriteArticle,
  deleteFavoriteArticle,
};
