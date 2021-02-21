const express = require('express');
const exchangeRateService = require('../../services/exchange_rates/exchangeRate.js');
let router = express.Router();

router.get('/', exchangeRateService.getExchangeRates);

router.post('/', exchangeRateService.createExchangeRate);

router.put('/:id', exchangeRateService.updateExchangeRate);

router.delete('/:id', exchangeRateService.deleteExchangeRate);

module.exports = router;
