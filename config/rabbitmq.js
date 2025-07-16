const amqp = require('amqplib');

let channel;

exports.initRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();

    // Kuyruk oluştur
    await channel.assertQueue('message_sending_queue', { durable: true });

    console.log('📡 RabbitMQ bağlantısı başarılı');
  } catch (err) {
    console.error('RabbitMQ bağlantı hatası:', err.message);
  }
};

exports.getRabbitChannel = () => {
  if (!channel) {
    throw new Error('RabbitMQ kanalı henüz başlatılmadı');
  }
  return channel;
};
