const rateController = require('../../controllers/apis/exchangeRate.js');
const diagramController = require('../../controllers/apis/diagram.js');

const express = require('express');
let router = express.Router();
router.use('/excangerates', rateController);
router.use('/diagram', diagramController);
module.exports = router;