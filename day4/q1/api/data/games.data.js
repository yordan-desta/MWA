const mongoose = require('mongoose');

const publishedSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
    designer: [String],
    publisher: publishedSchema
});

mongoose.model("Game", gamesSchema, 'games');