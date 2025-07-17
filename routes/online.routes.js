const express = require('express');
const router = express.Router();
const { getOnlineUsers, isUserOnline } = require('../services/redis.service');
const { authMiddleware } = require('../middlewares/auth.middleware');

router.get('/online-users', authMiddleware, async (req, res) => {
  try {
    const users = await getOnlineUsers();
    res.status(200).json({ onlineUsers: users });
  } catch (err) {
    console.error('❌ Redis online user hatası:', err);
    res.status(500).json({ message: 'Redis bağlantı hatası' });
  }
});

router.get('/online-users/:userId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const online = await isUserOnline(userId);
    res.json({ userId, online });
  } catch (err) {
    res.status(500).json({ message: 'Kontrol edilemedi' });
  }
});

module.exports = router;
