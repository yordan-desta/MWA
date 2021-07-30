const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point', ],
        required: true
    },
    coordinates: {
        type: [Number],
        index: "2dspere"
    }
})

const jobSearchSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    salary: {
        type: Number, //work on this later
    },

    location: {
        type: locationSchema,
        default: {}
    },

    description: String,

    experience: String,

    skills: [String],

    postDate: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('JobSearch', jobSearchSchema, 'jobs');