const controller = require("app/http/controllers/controller");
const { Kafka } = require('kafkajs');
const kafka = new Kafka({ clientId: 'my-app', brokers: ['localhost:9092'] });
const producer = kafka.producer();
const kafkaService = require("app/http/services/kafkaService")


class dataController extends controller {
  async receiveData (req, res) {
    const { ts, name, value } = req.body;

  
    if (!ts || !name || !value) {
      return res.status(400).json({ error: 'Invalid data format' });
    }
  
    try {
      await kafkaService.sendMessage({ ts, name, value, tag: 'my-tag' });
      console.log('Data received and sent to Kafka')
      res.status(200).json({ message: 'Data received and sent to Kafka' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to send data to Kafka' });
    }
  };
  
  async queryData (req, res) {
    const { start, end, name } = req.query;
    // InfluxDB query logic will go here
  };
}

module.exports = new dataController();
