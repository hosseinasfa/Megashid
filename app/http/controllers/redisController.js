const controller = require("app/http/controllers/controller");
const redis = require('redis');

// ایجاد کلاینت Redis
const client = redis.createClient();

// هندل کردن خطاها
client.on('error', (err) => {
    console.log('Redis Client Error', err);
});

// اتصال به Redis
client.connect();


class redisController extends controller {
  async test (req, res) {
    try {

        const { key, value } = req.body;

        // ذخیره‌سازی یک مقدار در Redis
        await client.set(key, value);
        
        // دریافت یک مقدار از Redis
        const storedValue = await client.get(key);
        
        res.status(200).send({ message: storedValue });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
  };
}

module.exports = new redisController();
