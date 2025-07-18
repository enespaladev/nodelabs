const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io');
const dotenv = require('dotenv');
const helmet = require('helmet');
const { connectDB } = require('./config/db');
const { connectRedis } = require('./services/redis.service');
const { startConsumer } = require('./services/rabbitmq/consumer');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const messageRoutes = require('./routes/message.routes');
const conversationRoutes = require('./routes/conversation.routes');
const { socketHandler } = require('./sockets/socketHandler');
require("./crons/autoMessageScheduler");
const onlineRoutes = require('./routes/online.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const logger = require('./config/logger');
const errorMiddleware = require('./middlewares/error.middleware');
const searchRoutes = require('./routes/search.routes');

const Sentry = require('@sentry/node');
const { nodeProfilingIntegration } = require("@sentry/profiling-node");

dotenv.config();

console.log('SERVER STARTING...');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
  },
});

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  sendDefaultPii: true,
  integrations: [
    nodeProfilingIntegration(),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  _experiments: { enableLogs: true },
  environment: process.env.NODE_ENV || 'development'
});

global.io = io;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/conversation', conversationRoutes);
app.use('/api', onlineRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/search', searchRoutes);

app.get('/', (req, res) => {
  res.send('Nodelabs Backend is running');
});

app.use(errorMiddleware);

app.get('/api/crash-test', (req, res) => {
  throw new Error("Sentry test hatası");
});

logger.info('Sunucu başlatılıyor...');

Sentry.setupExpressErrorHandler(app);

// Veritabanı ve servis bağlantıları
(async () => {
  await connectDB();
  await connectRedis();
  await startConsumer(io); // RabbitMQ Consumer başlat

  server.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server is running on port ${process.env.PORT || 5000}`);
  });
})();

socketHandler(io);
