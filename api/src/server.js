require('dotenv').config()
const express = require('express')
const app = express()

// Config cors
const cors = require('cors')
app.use(cors())

// Middlewares:
const checkJwtToken = require('./middlewares/tokenCheck')
app.use(express.json()) // Body parser middleware
app.use(checkJwtToken) // JWT Token verification middleware

// Routes:
const routes = require('./routes/routes');
app.use('/', routes)

// DB:
const db = require('./db/db')

// Start the server
async function startServer() {
  try {
    await db.initializeDatabases()

    const PORT = process.env.PORT
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`)
    })
  } catch (error) {
    console.error('Error starting the server: ', error)
  }
}

startServer()