const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    review: {
        type: String,
        required: true
    }
});

const publishedSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    country: {
        type: Number,
        require: true
    },
    established: {
        type: Date,
        required: false
    },
    location: {
        type: {
            type: String
        },
        coordinate: {
            type: [Number],
            index: "2dsphere"
        }
    }
});

const gamesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: Number,
    rate: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    price: Number,
    minPlayers: {
        type: Number,
        min: 1,
        max: 10
    },
    maxPlayer: {
        type: Number,
        min: 1,
        max: 10
    },
    minAge: Number,
    designers: String,
    publisher: publishedSchema,
    reviews: [reviewSchema]
});

mongoose.model('Game', gamesSchema, 'games');