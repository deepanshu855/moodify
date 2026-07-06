const id3 = require("node-id3");
const storageService = require("../services/storage.service");
const songModel = require("../models/song.model");
const { mongoosePopulatedDocumentMarker } = require("mongoose");

const uploadSongController = async (req, res) => {
  const tags = id3.read(req.file.buffer);
  const { mood } = req.body;

  if (!mood || !tags) {
    return res.status(400).json({
      message: "Input not received",
    });
  }

  // Since they both are independent we upload them concurrently.
  const [songFile, postFile] = await Promise.all([
    storageService.uploadFile({
      buffer: req.file.buffer,
      fileName: tags.title,
      folder: "cohort-2/moodify/songs",
    }),

    storageService.uploadFile({
      buffer: tags.image.imageBuffer,
      fileName: tags.title,
      folder: "cohort-2/moodify/poster",
    }),
  ]);

  const song = await songModel.create({
    url: songFile.url,
    posterUrl: postFile.url,
    title: tags.title,
    mood,
  });

  res.status(201).json({
    message: "Song uploaded successfully",
    song,
  });
};

// This controller returns the song based on mood query.
const getSongController = async (req, res) => {
  const { mood } = req.query;

  const [song] = await songModel.aggregate([
    { $match: { mood } },
    { $sample: { size: 1 } },
  ]);

  if (!song) {
    return res.status(404).json({
      message: "No song found",
    });
  }

  res.status(200).json({
    message: "Song fetched successfully.",
    song,
  });
};

module.exports = {
  uploadSongController,
  getSongController,
};
