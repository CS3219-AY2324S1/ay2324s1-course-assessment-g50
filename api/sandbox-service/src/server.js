require('dotenv').config()
const express = require('express')
const axios = require('axios');
const requester = require('./requester')
const poolmanager = require('./poolmanager')
const JsonResponse = require('./common/jsonResponse')

const app = express()

// Middlewares
app.use(express.json())

// Routes:
app.post('/sandbox', async (req, res) => {
  const body = req.body
  let containerName;
  
  try {
    // start sandbox environment
    containerName = await requester.requestCreateContainer(body.language)

    // Run code on sandbox (timeout to let sandbox start up) 
    return setTimeout(async () => {
      const baseUrl = `http://${containerName}:8500/`;
      const response = await axios.post(baseUrl, body);
      return JsonResponse.success(201, response.data.data).send(res);
    }, 1000)

  } catch (err) {
    // error handling (container fail to build/run, fail to connect to container etc.)
    return JsonResponse.fail(400, err.message).send(res);
  } finally {
    // terminate and delete container
    poolmanager.removeContainer(containerName)
  }
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