// services/rabbitmq/producer.js
const amqp = require("amqplib");

const QUEUE_NAME = "message_sending_queue";

const publishToQueue = async (message) => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL || "amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });

  channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)), {
    persistent: true
  });

  setTimeout(() => {
    channel.close();
    connection.close();
  }, 500);
};

module.exports = {
  publishToQueue
};
