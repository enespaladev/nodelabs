const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Message
 *   description: Mesaj işlemleri
 */


/**
 * @swagger
 * /message/conversation/{id}:
 *   get:
 *     summary: Belirli bir konuşmadaki mesajları getir
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Konuşma ID'si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mesajlar listesi döner
 */
router.get('/:conversationId', authMiddleware, messageController.getMessagesByConversation);
/**
 * @swagger
 * /message:
 *   post:
 *     summary: Yeni bir mesaj gönder
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - conversationId
 *               - content
 *             properties:
 *               conversationId:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mesaj başarıyla gönderildi
 */
router.post('/', authMiddleware, messageController.sendMessage); // mesaj gönder

module.exports = router;
