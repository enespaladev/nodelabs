const { io } = require("socket.io-client");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzdkMDFmZjQ1OGMxYWQ0ZjM0ZGM5MCIsImlhdCI6MTc1MjY5NDUwOCwiZXhwIjoxNzUyNjk4MTA4fQ.NL6w-shMBwjQR2WyImC8pKlwuC21ykquY_XAI9JN9ps";
const conversationId = "6877ff4ad356c5e8687d84b7";

const socket = io("http://localhost:5000", {
  auth: { token },
});

socket.on("connect", () => {
  console.log("🧑‍💼 [User1] Bağlandı");
  socket.emit("join_room", conversationId);

  // Birkaç saniye sonra mesaj göndersin
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
