const express = require('express');
const router = express.Router();

//Controllers
const connectionController = require('app/http/controllers/connectionController');
const dataController = require('app/http/controllers/dataController');


// Validators
const connectionValidator = require('app/http/validators/connectionValidator');

// router.get('/' , connectionController.index);

//Connection Routes
router.get('/' , connectionController.showConnections);
router.post('/create' , connectionValidator.handle() ,connectionController.create);
router.put('/:id' ,connectionValidator.handle() ,connectionController.update);
router.delete('/:id' , connectionController.destroy);
router.post('/data', dataController.receiveData);
router.get('/query', dataController.queryData);


module.exports = router;