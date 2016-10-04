// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    description:  {
        type: String,
        required: true
    },
    isCompleted:  {
        type: Boolean,
        required: true
    }	
}, {
    timestamps: true
});

var prerequisiteSchema = new Schema({
    description:  {
        type: String,
        required: true
    },
    isCompleted:  {
        type: Boolean,
        required: true
    }	
}, {
    timestamps: true
});

var participantSchema = new Schema({
    firstName:  {
        type: String,
        required: true
    },
    lastName:  {
        type: String,
        required: true
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

var eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description:  {
        type: String,
        required: true
    },
	start: {
        type: Date,
        required: true
    },
	end: {
        type: Date,
        required: true
    },
    status:  {
        type: Number,
        required: true
    },
	prerequisites:[prerequisiteSchema],
    todos:[todoSchema],
    participants:[participantSchema]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var events = mongoose.model('event', eventSchema);

// make this available to our Node applications
module.exports = events;