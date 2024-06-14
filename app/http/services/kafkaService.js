// const { Kafka , Partitioners  } = require('kafkajs');
// const dotenv = require('dotenv');

// dotenv.config();

// const kafka = new Kafka({ clientId: 'my-consumer-app', brokers: [process.env.KAFKA_BROKER] });

// const producer = kafka.producer({
//   createPartitioner: Partitioners.LegacyPartitioner,
// });


// class kafkaService {

//   async sendMessage (message) {
//     await producer.connect();
//     await producer.send({
//       topic: 'data-topic',
//       messages: [{ value: JSON.stringify(message) }],
//     });
//     await producer.disconnect();
//   };


//   async runConsumer (processMessage) {
//     const consumer = kafka.consumer({ groupId: 'influxdb-group' });

//     await consumer.connect();
//     await consumer.subscribe({ topic: 'data-topic', fromBeginning: true });
  
//     await consumer.run({
//       eachMessage: async ({ topic, partition, message }) => {
//         const data = JSON.parse(message.value.toString());
//         await processMessage(data);
//       },
//     });
//   };

// }


// module.exports = new kafkaService();