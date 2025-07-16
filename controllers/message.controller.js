const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

exports.getMessagesByConversation = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    }).populate('sender', 'username');

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Mesajlar alınamadı', error: err.message });
  }
};

// Ekstra: Mesaj gönderme
exports.sendMessage = async (req, res) => {
  try {
    const { conversationId, content } = req.body;

    const message = await Message.create({
      conversationId,
      sender: req.user.id,
      content,
    });

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: 'Mesaj gönderilemedi', error: err.message });
  }
};
