const mongoose = require('mongoose');

const winnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

const nobelPrizeSchema = new mongoose.Schema({
    winner: {
        type: [winnerSchema],
    },
    category: {
        type: String,
        enum: ['PYSICS', 'MEDICINE', 'CHEMISTRY', 'ECONOMICS', 'LITERATURE'],
        required: true
    },
    year: {
        type: Number,
        requried: true
    }
});

mongoose.model('NobelPrize', nobelPrizeSchema, 'nobelPrize');