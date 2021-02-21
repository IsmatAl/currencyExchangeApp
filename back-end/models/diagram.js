let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var Diagram = new Schema({
  jsonString: {
    type: String,
    required: [true, 'JSON string is required']
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Diagram', Diagram);