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
const { clerkMiddleware } = require("@clerk/express");
const CartRouter = require("./router/CartRouter");
const AuthRouter = require("./router/AuthRouter");
const CouponRouter = require("./router/CouponRouter");
const ProductRouter = require("./router/ProductUploadRouter");
const OrderRouter = require("./router/OrderRouter");
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

app.use(
  clerkMiddleware({
    publishableKey: "pk_test_cG9saXRlLW11dHQtMzMuY2xlcmsuYWNjb3VudHMuZGV2JA",
    secretKey: "sk_test_V0KEROMU0DYUSi5csrZWG8FBD0HagPFriqpm9OIW2M",
  })
);

app.use("/api/auth/", AuthRouter);
app.use("/api/cart/", CartRouter);
app.use("/api/coupon", CouponRouter);
app.use("/api/order", OrderRouter)
app.use("/", ProductRouter);
// app.use(notFound());
// app.use(customErrorHandler());

const PORT = process.env.PORT || 5914;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
