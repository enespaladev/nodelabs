const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const elasticClient = require('../config/elastic');

exports.getMessagesByConversation = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    }).populate('sender', 'username');

    res.json(messages);
  } catch (err) {
    const error = new Error('Mesajlar alınamadı');
    error.statusCode = 500;
    next(error);
  }
};

exports.sendMessage = async (req, res, next) => {
  try {
    const { conversationId, content } = req.body;

    const message = await Message.create({
      conversationId,
      sender: req.user.id,
      content,
    });

    await elasticClient.index({
      index: 'messages',
      document: {
        _id: message._id.toString(),
        conversationId: message.conversationId.toString(),
        sender: message.sender.toString(),
        content: message.content,
        createdAt: message.createdAt,
      },
    });

    res.status(201).json(message);
  } catch (err) {
    const error = new Error('Mesaj gönderilemedi');
    error.statusCode = 500;
    next(error);
  }
};
