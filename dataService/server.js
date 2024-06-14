const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const port = process.env.APPLICATION_PORT || 7000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const dataController = require('./app/http/controllers/dataController');
const dataValidator = require('./app/http/validators/dataValidator');

app.post('/data/:connectionName', dataValidator.handle(), dataController.receiveData);

mongoose.connect(process.env.DATABASE_URL, {}).then(() => console.log('MongoDB connected'));

app.listen(port, () => {
  console.log(`Data Service is running on port ${port}`);
});