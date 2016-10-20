// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var participantSchema = require('./participants');

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

var stepSchema = new Schema({
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
    participants:[{ type : mongoose.Schema.Types.ObjectId, ref: 'participant' }]
}, {
    timestamps: true
});

//I need this method because array of ref ids does bot have id() method
stepSchema.methods.getParticipantById = function( id) {
    var model = null;
    for(var i = 0; i < this.participants.length; i++){
        if (this.participants[i]._id.toString() == id){
            model = this.participants[i];
            break;
        }
    }  
    return model;
};

stepSchema.methods.getParticipantIndexById = function( id) {
    var index = -1;
    for(var i = 0; i < this.participants.length; i++){
        if (this.participants[i].toString() == id){
            index = i;
            break;
        }
    }  
    return index;
};

// the schema is useless so far
// we need to create a model using it
var steps = mongoose.model('step', stepSchema);

// make this available to our Node applications
module.exports = steps;