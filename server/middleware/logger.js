const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const logEvent = async (msg, fileName) => {
  const timeStamp = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
  const logEntry = `${timeStamp} - ${msg} ${uuid()} ${fileName}`;

  try {
    const filePath = path.join(__dirname, "..", "logs");

    if (!fs.existsSync(filePath)) {
      await fsPromises.mkdir(filePath);
    }
    await fsPromises.appendFile(path.join(filePath, fileName), logEntry);
  } catch (error) {
    console.error("Error writing to log file: ", error);
  }
};
const logger = (req, res, next) => {
  logEvent(`Starting ${req.method} ${req.pathname}`, "request.log");
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = {
  logger,
  logEvent,
};
