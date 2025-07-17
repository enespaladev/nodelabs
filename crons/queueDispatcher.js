// crons/queueDispatcher.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const AutoMessage = require("../models/AutoMessage");
const { init, publishToQueue } = require("../services/rabbitmq/producer"); // init'i import ettik

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.once("open", async () => {
  console.log("MongoDB connected - Queue Dispatcher");

  try {
    const now = new Date();
    const messages = await AutoMessage.find({
      sendDate: { $lte: now },
      isQueued: false
    });

    // RabbitMQ bağlantısını başlat
    await init(); // init fonksiyonunu çağırıyoruz

    for (const msg of messages) {
      console.log("Processing message:", msg._id);
      
      await publishToQueue({
        autoMessageId: msg._id.toString(), 
        sender: msg.sender.toString(),
        recipient: msg.recipient.toString(),
        content: msg.content,
        conversationId: msg.conversationId
      });
      
      msg.isQueued = true;
      await msg.save();
      console.log(`Message ${msg._id} queued successfully`);
    }

    console.log(`✅ ${messages.length} messages queued.`);
  } catch (error) {
    console.error("❌ Error in queue dispatcher:", error);
  } finally {
    mongoose.disconnect();
  }
});