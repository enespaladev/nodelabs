const { io } = require("socket.io-client");

// Kullanıcı bilgileri (örnek token ve kullanıcı ID'leri test için ayarlanmalı)
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzdkMDFmZjQ1OGMxYWQ0ZjM0ZGM5MCIsImlhdCI6MTc1MjY4OTYyMiwiZXhwIjoxNzUyNjkzMjIyfQ.Lyv0V4dNrph6xdOOw6gnCeRuU43JR98ipFnWGM1jdLc"; // Buraya geçerli bir JWT token yaz
const userId = "6877d01ff458c1ad4f34dc90"; // Kullanıcı ID'si

// Socket bağlantısı başlat
const socket = io("http://localhost:5000", {
  auth: {
    token,
  },
});

socket.on("connect", () => {
  console.log("✅ Socket bağlandı");

  const conversationId = "6877f737f1e1cf4ff9f1e5e7"; // Test edilecek konuşma ID'si

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