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

    Game.find().limit(count).skip(offset).exec(function(err, doc) {

        const response = {
            status: 200,
            message: doc
        }

        if (err) {
            response.status = 500;
            response.message = err;
        }

        res.status(response.status).json(response.message);
    });
};

module.exports.getGameById = function(req, res) {

    console.log(`Lookign for game with an id ${req.params.gameId}`);

    Game.findById(req.params.gameId).exec(function(err, doc) {
        const response = {
            status: 200,
            message: doc
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 404;
            response.message = { "message": "Resource not found!" };
        }

        res.status(response.status).json(response.message);
    });
};

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

    Game.create(newGame, function(err, doc) {
        const response = {
            status: 201,
            message: doc
        };

        if (err) {
            response.status = 400;
            response.message = err;
        };

        res.status(response.status).json(response.message);
    });
};

module.exports.performFullUpdate = function(req, res) {
    console.log(`Performing full update with properties ${req.body}`);

    Game.findById(req.params.gameId).select("-reviews -publisher").exec(function(err, doc) {
        const response = {
            status: 204
        };

        if (err) {
            response.status = 500;
            response.message = err;

        } else if (!doc) {
            response.status = 404;
            response.message = { statusMessage: "resource not found!" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
            return;
        };

        fullUpdateGame(doc, req, res);
    });
};

function fullUpdateGame(doc, req, res) {

    doc.title = req.body.title;
    doc.year = parseInt(req.body.year);
    doc.rate = parseInt(req.body.rate);
    doc.price = parseFloat(req.body.price);
    doc.minPlayers = parseInt(req.body.minPlayers);
    doc.maxPlayers = parseInt(req.body.maxPlayers);
    doc.minAge = parseInt(req.body.minAge);
    doc.designers = req.body.designers;

    doc.save(function(err, updatedGame) {
        const response = {
            status: 204,
            message: updatedGame
        };

        if (err) {
            response.status = 500;
            response.message = err;
        }

        res.status(response.status).json(response.doc);
    });
};

module.exports.performPatchUpdate = function(req, res) {
    console.log(`performing patch update for ${req.params.gameId}`);

    Game.findById(req.params.gameId).select("-reviews -publisher").exec(function(err, doc) {
        console.log(doc);
        const response = {
            status: 204
        };

        if (err) {
            response.status = 500;
            response.message = err;

        } else if (!doc) {
            response.status = 404;
            response.message = { statusMessage: "resource not found!" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
            return;
        }
        patchUpdateGame(doc, req, res);
    });
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

    doc.save(function(err, updatedGame) {
        const response = {
            status: 204,
            message: updatedGame
        };

        if (err) {
            response.status = 500;
            response.message = err;
        }
        console.log(doc);
        res.status(response.status).json(response.message)
    });
};

module.exports.deleteGame = function(req, res) {
    console.log("deleting game");
    Game.findByIdAndRemove(req.params.gameId, function(err, doc) {
        const response = {
            status: 204
        }

        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            response.status = 404;
            response.message = { "messageg": "game not found" };
        }
        res.status(response.status).json(response.message);
    });

}