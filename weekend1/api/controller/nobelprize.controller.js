const mongoose = require('mongoose');
const constants = require('../api.constants');
const utilModule = require('../api.response.util');

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
        const response = utilModule.buildFindDocumentResponse(err, doc);

        res.status(response.status).json(response.message);
    });
};

module.exports.getOne = function(req, res) {
    NobelPrize.findById(req.params.nobelId).exec(function(err, doc) {
        const response = utilModule.buildFindDocumentResponse(err, doc);

        res.status(response.status).json(response.message);
    });
};

//create
module.exports.create = function(req, res) {
    const nobelPrize = {};

    nobelPrize.category = req.body.category;
    nobelPrize.year = parseInt(req.body.year);

    NobelPrize.create(nobelPrize, function(err, doc) {
        const response = utilModule.buildCreateResponse(err, doc);

        res.status(response.status).json(response.message);
    });
};

module.exports.fullUpdate = function(req, res) {
    NobelPrize.findById(req.params.nobelId).select('-winners').exec(function(err, doc) {

        const response = utilModule.buildFindDocumentResponse(err, doc);

        if (!response.ok) {
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
        const response = utilModule.buildUpdateResponse(err, doc);

        res.status(response.status).json(response.message);
    });
};

module.exports.patchUpdate = function(req, res) {
    NobelPrize.findById(req.params.nobelId).select('-winners').exec(function(err, doc) {
        const response = utilModule.buildFindDocumentResponse(err, doc);

        if (!response.ok) {
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
        const response = utilModule.buildUpdateResponse(err, doc);
        res.status(response.status).json(response.message);
    });
}

module.exports.delete = function(req, res) {
    NobelPrize.findByIdAndRemove(req.params.nobelId).exec(function(err, doc) {
        const response = utilModule.buildDeleteResponse(err, doc);
        res.status(response.status).json(response.message);
    });
};