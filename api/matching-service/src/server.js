import 'dotenv/config';
import amqp from 'amqplib';
import express from 'express';
import session from "express-session";
import sessionConfig from './configs/sessionConfigs.js';
import requestID from 'express-request-id';

const MATCH_TIMEOUT = 30000;

const app = express();
const sessionMiddleware = session(sessionConfig);
app.use(sessionMiddleware);
app.use(express.json());
app.use(requestID({setHeader: false}));

const connMap = new Map(); // request id to response

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
	const resp = JSON.parse(msg.content);
	console.log(`Received match result with cid ${msg.properties.correlationId}`);
	console.log(resp);
	try {
		if (resp.success) {
			connMap.get(msg.properties.correlationId)?.send(resp);
		} else {
			connMap.get(msg.properties.correlationId)?.status(400).send(resp.reason);
		}
	} catch (e) {
		console.log(e);
	}
	rchannel.ack(msg);
});

const cchannel = await connection.createChannel(); // for cancelling
await cchannel.assertQueue("match_cancel", {durable: false});

app.post('/matching', (req, res) => {
	const uid = req.session.userId.toString();
	const {complexity, categories} = req.body;
	console.log(`Starting match as ${uid} with complexity ${complexity} and category ${categories}`);
	connMap.set(req.id, res);
	res.on('close', function(err) {
		console.log("Connection closed");
		connMap.delete(req.id);
		cchannel.sendToQueue("match_cancel", Buffer.from(req.id));
	});
	res.on('aborted', function() {
		console.log("Connection aborted");
		connMap.delete(req.id);
		cchannel.sendToQueue("match_cancel", Buffer.from(req.id));
	});
	wchannel.publish('match_req', `${complexity}.${categories.join(".")}`, Buffer.from(uid), {
		expiration: MATCH_TIMEOUT,
		correlationId: req.id,
	});
});

app.listen(8300, () => {
  console.log('Waiting for match request on localhost:8300');
});
