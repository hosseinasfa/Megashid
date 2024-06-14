// const controller = require("app/http/controllers/controller");
// const { Kafka } = require('kafkajs');
// const kafka = new Kafka({ clientId: 'my-app', brokers: ['localhost:9092'] });
// const kafkaService = require("app/http/services/kafkaService");
// const influxService = require("app/http/services/influxService");
// const Connection = require("app/models/connection");


// class dataController extends controller {
//   async receiveData (req, res) {
//     const { connectionName } = req.params;
//     const { ts, name, value } = req.body;

//     if (!ts || !name || !value) {
//       return res.status(400).json({ error: 'Invalid data format' });
//     }

//     try {
//       const connection = await Connection.findOne({ name: connectionName });
//     if (!connection) {
//       return res.status(404).json({ error: 'Connection not found' });
//     }

//       const dataWithTags = {
//         ts,
//         name,
//         value,
//         tag: connectionName,
//       };
    
//       try {
//         await kafkaService.sendMessage(dataWithTags);
//         console.log('Data received and sent to Kafka')
//         res.status(200).json({ message: 'Data received and sent to Kafka' });

//         const processMessage = async (dataWithTags) => {
//           const { ts, name, value, tag } = dataWithTags;
//           await influxService.writePoint(name, { value }, { tag, ts });
//         };
//         kafkaService.runConsumer(processMessage);

//       } catch (err) {
//         res.status(500).json({ error: 'Failed to send data to Kafka' });
//       }
      
//     } catch (err) {
//       res.status(500).json({ error: 'Failed to verify connection' });
//     }

  

//   };
// }

// module.exports = new dataController();
