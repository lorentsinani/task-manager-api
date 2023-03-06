const mongoose = require("mongoose");
const mongodburl = process.env.mongodburl;
mongoose.connect(
  mongodburl,
);
