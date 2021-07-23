const mongo = require('mongoose');

const Student = mongo.model('Student');

module.exports.getAll = function(req, res) {
    console.info('requested to return student list');

    const dCount = 10;
    const dOffset = 0;

    let count = dCount;
    let offset = dOffset;

    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }

    Student.find().skip(offset).limit(count).exec(function(err, doc) {
        console.log(doc);
        res.status(200).json(doc);
    });
}

module.exports.getById = function(req, res) {
    console.log(`returning student with id ${req.params.studentId}`);

    Student.findById(req.params.studentId).exec(function(err, doc) {
        res.status(200).json(doc);
    });
}