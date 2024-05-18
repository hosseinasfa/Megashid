const express = require('express');
const router = express.Router();

//Controllers
const connectionController = require('app/http/controllers/connectionController');
const dataController = require('app/http/controllers/dataController');
const dataQueryController = require('app/http/controllers/dataQueryController')


// Validators
const connectionValidator = require('app/http/validators/connectionValidator');

// router.get('/' , connectionController.index);

//Connection Routes
router.post('/create' , connectionValidator.handle() ,connectionController.create);
router.put('/update/:id' ,connectionValidator.handle() ,connectionController.update);
router.delete('/delete/:id' , connectionController.destroy);
router.get('/' , connectionController.getAllConnections);
router.post('/data/:connectionName', dataController.receiveData);
router.get('/query', dataQueryController.queryData); // مسیر جدید برای دریافت داده‌ها


module.exports = router;