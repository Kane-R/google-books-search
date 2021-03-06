const mongoose = require("mongoose");
require('dotenv/config');

const dbConfig = process.env.MONGODB_URI || "mongodb://localhost/googlebooksearchdb";


async function connectDB(){
  await mongoose.connect(dbConfig,{
      useNewUrlParser: true,
      useUnifiedTopology: true  
  }, () =>  
  console.log("Connected to DB")
);
}

module.exports = connectDB;