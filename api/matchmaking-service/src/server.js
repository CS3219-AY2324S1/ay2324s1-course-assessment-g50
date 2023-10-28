import 'dotenv/config';
import amqp from 'amqplib';
import assert from 'node:assert/strict';

let waiting = null; // the waiting user

const connection = await amqp.connect(process.env.RABBITMQ_URI);
const rchannel = await connection.createChannel();
const wchannel = await connection.createChannel();
await wchannel.assertExchange("match_res", 'fanout', {
	durable: false
});
await rchannel.assertExchange("match_req", "topic", {
	durable: false
});
let q = rchannel.assertQueue('', {
	exclusive: false
});
rchannel.bindQueue(q.queue, "match_req", "#"); // TODO one binding queue and waiting for each combination
await rchannel.consume(q.queue, async (msg) => {
	// msg should contain the user identifier
	const user = msg.content.toString(); // session id
	console.log(user);
	if (waiting === null) {
		waiting = user;
	} else {
		assert.notEqual(waiting, user);
		console.log(`Matched ${waiting} and ${user}`);
		wchannel.publish("match_res", "", Buffer.from(JSON.stringify([waiting, user])));
		waiting = null;
	}
	rchannel.ack(msg);
});