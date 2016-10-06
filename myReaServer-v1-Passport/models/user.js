var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  username: String,
  password: String,
  firstname: {
    type: String,
    default: ''
  },
  lastname: {
    type: String,
    default: ''
  },
  admin:   {
    type: Boolean,
    default: false
  },
    street:  {
    type: String,
    default: ''
  },
  city:  {
    type: String,
    default: ''
  },
  state:  {
    type: String,
    default: ''
  }, 
  zip:  {
    type: String,
    default: ''
  },
  phones:  [String],  
  emails:  [String],  
  deals: [{ 
    type : mongoose.Schema.Types.ObjectId, 
    ref: 'dealSchema' 
  }],
  activeDeal: { 
    type: Number,
    required: true,
    default: -1
  }
});

User.methods.getName = function() {
    return (this.firstname + ' ' + this.lastname);
};
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);