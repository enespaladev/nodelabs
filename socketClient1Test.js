const { io } = require("socket.io-client");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzhhOTIyYWFhNGRkNTE3MmQ3OWJiOSIsImlhdCI6MTc1Mjc4MTg1MCwiZXhwIjoxNzUyNzg1NDUwfQ.P2W5CC2XMPrUpirLpYcezeB0sVNMXkIV2OuVF6yRuK0"; // geçerli token
const conversationId = "6878ef3fb10474f2ff74eff9";

const socket = io("http://localhost:5000", {
  auth: { token },
});

socket.on("connect", () => {
  console.log("🧑‍💼 [User1] Bağlandı");
  socket.emit("join_room", conversationId);

  setTimeout(() => {
    socket.emit("send_message", {
      conversationId,
      content: "Selamlar, User2! Ben User1.",
    });
  }, 2000);
});

socket.on("message_received", (msg) => {
  console.log("📥 [User1] Mesaj alındı:", msg);
});

socket.on("connect_error", (err) => {
  console.error("❌ Bağlantı hatası:", err.message);
});
