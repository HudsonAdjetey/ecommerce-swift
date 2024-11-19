const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const logEvent = async (msg, fileName) => {
  const timeStamp = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
  const logEntry = `${timeStamp} ${uuid()} ${fileName}\n`;

  try {
    const logFilePath = path.join(__dirname, "..", logs);
    if (!fs.existsSync(logFilePath)) {
      await fsPromises.mkdir(logFilePath);
    }
    await fsPromises.appendFile(path.join(logFilePath, fileName), logEntry);
  } catch (error) {
    console.error("Error writing to log file:", error?.message);
  }
};

const logger = (req, res, next) => {
  const startTime = Date.now();
  const fileName = `access-${format(new Date(), "yyyy-MM-dd")}.log`;

  logEvent("Request started", fileName);
  console.log(`${req.method} - ${req.path}`);
};

module.exports = { logger, logEvent };
