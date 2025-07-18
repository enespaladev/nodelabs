const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
  {
    participantIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
      },
    ],
  },
  { timestamps: true }
);

// Her iki kullanıcının kombinasyonunu benzersiz kılmak için (bonus öneri):
conversationSchema.index({ participantIds: 1 });

module.exports = mongoose.model('Conversation', conversationSchema);
