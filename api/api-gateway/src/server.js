require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('combined'))

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

// db
const db = require('./db/mongodb')

// Start Server
async function startServer() {
    try {
        await db.connectToMongoDB()
        console.log("MongoDB Initialized Successfully")

        const PORT = process.env.PORT || 5000
        app.listen(PORT, () => {
            console.log(`API Gateway server started on ${PORT}`)
        })
    } catch (error) {
        console.error('Error starting API Gateway server: ', error)
    }
}
startServer()
