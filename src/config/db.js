const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to the DB");
  } catch (error) {
    console.error("error:", error);
    console.log("Not connected to the DB");
  }
};

module.exports = { connectDB };
