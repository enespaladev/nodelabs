const jwt = require('jsonwebtoken');
const { getRedisClient } = require('../config/redis');

const connectedUsers = new Map();

exports.socketHandler = (io) => {
  console.log('🧠 socketHandler yükleniyor...');
  io.use((socket, next) => {
    console.log('🔥 Middleware tetiklendi');
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Token gerekli'));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (err) {
      return next(new Error('Geçersiz token'));
    }
  });

  io.on('connection', async (socket) => {
    console.log('✅ Socket bağlantısı kuruldu');
    const userId = socket.user.id;
    const redis = getRedisClient();

    connectedUsers.set(userId, socket.id);
    await redis.sAdd('online_users', userId);

    console.log('🔌 Yeni bağlantı geldi');
    console.log(`🔌 ${userId} bağlandı (${socket.id})`);

    io.emit('user_online', userId);

    socket.on('join_room', (roomId) => {
      socket.join(roomId);
      console.log(`${userId} -> ${roomId} odasına katıldı`);
    });

    socket.on('send_message', ({ conversationId, content }) => {
      const message = {
        conversationId,
        sender: userId,
        content,
        createdAt: new Date(),
      };

      io.to(conversationId).emit('message_received', message);
    });

    socket.on('disconnect', async () => {
      connectedUsers.delete(userId);
      await redis.sRem('online_users', userId);
      io.emit('user_offline', userId);
      console.log(`❌ ${userId} bağlantısı koptu`);
    });
  });
};
