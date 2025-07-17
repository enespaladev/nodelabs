const jwt = require('jsonwebtoken');
const { redisClient } = require('../services/redis.service');
const Message = require("../models/Message");

const connectedUsers = new Map();

exports.socketHandler = (io) => {
  console.log('socketHandler yükleniyor...');

  io.use((socket, next) => {
    console.log('Middleware tetiklendi');
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Token gerekli'));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      socket.userId = decoded.id;
      next();
    } catch (err) {
      return next(new Error('Geçersiz token'));
    }
  });

  io.on('connection', async (socket) => {
    const userId = socket.user.id;

    connectedUsers.set(userId, socket.id);
    await redisClient.sAdd('online_users', userId);

    console.log(`${userId} bağlandı (${socket.id})`);

    io.emit('user_online', userId);

    socket.on('join_room', (roomId) => {
      socket.join(roomId);
      console.log(`${userId} -> ${roomId} odasına katıldı`);
    });

    socket.on("send_message", async ({ conversationId, content }) => {
      try {
        console.log("Mesaj kaydediliyor...");
        console.log("🔐 Socket user ID:", socket.userId);
        // 1. Veritabanına mesaj kaydet
        const newMessage = await Message.create({
          conversationId,
          sender: socket.userId,
          content,
        });
    
        // 2. Odaya mesaj yayınla
        io.to(conversationId).emit("message_received", {
          conversationId,
          sender: newMessage.sender,
          content: newMessage.content,
          createdAt: newMessage.createdAt,
        });
    
      } catch (err) {
        console.error("send_message hatası:", err.message);
        socket.emit("error", { message: "Mesaj gönderilemedi." });
      }
    });

    socket.on('disconnect', async () => {
      connectedUsers.delete(userId);
      await redisClient.sRem('online_users', userId);
      io.emit('user_offline', userId);
      console.log(`❌ ${userId} bağlantısı koptu`);
    });
    
    // TYPING EVENTS
    socket.on('typing', ({ conversationId }) => {
      socket.to(conversationId).emit('user_typing', { userId });
    });
  
    socket.on('stop_typing', ({ conversationId }) => {
      socket.to(conversationId).emit('user_stop_typing', { userId });
    });
  
    // READ RECEIPT
    socket.on('message_read', ({ messageId, conversationId }) => {
      io.to(conversationId).emit('message_read_receipt', {
        messageId,
        readerId: userId,
        readAt: new Date()
      });
    });
  });
};
