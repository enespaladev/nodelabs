// utils/logger.js
const { createLogger, transports, format } = require('winston');

const logger = createLogger({
  level: 'info', // dev ortamıysa "debug" yapabilirsin
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()} - ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // terminale logla
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

module.exports = logger;
