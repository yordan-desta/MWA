const mongoose = require('mongoose');
const { param } = require('../router');

const Game = mongoose.model('Game');

module.exports.getAllGames = function(req, res) {

    const dCount = 10;
    const dOffset = 10;

    let count = dCount;
    let offset = dOffset;

    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }

    console.log(`checking for games list for count=${count} and offset=${offset}`);

    Game.find().limit(count).skip(offset).exec(function(err, doc) {
        res.status(200).json(doc);
    });
};

module.exports.getGameById = function(req, res) {

    console.log(`Lookign for game with an id ${req.params.gameId}`);

    Game.findById(req.params.gameId).exec(function(err, doc) {
        res.status(200).json(doc);
    });
};