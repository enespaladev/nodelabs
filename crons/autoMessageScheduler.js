const cron = require("node-cron");
const AutoMessage = require("../models/AutoMessage");
const User = require("../models/User");
const Conversation = require("../models/Conversation");
const { connectDB } = require("../config/db");
require("dotenv").config();

const getRandomMessage = () => {
  const messages = [
    "Selam! Umarım günün güzel geçiyordur",
    "Merhaba, nasılsın?",
    "Bugün harika görünüyorsun!",
    "Kod yazmak gibisi yok!"
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const planAutoMessages = async () => {
  const users = await User.find({});
  const shuffled = shuffleArray(users);

  for (let i = 0; i < shuffled.length - 1; i += 2) {
    const sender = shuffled[i];
    const recipient = shuffled[i + 1];

    let conversation = await Conversation.findOne({
      participants: { $all: [sender._id, recipient._id] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender._id, recipient._id],
      });
    }

    await AutoMessage.create({
      sender: sender._id,
      recipient: recipient._id,
      conversationId: conversation._id,
      content: getRandomMessage(),
      sendDate: new Date(), // şu an için hemen gönderilsin
    });
  }

  console.log("AutoMessages planned.");
};

// ⏰ Her gece saat 02:00'de çalıştır
cron.schedule("0 2 * * *", async () => {
  console.log("⏰ AutoMessage cron job started...");
  await planAutoMessages();
});

// Test amaçlı hemen çalıştır
(async () => {
  await connectDB(); // <--- MongoDB bağlantısını başlat
  await planAutoMessages();
})();