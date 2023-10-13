require('dotenv').config()
const express = require('express')
const app = express()

// Middlewares
app.use(express.json())

// Routes:
const routes = require('./routes/questionRoutes');
app.use('/questions', routes)

// DB:
const db = require('./db/mongodb');

// Start the server
async function startServer() {
  try {
    await db.connectToMongoDB()
    console.log("MongoDB Initialized Successfully")

    const PORT = process.env.PORT
    app.listen(PORT, () => {
      console.log(`Question server started on ${PORT}`)
    })
  } catch (error) {
    console.error('Error starting question server: ', error)
  }
}

startServer()