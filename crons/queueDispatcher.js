// crons/queueDispatcher.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const AutoMessage = require("../models/AutoMessage");
const { publishToQueue } = require("../services/rabbitmq/producer");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once("open", async () => {
  console.log("MongoDB connected - Queue Dispatcher");

  const now = new Date();
  const messages = await AutoMessage.find({
    sendDate: { $lte: now },
    isQueued: false
  });

  for (const msg of messages) {
    await publishToQueue(msg);
    msg.isQueued = true;
    await msg.save();
  }

  console.log(`Queued ${messages.length} messages.`);
  mongoose.disconnect();
});
