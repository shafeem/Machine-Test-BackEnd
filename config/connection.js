const mongoose = require("mongoose");
const dotenv = require("dotenv");

mongoose.set("strictQuery", false);

dotenv.config({ path: "./.env" });

const DB = process.env.DATABASE_URL;

const DBconnect = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
    });
    console.log("Database Connection Established");
  } catch (error) {
    console.error("Error connecting to database:", error.message);
  }
};

module.exports = DBconnect;

