const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { authLimiter } = require('../middlewares/rateLimit.middleware');

router.post('/register', authLimiter, authController.register);
router.post('/login', authLimiter, authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);
router.get('/me', authMiddleware, authController.me);

module.exports = router;
