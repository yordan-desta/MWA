const express = require('express');
const jobController = require('../controller/jobsearch.controller');

const router = express.Router();

router.route('/jobs')
    .get(jobController.getAll)
    .post(jobController.create);

router.route('/jobs/:id').get(jobController.getOne)
    .put(jobController.fullUpdate)
    .patch(jobController.patchUpdate);

module.exports = router;