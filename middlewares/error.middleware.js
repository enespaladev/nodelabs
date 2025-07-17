const logger = require('../config/logger'); // yolunu proje yapına göre ayarla

const errorMiddleware = (err, req, res, next) => {
  // Log detaylı hata bilgisi
  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Sunucu hatası',
  });
};

module.exports = errorMiddleware;
