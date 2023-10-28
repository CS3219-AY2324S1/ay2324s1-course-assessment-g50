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
	const correlation = msg.properties.correlationId;
	console.log(user, correlation);
	let resp;
	if (waiting === null) {
		waiting = {uid: user, cid: correlation};
	} else {
		if (waiting.uid === user) {
			// fail the match if same user
			// should be handled by checking if user is already in match
			resp = {success: false, reason: "Cannot match with oneself"};
		} else {
			resp = {success: true, users: [waiting.uid, user]};
			console.log(`Matched ${waiting.uid} and ${user}`);
			wchannel.publish("match_res", "", Buffer.from(JSON.stringify(resp)), {
				correlationId: waiting.cid,
			});
		}
		wchannel.publish("match_res", "", Buffer.from(JSON.stringify(resp)), {
			correlationId: msg.properties.correlationId,
		});
	}
	rchannel.ack(msg);
});
