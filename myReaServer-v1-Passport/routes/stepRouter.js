var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

require('../models/participants'); 

var steps = require('../models/steps');
var Verify = require('./verify');

var stepRouter = express.Router();
stepRouter.use(bodyParser.json());

stepRouter.route('/')

.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    steps.find({})
    .populate('participants')
    .exec(function (err, step) {
        if (err) throw err;
        res.json(step);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    steps.create(req.body, function (err, step) {
        if (err) throw err;
        console.log('step created!');
        var id = step._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the step with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    steps.remove({}, function (err, resp) {
        if (err) throw err;
        console.log('step deleted');
        res.json(resp);
    });
});

stepRouter.route('/:stepId')

.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    steps.findById(req.params.stepId)
    .populate('participants')
    .exec(function (err, step) {
        if (err) throw err;
        res.json(step);
    });
})

.put(Verify.verifyOrdinaryUser, function (req, res, next) {
    steps.findByIdAndUpdate(req.params.stepId, {
        $set: req.body
    }, {
        new: true
    }, function (err, step) {
        if (err) throw err;
        res.json(step);
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    steps.findByIdAndRemove(req.params.stepId, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});


stepRouter.route('/:stepId/todos')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    steps.findById(req.params.stepId, function (err, step) {
        if (err) throw err;
        res.json(step.todos);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    steps.findById(req.params.stepId, function (err, step) {
        if (err) throw err;
        step.todos.push(req.body);
        step.save(function (err, step) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(step);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    steps.findById(req.params.stepId, function (err, step) {
        if (err) throw err;
        for (var i = (step.todos.length - 1); i >= 0; i--) {
            step.todos.id(step.todos[i]._id).remove();
        }
        step.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all todos!');
        });
    });
});

stepRouter.route('/:stepId/todos/:todoId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    steps.findById(req.params.stepId, function (err, step) {
        if (err) throw err;
        res.json(step.todos.id(req.params.todoId));
    });
})

.put(Verify.verifyOrdinaryUser, function (req, res, next) {
    // We delete the existing commment and insert the updated
    // todo as a new todo
    steps.findById(req.params.stepId, function (err, step) {
        if (err) throw err;
        step.todos.id(req.params.todoId).remove();
        step.todos.push(req.body);
        step.save(function (err, step) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(step);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    steps.findById(req.params.stepId, function (err, step) {
        step.todos.id(req.params.todoId).remove();
        step.save(function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});

stepRouter.route('/:stepId/prerequisites')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    steps.findById(req.params.stepId, function (err, step) {
        if (err) throw err;
        res.json(step.prerequisites);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    steps.findById(req.params.stepId, function (err, step) {
        if (err) throw err;
        step.prerequisites.push(req.body);
        step.save(function (err, step) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(step);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    steps.findById(req.params.stepId, function (err, step) {
        if (err) throw err;
        for (var i = (step.prerequisites.length - 1); i >= 0; i--) {
            step.prerequisites.id(step.prerequisites[i]._id).remove();
        }
        step.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all prerequisites!');
        });
    });
});

stepRouter.route('/:stepId/prerequisites/:prerequisiteId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    steps.findById(req.params.stepId, function (err, step) {
        if (err) throw err;
        res.json(step.prerequisites.id(req.params.prerequisiteId));
    });
})

.put(Verify.verifyOrdinaryUser, function (req, res, next) {
    // We delete the existing commment and insert the updated
    // prerequisite as a new prerequisite
    steps.findById(req.params.stepId, function (err, step) {
        if (err) throw err;
        step.prerequisites.id(req.params.prerequisiteId).remove();
        step.prerequisites.push(req.body);
        step.save(function (err, step) {
            if (err) throw err;
            console.log('prerequisite is updated');
            res.json(step);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    steps.findById(req.params.stepId, function (err, step) {
        step.prerequisites.id(req.params.prerequisiteId).remove();
        step.save(function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});

//--------------
// participants
//==============

stepRouter.route('/:stepId/participants')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    steps.findById(req.params.stepId)
    .populate('participants')
    .exec(function (err, step) {
        if (err) throw err;
        res.json(step.participants);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    steps.findById(req.params.stepId, function (err, step) {
        if (err) throw err;
        step.participants.push(req.body);
        step.save(function (err, step) {
            if (err) throw err;
            console.log('participant was added');
            res.json(step);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    steps.findById(req.params.stepId, function (err, step) {
        if (err) throw err;
        for (var i = (step.participants.length - 1); i >= 0; i--) {
            step.participants.id(step.participants[i]._id).remove();
        }
        step.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('all participants were deleted');
        });
    });
});

stepRouter.route('/:stepId/participants/:participantId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    steps.findById(req.params.stepId)
    .populate('participants')
    .exec(function (err, step) {
        if (err) throw err;
        res.json(step.getParticipantById(req.params.participantId));
    });
})

// We delete the ObjectId of existing paricipant and insert 
// ObjectId of another participant. 
.put(Verify.verifyOrdinaryUser, function (req, res, next) {
    steps.findById(req.params.stepId, function (err, step) {
        if (err) throw err;
        var index = step.getParticipantIndexById( req.params.participantId);
        if( index != -1) {
            step.participants.splice(index, 1);
            step.participants.push(req.body);
            step.save(function (err, step) {
                if (err) throw err;
                console.log('participant is replaced');
                res.json(step);
            });
        }
    });
})

// We delete the ObjectId of existing paricipant 
.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    steps.findById(req.params.stepId, function (err, step) {
        var index = step.getParticipantIndexById( req.params.participantId);
        if( index != -1) {
            step.participants.splice(index, 1);
            step.save(function (err, resp) {
                if (err) throw err;
                res.json(resp);
            });
        }
    });
});

module.exports = stepRouter;