const logger = require('../config/logger');
const Sentry = require('@sentry/node');

const errorMiddleware = (err, req, res, next) => {
  Sentry.captureException(err);

  // Log detaylı hata bilgisi
  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Sunucu hatası',
  });
};

module.exports = errorMiddleware;
