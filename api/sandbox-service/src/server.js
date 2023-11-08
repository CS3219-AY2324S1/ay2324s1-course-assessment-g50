require('dotenv').config()
const express = require('express')
import axios from 'axios';

const app = express()

// Middlewares
app.use(express.json())

// Routes:
app.post('/', async (req, res) => {
  const body = req.body

  // start container
  const container_name = poolmanager.createContainer(body.language)

  // run code
  const baseUrl = `http://${container_name}:8500/`;
  const response = await axios.post(baseUrl, body);

  // terminate and delete container
  poolmanager.rmContainer(container_name)

  return JsonResponse.success(201, result).send(res);

  // error handling (container fail to build/run, fail to connect to container etc.)
  return JsonResponse.fail(400, err.message).send(res);
  
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