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

    if (isNaN(count) || isNaN(offset)) {
        res.status(400).json({ message: "Invalide query parameters" });
        return;
    }

    Student.findById(req.params.studentId).select('courses').exec(function(err, doc) {
        const response = {
            status: 200,
        }
        if (err) {
            response.status = 500;
            response.message = err;
        }
        if (doc) {
            response.message = doc.courses;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.getOne = function(req, res) {
    console.log(`returning student with id ${req.params.studentId} and course with id ${req.params.courseId}`);

    Student.findById(req.params.studentId)
        .select('courses')
        .exec(function(err, doc) {
            const response = {
                status: 200,
                message: doc
            }
            if (err) {
                response.status = 500;
                response.message = doc;
            }
            res.status(response.status).json(response.message);
        });
};
//I ran out of time to implement this