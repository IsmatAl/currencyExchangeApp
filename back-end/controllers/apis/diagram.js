const express = require('express');
const diagramService = require('../../services/diagram/diagram.js');
let router = express.Router();

router.get('/', diagramService.getDiagram);

router.post('/', diagramService.createDiagram);

module.exports = router;
