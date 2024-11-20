const { createClient } = require("redis");

const redisClient = createClient({
  password: "X9LvwWfnTKuzPcmUIJVsDjgMeoKKOHvO",
  socket: {
    host: "redis-13984.c1.asia-northeast1-1.gce.redns.redis-cloud.com",
    port: 13984,
  },
});
redisClient.on("error", (err) => {
  console.log("Redis connection error: ", err);
});
redisClient.on("connect", () => {
  console.log("Redis connection established");
});
(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;
