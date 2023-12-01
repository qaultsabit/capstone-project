const { v4: uuidv4 } = require('uuid');
const { db } = require('../utils/firebaseConfig');
const { bucket } = require('../utils/cloudStorageConfig');

const addRecycling = async (req, res) => {
  try {
    const { nama, barang, kategori, recycling, description } = req.body;
    const photoBuffer = req.file ? req.file.buffer : null;

    // Generate unique filename using uuidv4
    const fileName = uuidv4();

    // Upload image to GCS
    const file = bucket.file(fileName);
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    stream.on('error', (err) => {
      console.error(err);
      res.status(500).json({ error: true, message: 'Failed to upload image' });
    });

    stream.on('finish', async () => {
      try {
        // Save recycling data to Firestore
        const userResultsRef = db.collection('users').doc(req.user.userId).collection('results').doc();
        const newCoins = 10; 
        const coinsData = { coins: newCoins };
        await userResultsRef.set({
          nama,
          barang,
          kategori,
          recycling,
          description,
          ...coinsData,
          photoUrl: `https://storage.googleapis.com/${bucket.name}/${file.name}`,
        }, { merge: true });

        // Update user's coins in Firestore
        const userRef = db.collection('users').doc(req.user.userId);
        const user = await userRef.get();
        const currentCoins = user.data().coins || 0;
        const totalCoins = currentCoins + newCoins;
        await userRef.update({ coins: totalCoins });

        res.status(200).json({ error: false, message: 'Success', coins: newCoins });
      } catch (error) {
        console.error('Error in addRecycling Firestore operation:', error);
        res.status(500).json({ error: true, message: 'Failed to save recycling data' });
      }
    });

    stream.end(photoBuffer);
  } catch (error) {
    console.error('Error in addRecycling:', error);
    res.status(500).json({ error: true, message: 'Internal server error' });
  }
};

const getUserRecyclingResults = async (req, res) => {
  try {
    const resultsRef = db.collection('users').doc(req.user.userId).collection('results');
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

const getDetailUserRecyclingResults = async (req, res) => {
  try {
    const resultId = req.params.id;
    const resultRef = db.collection('users').doc(req.user.userId).collection('results').doc(resultId);
    const result = await resultRef.get();

    if (!result.exists) {
      res.json({
        error: true,
        message: 'Result not found',
      });
      return;
    }

    res.json({
      error: false,
      message: 'User Recycling Result fetched successfully',
      recycling: { id: result.id, ...result.data() },
    });
  } catch (error) {
    res.json({
      error: true,
      message: error.message,
    });
  }
};

module.exports = {
  addRecycling,
  getUserRecyclingResults,
  getDetailUserRecyclingResults,
};
