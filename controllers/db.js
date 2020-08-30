const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });

const dbConnection = async () => {
  // DB connection
  const DB = process.env.DATABASE;

  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('DB connected successfully!');
    });
};

module.exports = dbConnection;
