const redis = require('redis');

let client;

exports.connectRedis = async () => {
  client = redis.createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  });

  client.on('error', (err) => console.error('Redis hatası:', err));
  client.on('connect', () => console.log('⚡ Redis bağlantısı başarılı'));

  await client.connect();
};

exports.getRedisClient = () => {
  if (!client) {
    throw new Error('Redis istemcisi başlatılmadı');
  }
  return client;
};
