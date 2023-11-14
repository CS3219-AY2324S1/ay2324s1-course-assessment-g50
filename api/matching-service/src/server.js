import 'dotenv/config';
import amqp from 'amqplib';
import express from 'express';
import session from "express-session";
import sessionConfig from './configs/sessionConfigs.js';

const MATCH_TIMEOUT = 30000;

const app = express();
const sessionMiddleware = session(sessionConfig);
app.use(sessionMiddleware);
app.use(express.json());

const connMap = new Map();

const connection = await amqp.connect(process.env.RABBITMQ_URI);
// emit token to queue on match request
const wchannel = await connection.createChannel();
await wchannel.assertExchange("match_req", "topic", {
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
	// [uid1, uid2]
	const uids = JSON.parse(msg.content);
	console.log(`Received match result ${uids}`);
	for (const uid of uids) {
		connMap.get(uid)?.send(uids);
		// TODO respond to these corresponding sessions
	}
	rchannel.ack(msg);
});

app.post('/matching', (req, res) => {
	const uid = req.session.userId.toString();
	const {complexity, categories} = req.body;
	console.log(`Starting match as ${uid} with complexity ${complexity} and category ${categories}`);
	connMap.set(uid, res);
	res.on('close', function(err) {
		console.log("Connection closed");
		connMap.delete(uid);
		// TODO purge the request from queue
	});
	wchannel.publish('match_req', `${complexity}.${categories.join(".")}`, Buffer.from(uid), {
		expiration: MATCH_TIMEOUT,
	});
});

app.listen(8300, () => {
  console.log('Waiting for match request on localhost:8300');
});
