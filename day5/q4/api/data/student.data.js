const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseNumber: {
        type: Number,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }

});

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    GPA: {
        type: Number,
        max: 4
    },

    courses: [courseSchema]
});

mongoose.model('Student', studentSchema, 'Students');