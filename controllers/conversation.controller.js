const Conversation = require('../models/Conversation');

exports.getUserConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user.id,
    }).populate('participants', 'username email');

    res.json(conversations);
  } catch (err) {
    const error = new Error('Konuşmalar alınamadı');
    error.statusCode = 500;
    next(error);
  }
};

exports.createConversation = async (req, res) => {
  try {
    const currentUserId = req.user.id; // JWT'den gelen ID
    const { otherUserId } = req.body;

    // Aynı konuşma zaten var mı?
    const existing = await Conversation.findOne({
      participants: { $all: [currentUserId, otherUserId] },
    });

    if (existing) return res.status(200).json(existing);

    const conversation = new Conversation({
      participants: [currentUserId, otherUserId],
    });

    await conversation.save();
    res.status(201).json(conversation);
  } catch (err) {
    const error = new Error('Konuşma oluşturulamadı');
    error.statusCode = 500;
    next(error);
  }
};
