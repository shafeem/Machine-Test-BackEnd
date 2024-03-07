const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config({ path: "./.env" });

// Set up MongoDB connection URI
const DB = process.env.DATABASE_URL;

const DBconnect = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true, // Remove this line
      useUnifiedTopology: true,
    });
    console.log("Database Connection Established");
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = DBconnect;

