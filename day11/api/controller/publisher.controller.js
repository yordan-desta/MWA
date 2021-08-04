const mongoose = require('mongoose');

const Game = mongoose.model('Game');

function findPublisher(doc) {

    const promise = new Promise((resolve, reject) => {
        console.log(doc);

        if (!doc) {
            reject({ status: 404, message: "Game Not found" })
        } else {
            console.log('finding publisher resolved!', doc.publisher);
            resolve(doc.publisher)
        }
    });
    return promise;
}

function returnPublisher(publisher, res) {
    console.log('returning publisher to req', publisher);
    res.status(200).json(publisher);
}

function handleError(err, res) {
    console.log('error thrown', err);

    if (err.message && err.status) {
        res.status(err.status).json(err.message);
        return;
    }
    res.status(500).json({ 'message': err })
}

module.exports.getGamePublisher = function(req, res) {

    console.log(`Getting a game publisher`);

    Game.findById(req.params.gameId).select('publisher')
        .exec()
        .then(findPublisher)
        .then((publisher) => returnPublisher(publisher, res))
        .catch((err) => { handleError(err, res) });
};

function addPublisher(game, req, res) {
    return new Promise((resolve, reject) => {
        if (!game) {
            reject({ status: 404, message: "Game Not found" });
            return;
        }

        game.publisher = {};
        game.publisher.location = {};

        game.publisher.name = req.body.name;
        game.publisher.country = req.body.country;

        if (req.body.location) {
            game.publisher.location.coordinates = [parseFloat(req.body.location.lng), parseFloat(req.body.location.lat)];
            game.publisher.location.type = req.body.location.type;
        }

        console.log('updated game:', game);

        game.save(function(err, updt) {
            const response = {
                status: 500,
                message: err
            }

            if (updt) {
                response.status = 201;
                response.message = updt.publisher;
            }
            res.status(response.status).json(response.message);
        });

        resolve(game);
    });
}


module.exports.createPublisher = function(req, res) {

    console.log("creating publisher");

    Game.findById(req.params.gameId)
        .exec()
        .then((game) => addPublisher(game, req, res))
        .catch((err) => handleError(err, res));
};

module.exports.performFullUpdate = function(req, res) {
    console.log(`Performing full update on publisher`);

    Game.findById(req.params.gameId).select("publisher").exec()
        .then((doc) => updatePublisher(doc, req, res))
        .then((doc) => res.status(204).json(doc))
        .catch((err) => handleError(err, res));
};

function updatePublisher(game, req, res) {
    const response = {
        status: 200
    };

    if (!doc) {
        response.status = 404;
        response.message = { statusMessage: "game not found!" };
    }
    if (response.status !== 200) {
        res.status(response.status).json(response.message);
        return;
    };

    console.log("full updating publisher");

    game.publisher.name = req.body.name;

    game.publisher.country = req.body.country;

    if (req.body.location) {
        if (parseFloat(req.body.location.lng) && parseFloat(req.body.location.lat)) {
            game.publisher.location.coordinates = [parseFloat(req.body.location.lng), parseFloat(req.body.location.lat)];
        } else {
            game.publisher.location.coordinates = [];
        }
        game.publisher.location.type = req.body.location.type;
    }

    return game.save();
};


module.exports.performPatchUpdate = function(req, res) {
    console.log(`performing patch update for game ${req.params.gameId} publisher`);

    Game.findById(req.params.gameId).select("publisher")
        .exec()
        .then((doc) => { patchUpdatePublisher(doc, req, res) })
        .then((doc) => res.status(204).json(doc))
        .catch((err) => { handleError(err, res) });
};

function patchUpdatePublisher(game, req, res) {

    const response = {
        status: 204
    };

    if (!doc) {
        response.status = 404;
        response.message = { statusMessage: "game not found!" };
    }
    if (response.status !== 204) {
        res.status(response.status).json(response.message);
        return;
    }

    if (req.body.name) { game.publisher.name = req.body.name; }

    if (req.body.country) { game.publisher.country = req.body.country; }

    if (req.body.location.lat && req.body.location.lng) {
        game.publisher.location.coordinates = [parseFloat(req.body.location.lng), parseFloat(req.body.location.lat)]
    }

    return game.save();
};



module.exports.deletePublisher = function(req, res) {
    console.log('deliting publisher object');

    Game.findById(req.params.gameId).select("publisher").exec()
        .then((game) => deletePublisher(game, res))
        .then((doc) => res.status(204).json(doc))
        .catch((err) => handleError(err, res));
}

function deletePublisher(game, res) {
    const response = {
        status: 204
    };

    if (!doc) {
        response.status = 404;
        response.message = { statusMessage: "game not found!" };
    }

    if (response.status !== 204) {
        res.status(response.status).json(response.message);
        return;
    }

    game.publisher.remove();

    return game.save();
}