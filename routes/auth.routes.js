const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { authLimiter } = require('../middlewares/rateLimit.middleware');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Kimlik doğrulama işlemleri
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Yeni kullanıcı kaydı
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Kullanıcı başarıyla oluşturuldu
 *       400:
 *         description: Geçersiz istek
 */
router.post('/register', authLimiter, authController.register);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Kullanıcı girişi yap
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Başarılı giriş
 *       401:
 *         description: Geçersiz kimlik bilgisi
 */
router.post('/login', authLimiter, authController.login);
/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Access token yenileme
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Yeni access token döner
 *       401:
 *         description: Refresh token geçersiz veya süresi dolmuş
 */
router.post('/refresh', authController.refresh);
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Oturum kapatma
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Başarıyla çıkış yapıldı
 */
router.post('/logout', authController.logout);
/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Giriş yapan kullanıcının bilgilerini getir
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Kullanıcı bilgileri
 *       401:
 *         description: Yetkisiz (token geçersiz veya eksik)
 */
router.get('/me', authMiddleware, authController.me);

module.exports = router;
