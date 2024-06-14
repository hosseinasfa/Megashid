const express = require('express');
const router = express.Router();
const axios = require('axios');

//Controllers
const connectionController = require('app/http/controllers/connectionController');
const dataController = require('app/http/controllers/dataController');
const dataQueryController = require('app/http/controllers/dataQueryController')


// Validators
const connectionValidator = require('app/http/validators/connectionValidator');
const dataValidator = require('../../http/validators/dataValidator');

router.get('/main' , connectionController.index);

//Connection Routes
router.post('/create' , connectionValidator.handle() ,connectionController.create);
router.put('/update/:id' ,connectionValidator.handle() ,connectionController.update);
router.delete('/delete/:id' , connectionController.destroy);
router.get('/' , connectionController.getAllConnections);
router.post('/data/:connectionName', dataValidator.handle(), async (req, res) => {
    try {
      const { connectionName } = req.params;
      const data = req.body;
      const response = await axios.post(`http://localhost:7000/data/${connectionName}`, data);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });
router.get('/query', dataQueryController.queryData);
router.get('/getAllData', dataQueryController.getAllData);
router.delete('/deleteData', dataQueryController.deleteData);
router.delete('/deleteAllData', dataQueryController.deleteAllData);



router.get('/:id' , connectionController.getConnection);


module.exports = router;