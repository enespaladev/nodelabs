const { io } = require("socket.io-client");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzdmYjMxZjMzY2Y5MGYzM2ZkZmY5MCIsImlhdCI6MTc1MjY5NDE1NCwiZXhwIjoxNzUyNjk3NzU0fQ.SVksPEphDWavhHZWBeCEDZkVk2MQDABMSBGrUJ4UCnc";
const conversationId = "6877ff4ad356c5e8687d84b7";

const socket = io("http://localhost:5000", {
  auth: { token },
});

socket.on("connect", () => {
  console.log("👩‍💼 [User2] Bağlandı");
  socket.emit("join_room", conversationId);
});

socket.on("message_received", (msg) => {
  console.log("📥 [User2] Mesaj alındı:", msg);

  // Cevap olarak başka bir mesaj göndersin
  socket.emit("send_message", {
    conversationId,
    content: "Merhaba User1! Ben de buradayım 👋",
  });
});
