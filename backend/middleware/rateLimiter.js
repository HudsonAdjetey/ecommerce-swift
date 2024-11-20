const rateLimit = require("express-rate-limit");
const { logEvent } = require("./logger");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, options) => {
    logEvent(
      `Rate limit exceeded ${options?.message}\t${req.method}`,
      errorLog.log
    )
  }
});

module.exports = limiter;
