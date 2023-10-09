require('dotenv').config()
const express = require('express')
const app = express()

// Config cors
const cors = require('cors')
app.use(cors({
  origin: 'http://localhost:3000',  // your frontend domain
  credentials: true
}));

// Middlewares:
const session = require('express-session');
const sessionConfig = require('./middlewares/sessionManager');
app.use(express.json()) // Body parser middleware
app.use(session(sessionConfig)); //Session management middleware

// Routes:
const routes = require('./routes/questionRoutes');
app.use('/', routes)

// DB:
const db = require('./db/mongodb');

// Start the server
async function startServer() {
  try {
    await db.connectToMongoDB()
    console.log("MongoDB Initialized Successfully")

    const PORT = process.env.PORT
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`)
    })
  } catch (error) {
    console.error('Error starting the server: ', error)
  }
}

startServer()