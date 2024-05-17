const axios = require('axios');

const sendData = async () => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const data = {
        ts: Date.now(),
        name: `data_${j}`,
        value: Math.random() * 100,
      };
      await axios.post('http://localhost:8086/api/connections/data', data);
    }
    await new Promise(resolve => setTimeout(resolve, 100)); // 100 milliseconds
  }
};

sendData();