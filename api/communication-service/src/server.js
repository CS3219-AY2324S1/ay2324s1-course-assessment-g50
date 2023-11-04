require('dotenv').config()
const express = require('express')
const app = express()

// Middlewares
app.use(express.json())
const session = require('express-session');
const sessionConfig = require('./configs/sessionConfigs');
app.use(session(sessionConfig))

// Routes:
const routes = require('./routes/communicationRoutes');
app.use('/messages', routes)

// DB:
const db = require('./db/mongodb');

// Start the server
async function startServer() {
  try {
    await db.connectToMongoDB()
    console.log("MongoDB Initialized Successfully")

    const PORT = process.env.PORT
    app.listen(PORT, () => {
      console.log(`Communication server started on ${PORT}`)
    })
  } catch (error) {
    console.error('Error starting communication server: ', error)
  }
}

startServer()