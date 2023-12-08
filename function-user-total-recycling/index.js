const express = require('express');
const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp();

const app = express();

app.get('/', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secret'); // secret token
    req.user = decoded;
    const userDoc = await admin.firestore().collection('users').doc(req.user.userId).get();
    const resultsSnapshot = await admin.firestore().collection('users').doc(req.user.userId).collection('results').get();

    const coins = userDoc.exists ? userDoc.data().coins || 0 : 0;

    res.json({
      coins,
      listRecycling: resultsSnapshot.size,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

exports.getTotal = functions.https.onRequest(app);