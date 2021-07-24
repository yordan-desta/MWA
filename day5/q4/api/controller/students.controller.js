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

    Student.find().skip(offset).limit(count).exec(function(err, doc) {
        const response = {
            status: 200,
            message: doc
        }
        if (err) {
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.getById = function(req, res) {
    console.log(`returning student with id ${req.params.studentId}`);

    Student.findById(req.params.studentId).exec(function(err, doc) {
        const response = {
            status: 200,
            message: doc
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 400;
            response.message = { message: "resource not found" };
        }

        res.status(response.status).json(response.message);
    });
};

module.exports.delete = function(req, res) {
    console.log(`deleting student with id ${req.params.studentId}`);
    Student.findByIdAndRemove(req.params.studentId, function(err, doc) {
        const response = {
            status: 201,
        }
        if (err) {
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
};

module.exports.performFullUpdate = function(req, res) {
    console.log(`updating student with id ${req.params.studentId}`);

    Student.findById(req.params.studentId).exec(function(err, doc) {
        const response = {
            status: 200,
            message: doc
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 400;
            response.message = { message: "resource not found" };
        }

        if (response.status !== 200) {
            res.status(response.status).json(response.message);
            return;
        };

        updateStudent(doc, req, res);
    });
};

function updateStudent(student, req, res) {

    student.name = req.body.name;
    student.GPA = req.body.GPA;

    student.save(function(err, upStud) {
        const response = {
            status: 204,
            message: upStud
        };

        if (err) {
            response.status = 500;
            response.message = err;
        }

        res.status(response.status).json(response.message);
    });
};

module.exports.performPatch = function(req, res) {
    console.log(`patching student with id ${req.params.studentId}`);

    Student.findById(req.params.studentId).exec(function(err, doc) {
        const response = {
            status: 200,
            message: doc
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 400;
            response.message = { message: "resource not found" };
        }

        if (response.status !== 200) {
            res.status(response.status).json(response.message);
            return;
        };

        patchUpdate(doc, req, res);
    });
};

function patchUpdate(student, req, res) {

    if (req.body.name) { student.name = req.body.name; }
    if (req.body.GPA) { student.GPA = req.body.GPA; }

    student.save(function(err, upStud) {
        const response = {
            status: 204,
            message: upStud
        };

        if (err) {
            response.status = 500;
            response.message = err;
        }

        res.status(response.status).json(response.message);
    });
};

module.exports.createStudent = function(req, res) {

    console.log(`creating student`, req.body);
    const student = {};
    student.name = req.body.name;
    student.GPA = req.body.GPA;

    Student.create(student, function(err, upStud) {
        const response = {
            status: 201,
            message: upStud
        };

        if (err) {
            response.status = 500;
            response.message = err;
        }

        res.status(response.status).json(response.message);
    });
}