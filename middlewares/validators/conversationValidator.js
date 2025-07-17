const { body } = require('express-validator');

exports.createConversationValidator = [
  body('participantIds')
    .isArray({ min: 2 }).withMessage('En az iki katılımcı ID’si gereklidir')
    .custom((ids) => {
      if (!ids.every(id => typeof id === 'string')) {
        throw new Error('Tüm katılımcı ID’leri string olmalıdır');
      }
      return true;
    }),
];
