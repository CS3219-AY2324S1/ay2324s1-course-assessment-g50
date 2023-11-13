require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
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
// Create a server
const httpServer = createServer(app);
const port = process.env.PORT;
// Create a web socket on server
const wss = new WebSocketServer({ server: httpServer });
httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
//On connection, use the utility file provided by y-websocket
wss.on('connection', (ws, req) => {
  console.log("wss:connection");
  setupWSConnection(ws, req);
});