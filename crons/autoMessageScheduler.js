// crons/autoMessageScheduler.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { generateAutoMessages } = require("../services/autoMessage.service");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once("open", async () => {
  console.log("MongoDB connected - Auto Message Scheduler");
  await generateAutoMessages();
  console.log("Auto messages created.");
  mongoose.disconnect();
});
