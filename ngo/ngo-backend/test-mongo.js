require("dotenv").config();

const mongoose = require("mongoose");

async function test() {
  try {
    console.log("Testing MongoDB connection...");

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000
    });

    console.log("MongoDB connection successful!");

    await mongoose.disconnect();
  } catch (error) {
    console.log("MongoDB connection failed:");
    console.log(error);
  }
}

test();