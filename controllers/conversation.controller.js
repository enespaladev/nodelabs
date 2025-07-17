const Conversation = require('../models/Conversation');

exports.getUserConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user.id,
    }).populate('participants', 'username email');

    res.json(conversations);
  } catch (err) {
    res.status(500).json({ message: 'Konuşmalar alınamadı', error: err.message });
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
    res.status(500).json({ error: err.message });
  }
};
