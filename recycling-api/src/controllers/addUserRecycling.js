const firebaseService = require('../services/firebaseService');
const cloudStorageService = require('../services/cloudStorageService');

const addUserRecycling = async (req, res) => {
  try {
    const user = await firebaseService.getUser(req.user.userId);
    const userName = user.name;

    const { barang, kategori, recycling, description } = req.body;
    const photoBuffer = req.file ? req.file.buffer : null;

    if (!photoBuffer) {
      return res.status(400).json({ error: true, message: 'No image provided' });
    }

    const photoUrl = await cloudStorageService.uploadFile(photoBuffer, req.file.mimetype);

    // Save recycling data to Firestore
    const userResultsRef = firebaseService.getUserResultsRef(req.user.userId).doc();
    const newCoins = 1000;
    await userResultsRef.set({
      nama: userName,
      barang,
      kategori,
      recycling,
      description,
      coins: newCoins,
      photoUrl,
    }, { merge: true });

    // Update user's coins in Firestore
    await firebaseService.updateUserCoins(req.user.userId, newCoins);

    res.status(200).json({ error: false, message: 'Success', coins: newCoins });
  } catch (error) {
    console.error('Error in addRecycling:', error);
    res.status(500).json({ error: true, message: 'Internal server error' });
  }
};

module.exports = addUserRecycling;
