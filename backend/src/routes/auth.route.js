const express = require("express");
const app = require("../app");
const authController = require("../controllers/auth.controller");
const identifyUser= require("../middlewares/identifyUser")

const authRouter = express.Router();

authRouter.post("/register", authController.registerController);
authRouter.post("/login", authController.loginController);
authRouter.get("/get-me", identifyUser, authController.getMeController);

module.exports = authRouter;
