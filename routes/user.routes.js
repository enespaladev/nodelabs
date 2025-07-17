const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Kullanıcı işlemleri
 */

/**
 * @swagger
 * /user/list:
 *   get:
 *     summary: Sistemdeki tüm kullanıcıları getir
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Kullanıcı listesi döner
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       username:
 *                         type: string
 *                       email:
 *                         type: string
 */
router.get('/list', authMiddleware, userController.listUsers);

module.exports = router;
