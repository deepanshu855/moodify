const mongoose = require("mongoose");

const songSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
    default:
      "https://static.vecteezy.com/system/resources/thumbnails/024/677/947/small/music-3d-icon-free-png.png",
  },
  title: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    enum: {
      values: ["sad", "happy", "surprise", "neutral"],
    },
  },
});

const songModel = mongoose.model("songs", songSchema);
module.exports = songModel;
