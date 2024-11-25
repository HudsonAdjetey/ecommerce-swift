const express = require("express");
const { userAuthenticate } = require("../controller/authController");

const AuthRouter = express.Router();

AuthRouter.post("/authenticate", userAuthenticate);

module.exports = AuthRouter;
