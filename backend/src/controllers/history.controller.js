const historyModel = require("../models/history.model");

const getHistory = async (req, res) => {
  const userId = req.user.id;

  const history = await historyModel.find({
    user: userId,
  });

  if (!history) {
    return res.status(200).json({
      message: "No History found!",
    });
  }

  res.status(200).json({
    message: "History fetched successfully.",
    history,
  });
};

const createHistory = async (req, res) => {
  const { mood } = req.body;
  const userId = req.user.id;

  const allowedMoods = ["happy", "sad", "surprise"];
  if (!allowedMoods.includes(mood)) {
    return res.status(400).json({
      message: "Not a valid mood",
    });
  }

  const history = await historyModel.create({
    mood,
    user: userId,
  });

  res.status(201).json({
    message: "History created",
    history,
  });
};

module.exports = {
  getHistory,
  createHistory,
};
