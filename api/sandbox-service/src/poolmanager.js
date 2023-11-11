const amqp = require('amqplib');
const child_process = require('child_process');

const nameMap = {
    "python": "pybox",
    "javascript": "jsbox",
    "java": "javabox"
}

class PoolManager {
    constructor() {
      this.containers = [...new Array(10)].map((e, i) => i.toString());
      console.log(this.containers)
      this.channel = null; 
      this.init();
    }
  
    async init() {
      console.log('initialised pool')
      const conn = await amqp.connect(process.env.RABBITMQ_URI); 
      this.channel = await conn.createChannel();
      
      await this.channel.assertQueue('container_requests', { durable: false });
      
      this.channel.consume('container_requests', async (msg) => {
        if (this.containers.length === 0) {
            this.channel.nack(msg);
            return
        }

        console.log(`${msg.properties.correlationId}: creating container`)
        let nameOrError;
        try {
            nameOrError = await this.createContainer(msg.content);
        } catch (error) {
            nameOrError = error.message
            console.log('Build error')
            return
        }
        
        // Send a reply back with the container name
        this.channel.sendToQueue(msg.properties.replyTo,
          Buffer.from(nameOrError),
          {
            correlationId: msg.properties.correlationId
          }
        );
        console.log(`${msg.properties.correlationId}: reply sent`)
        this.channel.ack(msg);
      }, { noAck: false });
    }
  
   /*
    * @return Promise containing name of container or build error 
    */
    async createContainer(language) {
        const containerVer = this.containers.pop();
        const relativePathToBuildScript = `../images/${language}-image/buildCreate.sh`

        const build = child_process.spawn('sh', [relativePathToBuildScript, `${containerVer}`], {cwd: './src/shared'});
        let outputData = '';
        let errorData = '';

        const containerName = `${nameMap[language]}_${containerVer}` 
        console.log(containerName)
        const result = new Promise((resolve, reject) => {
            build.stdout.on('data', data => { 
                outputData += data; 
            })

            build.stderr.on("data", (data) => { 
                errorData += data;
            }); 
            
            //@todo: add timeout timer
            build.on('exit', code => { 
                if (code !== 0) {
                    console.log(outputData)
                    reject(new Error(`error: ${errorData}`))
                }
            
                resolve(containerName)
            })
        })
        return result
    }

    removeContainer(containerName) {
        child_process.exec(`docker stop ${containerName} && docker rm ${containerName}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`failed to free: ${containerName}\n ${error}`)
                return
            }

            const freedVer = containerName.split('_')[1].toString();
            this.containers.push(freedVer)
            console.log(`freed ${containerName}`)
            console.log(`available  containers: ${this.containers}`)
        });
    }
  } 
  
  const poolmanager = new PoolManager();
  module.exports = poolmanager
  