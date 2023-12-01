// user.js
const { db } = require('../utils/firebaseConfig');

class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  async save() {
    const userRef = await db.collection('users').add({
      name: this.name,
      email: this.email,
      password: this.password,
    });

    return userRef.id;
  }

  static async findByEmail(email) {
    const querySnapshot = await db.collection('users').where('email', '==', email).get();

    if (querySnapshot.empty) {
      return null;
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    userData.id = userDoc.id;

    return userData;
  }
}

module.exports = User;
