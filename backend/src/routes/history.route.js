const express = require("express");
const identifyUser = require("../middlewares/identifyUser");
const historyController = require("../controllers/history.controller");

const historyRouter = express.Router();

historyRouter.post("/", identifyUser, historyController.createHistory);
historyRouter.get("/", identifyUser, historyController.getHistory);

module.exports = historyRouter;
