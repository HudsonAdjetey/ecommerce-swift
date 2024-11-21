require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const { logger } = require("./middleware/logger");
const connectDB = require("./config/dbConfig");
const { notFound, customErrorHandler } = require("./middleware/errorHandler");
const initializeSubscribers = require("./entry");
const limiter = require("./middleware/rateLimiter");
const sessionRequest = require("./utils/session");
const { clerkMiddleware } = require("@");
// database connection configuration
connectDB();

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(helmet());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(sessionRequest);

app.use(logger);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

initializeSubscribers();

app.use(limiter);

app.use(clerkMiddleware());

// app.use(notFound());
// app.use(customErrorHandler());

const PORT = process.env.PORT || 5914;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
