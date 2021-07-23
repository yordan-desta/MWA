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

    Student.findById(req.params.studentId).select('courses').exec(function(err, doc) {
        res.status(200).json(doc.courses);
    });
}

module.exports.getById = function(req, res) {
    console.log(`returning student with id ${req.params.studentId} and course with id ${req.params.courseId}`);

    Student.findById(req.params.studentId)
        .select('courses')
        .exec(function(err, doc) {

            //in-memory work :(, untill I find the better way

            for (const c of doc.courses) {
                if (c.id == req.params.courseId) {
                    res.status(200).json(c);
                }
            }
            res.status(404).send();
        });
}