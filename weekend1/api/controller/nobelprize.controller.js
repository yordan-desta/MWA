const { response } = require('express');
const mongoose = require('mongoose');
const constants = require('../api.constants');

const NobelPrize = mongoose.model('NobelPrize');

module.exports.getAll = function(req, res) {

    let count = constants.PAGINATION_DEFAULT_COUNT;
    let offset = constants.PAGINATION_DEFAULT_OFFSET;

    if (req.query.count) {
        count = parseInt(req.query.count);
    }
    if (req.query.offset) {
        offset = parseInt(req.query.offset);
    }

    if (isNaN(count) || isNaN(offset)) {
        res.status(400).json({ message: "Invalid query params" });
        return;
    }

    if (count > constants.PAGINATION_MAX_COUNT) {
        count = constants.PAGINATION_MAX_COUNT;
    }

    NobelPrize.find().skip(offset).limit(count).exec(function(err, doc) {
        const response = {
            status: 200,
            message: doc
        };

        if (err) {
            response.message = err;
            response.status = 500;
        }

        res.status(response.status).json(response.message);
    });
};

module.exports.getOne = function(req, res) {
    NobelPrize.findById(req.params.nobelId).exec(function(err, doc) {
        const response = {
            status: 200,
            message: doc
        };

        if (err) {
            response.status = 500;
            response.message = err;
        };

        if (!doc) {
            response.status = 404;
            response.message = { 'message': constants.MSG_404 }
        }

        res.status(response.status).json(response.message);
    });
};

//create
module.exports.create = function(req, res) {
    const nobelPrize = {};

    nobelPrize.category = req.body.category;
    nobelPrize.year = parseInt(req.body.year);

    NobelPrize.create(nobelPrize, function(err, doc) {
        const response = {
            status: 201,
            message: doc
        };
        if (err) {
            response.status = 500;
            response.message = err;
        }

        res.status(response.status).json(response.message);
    });
};

module.exports.fullUpdate = function(req, res) {
    NobelPrize.findById(req.params.nobelId).select('-winner').exec(function(err, doc) {
        const response = {
            status: 200
        };

        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 404;
            response.message = { "message": "resource not found" };
        }

        if (200 !== response.status) {
            res.status(response.status).json(response.message);
            return;
        }

        makeFullUpdate(doc, req, res);
    });
};

function makeFullUpdate(nobelPrize, req, res) {
    nobelPrize.category = req.body.category;
    nobelPrize.year = parseInt(req.body.year);

    nobelPrize.save(function(err, doc) {
        const response = {
            status: 204,
            message: doc
        };

        if (err) {
            response.status = 500;
            response.message = err;
        };

        res.status(response.status).json(response.message);
    });
};

module.exports.patchUpdate = function(req, res) {
    NobelPrize.findById(req.params.nobelId).select('-winner').exec(function(err, doc) {
        const response = {
            status: 200
        };
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 404;
            response.message = { "message": constants.MSG_404 };
        }
        if (response.status !== 200) {
            res.status(response.status).json(response.message);
            return;
        };

        makePatch(doc, req, res);
    });
};

function makePatch(nobelPrize, req, res) {
    if (req.body.category) { nobelPrize.category = req.body.category; }
    if (req.body.year) { nobelPrize.year = parseInt(req.body.year); }

    nobelPrize.save(function(err, doc) {
        const response = {
            status: 204,
            message: doc
        };

        if (err) {
            response.status = 500;
            response.message = err;
        };

        res.status(response.status).json(response.message);
    });
}

module.exports.delete = function(req, res) {
    NobelPrize.findByIdAndRemove(req.params.nobelId).exec(function(err, doc) {
        const response = {
            status: 204,
            message: doc
        };

        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 404;
            response.message = { "message": constants.MSG_404 };
        }

        res.status(response.status).json(response.message);
    });
};