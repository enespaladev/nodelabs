const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 5, // 5 istekten fazla olursa engelle
  message: "Çok fazla deneme yaptınız. Lütfen 15 dakika sonra tekrar deneyin.",
});

module.exports = { authLimiter };
