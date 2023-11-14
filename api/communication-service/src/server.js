require('dotenv').config()
const cors = require('cors');
const express = require('express')
const app = express()

// Middlewares
app.use(express.json())
app.use(cors)
const session = require('express-session');
const sessionConfig = require('./configs/sessionConfigs');
app.use(session(sessionConfig))

// Routes:
const routes = require('./routes/routes');
app.use('/chat', routes)

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
