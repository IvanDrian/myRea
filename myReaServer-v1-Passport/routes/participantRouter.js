var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var participants = require('../models/participants');
var Verify = require('./verify');

var participantRouter = express.Router();
participantRouter.use(bodyParser.json());

participantRouter.route('/')

.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    participants.find({}, function (err, participant) {
        if (err) throw err;
        res.json(participant);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    participants.create(req.body, function (err, participant) {
        if (err) throw err;
        console.log('participant created!');
        var id = participant._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the participant with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    participants.remove({}, function (err, resp) {
        if (err) throw err;
        console.log('participant deleted');
        res.json(resp);
    });
});

participantRouter.route('/:participantId')

.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    participants.findById(req.params.participantId, function (err, participant) {
        if (err) throw err;
        res.json(participant);
    });
})

.put(Verify.verifyOrdinaryUser, function (req, res, next) {
    participants.findByIdAndUpdate(req.params.participantId, {
        $set: req.body
    }, {
        new: true
    }, function (err, participant) {
        if (err) throw err;
        res.json(participant);
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    participants.findByIdAndRemove(req.params.participantId, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = participantRouter;