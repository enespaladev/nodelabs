// services/rabbitmq/consumer.js
const amqp = require("amqplib");
const AutoMessage = require("../../models/AutoMessage");
const Message = require("../../models/Message");

const QUEUE_NAME = "message_sending_queue";

const startConsumer = async (io) => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL || "amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });

  channel.consume(
    QUEUE_NAME,
    async (msg) => {
      if (msg !== null) {
        const content = JSON.parse(msg.content.toString());

        console.log("🔍 Gelen mesaj içeriği:", content);

        const savedMessage = await Message.create({
          sender: content.sender,
          recipient: content.recipient,
          content: content.content,
          conversationId: content.conversationId,
          timestamp: new Date(),
        });

        // socket.io ile alıcıya mesaj gönder
        io.to(content.recipient).emit("message_received", {
          conversationId: content.conversationId,
          sender: content.sender,
          content: content.content,
          createdAt: savedMessage.createdAt,
        });

        // AutoMessage kaydını güncelle
        await AutoMessage.updateOne(
          { _id: content.autoMessageId },
          { isSent: true }
        );

        channel.ack(msg);
      }
    },
    { noAck: false }
  );

  console.log("✅ RabbitMQ consumer started.");
};

module.exports = { startConsumer };
