const dotenv = require('dotenv');
const fs = require('fs');
const mongoose = require('mongoose');
const User = require('../models/User');

dotenv.config({ path: './config.env' });

// This is to load all the student data into Database & also to delete all the data from the Database if required

// console.log('DB', process.env.DATABASE);
const DB = 'mongodb://localhost/time_table';

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

// READ_FILE
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

// Import Data into DB

const importData = async () => {
  try {
    await User.create(users, { validateBeforeSave: false });
    console.log('Data Successfully Created');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all data from collection

const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log('Data deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
