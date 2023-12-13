const firebaseService = require('../services/firebaseService');

const deleteUserRecycling = async (req, res) => {
  try {
    const resultId = req.params.id;
    const resultRef = firebaseService.getUserResultsRef(req.user.userId).doc(resultId);
    const result = await resultRef.get();

    if (!result.exists) {
      res.status(404).json({
        error: true,
        message: 'Result not found',
      });
      return;
    }

    await resultRef.delete();

    res.status(200).json({
      error: false,
      message: 'Data recycling berhasil dihapus',
    });
  } catch (error) {
    console.error('Error in deleteUserRecycling:', error);
    res.status(500).json({
      error: true,
      message: 'Failed to delete recycling data',
    });
  }
};

module.exports = deleteUserRecycling;
