const firebaseService = require('../services/firebaseService');

const getUserRecyclingResults = async (req, res) => {
  try {
    const resultsRef = firebaseService.getUserResultsRef(req.user.userId);
    const querySnapshot = await resultsRef.get();

    const results = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.json({
      error: false,
      message: 'User Recycling Results fetched successfully',
      listRecycling: results,
    });
  } catch (error) {
    res.json({
      error: true,
      message: error.message,
    });
  }
};

module.exports = getUserRecyclingResults;
