require('dotenv').config()
const cors = require('cors');
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('combined'))
app.use(cors())

// Proxy Configs
const { corsConfig } = require('./configs/proxyConfigs')
app.use(corsConfig)

// Session:
const session = require('express-session');
const sessionConfig = require('./configs/sessionConfigs');
app.use(session(sessionConfig))

// Routes
const routes = require('./routes/apiRoutes');
app.use('/', routes)

// Start Server
async function startServer() {
    try {
        const PORT = process.env.PORT
        app.listen(PORT, () => {
            console.log(`API Gateway server started on ${PORT}`)
        })
    } catch (error) {
        console.error('Error starting API Gateway server: ', error)
    }
}
startServer()