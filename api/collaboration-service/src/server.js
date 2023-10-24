require('dotenv').config()
const express = require('express');
const cors = require('cors');
const WebSocketServer = require('ws').Server;

const setupWSConnection = require('y-websocket/bin/utils').setupWSConnection;

// CORS configuration
const allowedOrigins = [process.env.API_GATEWAY];

// Middlewares
const app = express();
app.use(cors(
  {
    origin: allowedOrigins,
    credentials: true
  }
));
app.use(express.json());

// Create a web socket
const wss = new WebSocketServer({ port: process.env.PORT });

//On connection, use the utility file provided by y-websocket
wss.on('connection', (ws, req) => {
  console.log("wss:connection");
  setupWSConnection(ws, req);
});
