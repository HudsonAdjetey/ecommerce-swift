const { logEvent } = require("./logger");

const notFound = (req, res, next) => {
  const error = new Error(`Not found ${req.pathname}`);
  error.status = 404;
  next(error);
};

const customErrorHandler = (err, req, res, next) => {
  let statusCode = req.statusCode === 200 ? 500 : req.statusCode;
  let message = err.message;

  switch (err) {
    case err.name === "CastError" && err.kind === "ObjectId":
      message = "Invalid ID";
      statusCode = 400;
      break;
    case err.name === "ValidationError":
      message = "Invalid request data";
      statusCode = 400;
      break;
    // duplicate keys
    case err.code === 11000 || err.name === "MongoError":
      message = "Duplicate key error";
      statusCode = 400;
      break;
    // unauthorized error
    case err.name === "UnauthorizedError":
      message = "Unauthorized";
      statusCode = 401;
      break;
    // Forbidden error
    case err.name === "ForbiddenError":
      message = "Forbidden";
      statusCode = 403;
      break;
    // other errors
    default:
      message = "Internal Server Error";
      statusCode = 500;
      break;
  }

  logEvent(
    `${err.message}\t${req.method}\t${req.pathname}\t${statusCode}`,
    "errorLog.log"
  );

  res.status(statusCode).json({
    message,
    stack: process.env === "production" ? null : err.stack,
  });
};

module.exports = {
  notFound,
  customErrorHandler,
};
