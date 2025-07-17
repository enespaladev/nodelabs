const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversation.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

router.post('/', authMiddleware, conversationController.createConversation);
router.get('/', authMiddleware, conversationController.getUserConversations);

module.exports = router;
