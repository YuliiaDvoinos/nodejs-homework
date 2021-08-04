//web server
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const api = require("./routes/api");
require("./configs/passport-config");

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/api/contacts", api.contacts);
app.use("/api/auth", api.auth);
app.use((_, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Not found",
  });
});

app.use((error, _, res, __) => {
  const { code = 500, message = "server error" } = error;
  res.status(code).json({
    status: "fail",
    code,
    message,
  });
});

// database
const mongoose = require("mongoose");
require("dotenv").config();

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connect"))
  .catch((error) => console.log(error));

module.exports = app;
