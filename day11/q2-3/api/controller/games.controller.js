const mongoose = require('mongoose');

const Game = mongoose.model('Game');

module.exports.getAllGames = function(req, res) {

    console.log(`Getting all the games`);

    const dCount = 10;
    const dOffset = 0;

    let count = dCount;
    let offset = dOffset;

    if (req.query.count) {
        count = parseInt(req.query.count);
    }

    if (req.query.offset) {
        offset = parseInt(req.query.offset);
    }

    if (isNaN(count) || isNaN(offset)) {
        res.status(400).json({ message: "Invalide query parameters" });
        return;
    }

    console.log(`checking for games list for count=${count} and offset=${offset}`);

    Game.find().limit(count).skip(offset)
        .exec()
        .then((doc) => res.status(200).json(doc))
        .catch((err) => returnError(err, res));
};


module.exports.getGameById = function(req, res) {

    console.log(`Lookign for game with an id ${req.params.gameId}`);

    Game.findById(req.params.gameId).exec()
        .then((doc) => retunOne(doc, res))
        .catch((err) => res.status(500).json(err));

};

function retunOne(doc, res) {
    const response = {
        status: 200,
        message: doc
    }
    if (!doc) {
        response.status = 404;
        response.message = { "message": "Resource not found!" };
    }

    res.status(response.status).json(response.message);
}

module.exports.createOne = function(req, res) {

    console.log(`Creating a new games with properties ${req.body}`);

    const newGame = {
        title: req.body.title,
        year: parseInt(req.body.year),
        rate: parseInt(req.body.rate),
        price: parseFloat(req.body.price),
        minPlayers: parseInt(req.body.minPlayers),
        maxPlayers: parseInt(req.body.maxPlayers),
        minAge: parseInt(req.body.minAge),
        designers: req.body.designers
    };

    console.log(newGame);

    Game.create(newGame)
        .then((doc) => res.status(201).json(doc))
        .catch((err) => res.status(500).json(err));

};

module.exports.performFullUpdate = function(req, res) {
    console.log(`Performing full update with properties ${req.body}`);

    Game.findById(req.params.gameId).select("-reviews -publisher")
        .exec()
        .then((doc) => fullUpdateGame(doc, req, res))
        .then((doc) => res.status(204).json(doc))
        .catch((err) => res.status(500).json(err));
};

function fullUpdateGame(doc, req, res) {

    if (!doc) {
        res.status(404).json({ "message": "game not found" });
    }

    doc.title = req.body.title;
    doc.year = parseInt(req.body.year);
    doc.rate = parseInt(req.body.rate);
    doc.price = parseFloat(req.body.price);
    doc.minPlayers = parseInt(req.body.minPlayers);
    doc.maxPlayers = parseInt(req.body.maxPlayers);
    doc.minAge = parseInt(req.body.minAge);
    doc.designers = req.body.designers;

    return doc.save();
};

module.exports.performPatchUpdate = function(req, res) {
    console.log(`performing patch update for ${req.params.gameId}`);

    Game.findById(req.params.gameId).select("-reviews -publisher")
        .exec()
        .then((doc) => patchUpdateGame(doc, req, res))
        .then((doc) => res.status(204).json(doc))
        .catch((err) => res.status(500).json(err));

};

function patchUpdateGame(doc, req, res) {

    if (req.body.title) { doc.title = req.body.title; }
    if (req.body.year) { doc.year = parseInt(req.body.year) };
    if (req.body.rate) { doc.rate = parseInt(req.body.rate) };
    if (req.body.price) { doc.price = parseFloat(req.body.price) };
    if (req.body.minPlayers) { doc.minPlayers = parseInt(req.body.minPlayers) };
    if (req.body.maxPlayers) { doc.maxPlayers = parseInt(req.body.maxPlayers) };
    if (req.body.minAge) { doc.minAge = parseInt(req.body.minAge) };
    if (req.body.designers) { doc.designers = req.body.designers };

    return doc.save();
};
module.exports.deleteGame = function(req, res) {
    console.log("deleting game");
    Game.findByIdAndRemove(req.params.gameId)
        .then((doc) => returnDeleteResonse(doc, res))
        .catch((err) => res.status(500).json(err));;

}

function returnDeleteResonse(doc, res) {
    const response = {
        status: 204
    }

    if (!doc) {
        response.status = 404;
        response.message = { "messageg": "game not found" };
    }

    res.status(response.status).json(response.message);
}