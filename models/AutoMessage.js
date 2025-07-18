const mongoose = require('mongoose');

const autoMessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    content: {
      type: String,
      required: true,
    },
    sendDate: {
      type: Date,
      required: true,
      index: true
    },
    isQueued: {
      type: Boolean,
      default: false,
      index: true
    },
    isSent: {
      type: Boolean,
      default: false,
      index: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AutoMessage', autoMessageSchema);
