const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const dbConnection = require('./controllers/db');
const app = express();
dotenv.config({ path: './config.env' });

// Middlewares
app.use(cors());
// Body Parser
app.use(express.json());

// DB Connection
dbConnection();

// template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// serving static file
app.use(express.static(path.join(__dirname, 'public')));

// students api route
app.use('/student', require('./routes/userRoutes'));

const PORT = 7000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}...`);
});
