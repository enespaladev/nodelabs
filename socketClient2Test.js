const { io } = require("socket.io-client");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzhhOTIyYWFhNGRkNTE3MmQ3OWJiOSIsImlhdCI6MTc1Mjc2OTkyOSwiZXhwIjoxNzUyNzczNTI5fQ.kQbUqoKqUzbZGE1xgAFG7ddhlCOEnVeEzXf7RBoVmBc";
const conversationId = "6878a922aaa4dd5172d79bb9";

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
