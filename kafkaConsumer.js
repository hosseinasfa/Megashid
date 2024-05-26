const { Kafka } = require('kafkajs');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');
const dotenv = require('dotenv');

dotenv.config();

const kafka = new Kafka({ clientId: 'my-consumer-app', brokers: [process.env.KAFKA_BROKER] });
const consumer = kafka.consumer({ groupId: 'influxdb-group' });

const influxClient = new InfluxDB({ url: process.env.INFLUX_URL, token: process.env.INFLUX_TOKEN });
const writeApi = influxClient.getWriteApi(process.env.INFLUX_ORG, process.env.INFLUX_BUCKET, 'ns');

// تابع پردازش پیام‌ها
const processMessage = async (message) => {
  const data = JSON.parse(message.value.toString());
  const { ts, name, value, tag } = data;

  try {
    const point = new Point(name)
      .floatField('value', value)
      .tag('tag', tag)
      .timestamp(new Date(ts));
    
    await writeApi.writePoint(point);
    await writeApi.flush();
    console.log('Data written to InfluxDB');
  } catch (error) {
    console.error('Error writing data to InfluxDB', error);
  }
};

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'data-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      await processMessage(message);
    },
  });
};

runConsumer().catch(console.error);