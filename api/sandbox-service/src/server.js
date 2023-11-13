require('dotenv').config()
const express = require('express')
const { testCode } = require('./controller/sandboxController')
const app = express()

// Middlewares
app.use(express.json())

// Routes:
app.post('/sandbox', async (req, res) => {
  testCode(req, res)
})


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