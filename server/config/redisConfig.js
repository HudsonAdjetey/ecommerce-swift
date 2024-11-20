const { createClient } = require("redis");

const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,

  socket: {
    host: "redis-13984.c1.asia-northeast1-1.gce.redns.redis-cloud.com",
    port: process.env.REDIS_PORT || 13984,
  },
});

redisClient.on("error", (error) => {
  console.error("Error connecting to Redis:", error);
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;
