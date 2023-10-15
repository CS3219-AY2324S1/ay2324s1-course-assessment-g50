import 'dotenv/config';
import amqp from 'amqplib';
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import session from "express-session";
import sessionConfig from './configs/sessionConfigs.js';

const app = express();
app.get('/', (req, res) => {
	res.sendFile(new URL('./index.html', import.meta.url).pathname);
});
const sessionMiddleware = session(sessionConfig);
app.use(sessionMiddleware);
const server = createServer(app);
const io = new Server(server, {
	connectionStateRecovery: {},
	cors: {
		origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
	}
});
io.engine.use(sessionMiddleware);

const connMap = new Map();

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
	// [uid1, uid2], room name
	const uids = JSON.parse(msg.content);
	const roomName = uids.join(" ");
	console.log(`Received match result ${uids}`);
	for (const uid of uids) {
		const sockid = connMap.get(uid);
		if (sockid !== undefined) {
			const sock = io.sockets.sockets.get(sockid);
			sock.join(roomName);
		}
	}
	console.log(`Joined ${roomName}`);
	io.to(roomName).emit("match_made", uids);
	rchannel.ack(msg);
});

io.on('connection', (socket) => {
	console.log(`session ${socket.request.session.id} connected`);
	connMap.set(socket.request.session.id, socket.id);
	console.log(connMap);
	socket.on('start_match', () => {
		console.log(`Starting match with ${socket.request.session.id}`);
		wchannel.sendToQueue('match_req', Buffer.from(socket.request.session.id)); // FIXME user id
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
