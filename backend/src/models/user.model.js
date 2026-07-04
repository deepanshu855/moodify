const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username already exists"],
    required: true,
  },
  email: {
    type: String,
    unique: [true, "email already exists"],
    required: true,
  },
  password: {
    type: String,
    unique: [true, "email already exists"],
    required: true,
    select: false,
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
