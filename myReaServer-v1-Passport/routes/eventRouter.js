var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

require('../models/participants'); 

var events = require('../models/events');
var Verify = require('./verify');

var eventRouter = express.Router();
eventRouter.use(bodyParser.json());

eventRouter.route('/')

.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    events.find({})
    .populate('participants')
    .exec(function (err, event) {
        if (err) throw err;
        res.json(event);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    events.create(req.body, function (err, event) {
        if (err) throw err;
        console.log('event created!');
        var id = event._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the event with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    events.remove({}, function (err, resp) {
        if (err) throw err;
        console.log('event deleted');
        res.json(resp);
    });
});

eventRouter.route('/:eventId')

.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    events.findById(req.params.eventId)
    .populate('participants')
    .exec(function (err, event) {
        if (err) throw err;
        res.json(event);
    });
})

.put(Verify.verifyOrdinaryUser, function (req, res, next) {
    events.findByIdAndUpdate(req.params.eventId, {
        $set: req.body
    }, {
        new: true
    }, function (err, event) {
        if (err) throw err;
        res.json(event);
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    events.findByIdAndRemove(req.params.eventId, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});


eventRouter.route('/:eventId/todos')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    events.findById(req.params.eventId, function (err, event) {
        if (err) throw err;
        res.json(event.todos);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    events.findById(req.params.eventId, function (err, event) {
        if (err) throw err;
        event.todos.push(req.body);
        event.save(function (err, event) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(event);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    events.findById(req.params.eventId, function (err, event) {
        if (err) throw err;
        for (var i = (event.todos.length - 1); i >= 0; i--) {
            event.todos.id(event.todos[i]._id).remove();
        }
        event.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all todos!');
        });
    });
});

eventRouter.route('/:eventId/todos/:todoId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    events.findById(req.params.eventId, function (err, event) {
        if (err) throw err;
        res.json(event.todos.id(req.params.todoId));
    });
})

.put(Verify.verifyOrdinaryUser, function (req, res, next) {
    // We delete the existing commment and insert the updated
    // todo as a new todo
    events.findById(req.params.eventId, function (err, event) {
        if (err) throw err;
        event.todos.id(req.params.todoId).remove();
        event.todos.push(req.body);
        event.save(function (err, event) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(event);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    events.findById(req.params.eventId, function (err, event) {
        event.todos.id(req.params.todoId).remove();
        event.save(function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});

eventRouter.route('/:eventId/prerequisites')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    events.findById(req.params.eventId, function (err, event) {
        if (err) throw err;
        res.json(event.prerequisites);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    events.findById(req.params.eventId, function (err, event) {
        if (err) throw err;
        event.prerequisites.push(req.body);
        event.save(function (err, event) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(event);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    events.findById(req.params.eventId, function (err, event) {
        if (err) throw err;
        for (var i = (event.prerequisites.length - 1); i >= 0; i--) {
            event.prerequisites.id(event.prerequisites[i]._id).remove();
        }
        event.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all prerequisites!');
        });
    });
});

eventRouter.route('/:eventId/prerequisites/:prerequisiteId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    events.findById(req.params.eventId, function (err, event) {
        if (err) throw err;
        res.json(event.prerequisites.id(req.params.prerequisiteId));
    });
})

.put(Verify.verifyOrdinaryUser, function (req, res, next) {
    // We delete the existing commment and insert the updated
    // prerequisite as a new prerequisite
    events.findById(req.params.eventId, function (err, event) {
        if (err) throw err;
        event.prerequisites.id(req.params.prerequisiteId).remove();
        event.prerequisites.push(req.body);
        event.save(function (err, event) {
            if (err) throw err;
            console.log('prerequisite is updated');
            res.json(event);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    events.findById(req.params.eventId, function (err, event) {
        event.prerequisites.id(req.params.prerequisiteId).remove();
        event.save(function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});

//--------------
// participants
//==============

eventRouter.route('/:eventId/participants')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    events.findById(req.params.eventId)
    .populate('participants')
    .exec(function (err, event) {
        if (err) throw err;
        res.json(event.participants);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    events.findById(req.params.eventId, function (err, event) {
        if (err) throw err;
        event.participants.push(req.body);
        event.save(function (err, event) {
            if (err) throw err;
            console.log('participant was added');
            res.json(event);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    events.findById(req.params.eventId, function (err, event) {
        if (err) throw err;
        for (var i = (event.participants.length - 1); i >= 0; i--) {
            event.participants.id(event.participants[i]._id).remove();
        }
        event.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('all participants were deleted');
        });
    });
});

eventRouter.route('/:eventId/participants/:participantId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    events.findById(req.params.eventId)
    .populate('participants')
    .exec(function (err, event) {
        if (err) throw err;
        res.json(event.getParticipantById(req.params.participantId));
    });
})

// We delete the ObjectId of existing paricipant and insert 
// ObjectId of another participant. 
.put(Verify.verifyOrdinaryUser, function (req, res, next) {
    events.findById(req.params.eventId, function (err, event) {
        if (err) throw err;
        var index = event.getParticipantIndexById( req.params.participantId);
        if( index != -1) {
            event.participants.splice(index, 1);
            event.participants.push(req.body);
            event.save(function (err, event) {
                if (err) throw err;
                console.log('participant is replaced');
                res.json(event);
            });
        }
    });
})

// We delete the ObjectId of existing paricipant 
.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    events.findById(req.params.eventId, function (err, event) {
        var index = event.getParticipantIndexById( req.params.participantId);
        if( index != -1) {
            event.participants.splice(index, 1);
            event.save(function (err, resp) {
                if (err) throw err;
                res.json(resp);
            });
        }
    });
});

module.exports = eventRouter;