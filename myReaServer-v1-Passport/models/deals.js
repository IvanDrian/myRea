var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dealSchema = new Schema({
  propertyStreet:  {
    type: String,
    required: true
  },
  propertyCity:  {
    type: String,
    required: true
  },
  propertyState:  {
    type: String,
    required: true
  }, 
  propertyZip:  {
      type: String,
      required: true
  },
  status:  {
    type: Number,
    required: true,
    default: 0
  },
  events:[eventSchema]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var deals = mongoose.model('deal', dealSchema);

// make this available to our Node applications
module.exports = deals;