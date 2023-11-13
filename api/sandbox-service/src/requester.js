const amqp = require('amqplib');
const { v4: uuidv4 } = require('uuid');

class ContainerRequester {
    constructor() {
        this.connection = null;
        this.channel = null;
        this.replyQueue = null;
        this.requests = new Map(); // Store pending requests
        this.init();
    }

    async init() {
        console.log('initialised req')
        this.connection = await amqp.connect(process.env.RABBITMQ_URI);
        this.channel = await this.connection.createChannel();
        this.replyQueue = await this.channel.assertQueue('', { exclusive: true });

        // Gets reply containing either container name or build error
        this.channel.consume(this.replyQueue.queue, (msg) => {
            const callback = this.requests.get(msg.properties.correlationId);
            console.log(`${msg.content}: reply received`)

            if (callback === undefined) {
                throw new Error("No request callback found")
            }

            try {
                const name = msg.content.toString();
                callback.resolve(name)
                this.requests.delete(msg.properties.correlationId);
            } catch (err) {
                callback.reject(err)
            }
        }, { noAck: true });
    }

    // Store the resolver function in the map with the correlation ID as the key
    async requestCreateContainer(language) {
        const correlationId = uuidv4();
        const promise = new Promise((resolve, reject) => {
            const callback = {
                "resolve": resolve,
                "reject": reject
            }
            this.requests.set(correlationId, callback); 
        });

        this.channel.sendToQueue('container_requests',
            Buffer.from(language), 
            {
            correlationId: correlationId,
            replyTo: this.replyQueue.queue
            }
        );
        console.log(`${correlationId}: request sent`)
        return promise;
    }
}

const requester = new ContainerRequester();
module.exports = requester