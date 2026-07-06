const express = require("express");
const songController = require("../controllers/song.controller");
const upload = require("../middlewares/upload.middleware");

const songRouter = express.Router();

songRouter.post(
  "/",
  upload.single("song"),
  songController.uploadSongController,
);

songRouter.get("/", songController.getSongController);

module.exports = songRouter;
