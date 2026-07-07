require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/auth.route");
const songRouter = require("./routes/song.routes");
const historyRouter = require("./routes/history.route");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/songs", songRouter);
app.use("/api/history", historyRouter);

module.exports = app;
