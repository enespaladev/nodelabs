// middlewares/validators/messageValidator.js
const { body } = require('express-validator');

exports.sendMessageValidator = [
  body('conversationId')
    .notEmpty().withMessage('Konuşma ID’si zorunludur')
    .isMongoId().withMessage('Geçerli bir Mongo ID girilmelidir'),

  body('content')
    .notEmpty().withMessage('Mesaj içeriği boş olamaz')
    .isLength({ max: 1000 }).withMessage('Mesaj en fazla 1000 karakter olabilir'),
];

exports.getMessagesValidator = [
    body('conversationId')
        .notEmpty().withMessage('Konuşma ID’si zorunludur')
        .isMongoId().withMessage('Geçerli bir Mongo ID girilmelidir'),
];
    