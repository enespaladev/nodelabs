const { Client } = require('@elastic/elasticsearch');

const elasticClient = new Client({
  node: 'http://elasticsearch:9200',
  // auth eklemek istersen: auth: { username: 'elastic', password: 'your_password' }
});

(async () => {
  const exists = await elasticClient.indices.exists({ index: 'messages' });
  if (!exists) {
    await elasticClient.indices.create({
      index: 'messages',
      mappings: {
        properties: {
          conversationId: { type: 'keyword' },
          sender: { type: 'keyword' },
          content: { type: 'text' },
          createdAt: { type: 'date' },
        }
      }
    });
    console.log('📁 ElasticSearch: messages indexi oluşturuldu');
  }
})();

module.exports = elasticClient;
