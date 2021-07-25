const mongoose = require('mongoose');
const utilModule = require('../api.response.util');

const NobelPrize = mongoose.model('NobelPrize')

module.exports.getAll = function(req, res) {
    NobelPrize.findById(req.params.nobelId).select('winner').exec(function(err, doc) {
        const response = utilModule.buildFindDocumentResponse(err, doc);

        if (response.ok) {
            response.message = doc.winner;
        };

        res.status(response.status).json(response.message);
    });
};

//getone
module.exports.getOne = function(req, res) {
    NobelPrize.findById(req.params.nobelId).select('winner').exec(function(err, doc) {

        const response = utilModule.buildFindDocumentResponse(err, doc);

        if (response.ok) {
            response.message = doc.winner.id(req.params.winnerId);
        };

        res.status(response.status).json(response.message);
    });
};

//create
module.exports.create = function(req, res) {
    NobelPrize.findById(req.params.nobelId).select('winner').exec(function(err, doc) {
        const response = utilModule.buildFindDocumentResponse(err, doc);

        if (!response.ok) {
            res.status(response.status).json(response.message);
            return;
        };
        createWinner(doc, req, res);
    });
};

function createWinner(nobelPrize, req, res) {

    const winner = {};

    winner.name = req.body.name;
    winner.description = req.body.description;

    nobelPrize.winner.push(winner);

    nobelPrize.save(function(err, doc) {
        const response = utilModule.buildCreateResponse(err, doc);

        res.status(response.status).json(response.message);
    });
};
//fullupdate
module.exports.fullUpdate = function(req, res) {
    NobelPrize.findById(req.params.nobelId).select('winner').exec(function(err, doc) {
        const response = utilModule.buildFindDocumentResponse(err, doc);

        if (!response.ok) {
            res.status(response.status).json(response.message);
            return;
        }
        runFullUpdate(doc, req, res);
    })
};

function runFullUpdate(nobelPrize, req, res) {

    const winner = nobelPrize.winner.id(req.params.winnerId);

    if (!winner) {
        res.status(404).json({ "message": "winner not found" });
        return;
    }

    winner.name = req.body.name;
    winner.description = req.body.description;

    nobelPrize.save(function(err, doc) {
        const response = utilModule.buildUpdateResponse(err, doc);

        res.status(response.status).json(response.message);
    });
};
//patchupdate

module.exports.patchUpdate = function(req, res) {
    NobelPrize.findById(req.params.nobelId).select('winner').exec(function(err, doc) {
        const response = utilModule.buildFindDocumentResponse(err, doc);

        if (!response.ok) {
            res.status(response.status).json(response.message);
            return;
        }
        runpatchUpdate(doc, req, res);
    })
};

function runpatchUpdate(nobelPrize, req, res) {

    const winner = nobelPrize.winner.id(req.params.winnerId);

    if (!winner) {
        res.status(404).json({ "message": "winner not found" });
        return;
    }

    if (req.body.name) { winner.name = req.body.name; }
    if (req.body.description) { winner.description = req.body.description; }

    console.log(winner);

    nobelPrize.save(function(err, doc) {
        const response = utilModule.buildUpdateResponse(err, doc);

        res.status(response.status).json(response.message);
    });
};
//delete
module.exports.delete = function(req, res) {
    NobelPrize.findById(req.params.nobelId).select('winner').exec(function(err, doc) {
        const response = utilModule.buildFindDocumentResponse(err, doc);

        if (!response.status) {
            res.status(response.status).json(response.message);
            return;
        }
        runDelete(doc, req, res);
    })
};

function runDelete(nobelPrize, req, res) {
    nobelPrize.winner.id(req.params.winnerId).remove();

    nobelPrize.save(function(err, doc) {
        const response = utilModule.buildDeleteResponse(err, doc);
        res.status(response.status).json(response.message);
    });
};