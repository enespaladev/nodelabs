const { io } = require("socket.io-client");

// Kullanıcı bilgileri (örnek token ve kullanıcı ID'leri test için ayarlanmalı)
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzhhOGNmYWFhNGRkNTE3MmQ3OWJiNiIsImlhdCI6MTc1MjczNzk5OSwiZXhwIjoxNzUyNzQxNTk5fQ.Uezr0KYdOzjFKsazEMVIO-qjUrQKNv_ZwoxkH6qB03s"; // Buraya geçerli bir JWT token yaz
const userId = "6878a8cfaaa4dd5172d79bb6"; // Kullanıcı ID'si

// Socket bağlantısı başlat
const socket = io("http://localhost:5000", {
  auth: {
    token,
  },
});

socket.on("connect", () => {
  console.log("✅ Socket bağlandı");

  const conversationId = "6878ada76b6f1d074b82f6df"; // Test edilecek konuşma ID'si

  socket.emit("join_room", conversationId);

  // 1. Mesaj gönder
  socket.emit("send_message", {
    conversationId,
    content: "Merhaba bu bir test mesajıdır!",
  });

  // 2. Yazma başlat
  socket.emit("typing", { conversationId });

  // 3. Yazma durdur
  setTimeout(() => {
    socket.emit("stop_typing", { conversationId });
  }, 2000);

  // 4. Mesaj okundu bilgisi gönder
  setTimeout(() => {
    socket.emit("message_read", {
      messageId: "MESSAGE_ID", // Okundu bilgisi gönderilecek mesaj ID'si
      conversationId,
    });
  }, 4000);
});

// Gelen olayları dinle
socket.on("message_received", (msg) => {
  console.log("📥 Yeni mesaj alındı:", msg);
});

socket.on("user_typing", ({ userId }) => {
  console.log(`✍️ ${userId} yazıyor...`);
});

socket.on("user_stop_typing", ({ userId }) => {
  console.log(`💤 ${userId} yazmayı durdurdu.`);
});

socket.on("message_read_receipt", (data) => {
  console.log("✅ Mesaj okundu:", data);
});