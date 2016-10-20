// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var participantSchema = new Schema({
    firstName:  {
        type: String,
        required: true
    },
    lastName:  {
        type: String,
        required: true
    }, 
    image: {
        type: String,
        required: false,
        default: 'images/realtor_logo.png'
    },
    role:  {
        type: String,
        required: true
    },
    roleDescription:  {
        type: String,
        required: true
    },      
    phone:  {
        type: String,
        required: true
    },    
    text:  {
        type: String,
        required: true
    }, 
    email:  {
        type: String,
        required: true
    }    
}, {
    timestamps: true
});


// the schema is useless so far
// we need to create a model using it
var participants = mongoose.model('participant', participantSchema);

// make this available to our Node applications
module.exports = participants;