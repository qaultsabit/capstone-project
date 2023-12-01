// authController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_KEY;

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);

    if (!user || user.password !== password) {
      return res.status(401).json({ error: true, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, jwtKey, { expiresIn: '30d' });

    res.json({
      error: false,
      message: 'success',
      loginResult: {
        userId: user.id,
        name: user.name,
        token: token,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Internal server error' });
  }
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: true, message: 'Invalid email format' });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: true, message: 'Email is already registered' });
    }

    const newUser = new User(name, email, password);
    await newUser.save();

    res.status(201).json({ error: false, message: 'User created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Internal server error' });
  }
};
