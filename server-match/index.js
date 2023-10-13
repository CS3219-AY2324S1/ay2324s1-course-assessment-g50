import amqp from 'amqplib';

var waiting = null; // the waiting user

const connection = await amqp.connect('amqp://localhost');
const rchannel = await connection.createChannel();
const wchannel = await connection.createChannel();
await wchannel.assertExchange("match_res", 'fanout', {
	durable: false
});
await rchannel.assertQueue("match_req", {
	durable: false
});
await rchannel.consume("match_req", async (msg) => {
	// msg should contain the user identifier
	const user = msg.content.toString();
	console.log(user);
	if (waiting === null) {
		waiting = user;
	} else {
		console.log(`Matched ${waiting} and ${user}`)
		await wchannel.publish("match_res", "", Buffer.from([waiting, user]));
		waiting = null;
	}
	rchannel.ack(msg);
});
