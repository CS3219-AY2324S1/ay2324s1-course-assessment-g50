import amqp from 'amqplib';
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
	connectionStateRecovery: {},
	cors: {
		origin: "http://localhost:3000"
	}
});

app.get('/', (req, res) => {
	res.sendFile(new URL('./index.html', import.meta.url).pathname);
});

const connection = await amqp.connect('amqp://localhost');
// emit token to queue on match request
const wchannel = await connection.createChannel();
await wchannel.assertQueue("match_req", {
	durable: false
});
// consume and respond on match success
const rchannel = await connection.createChannel();
await rchannel.assertExchange("match_res", "fanout", {
	durable: false
});
const queue = rchannel.assertQueue('', {
	exclusive: true
});
await rchannel.bindQueue(queue.queue, "match_res", "");
await rchannel.consume(queue.queue, (msg) => {
	const res = msg.content;
	console.log(`Received match result ${msg}`);
	io.emit("match_made", res);
	rchannel.ack(msg);
});

io.on('connection', (socket) => {
	console.log('a user connected');
	// TODO associate the socket with user cred
	socket.on('start_match', (token) => {
		console.log('Started match')
		wchannel.sendToQueue('match_req', Buffer.from(token));
		// FIXME this should be user identifier, to be integrated with auth, forward payload from frontend for now
	});
	socket.on('cancel_match', (callback) => {
		console.log('Cancelling match');
		// TODO
		callback(true);
	});
});

server.listen(4000, () => {
  console.log('SocketIO server on localhost:4000');
});
