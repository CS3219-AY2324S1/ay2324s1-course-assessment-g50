require('dotenv').config()
const express = require('express')
const cors = require('cors');
const app = express()

// Middlewares
app.use(express.json())
app.use(cors)
const session = require('express-session');
const sessionConfig = require('./configs/sessionConfigs');
app.use(session(sessionConfig))

// Routes:
const routes = require('./routes/userRoutes');
app.use('/users', routes)

// DB:
const mySQLDB = require('./db/mysql/mysql');

// Start the server
async function startServer() {
  try {
    await mySQLDB.sequelize.sync()
    console.log("MySQL Initialized successfully")

    const PORT = process.env.PORT
    app.listen(PORT, () => {
      console.log(`User server started on ${PORT}`)
    })
  } catch (error) {
    console.error('Error starting user server: ', error)
  }
}

startServer()