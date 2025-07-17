// services/autoMessage.service.js
const AutoMessage = require("../models/AutoMessage");
const User = require("../models/User");

const getActiveUsers = async () => {
  return await User.find(); // burada aktiflik filtresi eklersen daha iyi olur
};

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const generateRandomMessage = () => {
  const messages = [
    "Merhaba!",
    "Nasılsın?",
    "Bugün nasıldı?",
    "Yazılım çalışıyor mu?",
    "Şaka şaka :)"
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};

const generateAutoMessages = async () => {
  const users = await getActiveUsers();
  const shuffled = shuffleArray(users);

  const messagePairs = [];
  for (let i = 0; i < shuffled.length - 1; i += 2) {
    const sender = shuffled[i];
    const recipient = shuffled[i + 1];

    const content = generateRandomMessage();
    const sendDate = new Date(); // gerçek senaryoda ileri saat olabilir

    messagePairs.push({
      sender: sender._id,
      recipient: recipient._id,
      content,
      sendDate,
      isQueued: false,
      isSent: false
    });
  }

  await AutoMessage.insertMany(messagePairs);
};

module.exports = {
  generateAutoMessages
};
