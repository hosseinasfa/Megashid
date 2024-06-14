const { InfluxDB, Point } = require('@influxdata/influxdb-client');
const dotenv = require('dotenv');
dotenv.config();

const token = process.env.INFLUX_TOKEN;
const org = process.env.INFLUX_ORG;
const bucket = process.env.INFLUX_BUCKET;
const url = process.env.INFLUX_URL;
const client = new InfluxDB({ url, token });

const writeApi = client.getWriteApi(org, bucket, 'ns');



class influxService {
  async writePoint (measurement, fields, tags) {
    try {
      const point = new Point(measurement);
      for (const key in fields) {
        point.floatField(key, fields[key]);
      }
      for (const key in tags) {
        point.tag(key, tags[key]);
      }
      await writeApi.writePoint(point);
      await writeApi.flush();
      console.log('Data written to InfluxDB');
    } catch (e) {
      console.error('Error writing data to InfluxDB', e);
    }
  };
}


module.exports = new influxService();