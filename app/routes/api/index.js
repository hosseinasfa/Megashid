const express = require('express');
const router = express.Router();

const apiRouter = require('./api');
router.use('/api/connections' , apiRouter);




module.exports = router;