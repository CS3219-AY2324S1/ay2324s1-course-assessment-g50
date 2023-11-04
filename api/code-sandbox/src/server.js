require('dotenv').config()
const express = require('express')
const app = express()

// Middlewares
app.use(express.json())

// Routes:
const routes = require('./routes/sandboxRoutes');
app.use('/sandbox', routes)

// Start the server
async function startServer() {
  try {
    const PORT = process.env.PORT
    app.listen(PORT, () => {
      console.log(`Sandbox started on ${PORT}`)
    })
  } catch (error) {
    console.error('Error starting sandbox: ', error)
  }
}

startServer()