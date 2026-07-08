require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

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
app.use(express.static(path.join(__dirname, "..", "public")));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/songs", songRouter);
app.use("/api/history", historyRouter);

// Wild card route to integrate frontend
app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
