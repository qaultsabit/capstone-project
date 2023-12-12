const express = require('express');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const functions = require('firebase-functions');

admin.initializeApp();

const app = express();

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secret'); // secret token
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

const getUserDoc = async (req, res, next) => {
  try {
    const userDoc = await admin.firestore().collection('users').doc(req.user.userId).get();
    req.userDoc = userDoc;
    next();
  } catch (error) {
    console.error('Error:', error);
    next(error);
  }
};

app.get('/', verifyToken, getUserDoc, async (req, res) => {
  const userDoc = req.userDoc;
  const resultsSnapshot = await admin.firestore().collection('users').doc(req.user.userId).collection('results').get();

  const coins = userDoc.exists ? userDoc.data().coins || 0 : 0;
  const name = userDoc.exists ? userDoc.data().name || '' : '';

  res.json({
    name,
    coins,
    listRecycling: resultsSnapshot.size,
  });
});

app.put("/", verifyToken, getUserDoc, async (req, res, next) => {
  const userDoc = req.userDoc;
  const currentCoins = userDoc.exists ? userDoc.data().coins || 0 : 0;

  const inputCoins = parseInt(req.body.inputCoins, 10);

  if (isNaN(inputCoins) || inputCoins <= 0) {
    return res.status(400).json({ error: 'Invalid value' });
  }

  const updateCoins = Math.max(currentCoins - inputCoins, 0);

  try {
    await admin.firestore().collection('users').doc(req.user.userId).update({
      coins: updateCoins,
    });

    res.json({
      updateCoins,
    });
  } catch (error) {
    console.error('Error:', error);
    next(error);
  }
});

exports.userCoins = functions.https.onRequest(app);
