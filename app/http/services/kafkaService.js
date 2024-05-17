const { Kafka } = require('kafkajs');
const kafka = new Kafka({ clientId: 'my-app', brokers: ['localhost:9092'] });

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'my-group' });

class kafkaService {
    async sendMessage (message) {
        await producer.connect();
        await producer.send({
          topic: 'data-topic',
          messages: [{ value: JSON.stringify(message) }],
        });
        await producer.disconnect();
      };
      
      async runConsumer (processMessage) {
        await consumer.connect();
        await consumer.subscribe({ topic: 'data-topic', fromBeginning: true });
      
        await consumer.run({
          eachMessage: async ({ topic, partition, message }) => {
            const data = JSON.parse(message.value.toString());
            await processMessage(data);
          },
        });
      };
}


module.exports = new kafkaService();