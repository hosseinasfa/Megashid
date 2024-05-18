const controller = require("app/http/controllers/controller");
const { Kafka } = require('kafkajs');
const kafka = new Kafka({ clientId: 'my-app', brokers: ['localhost:9092'] });
const kafkaService = require("app/http/services/kafkaService")


class dataController extends controller {
  async receiveData (req, res) {
    const { ts, name, value } = req.body;

  
  if (!ts || !name || !value) {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  const dataWithTags = {
    ts,
    name,
    value,
    tag: 'my-tag',
  };

  try {
    await kafkaService.sendMessage(dataWithTags);
    console.log('Data received and sent to Kafka')
    res.status(200).json({ message: 'Data received and sent to Kafka' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send data to Kafka' });
  }
  };
  
  
}

module.exports = new dataController();
