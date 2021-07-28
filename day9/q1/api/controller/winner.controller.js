const mongoose = require('mongoose');

const NobelPrize = mongoose.model('NobelPrize')

module.exports.getAll = function(req, res) {
    NobelPrize.findById(req.params.nobelId).select('winners').exec(function(err, doc) {
        const response = {
            status: 200
        }

        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 404;
            response.message = { "message": "nobel prize not found!" };
        } else {
            response.message = doc.winners;
        }

        res.status(response.status).json(response.message);
    });
};

//getone
module.exports.getOne = function(req, res) {
    NobelPrize.findById(req.params.nobelId).select('winners').exec(function(err, doc) {

        const response = {
            status: 200,
            message: doc
        }

        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 404;
            response.message = { "message": "nobel prize not found!" };
        } else {
            response.message = doc.winners.id(req.params.winnerId);
            if (!response.message) {
                response.status = 404;
                response.message = { "message": "Winner not found" };
            }
        }

        res.status(response.status).json(response.message);
    });
};

//create
module.exports.create = function(req, res) {
    NobelPrize.findById(req.params.nobelId).select('winners').exec(function(err, doc) {
        const response = {
            status: 200
        }

        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 404;
            response.message = { "message": "nobel prize not found!" };
        }
        if (response.status !== 200) {
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

    nobelPrize.winners.push(winner);

    nobelPrize.save(function(err, doc) {
        const response = {
            status: 201,
            message: doc
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
    NobelPrize.findById(req.params.nobelId).select('winners').exec(function(err, doc) {
        const response = {
            status: 200
        }

        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 404;
            response.message = { "message": "nobel prize not found!" };
        }

        if (response.status !== 200) {
            res.status(response.status).json(response.message);
            return;
        }
        runFullUpdate(doc, req, res);
    })
};

function runFullUpdate(nobelPrize, req, res) {

    const winner = nobelPrize.winners.id(req.params.winnerId);

    if (!winner) {
        res.status(404).json({ "message": "winner not found" });
        return;
    }

    winner.name = req.body.name;
    winner.description = req.body.description;

    nobelPrize.save(function(err, doc) {
        const response = {
            status: 204,
            message: doc
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
    NobelPrize.findById(req.params.nobelId).select('winners').exec(function(err, doc) {
        const response = {
            status: 200
        }

        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 404;
            response.message = { "message": "nobel prize not found!" }
        }

        if (response.status !== 200) {
            res.status(response.status).json(response.message);
            return;
        }
        runpatchUpdate(doc, req, res);
    })
};

function runpatchUpdate(nobelPrize, req, res) {

    const winner = nobelPrize.winners.id(req.params.winnerId);

    if (!winner) {
        res.status(404).json({ "message": "winner not found" });
        return;
    }

    if (req.body.name) { winner.name = req.body.name; }
    if (req.body.description) { winner.description = req.body.description; }

    nobelPrize.save(function(err, doc) {
        const response = {
            status: 204,
            message: doc
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
    NobelPrize.findById(req.params.nobelId).select('winners').exec(function(err, doc) {
        const response = {
            status: 200
        }

        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 404;
            response.message = { "message": "nobel prize not found!" }
        }

        if (response.status !== 200) {
            res.status(response.status).json(response.message);
            return;
        }

        runDelete(doc, req, res);
    })
};

function runDelete(nobelPrize, req, res) {
    nobelPrize.winners.id(req.params.winnerId).remove();

    nobelPrize.save(function(err, doc) {
        const response = {
            status: 204,
            message: doc
        }

        if (err) {
            response.status = 500;
            response.message = err;
        }

        res.status(response.status).json(response.message);
    });
};