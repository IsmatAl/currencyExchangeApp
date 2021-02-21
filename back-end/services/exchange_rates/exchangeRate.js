const express = require('express');
const ExchangeRate = require('../../models/exchangeRate');

const getExchangeRates = async (req, res, next) => {
  try {

    let rates = await ExchangeRate.find({});

    if (rates.length > 0) {
      return res.status(200).json({
        'message': 'exchange rates fetched successfully',
        'data': rates
      });
    }

    return res.status(404).json({
      'code': 'BAD_REQUEST_ERROR',
      'description': 'No exchange rate found in the system'
    });
  } catch (error) {
    return res.status(500).json({
      'code': 'SERVER_ERROR',
      'description': 'something went wrong, Please try again'
    });
  }
}

const createExchangeRate = async (req, res, next) => {
  try {

    const {
      currency,
      code,
      rate
    } = req.body;

    if (currency === undefined || currency === '') {
      return res.status(422).json({
        'code': 'REQUIRED_FIELD_MISSING',
        'description': 'currency name is required',
        'field': 'currency'
      });
    }

    if (code === undefined || code === '') {
      return res.status(422).json({
        'code': 'REQUIRED_FIELD_MISSING',
        'description': 'currency code is required',
        'field': 'code'
      });
    }

    if (rate === undefined || rate <= 0) {
      return res.status(422).json({
        'code': 'REQUIRED_FIELD_MISSING',
        'description': 'currency rate is required and should be higher than 0',
        'field': 'rate'
      });
    }


    let isCurrencyExists = await ExchangeRate.findOne({
      "code": code,
      "currency": currency
    });

    if (isCurrencyExists) {
      return res.status(409).json({
        'code': 'ENTITY_ALREAY_EXISTS',
        'description': 'currency already exists',
        'fields': ['code', 'currency']
      });
    }

    const temp = {
      currency,
      code,
      rate
    }

    let newExchangeRate = await ExchangeRate.create(temp);

    if (newExchangeRate) {
      return res.status(201).json({
        'message': 'currency exchange rate added successfully',
        'data': newExchangeRate
      });
    } else {
      throw new Error('something went worng');
    }
  } catch (error) {
    return res.status(500).json({
      'code': 'SERVER_ERROR',
      'description': 'something went wrong, Please try again'
    });
  }
}

const updateExchangeRate = async (req, res, next) => {
  try {

    const exchangeRateId = req.params.id;

    const {
      currency,
      code,
      rate
    } = req.body;

    if (currency === undefined || currency === '') {
      return res.status(422).json({
        'code': 'REQUIRED_FIELD_MISSING',
        'description': 'currency name is required',
        'field': 'currency'
      });
    }

    if (code === undefined || code === '') {
      return res.status(422).json({
        'code': 'REQUIRED_FIELD_MISSING',
        'description': 'currency code is required',
        'field': 'code'
      });
    }

    if (rate === undefined || rate <= 0) {
      return res.status(422).json({
        'code': 'REQUIRED_FIELD_MISSING',
        'description': 'currency rate is required and/or should be higher than 0',
        'field': 'rate'
      });
    }

    let isExchangeRateExists = await ExchangeRate.findById(exchangeRateId);

    if (!isExchangeRateExists) {
      return res.status(404).json({
        'code': 'BAD_REQUEST_ERROR',
        'description': 'No exchange rate found in the system'
      });
    }

    const temp = {
      currency,
      code,
      rate
    }

    let updateRate = await ExchangeRate.findByIdAndUpdate(exchangeRateId, temp, {
      new: true
    });

    if (updateRate) {
      return res.status(200).json({
        'message': 'exchange rate updated successfully',
        'data': updateRate
      });
    } else {
      throw new Error('something went worng');
    }
  } catch (error) {

    return res.status(500).json({
      'code': 'SERVER_ERROR',
      'description': 'something went wrong, Please try again'
    });
    
  }
}

const deleteExchangeRate = async (req, res, next) => {
  try {
    let exchageRate = await ExchangeRate.findByIdAndRemove(req.params.id);
    if (exchageRate) {            
      return res.status(204).json({
        'data': req.params.id,
        'message': `currency exchange rate with id ${req.params.id} deleted successfully`
      });
    }

    return res.status(404).json({
      'code': 'BAD_REQUEST_ERROR',
      'description': 'No currency exchange rate found in the system'
    });

  } catch (error) {

    return res.status(500).json({
      'code': 'SERVER_ERROR',
      'description': 'something went wrong, Please try again'
    });
  }
}

module.exports = {
  getExchangeRates: getExchangeRates,
  createExchangeRate: createExchangeRate,
  updateExchangeRate: updateExchangeRate,
  deleteExchangeRate: deleteExchangeRate
}