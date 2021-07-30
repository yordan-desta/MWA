const mongoose = require('mongoose');

const JobSearchModel = mongoose.model('JobSearch');

function runGeoQuery(req, res) {
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);
    const dist = parseFloat(req.query.dist);

    const query = {
        'jobs.location': {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [lng, lat]
                },
                $maxDistance: dist
            }
        }
    };

    console.log(query);

    JobSearchModel.find(query).exec(function(err, doc) {
        const response = {
            status: 200,
            message: doc
        };

        if (err) {
            response.status = 500;
            response.message = err;
        }

        res.status(response.status).json(response.message);
    });
}

//all
module.exports.getAll = function(req, res) {
    let count = parseInt(process.env.DCOUNT);
    let offset = parseInt(process.env.DOFFSET);
    const maxCount = parseInt(process.env.MAXCOUNT);

    if (req.query.lat && req.query.lng && req.query.dist) {
        console.log('runnig geo query')
        runGeoQuery(req, res);
        return;
    }

    if (req.query.count) {
        count = parseInt(req.query.count);
    }
    if (req.query.offset) {
        offset = parseInt(req.query.offset);
    }

    if (isNaN(count) || isNaN(offset)) {
        res.status(400).json({ 'message': 'invalid query params' });
        return;
    }

    if (count > maxCount) {
        count = maxCount;
    }

    console.log(offset, count)

    JobSearchModel.find().limit(count).skip(offset).exec(function(err, doc) {
        const response = {
            status: 200,
            message: doc
        };

        if (err) {
            response.status = 500;
            console.log(err);
            response.message = err;
        }

        res.status(response.status).json(response.message);
    })
};
//one

module.exports.getOne = function(req, res) {
    JobSearchModel.findById(req.params.id).exec(function(err, doc) {
        const response = {
            status: 200,
            message: doc
        };

        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 404;
            response.message = { "message": "Job not found" };
        }

        res.status(response.status).json(response.message);
    })
};

//create

module.exports.create = function(req, res) {
    const job = {};
    job.title = req.body.title;
    job.salary = parseFloat(req.body.salary);
    job.description = req.body.description;
    job.experience = req.body.experience;
    job.skills = req.body.skills;
    job.postDate = req.body.postDate;

    const location = {};
    location.type = 'Point';
    location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];

    job.location = location;

    JobSearchModel.create(job, function(err, doc) {
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

}

//updatefull
module.exports.fullUpdate = function(req, res) {
    JobSearchModel.findById(req.params.id).exec(function(err, doc) {
        const response = {
            status: 200,
            message: doc
        };

        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 404;
            response.message = { "message": "Job not found" };
        }

        if (response.status !== 200) {
            res.status(response.status).json(response.message);
            return;
        }

        runFullUpdate(doc, req, res);
    });
};

function runFullUpdate(job, req, res) {
    job.title = req.body.title;
    job.salary = req.body.salary;
    job.description = req.body.description;
    job.experience = req.body.experience;
    job.skills = req.body.skills;
    job.postDate = req.body.postDate;

    job.location.type = 'Point';
    job.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];

    job.save(function(err, doc) {
        const response = {
            status: 204,
            message: doc
        };

        if (err) {
            response.status = 500;
            response.message = err;
        }

        res.status(response.status).json(response.message);
    })
};
//patch
module.exports.patchUpdate = function(req, res) {
    JobSearchModel.findById(req.params.id).exec(function(err, doc) {
        const response = {
            status: 200,
            message: doc
        };

        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 404;
            response.message = { "message": "Job not found" };
        }

        if (response.status !== 200) {
            res.status(response.status).json(response.message);
            return;
        }

        runPatchUpdate(doc, req, res);
    });
};

function runFullUpdate(job, req, res) {
    if (req.body.title) { job.title = req.body.title; }
    if (req.body.salary) { job.salary = req.body.salary; }
    if (req.body.description) { job.description = req.body.description; }
    if (req.body.experience) { job.experience = req.body.experience; }
    if (req.body.skills) { job.skills = req.body.skills; }
    if (req.body.postDate) { job.postDate = req.body.postDate; }
    if (req.body.lng) {
        job.location.coordinates[0] = parseFloat(req.body.lng);
    }
    if (req.body.lat) {
        job.location.coordinates[1] = parseFloat(req.body.lat);
    }

    job.save(function(err, doc) {
        const response = {
            status: 204,
            message: doc
        };

        if (err) {
            response.status = 500;
            response.message = err;
        }

        res.status(response.status).json(response.message);
    })
};

//delete

module.exports.delete = function(req, res) {
    console.log(req.params.id);
    JobSearchModel.findByIdAndRemove(req.params.id, function(err, doc) {
        const response = {
            status: 204,
            message: doc
        };

        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 404;
            response.message = { "message": "Job not found" };
        }

        res.status(response.status).json(response.message);
    });
}