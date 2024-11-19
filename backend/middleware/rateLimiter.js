const rateLimit = require("express-rate-limit");
const redisClient = require("../config/redisConfig");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  // redis
  store: new RedisStore({
    client: redisClient,
    prefix: "rate-limiting:",
    expire: 60 * 60 * 24,
  }),
});

module.exports = limiter;
