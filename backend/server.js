require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const connectDB = require("./config/dbConfig");
const app = express();

connectDB().catch(console.dir);
app.use(express.json());
app.use(bodyParser.json());
// helmet
app.use(helmet());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 5914;

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
