const controller = require("app/http/controllers/controller");
const { InfluxDB } = require('@influxdata/influxdb-client');
const { DeleteAPI } = require('@influxdata/influxdb-client-apis');
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.INFLUX_URL;
const token = process.env.INFLUX_TOKEN;
const org = process.env.INFLUX_ORG;
const bucket = process.env.INFLUX_BUCKET;

const client = new InfluxDB({ url, token });
const queryApi = client.getQueryApi(org);
const deleteApi = new DeleteAPI(client);

class dataQueryController extends controller {

async queryData (req, res) {
  const { start, end, name } = req.query;

  if (!start || !end || !name) {
    return res.status(400).json({ error: 'Start, end, and name are required' });
  }

  const query = `
    from(bucket: "${bucket}")
      |> range(start: ${start}, stop: ${end})
      |> filter(fn: (r) => r._measurement =~ /${name}/)
      |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
  `;

  try {
    const data = [];
    queryApi.queryRows(query, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row);
        data.push(o);
      },
      error(error) {
        console.error(error);
        return res.status(500).json({ error: 'Error querying data from InfluxDB' });
      },
      complete() {
        return res.status(200).json(data);
      },
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to query data from InfluxDB' });
  }
};



async getAllData (req, res) {
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({ error: 'Start and end are required' });
  }

  const query = `
    from(bucket: "${bucket}")
      |> range(start: ${start}, stop: ${end})
  `;

  try {
    const data = [];
    queryApi.queryRows(query, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row);
        data.push(o);
      },
      error(error) {
        console.error(error);
        return res.status(500).json({ error: 'Error querying data from InfluxDB' });
      },
      complete() {
        return res.status(200).json(data);
      },
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to query data from InfluxDB' });
  }
};



async deleteData (req, res) {
  const { measurement, tagKey, tagValue } = req.body;

  if (!measurement) {
    return res.status(400).json({ error: 'Measurement is required' });
  }

  
  const start = '1970-01-01T00:00:00Z';
  const stop = new Date().toISOString();

  const predicate = tagKey && tagValue ? `_measurement="${measurement}" AND ${tagKey}="${tagValue}"` : `_measurement="${measurement}"`;

  try {
    await deleteApi.postDelete({
      org,
      bucket,
      body: {
        start,
        stop,
        predicate,
      },
    });
    res.status(200).json({ message: 'Data deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete data from InfluxDB' });
  }
};



async deleteAllData (req, res) {
  const start = '1970-01-01T00:00:00Z';
  const stop = new Date().toISOString();

  try {
    await deleteApi.postDelete({
      org,
      bucket,
      body: {
        start,
        stop,
        predicate: '',
      },
    });
    res.status(200).json({ message: 'All data deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete all data from InfluxDB' });
  }
};



}

module.exports = new dataQueryController();