require('dotenv').config()
const express = require('express')
const app = express()

// Middlewares
app.use(express.json())
const session = require('express-session');
const sessionConfig = require('./configs/sessionConfigs');
app.use(session(sessionConfig))

// Routes:
const routes = require('./routes/userRoutes');
app.use('/users', routes)

// DB:
const mySQLDB = require('./db/mysql/mysql');
const mongoDB = require('./db/mongodb/mongodb')

// Start the server
async function startServer() {
  try {
    await mySQLDB.sequelize.sync()
    console.log("MySQL Initialized successfully")

    await mongoDB.connectToMongoDB()
    console.log("MongoDB Initialized Successfully")

    const PORT = process.env.PORT
    app.listen(PORT, () => {
      console.log(`User server started on ${PORT}`)
    })
  } catch (error) {
    console.error('Error starting user server: ', error)
  }
}

startServer()