// services/rabbitmq/consumer.js
const amqp = require("amqplib");
const AutoMessage = require("../../models/AutoMessage");
const Message = require("../../models/Message");
const io = global.io;

const QUEUE_NAME = "message_sending_queue";

const startConsumer = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL || "amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });

  channel.consume(QUEUE_NAME, async (msg) => {
    if (msg !== null) {
      const content = JSON.parse(msg.content.toString());

      const savedMessage = await Message.create({
        sender: content.sender,
        receiver: content.receiver,
        content: content.content,
        timestamp: new Date()
      });

      io.to(content.receiver).emit("message_received", savedMessage);

      await AutoMessage.updateOne(
        { sender: content.sender, receiver: content.receiver, content: content.content },
        { isSent: true }
      );

      channel.ack(msg);
    }
  }, {
    noAck: false
  });

  console.log("RabbitMQ consumer started.");
};

module.exports = {
  startConsumer
};
