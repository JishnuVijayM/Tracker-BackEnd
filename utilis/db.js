const mongoose = require("mongoose");
require("dotenv").config();

//connect to database
const URI = process.env.DB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("Connected to DB");
  } catch (error) {
    console.log(error,"Error connecting to Mongo");
  }
};

module.exports = connectDb;
