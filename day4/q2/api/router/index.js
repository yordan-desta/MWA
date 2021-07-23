const express = require('express');
const studentController = require('../controller/students.controller');
const courseController = require('../controller/courses.controller');

const router = express.Router();

router.route('/students').get(studentController.getAll);
router.route('/students/:studentId').get(studentController.getById);

router.route('/students/:studentId/courses').get(courseController.getAll);
router.route('/students/:studentId/courses/:courseId').get(courseController.getById);


module.exports = router;