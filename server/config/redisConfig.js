const { createClient } = require("redis");

const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: "redis-11411.c276.us-east-1-2.ec2.redns.redis-cloud.com",
    port: process.env.REDIS_PORT || 11411,
  },
  retryStrategy: (times) => {
    // Exponential backoff strategy for retrying connections
    const delay = Math.min(times * 100, 6000);
    console.log(`Retrying connection to Redis in ${delay}ms`);

    return delay;
  },
});

redisClient.on("error", (error) => {
  console.error("Error connecting to Redis:", error.message);
});

redisClient.on("connect", () => {
  console.log("Successfully connected to Redis");
});

redisClient.on("end", () => {
  console.log("Connection to Redis ended");
});

redisClient.on("reconnecting", () => {
  console.log("Reconnecting to Redis...");
});

redisClient.on("ready", () => {
  console.log("Redis client is ready to use");
});

// Ensuring a graceful shutdown and cleanup
process.on("SIGINT", async () => {
  console.log("Shutting down Redis client...");
  await redisClient.quit();
  process.exit();
});

// Ensure the Redis client connects when the app starts
const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error("Failed to connect to Redis:", error.message);
    setTimeout(connectRedis, 5000);
  }
};

connectRedis();

module.exports = redisClient;
