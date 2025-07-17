// services/redis.service.js
const redis = require("redis");

const client = redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379"
});

client.on("error", (err) => {
  console.error("Redis connection error:", err);
});

client.on("connect", () => {
  console.log("Connected to Redis.");
});

const connectRedis = async () => {
  if (!client.isOpen) {
    await client.connect();
  }
};

// Set user as online
const addOnlineUser = async (userId) => {
  await client.sAdd("online_users", userId);
};

// Remove user from online list
const removeOnlineUser = async (userId) => {
  await client.sRem("online_users", userId);
};

// Get all online users
const getOnlineUsers = async () => {
  return await client.sMembers("online_users");
};

// Check if user is online
const isUserOnline = async (userId) => {
  return await client.sIsMember("online_users", userId);
};

module.exports = {
  connectRedis,
  addOnlineUser,
  removeOnlineUser,
  getOnlineUsers,
  isUserOnline,
  redisClient: client
};
