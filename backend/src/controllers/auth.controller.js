const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  if (!req.body) {
    return res.status(422).json({
      message: "Details not recieved",
    });
  }

  const { username, email, password } = req.body;

  const isUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUser) {
    return res.status(409).json({
      message: "user already exists",
      isUser: {
        id: isUser._id,
        username,
        email,
      },
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User register successfully.",
    user: {
      id: user._id,
      username,
      email,
    },
  });
};

const loginController = async (req, res) => {
  if (!req.body) {
    return res.status(422).json({
      message: "Details not recieved",
    });
  }

  const { username, email, password } = req.body;

  const isUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!isUser) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const isValidPass = await bcrypt.compare(password, isUser.password);

  if (!isValidPass) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      id: isUser._id,
      username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: isUser._id,
      username,
      email,
    },
  });
};

module.exports = {
  registerController,
  loginController,
};
