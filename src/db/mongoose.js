const mongoose = require("mongoose");
const mongodburl = process.env.mongodburl;
mongoose.connect(
  "mongodb+srv://tavnik1:lorzi127@udemynodejs.p5iv3qv.mongodb.net/?retryWrites=true&w=majority"
);
