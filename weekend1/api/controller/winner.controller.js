const mongoose = require('mongoose');
const constants = require('../api.constants');

const NobelPrize = mongoose.model('NobelPrize')

module.exports.getAll = function(req, res) {
    NobelPrize.findById(req.params.nobelId).select('winner').exec(function(err, doc) {
        const response = {
            status: 200,
            message: doc
        };

        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 404;
            response.message = { "message": constants.STATUS_MESSAGES.MSG_404 };
        } else {
            response.message = doc.winner;
        }

        res.status(response.status).json(response.message);
    });
};

//getone
module.exports.getOne = function(req, res) {
    NobelPrize.findById(req.params.nobelId).select('winner').exec(function(err, doc) {
        const response = {
            status: 200,
            message: doc
        };

        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 404;
            response.message = { "message": constants.STATUS_MESSAGES.MSG_404 }
        } else {
            response.message = doc.winner.id(req.params.winnerId);
        }

        res.status(response.status).json(response.message);
    });
};

//create
module.exports.create = function(req, res) {
    NobelPrize.findById(req.params.nobelId).select('winner').exec(function(err, doc) {
        const response = {
            status: 200
        }

        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 404;
            response.message = { "message": constants.STATUS_MESSAGES.MSG_404 };
        }
        if (response.status !== 200) {
            res.status(response.status).json(response.message);
            return;
        }

        createWinner(doc, req, res);

    });
};

function createWinner(nobelPrize, req, res) {

    const winner = {};

    winner.name = req.body.name;
    winner.description = req.body.description;

    nobelPrize.winner.push(winner);

    nobelPrize.save(function(err, doc) {
        const response = {
            status: 201,
            message: doc.winner
        }
        if (err) {
            response.status = 500;
            response.message = err;
        }

        res.status(response.status).json(response.message);
    });
};
//fullupdate
module.exports.fullUpdate = function(req, res) {
    NobelPrize.findById(req.params.nobelId).select('winner').exec(function(err, doc) {
        const response = {
            status: 200
        };

        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc || !doc.winner) {
            response.status = 404;
            response.message = { "message": constants.STATUS_MESSAGES.MSG_404 }
        }
        if (response.status !== 200) {
            res.status(response.status).json(response.message);
            return;
        }
        runFullUpdate(doc, req, res);
    })
};

function runFullUpdate(nobelPrize, req, res) {

    const winner = nobelPrize.winner.id(req.params.winnerId);

    winner.name = req.body.name;
    winner.description = req.body.description;

    nobelPrize.save(function(err, doc) {
        const response = {
            status: 204,
            message: doc.winner.id(req.params.winnerId)
        }
        if (err) {
            response.status = 500;
            response.message = err;
        }

        res.status(response.status).json(response.message);
    });
};
//patchupdate

module.exports.patchUpdate = function(req, res) {
    NobelPrize.findById(req.params.nobelId).select('winner').exec(function(err, doc) {
        const response = {
            status: 200
        };

        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc || !doc.winner.id(req.params.winnerId)) {
            response.status = 404;
            response.message = { "message": constants.STATUS_MESSAGES.MSG_404 }
        }
        if (response.status !== 200) {
            res.status(response.status).json(response.message);
            return;
        }
        runpatchUpdate(doc, req, res);
    })
};

function runpatchUpdate(nobelPrize, req, res) {

    const winner = nobelPrize.winner.id(req.params.winnerId);

    if (req.body.name) { winner.name = req.body.name; }
    if (req.body.description) { winner.description = req.body.description; }

    console.log(winner);

    nobelPrize.save(function(err, doc) {
        const response = {
            status: 204,
            message: doc.winner
        }
        if (err) {
            response.status = 500;
            response.message = err;
        }

        res.status(response.status).json(response.message);
    });
};
//delete
module.exports.delete = function(req, res) {
    NobelPrize.findById(req.params.nobelId).select('winner').exec(function(err, doc) {
        const response = {
            status: 200
        };

        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc || !doc.winner.id(req.params.winnerId)) {
            response.status = 404;
            response.message = { "message": constants.STATUS_MESSAGES.MSG_404 }
        }
        if (response.status !== 200) {
            res.status(response.status).json(response.message);
            return;
        }
        runDelete(doc, req, res);
    })
};

function runDelete(nobelPrize, req, res) {
    nobelPrize.winner.id(req.params.winnerId).remove();

    nobelPrize.save(function(err, doc) {
        const response = {
            status: 204,
            message: doc
        }
        if (err) {
            response.status = 500;
            response.message = err;
        }
        if (!doc) {
            response.status = 404;
            response.message = { "message": constants.STATUS_MESSAGES.MSG_404 }
        }

        res.status(response.status).json(response.message);
    });
};