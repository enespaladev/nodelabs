const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

router.get('/:conversationId', authMiddleware, messageController.getMessagesByConversation);
router.post('/', authMiddleware, messageController.sendMessage); // mesaj gönder

module.exports = router;
