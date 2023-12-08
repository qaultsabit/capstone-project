const { db } = require('../utils/firebaseConfig');

const getUser = async (userId) => {
  const userRef = db.collection('users').doc(userId);
  const user = await userRef.get();
  return user.data();
};

const getUserResultsRef = (userId) => {
  return db.collection('users').doc(userId).collection('results');
};

const updateUserCoins = async (userId, newCoins) => {
  const userRef = db.collection('users').doc(userId);
  const user = await userRef.get();
  const currentCoins = user.data().coins || 0;
  const totalCoins = currentCoins + newCoins;
  await userRef.update({ coins: totalCoins });
};

module.exports = {
  getUser,
  getUserResultsRef,
  updateUserCoins,
};
