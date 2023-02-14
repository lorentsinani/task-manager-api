// CRUD: Create, Read, Update, Delete
// While im using cloud mongodb i dont need this one i just run mongoose.js file
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const connectionURL =
  "mongodb+srv://tavnik1:lorzi127@udemynodejs.p5iv3qv.mongodb.net/?retryWrites=true&w=majority";
let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(connectionURL)
    .then((client) => {
      console.log("Connected");
      _db = client.db();
      callback(client);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

module.exports = mongoConnect;
module.exports = getDb;
