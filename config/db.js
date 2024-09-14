const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, skip trying IPv6
    });
    console.log("MongoDB Connected successfully".america.bold);
  } catch (error) {
    console.error("Error connecting to MongoDB:".red.bold, error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
