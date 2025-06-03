const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: '아이디 또는 비밀번호 누락' });
  }
  const existing = await User.findOne({ username });
  if (existing) {
    return res.status(400).json({ error: '이미 존재하는 사용자' });
  }
  const user = new User({ username, password });
  const saved = await user.save();
  res.status(201).json({ user: { _id: saved._id, username: saved.username } });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: '아이디 또는 비밀번호 누락' });
  }
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(401).json({ error: '로그인 실패' });
  }
  res.json({ user: { _id: user._id, username: user.username } });
});

module.exports = router;
