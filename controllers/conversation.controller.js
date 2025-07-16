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
