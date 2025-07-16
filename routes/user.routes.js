const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

router.get('/list', authMiddleware, userController.listUsers);

module.exports = router;
