let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var ExchangeRate = new Schema({
  currency: {
    type: String,
    required: [true, 'currency name is required'],
    lowercase: true
  },
  code: {
    type: String,
    required: [true, 'currency code is required'],
    unique: true,
    lowercase: true
  },
  rate: {
    type: Number,
    required: [true, 'currency rate is required'],
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ExchangeRate', ExchangeRate);