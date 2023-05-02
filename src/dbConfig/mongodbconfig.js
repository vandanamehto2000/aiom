const mongoose = require("mongoose");
require("dotenv").config();
let MONGO_URI = "";
if (process.env.MONGO_DATABASE_USERNAME == "") {
  MONGO_URI = `mongodb://${process.env.MONGO_DATABASE_HOST}:27017/${process.env.MONGO_DATABASE_DATABASE}`;
} else {
  MONGO_URI = `mongodb://${process.env.MONGO_DATABASE_USERNAME}:${process.env.MONGO_DATABASE_PASSWORD}@${process.env.MONGO_DATABASE_HOST}:27017/${process.env.MONGO_DATABASE_DATABASE}?authSource=admin&authMechanism=SCRAM-SHA-1`;
}

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("Successfully connected to database!");
  })
  .catch((error) => {
    console.log("database connection failed. exiting now...", error);
    process.exit(1);
  });
// mongoose.set("debug", (collectionName, method, query, doc) => {
//   console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
// });
mongoose.Promise = global.Promise;
let mongodb = mongoose.connection;
module.exports = mongodb;
