const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const User = require('./models/User'); // Mongoose model

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (await User.findOne({ email })) return res.status(400).json({ error: 'Email exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash, role: 'user' });
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
  res.json({ user, token });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
  res.json({ user, token });
});

// Google Login/Register
router.post('/google-login', async (req, res) => {
  const { token } = req.body;
  const ticket = await googleClient.verifyIdToken({ idToken: token, audience: GOOGLE_CLIENT_ID });
  const payload = ticket.getPayload();
  let user = await User.findOne({ email: payload.email });
  if (!user) {
    user = await User.create({ name: payload.name, email: payload.email, role: 'user', password: '' });
  }
  const jwtToken = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
  res.json({ user, token: jwtToken });
});

module.exports = router;
