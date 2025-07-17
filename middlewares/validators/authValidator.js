const { body } = require('express-validator');

exports.registerValidator = [
  body('username').notEmpty().withMessage('Kullanıcı adı zorunludur'),
  body('email').isEmail().withMessage('Geçerli bir email girin'),
  body('password').isLength({ min: 6 }).withMessage('Şifre en az 6 karakter olmalıdır'),
];

exports.loginValidator = [
  body('email').isEmail().withMessage('Geçerli bir email girin'),
  body('password').isLength({ min: 6 }).withMessage('Şifre en az 6 karakter olmalıdır'),
];
