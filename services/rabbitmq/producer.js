// services/rabbitmq/producer.js
const amqp = require("amqplib");

const QUEUE_NAME = "message_sending_queue";
let connection;
let channel;

// Yeni init fonksiyonu
const init = async () => {
  try {
    if (!connection) {
      connection = await amqp.connect(process.env.RABBITMQ_URL || "amqp://localhost");
      channel = await connection.createChannel();
      await channel.assertQueue(QUEUE_NAME, { durable: true });
      console.log("RabbitMQ bağlantısı başarılı");
    }
  } catch (error) {
    console.error("RabbitMQ bağlantı hatası:", error);
    throw error;
  }
};

const publishToQueue = async (message) => {
  try {
    // Bağlantı yoksa başlat
    if (!connection) await init();
    
    channel.sendToQueue(
      QUEUE_NAME, 
      Buffer.from(JSON.stringify(message)), 
      { persistent: true }
    );
    
    console.log("Mesaj kuyruğa gönderildi:", message.content);
  } catch (error) {
    console.error("Kuyruğa gönderim hatası:", error);
  }
};

// Uygulama kapanırken bağlantıyı kapat
process.on("exit", () => {
  if (connection) connection.close();
});

// init fonksiyonunu export ediyoruz
module.exports = {
  init,
  publishToQueue
};