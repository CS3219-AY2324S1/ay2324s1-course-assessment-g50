import 'dotenv/config';
import amqp from 'amqplib';
import assert from 'node:assert/strict';

const connection = await amqp.connect(process.env.RABBITMQ_URI);
const rchannel = await connection.createChannel();
const wchannel = await connection.createChannel();

const category_list = [
	"Algorithms", "Array", "String", "Hash Table", "Math", "Data Structures", "Dynamic Programming", "Sorting",
	"Greedy", "Depth-First Search", "Binary Search", "Database", "Breadth-First Search",
	"Tree", "Matrix", "Two Pointers", "Binary Tree", "Bit Manipulation",
	"Heap (Priority Queue)", "Stack", "Prefix Sum", "Graph", "Simulation",
	"Design", "Counting", "Backtracking", "Sliding Window", "Union Find",
	"Linked List", "Ordered Set", "Enumeration", "Monotonic Stack", "Trie",
	"Recursion", "Divide and Conquer", "Bitmask", "Number Theory", "Queue",
	"Binary Search Tree", "Segment Tree", "Memoization", "Geometry", "Topological Sort",
	"Binary Indexed Tree", "Hash Function", "Game Theory", "Shortest Path", "Combinatorics",
	"Interactive", "String Matching", "Data Stream", "Rolling Hash", "Brainteaser",
	"Randomized", "Monotonic Queue", "Merge Sort", "Iterator", "Concurrency",
	"Doubly-Linked List", "Probability and Statistics", "Quickselect", "Bucket Sort",
	"Suffix Array", "Minimum Spanning Tree", "Counting Sort", "Shell", "Line Sweep",
	"Reservoir Sampling", "Strongly Connected", "Component", "Eulerian Circuit",
	"Radix Sort", "Rejection Sampling", "Biconnected Component"
];
const complexities = ["Easy", "Medium", "Hard"];
let topics = new Array();

for (let co of complexities) {
	for (let ct of category_list) {
		topics.push({complexity: co, category: ct, waiting: null});
	}
}

await wchannel.assertExchange("match_res", 'fanout', {
	durable: false
});
await rchannel.assertExchange("match_req", "topic", {
	durable: false
});

for (let topic of topics) {
	let q = rchannel.assertQueue('', {
		exclusive: false
	});
	rchannel.bindQueue(q.queue, "match_req", topic.complexity + '.#.' + topic.category + '.#');
	await rchannel.consume(q.queue, async (msg) => {
		// msg should contain the user identifier
		console.log(`Match request on ${topic}`);
		const user = msg.content.toString(); // session id
		const correlation = msg.properties.correlationId;
		console.log(topic, user, correlation);
		let resp;
		if (topic.waiting === null || topic.waiting === undefined) {
			topic.waiting = {uid: user, cid: correlation};
		} else {
			if (topic.waiting.uid === user) {
				// fail the match if same user
				// should be handled by checking if user is already in match
				resp = {success: false, reason: "Cannot match with oneself"};
			} else {
				resp = {success: true, users: [topic.waiting.uid, user], category: topic.category, complexity: topic.complexity};
				console.log(`Matched ${topic.waiting.uid} and ${user}`);
				wchannel.publish("match_res", "", Buffer.from(JSON.stringify(resp)), {
					correlationId: topic.waiting.cid,
				});
				topic.waiting = null;
			}
			wchannel.publish("match_res", "", Buffer.from(JSON.stringify(resp)), {
				correlationId: msg.properties.correlationId,
			});
		}
		rchannel.ack(msg);
	});
}
