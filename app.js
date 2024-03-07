const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const userrouter = require("./routes/userrouter");

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: "Content-Type,Authorization",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "2MB" }));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/", userrouter);

module.exports = app;