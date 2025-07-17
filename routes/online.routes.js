const express = require('express');
const router = express.Router();
const { getOnlineUsers, isUserOnline } = require('../services/redis.service');
const { authMiddleware } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Online
 *   description: Online kullanıcı sorguları
 */

/**
 * @swagger
 * /online-users:
 *   get:
 *     summary: Şu anda online olan kullanıcıları getir
 *     tags: [Online]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Online kullanıcı listesi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 onlineUsers:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.get('/online-users', authMiddleware, async (req, res) => {
  try {
    const users = await getOnlineUsers();
    res.status(200).json({ onlineUsers: users });
  } catch (err) {
    console.error('❌ Redis online user hatası:', err);
    res.status(500).json({ message: 'Redis bağlantı hatası' });
  }
});

/**
 * @swagger
 * /online-users/{userId}:
 *   get:
 *     summary: Belirli bir kullanıcının online olup olmadığını kontrol et
 *     tags: [Online]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcı ID'si
 *     responses:
 *       200:
 *         description: Kullanıcının online durumu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 online:
 *                   type: boolean
 */
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
