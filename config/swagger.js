// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nodelabs Backend API',
      version: '1.0.0',
      description: 'Gerçek zamanlı mesajlaşma sistemi için API dokümantasyonu',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Geliştirme sunucusu',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js', './models/*.js'], // Açıklama eklenecek dosyaların yolu
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
