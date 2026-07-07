const mongoose = require("mongoose");

const historySchema = mongoose.Schema(
  {
    mood: {
      type: String,
      required: [true, "Mood is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "UserId is required"],
    },
  },
  { timestamps: true },
);

const historyModel = mongoose.model("history", historySchema);
module.exports = historyModel;
