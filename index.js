const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require("mongoose");
const DBconnect = require("./config/connection.js");
const userrouter = require("./routes/userrouter.js");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan("tiny"));
app.use("/", userrouter);

DBconnect();

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
