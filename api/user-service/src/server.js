require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors'); // Add this line

// Middlewares
app.use(express.json());
const session = require('express-session');
const sessionConfig = require('./configs/sessionConfigs');
app.use(session(sessionConfig));

// Enable CORS for a specific origin
app.use(cors({
  origin: 'http://35.198.214.47:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}));


// Routes
const routes = require('./routes/userRoutes');
app.use('/users', routes);

// DB
const mySQLDB = require('./db/mysql/mysql');

// Start the server
async function startServer() {
  try {
    await mySQLDB.sequelize.sync();
    console.log("MySQL Initialized successfully");

    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`User server started on ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting user server: ', error);
  }
}

startServer();
