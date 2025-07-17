const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversation.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { createConversationValidator } = require('../middlewares/validators/conversationValidator');
const validate  = require('../middlewares/validators/validate');

/**
 * @swagger
 * tags:
 *   name: Conversation
 *   description: Konuşma işlemleri
 */

/**
 * @swagger
 * /conversation:
 *   post:
 *     summary: Yeni bir konuşma oluştur
 *     tags: [Conversation]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               participantIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Konuşma başarıyla oluşturuldu
 */
router.post(
    '/', 
    authMiddleware, 
    ...createConversationValidator, 
    validate, 
    conversationController.createConversation
);
/**
 * @swagger
 * /conversation:
 *   get:
 *     summary: Kullanıcının tüm konuşmalarını getir
 *     tags: [Conversation]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Kullanıcının konuşmaları
 */
router.get('/', authMiddleware, conversationController.getUserConversations);

module.exports = router;
