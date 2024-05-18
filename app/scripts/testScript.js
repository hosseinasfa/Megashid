const axios = require('axios');

const sendTestData = async () => {
  const connections = await axios.get('http://localhost:6000/api/connections');
  const connectionNames = connections.data.map(conn => conn.name);

  setInterval(async () => {
    for (const name of connectionNames) {
      const data = {
        ts: Date.now(),
        name: `data_${Math.floor(Math.random() * 10)}`,
        value: (Math.random() * 100).toFixed(2),
      };
      await axios.post(`http://localhost:6000/api/connections/data/${name}`, data);
    }
  }, 3000);   
};

sendTestData().catch(console.error);