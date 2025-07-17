const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io');
const dotenv = require('dotenv');
const helmet = require('helmet');
const { connectDB } = require('./config/db');
// const { connectRedis } = require('./config/redis');
const { connectRedis } = require('./services/redis.service');
const { initRabbitMQ } = require('./config/rabbitmq');
const { startConsumer } = require('./services/rabbitmq/consumer');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const messageRoutes = require('./routes/message.routes');
const conversationRoutes = require('./routes/conversation.routes');
const { socketHandler } = require('./sockets/socketHandler');
require("./crons/autoMessageScheduler");
const onlineRoutes = require('./routes/online.routes');
const rateLimit = require('express-rate-limit');

dotenv.config();

console.log('SERVER STARTING...');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
  },
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // Her IP için max 100 istek
  message: "Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyin.",
});

global.io = io;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/conversation', conversationRoutes);
app.use('/api', onlineRoutes);

// Root Test Route
app.get('/', (req, res) => {
  res.send('Nodelabs Backend is running');
});

// Veritabanı ve servis bağlantıları
(async () => {
  await connectDB();
  await connectRedis();
  await startConsumer(io); // RabbitMQ Consumer başlat

  server.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server is running on port ${process.env.PORT || 5000}`);
  });
})();

socketHandler(io);

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Sunucu ${PORT} portunda çalışıyor...`);
// });
